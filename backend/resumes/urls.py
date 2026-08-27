from rest_framework.routers import DefaultRouter
from .views import ResumeViewSet, JobTailoringViewSet

router = DefaultRouter()
router.register("resumes", ResumeViewSet, basename="resume")
router.register("tailoring", JobTailoringViewSet, basename="tailoring")

urlpatterns = router.urls

# Resulting endpoints (prefixed with /api/ in core/urls.py):
#   GET/POST         /api/resumes/                     list / create (scratch)
#   GET/PATCH/DELETE  /api/resumes/{id}/                 retrieve / edit / delete
#   POST              /api/resumes/upload/               Build Path 1
#   POST              /api/resumes/import-linkedin/       Build Path 2
#   POST              /api/resumes/voice/start/           Build Path 3 (a)
#   POST              /api/resumes/voice/{id}/finish/     Build Path 3 (b)
#   POST              /api/resumes/suggest-bullets/       Build Path 4 helper
#   POST              /api/tailoring/                     paste-JD -> tailored resume + score
#   GET               /api/tailoring/                     tailoring history
