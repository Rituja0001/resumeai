# ResumeCraft — AI resume builder (GoResume-style clone)

Full-stack scaffold: React frontend + Django REST backend + PostgreSQL,
implementing the same core product as goresume.io — 4 resume-build paths
(upload, LinkedIn import, voice AI, start from scratch) plus job-description
tailoring with an ATS match score.

## Structure
```
resumeai/
├── frontend/
│   └── src/App.jsx          # Landing page + job-tailoring demo (React)
├── backend/
│   ├── core/settings.py     # Django settings — Postgres, Celery, S3, Anthropic
│   ├── accounts/models.py   # Custom email-based User
│   ├── resumes/
│   │   ├── models.py        # Resume, WorkExperience, Education, Skill, Project,
│   │   │                      JobTailoringRequest, VoiceSession, LinkedInImport
│   │   ├── serializers.py   # DRF serializers
│   │   ├── views.py         # API endpoints for all 4 build paths + tailoring
│   │   ├── tasks.py         # Celery: file parsing, AI calls, transcription
│   │   ├── ai_services.py   # All Anthropic Claude API prompts/calls, isolated
│   │   └── urls.py
│   └── requirements.txt
└── docs/
    └── ARCHITECTURE.md      # Full backend process explanation (Hinglish)
```

## Running it locally (rough steps)

**Backend**
```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
export POSTGRES_DB=resumeai POSTGRES_USER=postgres POSTGRES_PASSWORD=postgres
export ANTHROPIC_API_KEY=sk-ant-...
export REDIS_URL=redis://localhost:6379/0
python manage.py migrate
python manage.py runserver
celery -A core worker -l info   # separate terminal, for async AI/file jobs
```

**Frontend**
```bash
npm create vite@latest frontend -- --template react
# copy src/App.jsx into the generated project, add Tailwind
npm install && npm run dev
```

## What's mocked vs. real in this scaffold
- Real: full DB schema, API surface, Celery task orchestration, prompt
  design for every AI step, ATS-scoring logic, auth/permission structure.
- Needs your own credentials to actually run: `ANTHROPIC_API_KEY`,
  AWS S3 bucket + keys, LinkedIn OAuth app, a speech-to-text provider
  (Whisper API or AWS Transcribe) — those integration points are marked
  `NotImplementedError` with a comment on exactly what to wire up.

See `docs/ARCHITECTURE.md` for the full process explanation of how each
feature works end-to-end.
