from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """Email is the login field; username kept for admin/display only."""
    email = models.EmailField(unique=True)
    linkedin_access_token = models.TextField(blank=True)  # encrypted at rest via field-level encryption in prod

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
