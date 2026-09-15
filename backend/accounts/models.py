from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """Email is the login field; username kept for admin/display only."""
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=30, blank=True, default="")
    signup_source = models.CharField(
        max_length=20,
        default="email",
        choices=[
            ("email", "Email/Password"),
            ("google", "Google OAuth"),
            ("linkedin", "LinkedIn"),
            ("other", "Other"),
        ],
    )
    linkedin_access_token = models.TextField(blank=True)  # encrypted at rest via field-level encryption in prod

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
