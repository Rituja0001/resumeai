# GoResume — Deployment Guide (UAT / Staging)

This guide walks you through deploying the **GoResume** full-stack application (Django + React + PostgreSQL + Redis + Celery) to a production-ready UAT/staging environment:
- **Backend & Database**: [Railway](https://railway.com/) (Django Web API, Celery Worker, Managed PostgreSQL, Managed Redis)
- **Frontend**: [Vercel](https://vercel.com/) (Vite + React SPA)

---

## 1. Prerequisites
- A [Railway.com](https://railway.com/) account
- A [Vercel.com](https://vercel.com/) account
- An [Anthropic Console](https://console.anthropic.com/) account with an active API key (`sk-ant-...`)
- The GitHub repository pushed and accessible

---

## 2. Railway Backend Deployment (Step-by-Step)

Railway will host **4 services** inside a single project:
1. **PostgreSQL Database**
2. **Redis Instance**
3. **Django Web API Service** (Gunicorn + WhiteNoise)
4. **Celery Worker Service** (Async AI processing)

### Step 2.1: Create a Railway Project
1. Log in to [Railway Dashboard](https://railway.com/dashboard).
2. Click **"New Project"**.
3. Select **"Provision PostgreSQL"** to add a managed database.
4. In the same project canvas, click **"+ New"** → **"Database"** → **"Add Redis"**.

---

### Step 2.2: Deploy Django Web API Service
1. In the same Railway project canvas, click **"+ New"** → **"GitHub Repo"** → select your `resumeai` repository.
2. Click on the newly created service card and go to **Settings**:
   - **Service Name**: Rename to `web-api` or `django-backend`.
   - **Root Directory**: Set to `/backend` (or leave `/` if deploying from repo root with root `Procfile`).
   - **Build Command**: `pip install -r requirements.txt && python manage.py collectstatic --noinput`
   - **Deploy Command / Pre-deploy**: `python manage.py migrate`
3. Go to the **Variables** tab for the web service and add the following:

| Variable Name | Value / Description | Example Value |
| :--- | :--- | :--- |
| `DATABASE_URL` | Reference to PostgreSQL service URL | `${{Postgres.DATABASE_URL}}` *(or paste PostgreSQL connection string)* |
| `REDIS_URL` | Reference to Redis service URL | `${{Redis.REDIS_URL}}` *(or paste Redis connection string)* |
| `DJANGO_SECRET_KEY` | Strong random secret key for Django | `django-insecure-prod-xyz8923487234...` |
| `DJANGO_DEBUG` | Set to `False` for staging/UAT | `False` |
| `DJANGO_ALLOWED_HOSTS` | Allowed host domains (comma-separated) | `*.railway.app,*.up.railway.app,localhost,127.0.0.1` |
| `CORS_ALLOWED_ORIGINS` | Your frontend Vercel domain (comma-separated) | `https://your-frontend.vercel.app,http://localhost:5173` |
| `CSRF_TRUSTED_ORIGINS` | Trusted origins for CSRF protection | `https://*.railway.app,https://*.vercel.app` |
| `ANTHROPIC_API_KEY` | Your live Anthropic API key | `sk-ant-api03-...` |
| `ANTHROPIC_MODEL` | Claude model name | `claude-sonnet-4-6` |
| `PORT` | Auto-assigned by Railway (default `8000`) | `8000` |

4. Go to **Settings** → **Networking** → Click **"Generate Domain"** (e.g. `https://resumeai-backend-production.up.railway.app`).
5. Note this public domain — you will provide it to Vercel as `VITE_API_BASE`.

---

### Step 2.3: Deploy Celery Worker Service
1. In the same project canvas, click **"+ New"** → **"GitHub Repo"** → select the same `resumeai` repository.
2. Click on this second service card and go to **Settings**:
   - **Service Name**: Rename to `celery-worker`.
   - **Root Directory**: Set to `/backend`.
   - **Custom Start Command**: `celery -A core worker -l info`
3. Go to the **Variables** tab:
   - Click **"Add Variable"** or **"Share Variables with web-api"** and copy the same variables:
     - `DATABASE_URL`
     - `REDIS_URL`
     - `DJANGO_SECRET_KEY`
     - `DJANGO_DEBUG` (`False`)
     - `ANTHROPIC_API_KEY`
     - `ANTHROPIC_MODEL`

---

### Step 2.4: Create Django Superuser on Railway (Optional)
To access `/admin/` in your live UAT environment:
1. In the Railway dashboard, click on the `web-api` service.
2. Open the **"Exec"** tab (Web Terminal).
3. Run:
   ```bash
   python manage.py createsuperuser
   ```
4. Follow the prompts to set up an admin email and password.

---

## 3. Vercel Frontend Deployment (Step-by-Step)

### Step 3.1: Import Project into Vercel
1. Log in to [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **"Add New..."** → **"Project"**.
3. Select your `resumeai` GitHub repository.

### Step 3.2: Configure Build Settings
In the Vercel project configuration screen:
- **Framework Preset**: `Vite` (auto-detected)
- **Root Directory**: Click **Edit** and choose `frontend`.
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 3.3: Set Environment Variables
In the **Environment Variables** section, add:

| Key | Value | Description |
| :--- | :--- | :--- |
| `VITE_API_BASE` | `https://your-railway-backend-url.up.railway.app/api` | Points frontend API calls to Railway Django backend |

> **Important**: Do not add a trailing slash at the end, e.g. `https://web-api-production.up.railway.app/api`.

### Step 3.4: Deploy & Verify
1. Click **"Deploy"**.
2. Once the build finishes, copy your Vercel domain (e.g. `https://resumeai-frontend.vercel.app`).
3. Return to Railway → `web-api` service → **Variables** tab and ensure `CORS_ALLOWED_ORIGINS` includes your Vercel URL:
   ```
   CORS_ALLOWED_ORIGINS=https://resumeai-frontend.vercel.app,http://localhost:5173
   ```

---

## 4. Verification Checklist

- [ ] **Backend Health**: Visit `https://your-backend.up.railway.app/api/resumes/` in a browser — it should return HTTP 401 Unauthorized (expected for protected endpoint) or `/admin/` login screen.
- [ ] **Static Files**: Verify that `/admin/` loads with full CSS styling (served via WhiteNoise).
- [ ] **Database Migrations**: Check Railway deployment logs to confirm `python manage.py migrate` ran successfully.
- [ ] **Frontend Live**: Visit your Vercel URL (`https://your-app.vercel.app`) and verify the landing page loads with Plus Jakarta Sans and Lucide Icons.
- [ ] **Interactive Tailoring & AI**: Test pasting a job description in the landing page tailoring demo.
- [ ] **Builder & Uploads**: Click *"Build my free resume"*, test uploading a sample resume file, and verify parsing completes.
- [ ] **Celery Worker Logs**: Open the `celery-worker` service in Railway and check the live logs to confirm tasks are being received and processed asynchronously without errors.

