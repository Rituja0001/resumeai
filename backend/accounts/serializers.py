from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    phone = serializers.CharField(required=False, allow_blank=True, default="")

    class Meta:
        model = User
        fields = ["id", "email", "username", "password", "phone"]

    def create(self, validated_data):
        phone = validated_data.get("phone", "")
        return User.objects.create_user(
            email=validated_data["email"],
            username=validated_data["username"],
            password=validated_data["password"],
            phone=phone,
            signup_source="email",
        )
