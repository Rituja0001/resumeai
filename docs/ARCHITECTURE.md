# ResumeAI — Backend Architecture & Process (poori jaankari)

## 1. High-level stack

| Layer | Technology | Kyun |
|---|---|---|
| Frontend | React (Vite) | Fast SPA, component reuse resume builder ke liye |
| Backend API | Django + Django REST Framework | Robust ORM, admin panel, auth built-in |
| Database | PostgreSQL | Relational data (resumes → experiences/education/skills), JSONField support |
| Async jobs | Celery + Redis | AI calls aur file parsing slow hote hain, HTTP request ko block nahi karna |
| File/audio storage | AWS S3 (ya koi S3-compatible) | Uploaded resumes, voice recordings |
| AI engine | Anthropic Claude API (Messages API) | Resume parsing, tailoring, voice-to-resume structuring |
| Auth | JWT (SimpleJWT) | Stateless, mobile + web dono ke liye theek |
| OCR (scanned PDFs/images) | AWS Textract / Google Vision | Jab PDF me text-layer na ho |
| Speech-to-text | AWS Transcribe / Whisper API | Voice AI feature ke liye |

## 2. Database design (core tables)

```
User
 └── Resume (title, source, status, template_key, base_resume FK for tailored copies)
      ├── WorkExperience (company, role, dates, bullet_points[])
      ├── Education (institution, degree, dates, grade)
      ├── SkillEntry (name, category)
      └── Project (name, description, tech_stack[])

JobTailoringRequest (user, source_resume, job_description, match_score_before/after,
                      matched_keywords[], missing_keywords[], result_resume FK)

VoiceSession (user, audio_storage_key, transcript, status, resume FK)

LinkedInImport (user, linkedin_profile_urn, raw_profile_snapshot JSON, resume FK)
```

Har section (experience/education/skills) apni alag table me hai — ek bada JSON blob nahi — taaki:
- AI sirf ek section ko re-generate/edit kar sake bina poora resume touch kiye
- ATS scoring engine field-by-field keyword match kar sake
- PDF renderer clean, predictable data se template bana sake

## 3. Process flow — har "4 Ways to Build" ka backend kaise kaam karta hai

### A) Upload Resume (PDF/DOCX/Image)
```
User file upload
   │
   ▼
1. POST /api/resumes/upload/  →  file S3 me save, Resume row status="processing"
   │  (turant 202 Accepted response frontend ko — user ko wait nahi karana)
   ▼
2. Celery task process_uploaded_resume() background me chalta hai:
   a. Text extraction:
        .pdf  → pdfplumber se text nikalo
        .docx → python-docx se paragraphs padho
        agar PDF scanned image hai (no text layer) → OCR fallback (Textract)
   b. Extracted raw text ko Claude API ko bhejo ek strict JSON schema
      instruction ke saath ("resume ko is exact structure me convert karo")
   c. AI response (JSON) ko parse karke WorkExperience/Education/Skill/
      Project tables me likho, Resume.status = "ready"
   ▼
3. Frontend har 2 second poll karta hai GET /api/resumes/{id}/
   jab tak status "ready" na ho jaaye, phir editor dikhata hai
```

### B) Import LinkedIn
```
1. Frontend LinkedIn ka OAuth consent screen kholta hai
2. LinkedIn redirect karta hai wapas humare app pe ek "authorization code" ke saath
3. POST /api/resumes/import-linkedin/ { code }
4. Backend: code ko LinkedIn ke token endpoint pe exchange karke access_token milta hai
5. Access_token se LinkedIn Profile API call karke positions/education/skills fetch karo
6. Yeh already-structured data hai, isliye AI sirf:
     - Field mapping karta hai humare schema me
     - Ek professional_summary generate karta hai headline + about se
7. Resume + child tables create ho jaate hain, status="ready"

Note: Hum kabhi bhi LinkedIn password store nahi karte — sirf OAuth token,
aur woh bhi encrypted, aur expiry ke baad discard.
```

### C) Voice AI
```
1. POST /api/resumes/voice/start/  → VoiceSession row banta hai
2. Frontend browser mic se audio record karta hai (MediaRecorder API)
3. POST /api/resumes/voice/{id}/finish/  { audio file }
   → audio S3 me save, status="transcribing", Celery task trigger
4. Celery task:
   a. Speech-to-text provider (Whisper/Transcribe) audio → raw transcript
   b. status="structuring"
   c. Transcript (jo informal, unordered hota hai) ko Claude ko bhejte hain
      ek special prompt ke saath: "yeh spoken transcript hai, ismein se
      clean structured resume banao, filler words hatao, related baaton
      ko group karo"
   d. Resume create hoti hai, status="complete"
```

### D) Start from Scratch
```
User khud form bharta hai (company, role, dates).
Jaise hi woh apna kaam type karta hai, ek "AI suggest" button hota hai:
POST /api/resumes/suggest-bullets/ { role, company, notes }
→ Chhota, fast AI call (~1-2 sec) jo 3-5 polished bullet points return karta hai.
Yeh synchronous rehta hai kyunki prompt chhota hai aur UI turant response chahta hai.
```

## 4. Job Tailoring + ATS Score (paste JD feature)

```
POST /api/tailoring/ { source_resume_id, job_description }
   │
   ▼
Backend ek single AI call karta hai jisme resume JSON + job description
dono ek saath bhejte hain. AI ek hi response me deta hai:
   - match_score_before (0-100)      → original resume JD se kitna match karta hai
   - matched_keywords[]              → resume me already present JD keywords
   - missing_keywords[]              → JD ke important keywords jo resume me nahi hai
   - tailored_resume (JSON)          → reordered/reworded resume, JD ke hisaab se
   - match_score_after (0-100)       → tailored version ka naya score
   │
   ▼
Naya Resume row banta hai (source="tailored", base_resume=original),
taaki original resume kabhi overwrite na ho.
```

**Important guardrail (prompt me explicitly likha hai):** AI missing keyword
ko resume me tabhi add kar sakta hai jab candidate ke existing experience se
woh genuinely support hota ho — naye/fake skills invent karna allowed nahi.
Yeh ATS-gaming (jhoothe keywords bhar dena) rokta hai.

## 5. Auth & security

- JWT-based auth (access + refresh token), SimpleJWT
- Har API endpoint `IsAuthenticated` — user sirf apne resumes dekh/edit kar sakta hai
- File uploads: type + size validation (10MB max, PDF/DOCX/PNG/JPG only)
- Rate limiting: DRF throttling (100 req/min/user) — AI calls costly hote hain, abuse rokne ke liye
- S3 files private hain, signed URLs (1-hour expiry) se serve hote hain

## 6. Scaling notes

- AI calls (upload parsing, voice structuring, tailoring) sabhi Celery
  workers me chalte hain — web server kabhi block nahi hota
- Celery workers ko horizontally scale kar sakte hain jab AI queue badhe
- `raw_ai_extraction` JSONField har resume pe cache ki tarah kaam karta hai
  — agar future me re-tailor/re-score karna ho to poora extraction dobara
  nahi karna padta
- PostgreSQL read-replica add kar sakte hain jab dashboard/analytics load badhe
