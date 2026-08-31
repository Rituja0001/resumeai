"""
ResumeAI — core data models
Django 5.x / PostgreSQL

Design notes:
- One `Resume` can have many versions (base resume + N tailored copies for
  specific job applications). Tailored copies point back to `base_resume`
  and store the job description + match score, so the user's original
  content is never overwritten.
- Structured sections (experience, education, skills, projects) are
  separate tables (not JSON blobs) so the AI layer and the PDF renderer
  can both query/update them predictably and so ATS keyword-matching can
  run field by field.
"""
from django.conf import settings
from django.db import models
import uuid


class TimeStampedModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Resume(TimeStampedModel):
    SOURCE_CHOICES = [
        ("upload", "Uploaded File (PDF/DOCX)"),
        ("linkedin", "LinkedIn Import"),
        ("voice", "Voice AI"),
        ("scratch", "Built from Scratch"),
        ("tailored", "Tailored Copy of Another Resume"),
    ]
    STATUS_CHOICES = [
        ("draft", "Draft"),
        ("processing", "AI Processing"),
        ("ready", "Ready"),
        ("failed", "Failed"),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="resumes")
    title = models.CharField(max_length=150, default="Untitled Resume")
    source = models.CharField(max_length=20, choices=SOURCE_CHOICES, default="scratch")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="draft")

    # Free-text summary block, AI-generated or user-edited
    professional_summary = models.TextField(blank=True)

    # Raw AI output kept for auditability / re-processing without re-calling the model
    raw_ai_extraction = models.JSONField(null=True, blank=True)

    # For tailored copies
    base_resume = models.ForeignKey(
        "self", null=True, blank=True, on_delete=models.SET_NULL, related_name="tailored_versions"
    )

    template_key = models.CharField(max_length=50, default="minimal-01")

    class Meta:
        ordering = ["-updated_at"]

    def __str__(self):
        return f"{self.title} ({self.user_id})"


class WorkExperience(TimeStampedModel):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name="experiences")
    company = models.CharField(max_length=150)
    role = models.CharField(max_length=150)
    location = models.CharField(max_length=120, blank=True)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_current = models.BooleanField(default=False)
    # Each bullet stored separately so AI can rewrite/score bullets individually
    bullet_points = models.JSONField(default=list)  # list[str]
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "-start_date"]


class Education(TimeStampedModel):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name="education")
    institution = models.CharField(max_length=150)
    degree = models.CharField(max_length=150)
    field_of_study = models.CharField(max_length=150, blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    grade = models.CharField(max_length=50, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "-end_date"]


class SkillEntry(TimeStampedModel):
    CATEGORY_CHOICES = [
        ("technical", "Technical"),
        ("soft", "Soft Skill"),
        ("tool", "Tool / Software"),
        ("language", "Language"),
    ]
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name="skills")
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default="technical")
    # proficiency is optional — many ATS resumes skip it
    proficiency = models.PositiveSmallIntegerField(null=True, blank=True)  # 1-5


class Project(TimeStampedModel):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name="projects")
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    tech_stack = models.JSONField(default=list)
    link = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)


class JobTailoringRequest(TimeStampedModel):
    """
    Stores one 'paste a job description → get a tailored resume + match score'
    interaction. Kept separate from Resume so we retain history of every JD
    a user has tailored against, even across multiple resumes.
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="tailoring_requests")
    source_resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name="tailoring_requests")
    result_resume = models.ForeignKey(
        Resume, null=True, blank=True, on_delete=models.SET_NULL, related_name="+"
    )
    job_description = models.TextField()
    job_title_guess = models.CharField(max_length=150, blank=True)
    company_guess = models.CharField(max_length=150, blank=True)

    match_score_before = models.PositiveSmallIntegerField(null=True, blank=True)  # 0-100
    match_score_after = models.PositiveSmallIntegerField(null=True, blank=True)

    matched_keywords = models.JSONField(default=list)
    missing_keywords = models.JSONField(default=list)

    class Meta:
        ordering = ["-created_at"]


class VoiceSession(TimeStampedModel):
    """
    Tracks a Voice-AI resume-building session: raw audio → transcript →
    structured resume. Audio itself lives in object storage (S3/GCS);
    this row just tracks status + the storage key.
    """
    STATUS_CHOICES = [
        ("recording", "Recording"),
        ("transcribing", "Transcribing"),
        ("structuring", "AI Structuring"),
        ("complete", "Complete"),
        ("failed", "Failed"),
    ]
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="voice_sessions")
    resume = models.ForeignKey(Resume, null=True, blank=True, on_delete=models.SET_NULL, related_name="+")
    audio_storage_key = models.CharField(max_length=255, blank=True)
    transcript = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="recording")


class LinkedInImport(TimeStampedModel):
    """
    Tracks a LinkedIn → Resume import. We never store LinkedIn credentials;
    this holds the OAuth-derived profile snapshot and the resulting resume.
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="linkedin_imports")
    resume = models.ForeignKey(Resume, null=True, blank=True, on_delete=models.SET_NULL, related_name="+")
    linkedin_profile_urn = models.CharField(max_length=255, blank=True)
    raw_profile_snapshot = models.JSONField(null=True, blank=True)
    status = models.CharField(max_length=20, default="pending")


class Feedback(TimeStampedModel):
    """
    Stores user feedback messages and optional ratings (1-5 stars).
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="feedbacks")
    message = models.TextField()
    rating = models.PositiveSmallIntegerField(null=True, blank=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "User Feedback"
        verbose_name_plural = "User Feedbacks"

    def __str__(self):
        return f"Feedback from {self.user.email} ({self.rating}★)"
