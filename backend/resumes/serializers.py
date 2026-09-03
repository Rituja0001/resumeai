from rest_framework import serializers
from .models import (
    Resume, WorkExperience, Education, SkillEntry, Project,
    JobTailoringRequest, VoiceSession, LinkedInImport, Feedback,
)


class WorkExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkExperience
        fields = ["id", "company", "role", "location", "start_date", "end_date",
                  "is_current", "bullet_points", "order"]


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ["id", "institution", "degree", "field_of_study",
                  "start_date", "end_date", "grade", "order"]


class SkillEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillEntry
        fields = ["id", "name", "category", "proficiency"]


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ["id", "name", "description", "tech_stack", "link", "order"]


class ResumeSerializer(serializers.ModelSerializer):
    experiences = WorkExperienceSerializer(many=True, read_only=True)
    education = EducationSerializer(many=True, read_only=True)
    skills = SkillEntrySerializer(many=True, read_only=True)
    projects = ProjectSerializer(many=True, read_only=True)

    class Meta:
        model = Resume
        fields = [
            "id", "title", "source", "status", "professional_summary",
            "template_key", "base_resume", "created_at", "updated_at",
            "experiences", "education", "skills", "projects",
            "raw_ai_extraction",
        ]
        read_only_fields = ["status", "created_at", "updated_at"]


class ResumeUploadSerializer(serializers.Serializer):
    """Used by /resumes/upload/ — accepts a PDF/DOCX/image file."""
    file = serializers.FileField()

    def validate_file(self, value):
        allowed = ["application/pdf",
                   "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                   "image/png", "image/jpeg"]
        if value.content_type not in allowed:
            raise serializers.ValidationError("Only PDF, DOCX, PNG or JPG files are supported.")
        if value.size > 10 * 1024 * 1024:
            raise serializers.ValidationError("File too large (max 10MB).")
        return value


class JobTailoringRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobTailoringRequest
        fields = [
            "id", "source_resume", "result_resume", "job_description",
            "job_title_guess", "company_guess", "match_score_before",
            "match_score_after", "matched_keywords", "missing_keywords",
            "created_at",
        ]
        read_only_fields = [
            "result_resume", "job_title_guess", "company_guess",
            "match_score_before", "match_score_after",
            "matched_keywords", "missing_keywords", "created_at",
        ]


class VoiceSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoiceSession
        fields = ["id", "resume", "status", "transcript", "created_at"]
        read_only_fields = ["status", "transcript", "resume", "created_at"]


class LinkedInImportSerializer(serializers.ModelSerializer):
    class Meta:
        model = LinkedInImport
        fields = ["id", "resume", "status", "created_at"]
        read_only_fields = fields


class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ["id", "user", "message", "rating", "created_at"]
        read_only_fields = ["id", "user", "created_at"]
