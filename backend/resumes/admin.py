from django.contrib import admin
from .models import (
    Resume,
    WorkExperience,
    Education,
    SkillEntry,
    Project,
    JobTailoringRequest,
    VoiceSession,
    LinkedInImport,
    Feedback,
)


class WorkExperienceInline(admin.TabularInline):
    model = WorkExperience
    extra = 0
    fields = ("company", "role", "start_date", "end_date", "is_current", "location")


class EducationInline(admin.TabularInline):
    model = Education
    extra = 0
    fields = ("institution", "degree", "field_of_study", "start_date", "end_date", "grade")


class SkillEntryInline(admin.TabularInline):
    model = SkillEntry
    extra = 0
    fields = ("name", "category", "proficiency")


class ProjectInline(admin.TabularInline):
    model = Project
    extra = 0
    fields = ("name", "description", "link")


@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "user",
        "template_key",
        "source",
        "status",
        "created_at",
        "updated_at",
    )
    list_filter = ("status", "template_key", "source", "created_at", "updated_at")
    search_fields = ("title", "user__email", "user__username", "template_key")
    readonly_fields = ("id", "created_at", "updated_at")
    ordering = ("-updated_at",)
    inlines = [WorkExperienceInline, EducationInline, SkillEntryInline, ProjectInline]

    fieldsets = (
        (
            "Resume Details",
            {
                "fields": (
                    "id",
                    "user",
                    "title",
                    "template_key",
                    "status",
                    "source",
                    "current_step",
                    "professional_summary",
                )
            },
        ),
        (
            "Raw Payload / AI Storage",
            {
                "classes": ("collapse",),
                "fields": ("raw_ai_extraction",),
            },
        ),
        (
            "Timestamps",
            {
                "fields": ("created_at", "updated_at"),
            },
        ),
    )


@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ("user", "rating_stars", "message_preview", "created_at")
    list_filter = ("rating", "created_at")
    search_fields = ("user__email", "user__username", "message")
    readonly_fields = ("id", "created_at", "updated_at")
    ordering = ("-created_at",)

    def rating_stars(self, obj):
        if obj.rating:
            return f"{obj.rating} ★"
        return "No rating"

    rating_stars.short_description = "Rating"

    def message_preview(self, obj):
        if not obj.message:
            return ""
        return obj.message[:75] + ("..." if len(obj.message) > 75 else "")

    message_preview.short_description = "Feedback Comment"


@admin.register(JobTailoringRequest)
class JobTailoringRequestAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "job_title_guess",
        "company_guess",
        "match_score_before",
        "match_score_after",
        "created_at",
    )
    list_filter = ("created_at",)
    search_fields = ("user__email", "job_title_guess", "company_guess")
    readonly_fields = ("id", "created_at", "updated_at")
    ordering = ("-created_at",)


@admin.register(VoiceSession)
class VoiceSessionAdmin(admin.ModelAdmin):
    list_display = ("user", "status", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("user__email", "user__username")
    readonly_fields = ("id", "created_at", "updated_at")
    ordering = ("-created_at",)


@admin.register(LinkedInImport)
class LinkedInImportAdmin(admin.ModelAdmin):
    list_display = ("user", "status", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("user__email", "user__username")
    readonly_fields = ("id", "created_at", "updated_at")
    ordering = ("-created_at",)
