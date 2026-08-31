from django.contrib import admin
from .models import (
    Resume, WorkExperience, Education, SkillEntry, Project,
    JobTailoringRequest, VoiceSession, LinkedInImport, Feedback,
)


class WorkExperienceInline(admin.TabularInline):
    model = WorkExperience
    extra = 0


class EducationInline(admin.TabularInline):
    model = Education
    extra = 0


class SkillEntryInline(admin.TabularInline):
    model = SkillEntry
    extra = 0


@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ("title", "user", "source", "status", "updated_at")
    list_filter = ("source", "status")
    search_fields = ("title", "user__email")
    inlines = [WorkExperienceInline, EducationInline, SkillEntryInline]


@admin.register(JobTailoringRequest)
class JobTailoringRequestAdmin(admin.ModelAdmin):
    list_display = ("user", "job_title_guess", "match_score_before", "match_score_after", "created_at")


@admin.register(VoiceSession)
class VoiceSessionAdmin(admin.ModelAdmin):
    list_display = ("user", "status", "created_at")


@admin.register(LinkedInImport)
class LinkedInImportAdmin(admin.ModelAdmin):
    list_display = ("user", "status", "created_at")


@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ("user", "rating", "message_preview", "created_at")
    list_filter = ("rating", "created_at")
    search_fields = ("user__email", "user__username", "message")

    def message_preview(self, obj):
        return obj.message[:60] + ("..." if len(obj.message) > 60 else "")


admin.site.register(Project)
