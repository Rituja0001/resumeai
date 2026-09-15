from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/admin/", include("core.admin_urls")),
    path("api/", include("resumes.urls")),
    path("api/auth/", include("accounts.urls")),
]
