# Setup guide — ResumeCraft ko apne machine par chalana

Yeh guide manage.py, migrations, aur poora local dev environment step-by-step
set up karti hai. Har step ke baad expected output bhi diya hai.

---

## Prerequisites

- Python 3.11+
- PostgreSQL 14+
- Redis (Celery broker ke liye)
- Node.js 18+ (frontend ke liye)

```bash
# Ubuntu/Debian
sudo apt install python3-venv postgresql postgresql-contrib redis-server

# macOS (Homebrew)
brew install postgresql@15 redis
brew services start postgresql@15
brew services start redis
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
Expected: sab packages (Django, DRF, celery, anthropic, etc.) bina error install ho jaayenge.

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

export REDIS_URL="redis://localhost:6379/0"

# Optional — jab tak LinkedIn/S3 wire nahi karte, ye khali reh sakte hain
export AWS_STORAGE_BUCKET_NAME=""
export LINKEDIN_CLIENT_ID=""
export LINKEDIN_CLIENT_SECRET=""
```

python-dotenv already `requirements.txt` mein hai — agar `.env` file use kar rahe ho to `manage.py` ke top pe `from dotenv import load_dotenv; load_dotenv()` add kar dena.

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

---

## Step 7 — Celery worker alag terminal mein chalao

AI processing (upload parsing, voice structuring) is Celery ke bina kaam nahi karega — request "processing" pe atki reh jaayegi.

```bash
cd resumeai/backend
source venv/bin/activate
celery -A core worker -l info
```
Expected:
```
[tasks]
  . resumes.tasks.process_uploaded_resume
  . resumes.tasks.process_voice_session
  . resumes.tasks.process_linkedin_import

celery@yourhost ready.
```

Ab jab `/api/resumes/upload/` call karoge, worker terminal mein task pick hote dikhega.

---

## Step 8 — Frontend chalao

```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

`tailwind.config.js` mein `content: ["./index.html", "./src/**/*.{js,jsx}"]` set karo, aur `src/index.css` mein:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Phir humari `App.jsx` aur `pages/BuilderPage.jsx` files ko generated `frontend/src/` mein copy karo (overwrite the default `App.jsx`), aur:

```bash
npm run dev
```
Expected:
```
  ➜  Local:   http://localhost:5173/
```

Browser mein khol ke landing page aur builder flow dekh sakte ho.

---

## Step 9 — Frontend ko backend se connect karo

`frontend/src/api.js` bana lo (simple fetch wrapper):
```js
const API_BASE = "http://127.0.0.1:8000/api";

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("access_token");
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}
```
Backend `CORS_ALLOWED_ORIGINS` env var mein `http://localhost:5173` add karna mat bhoolna.

---

## Common errors aur fix

| Error | Wajah | Fix |
|---|---|---|
| `django.db.utils.OperationalError: FATAL: password authentication failed` | Postgres password galat | Step 1 ka password `.env` se match karo |
| `ANTHROPIC_API_KEY` KeyError on startup | Env var set nahi | Step 3 dobara check karo, naya terminal me export karna bhoolte hain log |
| Resume status hamesha "processing" reh jaata hai | Celery worker chal nahi raha | Step 7 alag terminal mein run karo |
| CORS error browser console mein | Frontend origin allow-list mein nahi | `CORS_ALLOWED_ORIGINS` env var update karo |
| `NotImplementedError` Celery task mein | OCR/LinkedIn/Whisper wire up nahi hua | `docs/ARCHITECTURE.md` dekho — un providers ki API keys chahiye honge |

---

## Production ke liye aage ka kaam (yahan cover nahi kiya)
- `gunicorn core.wsgi` + Nginx reverse proxy
- Celery ko systemd/supervisor se manage karna
- Postgres ka managed instance (RDS/Cloud SQL)
- S3 bucket + CloudFront ke liye static/media files
- HTTPS, environment secrets manager (not `.env` in prod)
