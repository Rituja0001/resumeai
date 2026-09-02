# Setup guide — ResumeCraft ko apne machine par chalana

Yeh guide manage.py, migrations, aur poora local dev environment step-by-step
set up karti hai. Har step ke baad expected output bhi diya hai.

---

## Prerequisites

- Python 3.11+
- PostgreSQL 14+
- Node.js 18+ (frontend ke liye)

```bash
# Ubuntu/Debian
sudo apt install python3-venv postgresql postgresql-contrib

# macOS (Homebrew)
brew install postgresql@15
brew services start postgresql@15
```

---

## Step 1 — PostgreSQL database banao

```bash
sudo -u postgres psql
```

psql shell ke andar:
```sql
CREATE DATABASE resumeai;
CREATE USER resumeai_user WITH PASSWORD 'devpassword123';
ALTER ROLE resumeai_user SET client_encoding TO 'utf8';
GRANT ALL PRIVILEGES ON DATABASE resumeai TO resumeai_user;
\q
```

---

## Step 2 — Backend virtualenv + dependencies

```bash
cd resumeai/backend
python3 -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate

pip install -r requirements.txt
```
Expected: sab packages (Django, DRF, anthropic, etc.) bina error install ho jaayenge.

---

## Step 3 — Environment variables set karo

`backend/.env` file banao (ya seedha export karo):

```bash
export POSTGRES_DB=resumeai
export POSTGRES_USER=resumeai_user
export POSTGRES_PASSWORD=devpassword123
export POSTGRES_HOST=localhost
export POSTGRES_PORT=5432

export DJANGO_SECRET_KEY="ek-random-lambi-string-yahan"
export DJANGO_DEBUG=True

export ANTHROPIC_API_KEY="sk-ant-xxxxxxxx"     # console.anthropic.com se lo
export ANTHROPIC_MODEL="claude-sonnet-4-6"

# Optional — jab tak LinkedIn/S3 wire nahi karte, ye khali reh sakte hain
export AWS_STORAGE_BUCKET_NAME=""
export LINKEDIN_CLIENT_ID=""
export LINKEDIN_CLIENT_SECRET=""
```

python-dotenv already `requirements.txt` mein hai — agar `.env` file use kar rahe ho to `settings.py` automatically `.env` load karta hai.

---

## Step 4 — Migrations banao aur run karo

```bash
python manage.py makemigrations accounts resumes
```
Expected output:
```
Migrations for 'accounts':
  accounts/migrations/0001_initial.py
    - Create model User
Migrations for 'resumes':
  resumes/migrations/0001_initial.py
    - Create model Resume
    - Create model WorkExperience
    - Create model Education
    - Create model SkillEntry
    - Create model Project
    - Create model JobTailoringRequest
    - Create model VoiceSession
    - Create model LinkedInImport
```

```bash
python manage.py migrate
```
Expected: sab migrations (Django built-in + apne apps ki) "OK" ke saath apply ho jaayengi.

---

## Step 5 — Admin user banao

```bash
python manage.py createsuperuser
```
Email, username, password poochega. Isse tum `/admin/` panel se resumes, users, tailoring requests seedha dekh/edit kar sakte ho.

---

## Step 6 — Server chalao

```bash
python manage.py runserver
```
Expected:
```
Starting development server at http://127.0.0.1:8000/
```

Test karo:
```bash
curl http://127.0.0.1:8000/admin/
# Django admin login page ka HTML aana chahiye

curl -X POST http://127.0.0.1:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","username":"test","password":"StrongPass123!"}'
# {"id":1,"email":"test@example.com","username":"test"}

curl -X POST http://127.0.0.1:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"StrongPass123!"}'
# {"access":"eyJ...", "refresh":"eyJ..."}
```

Access token ko save karo, phir authenticated calls test karo:
```bash
TOKEN="wahi access token yahan"

curl http://127.0.0.1:8000/api/resumes/ \
  -H "Authorization: Bearer $TOKEN"
# []   (khaali list — koi resume nahi bana abhi)
```

> **Note**: AI processing (upload parsing, tailoring, voice structuring) runs **synchronously** in the Django request/response cycle. No Celery worker or Redis instance is required!

---

## Step 7 — Frontend chalao

```bash
cd frontend
npm install
npm run dev
```
Expected:
```
  ➜  Local:   http://localhost:5173/
```

Browser mein khol ke landing page aur builder flow dekh sakte ho.

---

## Step 8 — Frontend ko backend se connect karo

`frontend/src/api.js` automatically `VITE_API_BASE` env var ya default `http://127.0.0.1:8000/api` use karta hai.

Backend `CORS_ALLOWED_ORIGINS` env var mein `http://localhost:5173` add karna mat bhoolna.

---

## Common errors aur fix

| Error | Wajah | Fix |
|---|---|---|
| `django.db.utils.OperationalError: FATAL: password authentication failed` | Postgres password galat | Step 1 ka password `.env` se match karo |
| `ANTHROPIC_API_KEY` KeyError on startup | Env var set nahi | Step 3 dobara check karo, naya terminal me export karna bhoolte hain log |
| CORS error browser console mein | Frontend origin allow-list mein nahi | `CORS_ALLOWED_ORIGINS` env var update karo |
| `NotImplementedError` parsing task mein | OCR/LinkedIn/Whisper wire up nahi hua | `docs/ARCHITECTURE.md` dekho — un providers ki API keys chahiye honge |

---

## Production ke liye aage ka kaam
- `gunicorn core.wsgi --timeout 120` (Render web service)
- Postgres ka managed instance (Render PostgreSQL)
- S3 bucket + CloudFront ke liye static/media files
- HTTPS, environment secrets manager
