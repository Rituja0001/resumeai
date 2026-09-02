"""
Synchronous processing tasks: file parsing, AI calls, and resume structuring
run directly within the request/response cycle without requiring Celery/Redis.
"""
import logging

from .models import Resume, WorkExperience, Education, SkillEntry, Project, VoiceSession, LinkedInImport
from . import ai_services

logger = logging.getLogger("resumeai.tasks")


# ---------------------------------------------------------------------------
# File / audio storage helpers (thin wrappers over boto3 / django-storages)
# ---------------------------------------------------------------------------

def save_uploaded_file(file_obj, resume_id) -> str:
    from django.core.files.storage import default_storage
    key = f"uploads/resumes/{resume_id}/{file_obj.name}"
    default_storage.save(key, file_obj)
    return key


def save_audio_file(file_obj, session_id) -> str:
    from django.core.files.storage import default_storage
    key = f"uploads/voice/{session_id}/audio.webm"
    default_storage.save(key, file_obj)
    return key


def _extract_text_from_file(storage_key: str) -> str:
    """
    Text-extraction step BEFORE the AI call — keeps LLM prompts cheap and
    accurate instead of sending raw binary/base64.
    - .pdf  -> pdfplumber (falls back to AWS Textract OCR if the PDF is a
               scanned image with no text layer)
    - .docx -> python-docx
    - .png/.jpg -> OCR via Textract / Google Vision
    """
    from django.core.files.storage import default_storage
    import pdfplumber
    import docx

    local_path = default_storage.path(storage_key) if hasattr(default_storage, "path") else None
    ext = storage_key.rsplit(".", 1)[-1].lower()

    if ext == "pdf":
        text_parts = []
        with default_storage.open(storage_key, "rb") as f:
            with pdfplumber.open(f) as pdf:
                for page in pdf.pages:
                    text_parts.append(page.extract_text() or "")
        text = "\n".join(text_parts).strip()
        if not text:
            text = _ocr_fallback(storage_key)
        return text
    elif ext == "docx":
        with default_storage.open(storage_key, "rb") as f:
            document = docx.Document(f)
        return "\n".join(p.text for p in document.paragraphs)
    else:  # image
        return _ocr_fallback(storage_key)


def _ocr_fallback(storage_key: str) -> str:
    # e.g. AWS Textract DetectDocumentText — kept as a separate function so
    # it's the one place to swap OCR providers.
    raise NotImplementedError("Wire up Textract/Vision OCR client here")


def _write_resume_sections(resume: Resume, data: dict):
    """Shared helper: takes AI extraction JSON and writes it into the
    normalized child tables (used by upload, voice, LinkedIn, tailoring)."""
    resume.professional_summary = data.get("professional_summary", "")
    resume.raw_ai_extraction = data
    resume.status = "ready"
    resume.save()

    resume.experiences.all().delete()
    for i, exp in enumerate(data.get("experiences", [])):
        WorkExperience.objects.create(
            resume=resume, order=i,
            company=exp.get("company", ""), role=exp.get("role", ""),
            location=exp.get("location", ""),
            start_date=exp.get("start_date") or None,
            end_date=exp.get("end_date") or None,
            is_current=exp.get("is_current", False),
            bullet_points=exp.get("bullet_points", []),
        )

    resume.education.all().delete()
    for i, edu in enumerate(data.get("education", [])):
        Education.objects.create(
            resume=resume, order=i,
            institution=edu.get("institution", ""), degree=edu.get("degree", ""),
            field_of_study=edu.get("field_of_study", ""),
            start_date=edu.get("start_date") or None, end_date=edu.get("end_date") or None,
            grade=edu.get("grade", ""),
        )

    resume.skills.all().delete()
    for skill in data.get("skills", []):
        SkillEntry.objects.create(resume=resume, name=skill.get("name", ""),
                                   category=skill.get("category", "technical"))

    resume.projects.all().delete()
    for i, proj in enumerate(data.get("projects", [])):
        Project.objects.create(
            resume=resume, order=i, name=proj.get("name", ""),
            description=proj.get("description", ""),
            tech_stack=proj.get("tech_stack", []), link=proj.get("link", ""),
        )


# ---------------------------------------------------------------------------
# Upload Resume pipeline (Synchronous)
# ---------------------------------------------------------------------------

def process_uploaded_resume(resume_id, storage_key):
    resume = Resume.objects.get(id=resume_id)
    try:
        raw_text = _extract_text_from_file(storage_key)
        data = ai_services.extract_resume_from_text(raw_text)
        _write_resume_sections(resume, data)
    except Exception as exc:
        logger.exception("Upload processing failed for resume %s", resume_id)
        resume.status = "failed"
        resume.save(update_fields=["status"])
        raise exc


# ---------------------------------------------------------------------------
# Voice AI pipeline (Synchronous)
# ---------------------------------------------------------------------------

