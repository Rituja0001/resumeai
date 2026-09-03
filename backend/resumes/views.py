"""
API views. Heavy AI work (parsing, tailoring, voice structuring) is executed
synchronously within the request/response cycle, returning a `status: ready`
resume directly without requiring Celery or Redis background workers.
"""
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Resume, JobTailoringRequest, VoiceSession, LinkedInImport, Feedback
from .serializers import (
    ResumeSerializer, ResumeUploadSerializer, JobTailoringRequestSerializer,
    VoiceSessionSerializer, LinkedInImportSerializer, FeedbackSerializer,
)
from . import tasks


class ResumeViewSet(viewsets.ModelViewSet):
    serializer_class = ResumeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Resume.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, source="scratch")

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
        from django.http import HttpResponse
        from .pdf_services import generate_resume_pdf

        data = request.data or {}
        pdf_bytes = generate_resume_pdf(data)
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
