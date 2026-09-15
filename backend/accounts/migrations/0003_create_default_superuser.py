import os
from django.db import migrations
from django.contrib.auth.hashers import make_password


def create_admin_superuser(apps, schema_editor):
    User = apps.get_model("accounts", "User")
    admin_email = os.environ.get("DJANGO_SUPERUSER_EMAIL", "admin@tatkalkaam.com").strip().lower()
    admin_password = os.environ.get("DJANGO_SUPERUSER_PASSWORD", "TatkalAdmin@2026!Secure").strip()
    admin_username = os.environ.get("DJANGO_SUPERUSER_USERNAME", "admin").strip()

    user = User.objects.filter(email__iexact=admin_email).first()
    if not user:
        if User.objects.filter(username__iexact=admin_username).exists():
            admin_username = f"admin_{admin_email.split('@')[0]}"

        User.objects.create(
            email=admin_email,
            username=admin_username,
            first_name="TatkalKaam",
            last_name="Administrator",
            password=make_password(admin_password),
            is_staff=True,
            is_superuser=True,
            is_active=True,
            signup_source="email",
        )
    else:
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.password = make_password(admin_password)
        user.save()


def remove_admin_superuser(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0002_user_phone_user_signup_source"),
    ]

    operations = [
        migrations.RunPython(create_admin_superuser, remove_admin_superuser),
    ]
