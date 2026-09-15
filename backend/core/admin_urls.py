from django.urls import path
from .admin_api import (
    AdminLoginView,
    AdminDashboardStatsView,
    AdminUserListView,
    AdminUserDetailView,
    AdminResumeListView,
    AdminResumeDetailView,
    AdminDownloadListView,
    AdminDownloadDetailView,
    AdminFeedbackListView,
    AdminFeedbackDetailView,
)

urlpatterns = [
    path("login/", AdminLoginView.as_view(), name="admin_api_login"),
    path("dashboard-stats/", AdminDashboardStatsView.as_view(), name="admin_api_dashboard_stats"),
    path("users/", AdminUserListView.as_view(), name="admin_api_users_list"),
    path("users/<int:pk>/", AdminUserDetailView.as_view(), name="admin_api_users_detail"),
    path("resumes/", AdminResumeListView.as_view(), name="admin_api_resumes_list"),
    path("resumes/<uuid:pk>/", AdminResumeDetailView.as_view(), name="admin_api_resumes_detail"),
    path("downloads/", AdminDownloadListView.as_view(), name="admin_api_downloads_list"),
    path("downloads/<uuid:pk>/", AdminDownloadDetailView.as_view(), name="admin_api_downloads_detail"),
    path("feedback/", AdminFeedbackListView.as_view(), name="admin_api_feedback_list"),
    path("feedback/<uuid:pk>/", AdminFeedbackDetailView.as_view(), name="admin_api_feedback_detail"),
]
