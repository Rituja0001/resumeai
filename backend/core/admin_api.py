from datetime import datetime, timedelta
from django.contrib.auth import authenticate, get_user_model
from django.db.models import Count, Avg, Q
from django.db.models.functions import TruncMonth, TruncDay, TruncHour
from django.utils import timezone
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from resumes.models import (
    Resume,
    Feedback,
    WorkExperience,
    Education,
    SkillEntry,
    Project,
    ResumeDownload,
)

User = get_user_model()


class IsAdminUserPermission(permissions.BasePermission):
    """Allows access only to authenticated admin users (is_staff or is_superuser)."""
    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and (request.user.is_staff or request.user.is_superuser)
        )


class AdminLoginView(APIView):
    """
    POST /api/admin/login/
    Validates is_staff or is_superuser, returns JWT tokens and admin user info.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username_or_email = request.data.get("email") or request.data.get("username", "")
        password = request.data.get("password", "")

        if not username_or_email or not password:
            return Response(
                {"detail": "Please provide both username/email and password."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = authenticate(request, username=username_or_email, password=password)
        if user is None:
            try:
                user_obj = User.objects.get(email__iexact=username_or_email)
                if user_obj.check_password(password):
                    user = user_obj
            except User.DoesNotExist:
                user = None

        if user is None:
            return Response(
                {"detail": "Invalid credentials provided."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if not (user.is_staff or user.is_superuser):
            return Response(
                {"detail": "Access denied. Administrator privileges required."},
                status=status.HTTP_403_FORBIDDEN,
            )

        if not user.is_active:
            return Response(
                {"detail": "User account is disabled."},
                status=status.HTTP_403_FORBIDDEN,
            )

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
                    "name": user.get_full_name() or user.username or user.email,
                    "is_superuser": user.is_superuser,
                    "is_staff": user.is_staff,
                },
            },
            status=status.HTTP_200_OK,
        )


class AdminDashboardStatsView(APIView):
    """
    GET /api/admin/dashboard-stats/?period=today|7d|30d|all|custom&start_date=YYYY-MM-DD&end_date=YYYY-MM-DD
    Returns aggregated numbers and trend data for charts.
    """
    permission_classes = [IsAdminUserPermission]

    def get(self, request):
        now = timezone.now()
        today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
        start_of_month = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)

        period = request.GET.get("period", "all").lower()
        start_date_param = request.GET.get("start_date", "").strip()
        end_date_param = request.GET.get("end_date", "").strip()

        start_dt = None
        end_dt = None

        if period == "custom" and start_date_param:
            try:
                parsed_start = datetime.strptime(start_date_param, "%Y-%m-%d")
                start_dt = timezone.make_aware(parsed_start.replace(hour=0, minute=0, second=0))
                if end_date_param:
                    parsed_end = datetime.strptime(end_date_param, "%Y-%m-%d")
                    end_dt = timezone.make_aware(parsed_end.replace(hour=23, minute=59, second=59))
                else:
                    end_dt = now

                period_label = f"{parsed_start.strftime('%b %d, %Y')} - {end_dt.strftime('%b %d, %Y')}"
            except Exception:
                period = "all"
                period_label = "All Time Aggregated"
        elif period == "today":
            start_dt = today_start
            end_dt = now
            period_label = "Today"
        elif period == "7d":
            start_dt = now - timedelta(days=7)
            end_dt = now
            period_label = "Last 7 Days"
        elif period == "30d":
            start_dt = now - timedelta(days=30)
            end_dt = now
            period_label = "Last 30 Days"
        else:
            period = "all"
            start_dt = None
            end_dt = None
            period_label = "All Time Aggregated"

        # Aggregated Metrics Filter Helper
        def filter_qs(qs, dt_field="created_at"):
            if start_dt:
                qs = qs.filter(**{f"{dt_field}__gte": start_dt})
            if end_dt:
                qs = qs.filter(**{f"{dt_field}__lte": end_dt})
            return qs

        total_users = filter_qs(User.objects.all(), "date_joined").count()
        total_resumes = filter_qs(Resume.objects.all(), "created_at").count()
        total_feedback = filter_qs(Feedback.objects.all(), "created_at").count()
        total_downloads = filter_qs(ResumeDownload.objects.all(), "created_at").count()

        fb_qs = filter_qs(Feedback.objects.all(), "created_at")
        avg_rating_val = fb_qs.aggregate(avg=Avg("rating"))["avg"] or 5.0
        avg_rating = round(float(avg_rating_val), 1)

        resumes_this_month = Resume.objects.filter(created_at__gte=start_of_month).count()
        downloads_this_month = ResumeDownload.objects.filter(created_at__gte=start_of_month).count()
        active_users = User.objects.filter(is_active=True).count()
        new_users_today = User.objects.filter(date_joined__gte=today_start).count()
        new_resumes_today = Resume.objects.filter(created_at__gte=today_start).count()
        downloads_today = ResumeDownload.objects.filter(created_at__gte=today_start).count()

        # Chart Trends Generation
        chart_data = []
        if period == "today":
            bucket_hours = [h for h in range(0, 24, 2)]
            user_hourly = {h: 0 for h in bucket_hours}
            resume_hourly = {h: 0 for h in bucket_hours}
            download_hourly = {h: 0 for h in bucket_hours}

            for item in (
                User.objects.filter(date_joined__gte=today_start)
                .annotate(h=TruncHour("date_joined"))
                .values("h")
                .annotate(count=Count("id"))
            ):
                if item["h"]:
                    h_val = (item["h"].hour // 2) * 2
                    user_hourly[h_val] = user_hourly.get(h_val, 0) + item["count"]

            for item in (
                Resume.objects.filter(created_at__gte=today_start)
                .annotate(h=TruncHour("created_at"))
                .values("h")
                .annotate(count=Count("id"))
            ):
                if item["h"]:
                    h_val = (item["h"].hour // 2) * 2
                    resume_hourly[h_val] = resume_hourly.get(h_val, 0) + item["count"]

            for item in (
                ResumeDownload.objects.filter(created_at__gte=today_start)
                .annotate(h=TruncHour("created_at"))
                .values("h")
                .annotate(count=Count("id"))
            ):
                if item["h"]:
                    h_val = (item["h"].hour // 2) * 2
                    download_hourly[h_val] = download_hourly.get(h_val, 0) + item["count"]

            for h in bucket_hours:
                chart_data.append({
                    "label": f"{h:02d}:00",
                    "users": user_hourly[h],
                    "resumes": resume_hourly[h],
                    "downloads": download_hourly[h],
                })

        elif period in ["7d", "30d", "custom"]:
            if period == "7d":
                num_days = 7
                start_point = today_start - timedelta(days=6)
            elif period == "30d":
                num_days = 30
                start_point = today_start - timedelta(days=29)
            else:  # custom
                days_diff = max(1, min(60, (end_dt.date() - start_dt.date()).days + 1))
                num_days = days_diff
                start_point = start_dt.replace(hour=0, minute=0, second=0)

            days_seq = [start_point + timedelta(days=i) for i in range(num_days)]
            user_daily = {d.strftime("%Y-%m-%d"): 0 for d in days_seq}
            resume_daily = {d.strftime("%Y-%m-%d"): 0 for d in days_seq}
            download_daily = {d.strftime("%Y-%m-%d"): 0 for d in days_seq}

            for item in (
                User.objects.filter(date_joined__gte=start_point, date_joined__lte=end_dt or now)
                .annotate(d=TruncDay("date_joined"))
                .values("d")
                .annotate(count=Count("id"))
            ):
                if item["d"]:
                    k = item["d"].strftime("%Y-%m-%d")
                    if k in user_daily:
                        user_daily[k] = item["count"]

            for item in (
                Resume.objects.filter(created_at__gte=start_point, created_at__lte=end_dt or now)
                .annotate(d=TruncDay("created_at"))
                .values("d")
                .annotate(count=Count("id"))
            ):
                if item["d"]:
                    k = item["d"].strftime("%Y-%m-%d")
                    if k in resume_daily:
                        resume_daily[k] = item["count"]

            for item in (
                ResumeDownload.objects.filter(created_at__gte=start_point, created_at__lte=end_dt or now)
                .annotate(d=TruncDay("created_at"))
                .values("d")
                .annotate(count=Count("id"))
            ):
                if item["d"]:
                    k = item["d"].strftime("%Y-%m-%d")
                    if k in download_daily:
                        download_daily[k] = item["count"]

            for d in days_seq:
                k = d.strftime("%Y-%m-%d")
                lbl = d.strftime("%a %d") if num_days <= 10 else d.strftime("%d %b")
                chart_data.append({
                    "label": lbl,
                    "users": user_daily[k],
                    "resumes": resume_daily[k],
                    "downloads": download_daily[k],
                })

        else:  # 'all' - 12 months sequence
            twelve_months_ago = (now.replace(day=1) - timedelta(days=365)).replace(day=1)
            user_map = {
                item["month"].strftime("%b %Y"): item["count"]
                for item in (
                    User.objects.filter(date_joined__gte=twelve_months_ago)
                    .annotate(month=TruncMonth("date_joined"))
                    .values("month")
                    .annotate(count=Count("id"))
                )
                if item["month"]
            }

            resume_map = {
                item["month"].strftime("%b %Y"): item["count"]
                for item in (
                    Resume.objects.filter(created_at__gte=twelve_months_ago)
                    .annotate(month=TruncMonth("created_at"))
                    .values("month")
                    .annotate(count=Count("id"))
                )
                if item["month"]
            }

            download_map = {
                item["month"].strftime("%b %Y"): item["count"]
                for item in (
                    ResumeDownload.objects.filter(created_at__gte=twelve_months_ago)
                    .annotate(month=TruncMonth("created_at"))
                    .values("month")
                    .annotate(count=Count("id"))
                )
                if item["month"]
            }

            cur_date = twelve_months_ago
            while cur_date <= now:
                m_label = cur_date.strftime("%b %Y")
                chart_data.append({
                    "label": m_label,
                    "users": user_map.get(m_label, 0),
                    "resumes": resume_map.get(m_label, 0),
                    "downloads": download_map.get(m_label, 0),
                })
                next_month = cur_date.month % 12 + 1
                next_year = cur_date.year + (1 if cur_date.month == 12 else 0)
                cur_date = cur_date.replace(year=next_year, month=next_month, day=1)

        # Recent activities
        recent_users = [
            {
                "id": u.id,
                "name": u.get_full_name() or u.username,
                "email": u.email,
                "joined": u.date_joined.strftime("%b %d, %Y"),
            }
            for u in User.objects.order_by("-date_joined")[:5]
        ]
        recent_feedback = [
            {
                "id": str(fb.id),
                "user_email": fb.user.email if fb.user else "Anonymous",
                "rating": fb.rating,
                "message": fb.message,
                "created_at": fb.created_at.strftime("%b %d, %Y"),
            }
            for fb in Feedback.objects.select_related("user").order_by("-created_at")[:5]
        ]

        return Response({
            "period": period,
            "period_label": period_label,
            "total_users": total_users,
            "total_resumes": total_resumes,
            "total_downloads": total_downloads,
            "resumes_this_month": resumes_this_month,
            "downloads_this_month": downloads_this_month,
            "downloads_today": downloads_today,
            "total_feedback": total_feedback,
            "active_users": active_users,
            "avg_rating": avg_rating,
            "new_users_today": new_users_today,
            "new_resumes_today": new_resumes_today,
            "charts": chart_data,
            "recent_users": recent_users,
            "recent_feedback": recent_feedback,
        })


class AdminUserListView(APIView):
    permission_classes = [IsAdminUserPermission]

    def get(self, request):
        qs = User.objects.annotate(resumes_count=Count("resumes")).order_by("-date_joined")
        search = request.GET.get("search", "").strip()
        if search:
            qs = qs.filter(
                Q(email__icontains=search)
                | Q(username__icontains=search)
                | Q(first_name__icontains=search)
                | Q(last_name__icontains=search)
                | Q(phone__icontains=search)
            )

        is_active = request.GET.get("is_active")
        if is_active in ["true", "True", "1"]:
            qs = qs.filter(is_active=True)
        elif is_active in ["false", "False", "0"]:
            qs = qs.filter(is_active=False)

        total_count = qs.count()
        page_size = int(request.GET.get("page_size", 10))
        page = int(request.GET.get("page", 1))
        offset = (page - 1) * page_size
        results_qs = qs[offset : offset + page_size]

        results = [
            {
                "id": u.id,
                "email": u.email,
                "username": u.username,
                "first_name": u.first_name,
                "last_name": u.last_name,
                "name": u.get_full_name() or u.username or u.email,
                "phone": u.phone if getattr(u, "phone", None) else "",
                "signup_source": getattr(u, "signup_source", "email") or "email",
                "signup_source_display": "Google OAuth" if getattr(u, "signup_source", "") == "google" else "Email/Password",
                "is_active": u.is_active,
                "is_staff": u.is_staff,
                "is_superuser": u.is_superuser,
                "date_joined": u.date_joined.strftime("%b %d, %Y"),
                "resumes_count": u.resumes_count,
            }
            for u in results_qs
        ]
        total_pages = (total_count + page_size - 1) // page_size if total_count > 0 else 1

        return Response({
            "count": total_count,
            "total_pages": total_pages,
            "current_page": page,
            "page_size": page_size,
            "results": results,
        })


class AdminUserDetailView(APIView):
    permission_classes = [IsAdminUserPermission]

    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            return None

    def get(self, request, pk):
        user = self.get_object(pk)
        if not user:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        return Response({
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "name": user.get_full_name() or user.username or user.email,
            "phone": user.phone if getattr(user, "phone", None) else "",
            "signup_source": getattr(user, "signup_source", "email") or "email",
            "signup_source_display": "Google OAuth" if getattr(user, "signup_source", "") == "google" else "Email/Password",
            "is_active": user.is_active,
            "is_staff": user.is_staff,
            "is_superuser": user.is_superuser,
            "date_joined": user.date_joined.strftime("%b %d, %Y %H:%M"),
            "last_login": user.last_login.strftime("%b %d, %Y %H:%M") if user.last_login else "Never",
            "resumes_count": user.resumes.count(),
        })

    def patch(self, request, pk):
        user = self.get_object(pk)
        if not user:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        if "first_name" in request.data:
            user.first_name = str(request.data.get("first_name", "")).strip()
        if "last_name" in request.data:
            user.last_name = str(request.data.get("last_name", "")).strip()
        if "name" in request.data and "first_name" not in request.data and "last_name" not in request.data:
            full_name = str(request.data.get("name", "")).strip()
            parts = full_name.split(" ", 1)
            user.first_name = parts[0]
            user.last_name = parts[1] if len(parts) > 1 else ""

        if "phone" in request.data:
            user.phone = str(request.data.get("phone", "")).strip()

        if "email" in request.data:
            new_email = str(request.data.get("email", "")).strip().lower()
            if not new_email:
                return Response({"detail": "Email address cannot be empty."}, status=status.HTTP_400_BAD_REQUEST)
            if "@" not in new_email or "." not in new_email:
                return Response({"detail": "Please provide a valid email address."}, status=status.HTTP_400_BAD_REQUEST)
            if new_email != user.email.lower():
                if User.objects.filter(email__iexact=new_email).exclude(pk=user.pk).exists():
                    return Response({"detail": "This email address is already in use by another account."}, status=status.HTTP_400_BAD_REQUEST)
                user.email = new_email
                if not user.username or user.username.lower() == user.email.lower():
                    user.username = new_email

        if "is_active" in request.data:
            user.is_active = bool(request.data["is_active"])

        user.save()

        return Response({
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "name": user.get_full_name() or user.username or user.email,
            "phone": user.phone if getattr(user, "phone", None) else "",
            "signup_source": getattr(user, "signup_source", "email") or "email",
            "signup_source_display": "Google OAuth" if getattr(user, "signup_source", "") == "google" else "Email/Password",
            "is_active": user.is_active,
            "is_staff": user.is_staff,
            "is_superuser": user.is_superuser,
            "date_joined": user.date_joined.strftime("%b %d, %Y %H:%M"),
            "last_login": user.last_login.strftime("%b %d, %Y %H:%M") if user.last_login else "Never",
            "resumes_count": user.resumes.count(),
        })

    def delete(self, request, pk):
        user = self.get_object(pk)
        if not user:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        if request.user.pk == user.pk:
            return Response({"detail": "You cannot delete your own active admin account."}, status=status.HTTP_400_BAD_REQUEST)

        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AdminResumeListView(APIView):
    permission_classes = [IsAdminUserPermission]

    def get(self, request):
        qs = Resume.objects.select_related("user").order_by("-updated_at")
        search = request.GET.get("search", "").strip()
        if search:
            qs = qs.filter(
                Q(title__icontains=search)
                | Q(user__email__icontains=search)
                | Q(user__username__icontains=search)
                | Q(user__first_name__icontains=search)
                | Q(user__last_name__icontains=search)
            )

        user_id = request.GET.get("user_id")
        if user_id:
            qs = qs.filter(user_id=user_id)

        owner = request.GET.get("owner", "").strip()
        if owner:
            qs = qs.filter(
                Q(user__email__icontains=owner)
                | Q(user__username__icontains=owner)
                | Q(user__first_name__icontains=owner)
                | Q(user__last_name__icontains=owner)
            )

        template = request.GET.get("template", "").strip()
        if template:
            qs = qs.filter(template_key=template)

        resume_status = request.GET.get("status", "").strip()
        if resume_status:
            qs = qs.filter(status=resume_status)

        total_count = qs.count()
        page_size = int(request.GET.get("page_size", 10))
        page = int(request.GET.get("page", 1))
        offset = (page - 1) * page_size
        results_qs = qs[offset : offset + page_size]

        results = [
            {
                "id": str(r.id),
                "title": r.title,
                "owner": {
                    "id": r.user.id if r.user else None,
                    "name": (r.user.get_full_name() or r.user.username or r.user.email) if r.user else "Deleted User",
                    "email": r.user.email if r.user else "N/A",
                },
                "template_key": r.template_key,
                "status": r.status,
                "source": r.source,
                "created_at": r.created_at.strftime("%b %d, %Y"),
                "updated_at": r.updated_at.strftime("%b %d, %Y %H:%M"),
            }
            for r in results_qs
        ]
        total_pages = (total_count + page_size - 1) // page_size if total_count > 0 else 1

        return Response({
            "count": total_count,
            "total_pages": total_pages,
            "current_page": page,
            "page_size": page_size,
            "results": results,
        })


class AdminResumeDetailView(APIView):
    permission_classes = [IsAdminUserPermission]

    def get_object(self, pk):
        try:
            return Resume.objects.select_related("user").get(pk=pk)
        except (Resume.DoesNotExist, ValueError):
            return None

    def get(self, request, pk):
        resume = self.get_object(pk)
        if not resume:
            return Response({"detail": "Resume not found."}, status=status.HTTP_404_NOT_FOUND)

        experiences = [
            {
                "id": str(exp.id),
                "company": exp.company,
                "role": exp.role,
                "location": exp.location,
                "start_date": exp.start_date.strftime("%b %Y") if exp.start_date else "",
                "end_date": exp.end_date.strftime("%b %Y") if exp.end_date else ("Present" if exp.is_current else ""),
                "is_current": exp.is_current,
                "bullet_points": exp.bullet_points,
            }
            for exp in resume.experiences.all()
        ]

        education = [
            {
                "id": str(edu.id),
                "institution": edu.institution,
                "degree": edu.degree,
                "field_of_study": edu.field_of_study,
                "start_date": edu.start_date.strftime("%Y") if edu.start_date else "",
                "end_date": edu.end_date.strftime("%Y") if edu.end_date else "",
                "grade": edu.grade,
            }
            for edu in resume.education.all()
        ]

        skills = [
            {
                "id": str(sk.id),
                "name": sk.name,
                "category": sk.category,
                "proficiency": sk.proficiency,
            }
            for sk in resume.skills.all()
        ]

        projects = [
            {
                "id": str(pr.id),
                "name": pr.name,
                "description": pr.description,
                "tech_stack": pr.tech_stack,
                "link": pr.link,
            }
            for pr in resume.projects.all()
        ]

        return Response({
            "id": str(resume.id),
            "title": resume.title,
            "owner": {
                "id": resume.user.id if resume.user else None,
                "name": (resume.user.get_full_name() or resume.user.username or resume.user.email) if resume.user else "Deleted User",
                "email": resume.user.email if resume.user else "N/A",
            },
            "template_key": resume.template_key,
            "status": resume.status,
            "source": resume.source,
            "current_step": resume.current_step,
            "professional_summary": resume.professional_summary,
            "raw_ai_extraction": resume.raw_ai_extraction or {},
            "experiences": experiences,
            "education": education,
            "skills": skills,
            "projects": projects,
            "created_at": resume.created_at.strftime("%b %d, %Y %H:%M"),
            "updated_at": resume.updated_at.strftime("%b %d, %Y %H:%M"),
        })

    def delete(self, request, pk):
        resume = self.get_object(pk)
        if not resume:
            return Response({"detail": "Resume not found."}, status=status.HTTP_404_NOT_FOUND)

        resume.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AdminDownloadListView(APIView):
    """
    GET /api/admin/downloads/?search=&format=&page=1&page_size=10
    List, search, and paginate resume downloads.
    """
    permission_classes = [IsAdminUserPermission]

    def get(self, request):
        qs = ResumeDownload.objects.select_related("resume", "user").order_by("-created_at")

        search = request.GET.get("search", "").strip()
        if search:
            qs = qs.filter(
                Q(resume__title__icontains=search)
                | Q(user__email__icontains=search)
                | Q(user__first_name__icontains=search)
                | Q(user__last_name__icontains=search)
            )

        fmt = request.GET.get("format", "").strip().lower()
        if fmt:
            qs = qs.filter(format=fmt)

        total_count = qs.count()
        page_size = int(request.GET.get("page_size", 10))
        page = int(request.GET.get("page", 1))
        offset = (page - 1) * page_size
        results_qs = qs[offset : offset + page_size]

        results = [
            {
                "id": str(dl.id),
                "resume": {
                    "id": str(dl.resume.id) if dl.resume else None,
                    "title": dl.resume.title if dl.resume else "Deleted Resume",
                    "template_key": dl.resume.template_key if dl.resume else "puffin",
                },
                "user": {
                    "id": dl.user.id if dl.user else (dl.resume.user.id if dl.resume and dl.resume.user else None),
                    "name": (dl.user.get_full_name() or dl.user.username or dl.user.email) if dl.user else (dl.resume.user.get_full_name() or dl.resume.user.username or dl.resume.user.email if dl.resume and dl.resume.user else "Anonymous / Guest"),
                    "email": dl.user.email if dl.user else (dl.resume.user.email if dl.resume and dl.resume.user else "N/A"),
                },
                "format": dl.format.upper(),
                "created_at": dl.created_at.strftime("%b %d, %Y %H:%M"),
            }
            for dl in results_qs
        ]

        total_pages = (total_count + page_size - 1) // page_size if total_count > 0 else 1

        return Response({
            "count": total_count,
            "total_pages": total_pages,
            "current_page": page,
            "page_size": page_size,
            "results": results,
        })


class AdminDownloadDetailView(APIView):
    """
    DELETE /api/admin/downloads/{id}/ -> delete a download log entry
    """
    permission_classes = [IsAdminUserPermission]

    def delete(self, request, pk):
        try:
            dl = ResumeDownload.objects.get(pk=pk)
        except (ResumeDownload.DoesNotExist, ValueError):
            return Response({"detail": "Download log not found."}, status=status.HTTP_404_NOT_FOUND)

        dl.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AdminFeedbackListView(APIView):
    permission_classes = [IsAdminUserPermission]

    def get(self, request):
        qs = Feedback.objects.select_related("user").order_by("-created_at")
        search = request.GET.get("search", "").strip()
        if search:
            qs = qs.filter(
                Q(message__icontains=search)
                | Q(user__email__icontains=search)
                | Q(user__first_name__icontains=search)
            )

        rating = request.GET.get("rating")
        if rating and rating.isdigit():
            qs = qs.filter(rating=int(rating))

        total_count = qs.count()
        page_size = int(request.GET.get("page_size", 10))
        page = int(request.GET.get("page", 1))
        offset = (page - 1) * page_size
        results_qs = qs[offset : offset + page_size]

        results = [
            {
                "id": str(fb.id),
                "user": {
                    "id": fb.user.id if fb.user else None,
                    "name": (fb.user.get_full_name() or fb.user.username or fb.user.email) if fb.user else "Anonymous",
                    "email": fb.user.email if fb.user else "N/A",
                },
                "rating": fb.rating,
                "message": fb.message,
                "created_at": fb.created_at.strftime("%b %d, %Y %H:%M"),
            }
            for fb in results_qs
        ]
        total_pages = (total_count + page_size - 1) // page_size if total_count > 0 else 1

        return Response({
            "count": total_count,
            "total_pages": total_pages,
            "current_page": page,
            "page_size": page_size,
            "results": results,
        })


class AdminFeedbackDetailView(APIView):
    permission_classes = [IsAdminUserPermission]

    def delete(self, request, pk):
        try:
            fb = Feedback.objects.get(pk=pk)
        except (Feedback.DoesNotExist, ValueError):
            return Response({"detail": "Feedback item not found."}, status=status.HTTP_404_NOT_FOUND)

        fb.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
