"""
AI service layer — the "brain" behind all 4 build paths + job tailoring.

Everything here is a thin, testable wrapper around an LLM call, kept out of
views.py so the same functions can be reused by Celery tasks, management
commands, or unit tests with a mocked client.

In production this calls the Anthropic Messages API (claude-sonnet-*) with
`response_format`-style JSON instructions. Swap ANTHROPIC_API_KEY / model
name via Django settings / env vars — never hardcode keys.
"""
from __future__ import annotations
import json
import logging
from dataclasses import dataclass
from django.conf import settings
import anthropic

logger = logging.getLogger("resumeai.ai")

_client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)
MODEL = getattr(settings, "ANTHROPIC_MODEL", "claude-sonnet-4-6")


def _call_json(system_prompt: str, user_content: str, max_tokens: int = 2000) -> dict:
    """Calls the model and forces a JSON-only response. Retries once on bad JSON."""
    for attempt in range(2):
        resp = _client.messages.create(
            model=MODEL,
            max_tokens=max_tokens,
            system=system_prompt,
            messages=[{"role": "user", "content": user_content}],
        )
        text = "".join(block.text for block in resp.content if block.type == "text")
        cleaned = text.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()
        try:
            return json.loads(cleaned)
        except json.JSONDecodeError:
            logger.warning("AI returned non-JSON on attempt %s: %s", attempt, text[:200])
            user_content += "\n\nReturn ONLY valid JSON, no markdown fences, no commentary."
    raise ValueError("AI did not return parseable JSON after 2 attempts")


# ---------------------------------------------------------------------------
# 1. UPLOAD RESUME — file -> structured resume
# ---------------------------------------------------------------------------

RESUME_EXTRACTION_SCHEMA_PROMPT = """
You are a resume parser. Extract the resume into this exact JSON schema:
{
  "professional_summary": string,
  "experiences": [{"company","role","location","start_date":"YYYY-MM","end_date":"YYYY-MM or null",
                    "is_current": bool, "bullet_points": [string]}],
  "education": [{"institution","degree","field_of_study","start_date","end_date","grade"}],
  "skills": [{"name","category":"technical|soft|tool|language"}],
  "projects": [{"name","description","tech_stack":[string],"link"}]
}
Rules:
- Rewrite weak bullet points into strong, quantified, action-verb-led statements ONLY if the
  original meaning is preserved — never invent numbers or achievements not implied by the text.
- If a field is missing in the source, use an empty string or empty list, never null/omit keys.
- Dates must be normalized to YYYY-MM where possible.
"""


def extract_resume_from_text(raw_text: str) -> dict:
    """
    Step 2 of the upload pipeline (step 1 = text extraction from the file
    itself, done in views.py using pdfplumber / python-docx / an OCR
    fallback for images before this function is ever called).
    """
    return _call_json(RESUME_EXTRACTION_SCHEMA_PROMPT, raw_text, max_tokens=3000)


# ---------------------------------------------------------------------------
# 2. VOICE AI — transcript -> structured resume
# ---------------------------------------------------------------------------

VOICE_STRUCTURING_PROMPT = RESUME_EXTRACTION_SCHEMA_PROMPT + """
The input below is a spoken, informal transcript (from speech-to-text), not
a written resume. It will contain filler words, run-on sentences, and
out-of-order information. Reconstruct a clean, professional resume from it,
inferring reasonable structure (e.g. group all statements about one company
into one experience entry) without fabricating facts not mentioned.
"""


def structure_resume_from_transcript(transcript: str) -> dict:
    return _call_json(VOICE_STRUCTURING_PROMPT, transcript, max_tokens=3000)


# ---------------------------------------------------------------------------
# 3. LINKEDIN IMPORT — LinkedIn profile JSON -> structured resume
# ---------------------------------------------------------------------------

def map_linkedin_profile(profile_json: dict) -> dict:
    """
    LinkedIn's own API already returns structured data (positions, education,
    skills), so this is mostly a field-mapping + summary-generation step
    rather than a full extraction — much cheaper/faster than upload parsing.
    """
    prompt = (
        "Given this LinkedIn profile JSON, map it into the resume schema below "
        "and write a 3-sentence professional_summary from the headline + about "
        "section.\n" + RESUME_EXTRACTION_SCHEMA_PROMPT
    )
    return _call_json(prompt, json.dumps(profile_json), max_tokens=3000)


# ---------------------------------------------------------------------------
# 4. START FROM SCRATCH — guided AI suggestions
# ---------------------------------------------------------------------------

def suggest_bullet_points(role: str, company: str, rough_notes: str) -> list[str]:
    """Used inline in the builder UI as the user types ('AI guided')."""
    system = (
        "You write resume bullet points. Given a role, company, and the "
        "user's rough notes about what they did, return a JSON array of "
        "3-5 strong bullet points as strings, each starting with an action "
        "verb, quantified where the notes support a number. Do not invent "
        "metrics that aren't implied by the notes."
    )
    result = _call_json(system, json.dumps({"role": role, "company": company, "notes": rough_notes}), max_tokens=500)
    return result if isinstance(result, list) else result.get("bullet_points", [])


# ---------------------------------------------------------------------------
# 5. JOB TAILORING + ATS SCORING
# ---------------------------------------------------------------------------

@dataclass
class TailoringResult:
    match_score_before: int
    match_score_after: int
    matched_keywords: list[str]
    missing_keywords: list[str]
    job_title_guess: str
    company_guess: str
    tailored_resume: dict  # same schema as extraction


TAILORING_PROMPT = """
You are an ATS-matching and resume-tailoring engine. You will receive:
1) a candidate's current resume (JSON)
2) a target job description (plain text)

Return JSON:
{
  "job_title_guess": string,
  "company_guess": string,
  "match_score_before": integer 0-100,   // how well the ORIGINAL resume matches the JD
  "matched_keywords": [string],          // skills/keywords already present in the resume
  "missing_keywords": [string],          // important JD keywords absent from the resume
  "tailored_resume": { ...same schema as the input resume... },
  "match_score_after": integer 0-100     // estimated score of the tailored_resume vs the JD
}
Tailoring rules:
- Reorder and reword existing bullet points/skills to surface JD-relevant experience first.
- You may incorporate a missing keyword ONLY if the candidate's existing experience genuinely
  supports it — never fabricate skills, tools, or experience the candidate doesn't have.
- Keep the professional_summary aligned to the JD's role title and top 3 requirements.
"""


def tailor_resume_to_job(resume_json: dict, job_description: str) -> TailoringResult:
    payload = json.dumps({"resume": resume_json, "job_description": job_description})
    data = _call_json(TAILORING_PROMPT, payload, max_tokens=3500)
    return TailoringResult(
        match_score_before=data["match_score_before"],
        match_score_after=data["match_score_after"],
        matched_keywords=data["matched_keywords"],
        missing_keywords=data["missing_keywords"],
        job_title_guess=data.get("job_title_guess", ""),
        company_guess=data.get("company_guess", ""),
        tailored_resume=data["tailored_resume"],
    )
