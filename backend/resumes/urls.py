from rest_framework.routers import DefaultRouter
from .views import ResumeViewSet, JobTailoringViewSet, FeedbackViewSet

router = DefaultRouter()
router.register("resumes", ResumeViewSet, basename="resume")
router.register("tailoring", JobTailoringViewSet, basename="tailoring")
router.register("feedback", FeedbackViewSet, basename="feedback")

urlpatterns = router.urls