def process_voice_session(session_id):
    session = VoiceSession.objects.get(id=session_id)
    try:
        # 1. Speech-to-text (e.g. AWS Transcribe / Whisper API)
        transcript = _transcribe_audio(session.audio_storage_key)
        session.transcript = transcript
        session.status = "structuring"
        session.save(update_fields=["transcript", "status"])

        # 2. Structure the transcript into a resume via the AI layer
        data = ai_services.structure_resume_from_transcript(transcript)

        resume = Resume.objects.create(user=session.user, source="voice", status="ready",
                                        title="Resume from Voice AI")
        _write_resume_sections(resume, data)

        session.resume = resume
        session.status = "complete"
        session.save(update_fields=["resume", "status"])
    except Exception as exc:
        logger.exception("Voice processing failed for session %s", session_id)
        session.status = "failed"
        session.save(update_fields=["status"])
        raise exc


def _transcribe_audio(storage_key: str) -> str:
    # Wire up AWS Transcribe / OpenAI Whisper here. Kept isolated so the
    # provider can be swapped without touching task orchestration logic.
    raise NotImplementedError("Wire up speech-to-text provider here")


# ---------------------------------------------------------------------------
# LinkedIn import pipeline (Synchronous)
# ---------------------------------------------------------------------------

def process_linkedin_import(import_id, oauth_code):
    li_import = LinkedInImport.objects.get(id=import_id)
    try:
        access_token = _exchange_linkedin_code(oauth_code)
        profile = _fetch_linkedin_profile(access_token)
        li_import.raw_profile_snapshot = profile
        li_import.linkedin_profile_urn = profile.get("id", "")
        li_import.save(update_fields=["raw_profile_snapshot", "linkedin_profile_urn"])

        data = ai_services.map_linkedin_profile(profile)
        resume = Resume.objects.create(user=li_import.user, source="linkedin", status="ready",
                                        title="Resume from LinkedIn")
        _write_resume_sections(resume, data)

        li_import.resume = resume
        li_import.status = "complete"
        li_import.save(update_fields=["resume", "status"])
    except Exception as exc:
        logger.exception("LinkedIn import failed for %s", import_id)
        li_import.status = "failed"
        li_import.save(update_fields=["status"])
        raise exc


def _exchange_linkedin_code(code: str) -> str:
    # POST to https://www.linkedin.com/oauth/v2/accessToken with
    # client_id/client_secret/redirect_uri — returns an access_token.
    raise NotImplementedError("Wire up LinkedIn OAuth token exchange here")


def _fetch_linkedin_profile(access_token: str) -> dict:
    # GET LinkedIn's Profile API (positions, education, skills) using the
    # access token as a Bearer header.
    raise NotImplementedError("Wire up LinkedIn Profile API call here")


# ---------------------------------------------------------------------------
# Job tailoring / ATS scoring (Synchronous)
# ---------------------------------------------------------------------------

def run_job_tailoring(tailoring_request_id):
    from .models import JobTailoringRequest
    tr = JobTailoringRequest.objects.select_related("source_resume").get(id=tailoring_request_id)
    resume_json = tr.source_resume.raw_ai_extraction or ResumeExportHelper(tr.source_resume).to_json()

    result = ai_services.tailor_resume_to_job(resume_json, tr.job_description)

    tailored = Resume.objects.create(
        user=tr.user, source="tailored", status="ready",
        base_resume=tr.source_resume, title=f"Tailored — {result.job_title_guess or 'Untitled Role'}",
    )
    _write_resume_sections(tailored, result.tailored_resume)

    tr.result_resume = tailored
    tr.match_score_before = result.match_score_before
    tr.match_score_after = result.match_score_after
    tr.matched_keywords = result.matched_keywords
    tr.missing_keywords = result.missing_keywords
    tr.job_title_guess = result.job_title_guess
    tr.company_guess = result.company_guess
    tr.save()


class ResumeExportHelper:
    """Serializes a Resume + its child tables back into the same JSON shape
    the AI layer expects, for resumes that predate raw_ai_extraction being
    populated (e.g. hand-built 'Start from Scratch' resumes)."""
    def __init__(self, resume: Resume):
        self.resume = resume

    def to_json(self) -> dict:
        r = self.resume
        return {
            "professional_summary": r.professional_summary,
            "experiences": [
                {"company": e.company, "role": e.role, "start_date": str(e.start_date),
                 "end_date": str(e.end_date) if e.end_date else None,
                 "is_current": e.is_current, "bullet_points": e.bullet_points}
                for e in r.experiences.all()
            ],
            "education": [
                {"institution": e.institution, "degree": e.degree,
                 "field_of_study": e.field_of_study, "grade": e.grade}
                for e in r.education.all()
            ],
            "skills": [{"name": s.name, "category": s.category} for s in r.skills.all()],
            "projects": [{"name": p.name, "description": p.description,
                          "tech_stack": p.tech_stack, "link": p.link} for p in r.projects.all()],
        }
