# ResumeCraft — AI resume builder (GoResume-style clone)

Full-stack scaffold: React frontend + Django REST backend + PostgreSQL,
implementing the same core product as goresume.io — 4 resume-build paths
(upload, LinkedIn import, voice AI, start from scratch) plus job-description
tailoring with an ATS match score.

## Structure
```
resumeai/
├── frontend/
│   └── src/App.jsx          # Landing page + resume builder + auth (React)
├── backend/
│   ├── core/settings.py     # Django settings — Postgres, WhiteNoise, S3, Anthropic
│   ├── accounts/models.py   # Custom email-based User
│   ├── resumes/
│   │   ├── models.py        # Resume, WorkExperience, Education, Skill, Project,
│   │   │                      JobTailoringRequest, VoiceSession, LinkedInImport
│   │   ├── serializers.py   # DRF serializers
│   │   ├── views.py         # API endpoints for all 4 build paths + tailoring
│   │   ├── tasks.py         # Synchronous processing pipeline (file parsing, AI calls)
│   │   ├── ai_services.py   # Anthropic Claude API prompts & structured completions
│   │   └── urls.py
│   └── requirements.txt
└── docs/
    ├── SETUP.md             # Local dev setup guide
    └── ARCHITECTURE.md      # Full backend architecture & process flow
```

## Running it locally (rough steps)

**Backend**
```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
export POSTGRES_DB=resumeai POSTGRES_USER=resumeai_user POSTGRES_PASSWORD=devpassword123
export ANTHROPIC_API_KEY=sk-ant-...
python manage.py migrate
python manage.py runserver
```

**Frontend**
```bash
cd frontend
npm install && npm run dev
```

## What's mocked vs. real in this scaffold
- Real: full DB schema, API surface, synchronous AI processing pipeline, prompt
  design for every AI step, ATS-scoring logic, auth/permission structure.
- Needs your own credentials to actually run: `ANTHROPIC_API_KEY`,
  AWS S3 bucket + keys, LinkedIn OAuth app, a speech-to-text provider
  (Whisper API or AWS Transcribe) — those integration points are marked
  `NotImplementedError` with a comment on exactly what to wire up.

See `docs/ARCHITECTURE.md` for the full process explanation of how each
feature works end-to-end.
