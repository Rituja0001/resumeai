"""
API views. Heavy AI work (parsing, tailoring, voice structuring) is executed
synchronously within the request/response cycle, returning a `status: ready`
resume directly without requiring Celery or Redis background workers.
"""
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle
from django.shortcuts import get_object_or_404

from .models import Resume, JobTailoringRequest, VoiceSession, LinkedInImport, Feedback
from .serializers import (
    ResumeSerializer, ResumeUploadSerializer, JobTailoringRequestSerializer,
    VoiceSessionSerializer, LinkedInImportSerializer, FeedbackSerializer,
)
from . import tasks


class PDFExportAnonThrottle(AnonRateThrottle):
    scope = "pdf_export_anon"
    rate = "20/minute"


class PDFExportUserThrottle(UserRateThrottle):
    scope = "pdf_export_user"
    rate = "60/minute"


class ResumeViewSet(viewsets.ModelViewSet):
    serializer_class = ResumeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action in ["export_pdf_direct"]:
            return [permissions.AllowAny()]
        return super().get_permissions()

    def get_throttles(self):
        if self.action in ["export_pdf_direct", "export_pdf_detail"]:
            return [PDFExportAnonThrottle(), PDFExportUserThrottle()]
        return super().get_throttles()

    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return Resume.objects.none()
        return Resume.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        data = request.data
        title = data.get("title") or "Untitled Resume"
        template_key = data.get("templateId") or data.get("template_key") or "puffin"
        summary = data.get("professional_summary") or data.get("summary") or ""
        current_step = 1
        try:
            current_step = max(1, min(9, int(data.get("current_step") or data.get("activeStep") or 1)))
        except (ValueError, TypeError):
            pass

        resume = Resume.objects.create(
            user=request.user,
            title=title,
            source=data.get("source", "scratch"),
            status=data.get("status", "draft"),
            template_key=template_key,
            current_step=current_step,
            professional_summary=summary,
            raw_ai_extraction=data,
        )

        tasks._write_resume_sections(resume, data)
        return Response(ResumeSerializer(resume).data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        resume = self.get_object()
        data = request.data

        if "title" in data:
            resume.title = data.get("title") or resume.title
        if "templateId" in data or "template_key" in data:
            resume.template_key = data.get("templateId") or data.get("template_key") or resume.template_key
        if "professional_summary" in data or "summary" in data:
            resume.professional_summary = data.get("professional_summary") or data.get("summary") or ""
        if "current_step" in data or "activeStep" in data:
            try:
                resume.current_step = max(1, min(9, int(data.get("current_step") or data.get("activeStep") or resume.current_step)))
            except (ValueError, TypeError):
                pass
        if "status" in data:
            resume.status = data.get("status") or resume.status

        resume.raw_ai_extraction = data
        resume.save()

        tasks._write_resume_sections(resume, data)
        return Response(ResumeSerializer(resume).data)

    def partial_update(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    # ---- Build Path 1: Upload Resume ----
    @action(detail=False, methods=["post"], url_path="upload")
    def upload(self, request):
        serializer = ResumeUploadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        uploaded_file = serializer.validated_data["file"]

        resume = Resume.objects.create(
            user=request.user,
            source="upload",
            status="processing",
            title=uploaded_file.name.rsplit(".", 1)[0],
        )

        storage_key = tasks.save_uploaded_file(uploaded_file, resume.id)
        try:
            tasks.process_uploaded_resume(resume.id, storage_key)
            resume.refresh_from_db()
            return Response(ResumeSerializer(resume).data, status=status.HTTP_200_OK)
        except Exception as exc:
            resume.refresh_from_db()
            return Response(
                {"detail": f"Resume processing failed: {str(exc)}", "resume": ResumeSerializer(resume).data},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR if resume.status == "failed" else status.HTTP_400_BAD_REQUEST,
            )

    # ---- Build Path 2: Import LinkedIn ----
    @action(detail=False, methods=["post"], url_path="import-linkedin")
    def import_linkedin(self, request):
        # `code` = OAuth authorization code returned by LinkedIn's consent screen
        oauth_code = request.data.get("code")
        if not oauth_code:
            return Response({"detail": "Missing LinkedIn OAuth code."}, status=status.HTTP_400_BAD_REQUEST)

        li_import = LinkedInImport.objects.create(user=request.user, status="pending")
        try:
            tasks.process_linkedin_import(li_import.id, oauth_code)
            li_import.refresh_from_db()
            return Response(LinkedInImportSerializer(li_import).data, status=status.HTTP_200_OK)
        except Exception as exc:
            li_import.refresh_from_db()
            return Response(
                {"detail": f"LinkedIn import failed: {str(exc)}", "import": LinkedInImportSerializer(li_import).data},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    # ---- Build Path 3: Voice AI ----
    @action(detail=False, methods=["post"], url_path="voice/start")
    def voice_start(self, request):
        session = VoiceSession.objects.create(user=request.user, status="recording")
        return Response(VoiceSessionSerializer(session).data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=["post"], url_path="voice/(?P<session_id>[^/.]+)/finish")
    def voice_finish(self, request, session_id=None):
        session = get_object_or_404(VoiceSession, id=session_id, user=request.user)
        audio_file = request.data.get("audio")
        storage_key = tasks.save_audio_file(audio_file, session.id)
        session.audio_storage_key = storage_key
        session.status = "transcribing"
        session.save(update_fields=["audio_storage_key", "status"])
        try:
            tasks.process_voice_session(session.id)
            session.refresh_from_db()
            return Response(VoiceSessionSerializer(session).data, status=status.HTTP_200_OK)
        except Exception as exc:
            session.refresh_from_db()
            return Response(
                {"detail": f"Voice processing failed: {str(exc)}", "session": VoiceSessionSerializer(session).data},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    # ---- Build Path 4: Start from Scratch — handled by normal CRUD above
    # plus the /suggest-bullets/ helper endpoint (synchronous, fast, small prompt):
    @action(detail=False, methods=["post"], url_path="suggest-bullets")
    def suggest_bullets(self, request):
        from .ai_services import suggest_bullet_points
        bullets = suggest_bullet_points(
            role=request.data.get("role", ""),
            company=request.data.get("company", ""),
            rough_notes=request.data.get("notes", ""),
        )
        return Response({"bullet_points": bullets})

    # ---- PDF Export: /api/resumes/{id}/export-pdf/ or /api/resumes/export-pdf/ ----
    @action(detail=True, methods=["get", "post"], url_path="export-pdf")
    def export_pdf_detail(self, request, pk=None):
        import re
        from django.http import HttpResponse
        from .pdf_services import generate_resume_pdf

        resume = self.get_object()
        if request.method == "POST" and request.data:
            data = request.data
        else:
            data = ResumeSerializer(resume).data

        pdf_bytes = generate_resume_pdf(data)
        safe_title = re.sub(r'[^a-zA-Z0-9_-]', '_', data.get('title') or 'Resume').strip('_') or 'Resume'
        response = HttpResponse(pdf_bytes, content_type="application/pdf")
        response["Content-Disposition"] = f'attachment; filename="{safe_title}.pdf"'
        return response

    @action(detail=False, methods=["post"], url_path="export-pdf")
    def export_pdf_direct(self, request):
        import re
        import json
        from django.http import HttpResponse
        from rest_framework import status
        from .pdf_services import generate_resume_pdf

        data = request.data
        if not isinstance(data, dict):
            return Response(
                {"error": "Invalid payload format. Expected a JSON object."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # 1. Payload size limit (max 500 KB)
        try:
            raw_size = len(json.dumps(data))
            if raw_size > 500 * 1024:
                return Response(
                    {"error": "Payload exceeds maximum allowed size (500 KB)."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except (TypeError, ValueError):
            return Response(
                {"error": "Malformed JSON payload."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # 2. Section sanity limits to prevent CPU exhaustion
        experiences = data.get("experiences") or []
        education = data.get("education") or []
        skills = data.get("skills") or []
        additional = data.get("additionalSections") or data.get("additional_sections") or {}
        projects = additional.get("projects") or data.get("projects") or []

        if not isinstance(experiences, list) or len(experiences) > 50:
            return Response(
                {"error": "Invalid or excessive work experience entries (max 50)."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if not isinstance(education, list) or len(education) > 30:
            return Response(
                {"error": "Invalid or excessive education entries (max 30)."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if not isinstance(skills, list) or len(skills) > 200:
            return Response(
                {"error": "Invalid or excessive skills entries (max 200)."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if not isinstance(projects, list) or len(projects) > 50:
            return Response(
                {"error": "Invalid or excessive project entries (max 50)."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        summary = data.get("professional_summary") or data.get("summary") or ""
        if len(str(summary)) > 10000:
            return Response(
                {"error": "Summary length exceeds 10,000 characters limit."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            pdf_bytes = generate_resume_pdf(data)
        except Exception as e:
            return Response(
                {"error": f"PDF rendering error: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        safe_title = re.sub(r'[^a-zA-Z0-9_-]', '_', data.get('title') or 'Resume').strip('_') or 'Resume'
        response = HttpResponse(pdf_bytes, content_type="application/pdf")
        response["Content-Disposition"] = f'attachment; filename="{safe_title}.pdf"'
        return response


class JobTailoringViewSet(viewsets.ModelViewSet):
    serializer_class = JobTailoringRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return JobTailoringRequest.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        source_resume = get_object_or_404(
            Resume, id=request.data["source_resume"], user=request.user
        )
        tailoring_request = JobTailoringRequest.objects.create(
            user=request.user,
            source_resume=source_resume,
            job_description=serializer.validated_data["job_description"],
        )
        tasks.run_job_tailoring(tailoring_request.id)
        tailoring_request.refresh_from_db()
        return Response(JobTailoringRequestSerializer(tailoring_request).data, status=status.HTTP_201_CREATED)


class FeedbackViewSet(viewsets.ModelViewSet):
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Feedback.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
