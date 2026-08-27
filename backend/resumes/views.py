"""
API views. Heavy AI work (parsing, tailoring, voice structuring) is
dispatched to Celery tasks so the HTTP request returns immediately with a
`status: processing` resume; the frontend polls GET /resumes/{id}/ or
listens on a websocket/SSE channel until status flips to "ready".
"""
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Resume, JobTailoringRequest, VoiceSession, LinkedInImport
from .serializers import (
    ResumeSerializer, ResumeUploadSerializer, JobTailoringRequestSerializer,
    VoiceSessionSerializer, LinkedInImportSerializer,
)
from . import tasks  # Celery tasks, see tasks.py


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

        resume = Resume.objects.create(user=request.user, source="upload", status="processing",
                                        title=uploaded_file.name.rsplit(".", 1)[0])

        # Save file to object storage (S3) first, then hand off to Celery —
        # never do slow parsing/AI calls synchronously in a web request.
        storage_key = tasks.save_uploaded_file(uploaded_file, resume.id)
        tasks.process_uploaded_resume.delay(resume.id, storage_key)

        return Response(ResumeSerializer(resume).data, status=status.HTTP_202_ACCEPTED)

    # ---- Build Path 2: Import LinkedIn ----
    @action(detail=False, methods=["post"], url_path="import-linkedin")
    def import_linkedin(self, request):
        # `code` = OAuth authorization code returned by LinkedIn's consent screen
        oauth_code = request.data.get("code")
        if not oauth_code:
            return Response({"detail": "Missing LinkedIn OAuth code."}, status=400)

        li_import = LinkedInImport.objects.create(user=request.user, status="pending")
        tasks.process_linkedin_import.delay(li_import.id, oauth_code)
        return Response(LinkedInImportSerializer(li_import).data, status=status.HTTP_202_ACCEPTED)

    # ---- Build Path 3: Voice AI ----
    @action(detail=False, methods=["post"], url_path="voice/start")
    def voice_start(self, request):
        session = VoiceSession.objects.create(user=request.user, status="recording")
        return Response(VoiceSessionSerializer(session).data, status=201)

    @action(detail=False, methods=["post"], url_path="voice/(?P<session_id>[^/.]+)/finish")
    def voice_finish(self, request, session_id=None):
        session = get_object_or_404(VoiceSession, id=session_id, user=request.user)
        audio_file = request.data.get("audio")
        storage_key = tasks.save_audio_file(audio_file, session.id)
        session.audio_storage_key = storage_key
        session.status = "transcribing"
        session.save(update_fields=["audio_storage_key", "status"])
        tasks.process_voice_session.delay(session.id)
        return Response(VoiceSessionSerializer(session).data, status=202)

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
        # Synchronous here because tailoring is a single fast LLM call (~2-5s)
        # and the UI ("Analyze Job") expects an immediate score back.
        tasks.run_job_tailoring(tailoring_request.id)
        tailoring_request.refresh_from_db()
        return Response(JobTailoringRequestSerializer(tailoring_request).data, status=201)
