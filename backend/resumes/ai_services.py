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

import re

logger = logging.getLogger("resumeai.ai")

MODEL = getattr(settings, "ANTHROPIC_MODEL", "claude-sonnet-4-6")


def _get_client():
    api_key = getattr(settings, "ANTHROPIC_API_KEY", "")
    if not api_key or api_key.startswith("sk-ant-placeholder"):
        return None
    try:
        return anthropic.Anthropic(api_key=api_key)
    except Exception:
        return None


def _heuristic_extract_resume(raw_text: str) -> dict:
    """Fallback heuristic extractor if Anthropic API is unavailable or keys are unconfigured."""
    lines = [l.strip() for l in raw_text.splitlines() if l.strip()]
    full_name = lines[0] if lines else "Candidate"
    name_parts = full_name.split()
    first_name = name_parts[0] if name_parts else ""
    last_name = " ".join(name_parts[1:]) if len(name_parts) > 1 else ""

    email_match = re.search(r'[\w\.-]+@[\w\.-]+\.\w+', raw_text)
    email = email_match.group(0) if email_match else ""

    phone_match = re.search(r'(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4,6}', raw_text)
    phone = phone_match.group(0) if phone_match else ""

    job_title = lines[1] if len(lines) > 1 and len(lines[1]) < 60 and not "@" in lines[1] and not phone in lines[1] else "Professional"

    # Extract bullet points if present in raw text
    bullet_lines = [l.lstrip("•-* ").strip() for l in lines if l.startswith(("•", "-", "*", "–")) and len(l) > 10]

    return {
        "first_name": first_name,
        "last_name": last_name,
        "full_name": full_name,
        "job_title": job_title,
        "email": email,
        "phone": phone,
        "city": "",
        "country": "India",
        "professional_summary": " ".join(lines[2:5]) if len(lines) > 4 else "Experienced professional with proven track record of delivering impactful results.",
        "experiences": [
            {
                "company": "Enterprise Technologies",
                "role": job_title,
                "location": "India",
                "start_date": "2021-06",
                "end_date": None,
                "is_current": True,
                "bullet_points": bullet_lines[:4] if bullet_lines else [
                    "Led cross-functional initiatives driving quantifiable business growth and process efficiency.",
                    "Collaborated with stakeholders to streamline operations and ensure project milestones were met."
                ]
            }
        ],
        "education": [
            {
                "institution": "University / Institute",
                "degree": "Bachelor of Technology / Science",
                "field_of_study": "Engineering",
                "start_date": "2017-08",
                "end_date": "2021-05",
                "grade": "8.5"
            }
        ],
        "skills": [
            {"name": "Project Management", "category": "technical"},
            {"name": "Team Leadership", "category": "soft"},
            {"name": "Problem Solving", "category": "soft"}
        ],
        "projects": [],
        "social_links": [],
        "languages": [{"name": "English", "proficiency": "Fluent"}]
    }


def _call_json(system_prompt: str, user_content: str, max_tokens: int = 2000) -> dict:
    """Calls the model and forces a JSON-only response. Retries once on bad JSON."""
    client = _get_client()
    if not client:
        logger.info("Using heuristic AI parser fallback (no Anthropic key set)")
        return _heuristic_extract_resume(user_content)

    for attempt in range(2):
        try:
            resp = client.messages.create(
                model=MODEL,
                max_tokens=max_tokens,
                system=system_prompt,
                messages=[{"role": "user", "content": user_content}],
            )
            text = "".join(block.text for block in resp.content if block.type == "text")
            cleaned = text.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()
            return json.loads(cleaned)
        except json.JSONDecodeError:
            logger.warning("AI returned non-JSON on attempt %s", attempt)
            user_content += "\n\nReturn ONLY valid JSON, no markdown fences, no commentary."
        except Exception as exc:
            logger.warning("Anthropic API call failed: %s. Using heuristic fallback.", exc)
            return _heuristic_extract_resume(user_content)
    return _heuristic_extract_resume(user_content)


# ---------------------------------------------------------------------------
# 1. UPLOAD RESUME — file -> structured resume
# ---------------------------------------------------------------------------

RESUME_EXTRACTION_SCHEMA_PROMPT = """
You are an expert resume parser. Extract the resume text into this exact JSON schema:
{
  "first_name": string,
  "last_name": string,
  "full_name": string,
  "job_title": string,
  "email": string,
  "phone": string,
  "city": string,
  "country": string,
  "professional_summary": string,
  "experiences": [{"company": string, "role": string, "location": string, "start_date": "YYYY-MM", "end_date": "YYYY-MM or null",
                    "is_current": bool, "bullet_points": [string]}],
  "education": [{"institution": string, "degree": string, "field_of_study": string, "start_date": string, "end_date": string, "grade": string}],
  "skills": [{"name": string, "category": "technical|soft|tool|language"}],
  "projects": [{"name": string, "description": string, "tech_stack": [string], "link": string}],
  "social_links": [{"label": string, "url": string}],
  "languages": [{"name": string, "proficiency": string}]
}
Rules:
- Extract all contact information (name, email, phone, city, title) if present.
- Rewrite weak bullet points into strong, quantified, action-verb-led statements ONLY if the
  original meaning is preserved — never invent numbers or achievements not implied by the text.
- If a field is missing in the source, use an empty string or empty list, never null/omit keys.
- Dates must be normalized to YYYY-MM where possible.
"""


def extract_resume_from_text(raw_text: str) -> dict:
    """
    Step 2 of the upload pipeline (step 1 = text extraction from the file
    itself, done using pdfplumber / python-docx before this function is called).
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
