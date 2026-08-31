import re
from django.conf import settings
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework import status, permissions, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

from .models import User
from .serializers import RegisterSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Custom JWT serializer returning basic user data along with tokens."""
    def validate(self, attrs):
        data = super().validate(attrs)
        data["user"] = {
            "id": self.user.id,
            "email": self.user.email,
            "username": self.user.username,
            "first_name": self.user.first_name,
            "last_name": self.user.last_name,
        }
        return data


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    """POST /api/auth/register/ { email, username, password } -> creates user and returns tokens."""
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "username": user.username,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                },
            },
            status=status.HTTP_201_CREATED,
        )


class GoogleAuthView(APIView):
    """
    POST /api/auth/google/ { "credential": "..." }
    Verifies Google ID token, logs in or registers user, and issues JWT tokens.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        credential = request.data.get("credential")
        if not credential:
            return Response(
                {"detail": "Google credential token is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        google_client_id = getattr(settings, "GOOGLE_CLIENT_ID", "")
        audience = google_client_id if google_client_id else None

        try:
            # Verify the ID token with Google's public keys
            id_info = id_token.verify_oauth2_token(
                credential,
                google_requests.Request(),
                audience=audience,
            )
        except ValueError as e:
            return Response(
                {"detail": f"Invalid Google credential: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                {"detail": f"Google verification error: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        email = id_info.get("email")
        if not email:
            return Response(
                {"detail": "Google account did not return a valid email address."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        name = id_info.get("name", "")
        picture = id_info.get("picture", "")

        # Find or create user
        user = User.objects.filter(email__iexact=email).first()
        if not user:
            # Generate unique username from email prefix or name
            base_username = re.sub(r"[^a-zA-Z0-9_]", "", email.split("@")[0]) or "user"
            username = base_username
            counter = 1
            while User.objects.filter(username=username).exists():
                username = f"{base_username}_{counter}"
                counter += 1

            user = User.objects.create_user(
                email=email,
                username=username,
                first_name=id_info.get("given_name", ""),
                last_name=id_info.get("family_name", ""),
            )
            user.set_unusable_password()
            user.save()

        # Issue JWT tokens
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "username": user.username,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "picture": picture,
                    "name": name or user.username,
                },
            },
            status=status.HTTP_200_OK,
        )


class MeView(APIView):
    """
    GET /api/auth/me/ -> Returns authenticated user info.
    PATCH /api/auth/me/ -> Updates first_name, last_name, username.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response(
            {
                "id": user.id,
                "email": user.email,
                "username": user.username,
                "first_name": user.first_name,
                "last_name": user.last_name,
            }
        )

    def patch(self, request):
        user = request.user
        data = request.data

        new_username = data.get("username", "").strip()
        if new_username and new_username != user.username:
            if User.objects.filter(username=new_username).exclude(id=user.id).exists():
                return Response(
                    {"detail": "This username is already taken. Please choose another."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            user.username = new_username

        if "first_name" in data:
            user.first_name = data["first_name"].strip()
        if "last_name" in data:
            user.last_name = data["last_name"].strip()

        user.save()

        return Response(
            {
                "id": user.id,
                "email": user.email,
                "username": user.username,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "detail": "Profile updated successfully.",
            }
        )


class ChangePasswordView(APIView):
    """
    POST /api/auth/change-password/
    { "current_password": "...", "new_password": "..." }
    Validates current password and updates to new password.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        current_password = request.data.get("current_password", "")
        new_password = request.data.get("new_password", "")

        if not new_password:
            return Response(
                {"detail": "New password is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # If user has a usable password, check current password
        if user.has_usable_password():
            if not current_password:
                return Response(
                    {"detail": "Current password is required."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            if not user.check_password(current_password):
                return Response(
                    {"detail": "Current password is incorrect."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        try:
            validate_password(new_password, user=user)
        except ValidationError as e:
            return Response(
                {"detail": e.messages[0] if e.messages else "Password validation error."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.set_password(new_password)
        user.save()

        return Response({"detail": "Password changed successfully."})
