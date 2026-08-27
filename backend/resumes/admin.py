from django.contrib import admin
from .models import (
    Resume, WorkExperience, Education, SkillEntry, Project,
    JobTailoringRequest, VoiceSession, LinkedInImport,
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


admin.site.register(Project)
