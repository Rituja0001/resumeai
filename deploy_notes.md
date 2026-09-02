# Render Backend Deployment Guide

This guide details how to deploy the **ResumeAI Backend** (Django + PostgreSQL) to [Render](https://render.com) on the **Free Tier**. The frontend is hosted separately on Vercel.

> **Note**: AI processing (upload parsing, voice structuring, job tailoring) runs **synchronously** within Django requests, eliminating the need for a separate Celery worker or Redis instance.

---

## Architecture Overview

1. **Web Service (`resumeai-backend`)**: Django API running with Gunicorn (`--timeout 120`) and WhiteNoise for static files.
2. **Managed Database (`resumeai-db`)**: Render PostgreSQL database (Free plan).
3. **Frontend (Vercel)**: Communicates with the Render backend via REST API (`VITE_API_BASE`).

---

## Option 1: One-Click Deploy via Render Blueprint (`render.yaml`) (Recommended)

Render Blueprints allow provisioning the web service and PostgreSQL database automatically from `render.yaml`.

### Steps:
1. **Push your repository to GitHub** (ensure `render.yaml`, `backend/requirements.txt`, and `backend/core/settings.py` changes are included).
2. Go to the [Render Dashboard](https://dashboard.render.com/).
3. Click **New +** > **Blueprint**.
4. Select your GitHub repository (`resumeai`).
5. Render will detect `render.yaml` and display the resources to be created:
   - Web Service: `resumeai-backend` (Free tier)
   - Database: `resumeai-db` (Free tier)
6. Fill in the required environment variables prompted by the blueprint (or enter them in the service settings after creation).
7. Click **Apply**. Render will provision and launch the database and web service.

---

## Option 2: Manual Step-by-Step Setup (If Not Using Blueprint)

If you prefer to configure each component manually:

### 1. Create PostgreSQL Database
- In Render Dashboard: **New +** > **PostgreSQL**.
- **Name**: `resumeai-db`
- **Database**: `resumeai`
- **User**: `resumeai_user`
- **Plan**: Free
- Click **Create Database**. Copy the **Internal Database URL** once created.

### 2. Create Web Service (Django API)
- In Render Dashboard: **New +** > **Web Service**.
- Connect your GitHub repository.
- **Root Directory**: `backend`
- **Runtime**: `Python 3`
- **Plan**: Free
- **Build Command**: `pip install -r requirements.txt && python manage.py collectstatic --noinput`
- **Pre-Deploy Command**: `python manage.py migrate`
- **Start Command**: `gunicorn core.wsgi --bind 0.0.0.0:$PORT --timeout 120`
- Set environment variables (see table below).
- Click **Create Web Service**.

---

## Environment Variables Reference

### Automatically Injected by Render Blueprint:
| Variable | Value / Source |
|---|---|
| `DATABASE_URL` | Auto-populated by Render from `resumeai-db` (`fromDatabase`) |

---

### Variables to Set Manually in Render Dashboard:

> **Important**: Set these for the Web Service (`resumeai-backend`).

| Variable | Target Service | Example / Recommended Value | Description |
|---|---|---|---|
| `DJANGO_SECRET_KEY` | Web | *Generate a strong secret key* | Django encryption key (auto-generated in Blueprint). |
| `DJANGO_DEBUG` | Web | `False` | Must be `False` in production. |
| `DJANGO_ALLOWED_HOSTS` | Web | `your-backend.onrender.com,localhost,127.0.0.1` | Must include your Render backend's `.onrender.com` domain. |
| `CORS_ALLOWED_ORIGINS` | Web | `https://your-frontend.vercel.app` | **Replace with your real Vercel frontend URL** (comma-separated if multiple). |
| `CSRF_TRUSTED_ORIGINS` | Web | `https://your-frontend.vercel.app` | **Replace with your real Vercel frontend URL**. |
| `ANTHROPIC_API_KEY` | Web | `sk-ant-api03-...` | Claude API key for resume generation & analysis. |
| `ANTHROPIC_MODEL` | Web | `claude-sonnet-4-6` | AI model identifier. |
| `GOOGLE_CLIENT_ID` | Web | `...apps.googleusercontent.com` | Google OAuth Client ID (if using Google login). |
| `LINKEDIN_CLIENT_ID` | Web | *(Optional)* | LinkedIn OAuth Client ID. |
| `LINKEDIN_CLIENT_SECRET` | Web | *(Optional)* | LinkedIn OAuth Client Secret. |
| `LINKEDIN_REDIRECT_URI` | Web | `https://your-backend.onrender.com/api/auth/linkedin/callback/` | LinkedIn OAuth redirect callback. |
| `AWS_STORAGE_BUCKET_NAME` | Web | *(Optional)* | S3 bucket name if using AWS S3 for media storage. |
| `AWS_ACCESS_KEY_ID` | Web | *(Optional)* | AWS IAM access key ID. |
| `AWS_SECRET_ACCESS_KEY` | Web | *(Optional)* | AWS IAM secret access key. |
| `AWS_S3_REGION_NAME` | Web | `ap-south-1` | AWS S3 region. |

---

## Pre-Deploy Command (Database Migrations)

Render supports executing a command before traffic is routed to the new build:

- **Via Blueprint**: `render.yaml` already configures `preDeployCommand: python manage.py migrate` on the web service.
- **Via Render Dashboard**:
  1. Go to the **resumeai-backend** Web Service > **Settings**.
  2. Under the **Build & Deploy** section, find **Pre-Deploy Command**.
  3. Enter `python manage.py migrate`.
  4. Save changes.

---

## Connecting Vercel Frontend to Render Backend

Once the Render backend is deployed and active:

1. Copy your live Render Web Service URL (e.g. `https://resumeai-backend.onrender.com`).
2. Open your [Vercel Dashboard](https://vercel.com).
3. Navigate to your frontend project > **Settings** > **Environment Variables**.
4. Set or update:
   - **Key**: `VITE_API_BASE`
   - **Value**: `https://resumeai-backend.onrender.com/api` *(replace with your actual Render URL, appending `/api`)*
5. Go to the **Deployments** tab on Vercel and click **Redeploy** on the latest deployment for the new environment variable to take effect.
6. Make sure your Render backend's `CORS_ALLOWED_ORIGINS` and `CSRF_TRUSTED_ORIGINS` include your production Vercel domain (e.g. `https://resumeai-app.vercel.app`).
