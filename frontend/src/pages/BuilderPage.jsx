import React, { useState, useRef, useCallback } from "react";
import {
  FileText,
  Share2,
  Mic,
  PenTool,
  UploadCloud,
  Sparkles,
  CheckCircle2,
  Square,
  ArrowRight,
  ArrowLeft,
  Plus,
  Save,
  Check
} from "lucide-react";

/**
 * GoResume — Builder Page
 * Font: Plus Jakarta Sans (universal)
 * Icons: Lucide Icons
 */

const TABS = [
  { key: "upload", label: "Upload", icon: UploadCloud },
  { key: "linkedin", label: "LinkedIn", icon: Share2 },
  { key: "voice", label: "Voice AI", icon: Mic },
  { key: "scratch", label: "From Scratch", icon: PenTool },
];

const EMPTY_RESUME = {
  title: "Untitled Resume",
  professional_summary: "",
  experiences: [],
  education: [],
  skills: [],
};

/* ---------------------------------------------------------------------- */
/* Upload panel                                                           */
/* ---------------------------------------------------------------------- */
function UploadPanel({ onResume }) {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | uploading | processing | done | error
  const inputRef = useRef(null);

  const accept = [".pdf", ".docx", ".png", ".jpg", ".jpeg"];

  const handleFiles = (files) => {
    const f = files?.[0];
    if (!f) return;
    const ext = "." + f.name.split(".").pop().toLowerCase();
    if (!accept.includes(ext)) {
      setStatus("error");
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setStatus("error");
      return;
    }
    setFile(f);
    runUploadFlow(f);
  };

  const runUploadFlow = (f) => {
    setStatus("uploading");
    setTimeout(() => {
      setStatus("processing");
      setTimeout(() => {
        setStatus("done");
        onResume({
          ...EMPTY_RESUME,
          title: f.name.replace(/\.[^.]+$/, ""),
          professional_summary:
            "Product-minded software engineer with 4+ years building and shipping consumer web applications.",
          experiences: [
            {
              company: "Acme Corp",
              role: "Senior Software Engineer",
              start_date: "2022-01",
              end_date: null,
              is_current: true,
              bullet_points: [
                "Led migration of monolith to microservices, cutting deploy time by 60%",
                "Mentored 3 junior engineers through structured code review",
              ],
            },
          ],
          education: [{ institution: "State University", degree: "B.Tech, Computer Science" }],
          skills: [{ name: "React" }, { name: "Python" }, { name: "PostgreSQL" }],
        });
      }, 1600);
    }, 700);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  }, []);

  return (
    <div className="font-sans">
      <h3 className="text-xl font-bold text-[#1C1E3D] mb-1 tracking-tight">Upload your resume</h3>
      <p className="text-sm text-[#5B5E74] mb-5 font-normal">PDF, DOCX, PNG or JPG — up to 10MB.</p>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer transition-all ${
          dragOver ? "border-[#C9973F] bg-[#C9973F]/5" : "border-[#1C1E3D]/15 bg-white hover:border-[#C9973F]/40"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept.join(",")}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="w-12 h-12 rounded-2xl bg-[#C9973F]/10 text-[#C9973F] flex items-center justify-center mx-auto mb-3">
          <UploadCloud className="w-6 h-6" />
        </div>
        <p className="text-sm text-[#1C1E3D] font-semibold">
          {file ? file.name : "Drag a file here, or click to browse"}
        </p>
      </div>

      {status === "error" && (
        <p className="mt-3 text-sm text-red-600 font-medium">
          That file type or size isn't supported. Try a PDF, DOCX, PNG or JPG under 10MB.
        </p>
      )}
      {status === "uploading" && <StatusRow label="Uploading file…" />}
      {status === "processing" && <StatusRow label="Claude AI is reading your resume and matching it to ATS schema…" />}
      {status === "done" && (
        <p className="mt-3 text-sm text-[#2F6E52] font-semibold flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4" /> Resume rebuilt — review it in the editor on the right.
        </p>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* LinkedIn panel                                                         */
/* ---------------------------------------------------------------------- */
function LinkedInPanel({ onResume }) {
  const [status, setStatus] = useState("idle"); // idle | connecting | importing | done

  const connect = () => {
    setStatus("connecting");
    setTimeout(() => {
      setStatus("importing");
      setTimeout(() => {
        setStatus("done");
        onResume({
          ...EMPTY_RESUME,
          title: "Resume from LinkedIn",
          professional_summary: "Marketing leader with a decade of experience scaling B2B SaaS growth teams.",
          experiences: [
            {
              company: "Northwind Analytics",
              role: "Head of Growth Marketing",
              start_date: "2020-03",
              end_date: null,
              is_current: true,
              bullet_points: ["Grew MQL pipeline 3x through lifecycle email and paid channel expansion"],
            },
          ],
          education: [{ institution: "Delhi University", degree: "BA, Economics" }],
          skills: [{ name: "Growth strategy" }, { name: "SQL" }, { name: "HubSpot" }],
        });
      }, 1500);
    }, 900);
  };

  return (
    <div className="font-sans">
      <h3 className="text-xl font-bold text-[#1C1E3D] mb-1 tracking-tight">Import from LinkedIn</h3>
      <p className="text-sm text-[#5B5E74] mb-5 font-normal">
        We only read your positions, education and skills — never your password.
      </p>
      <div className="rounded-2xl border border-[#1C1E3D]/10 bg-white p-8 text-center">
        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center mx-auto mb-4">
          <Share2 className="w-6 h-6" />
        </div>
        {status === "idle" && (
          <button
            onClick={connect}
            className="font-bold bg-[#1C1E3D] text-white px-6 py-3 rounded-full hover:bg-[#2a2d55] transition-all flex items-center gap-2 mx-auto"
          >
            <span>Connect LinkedIn</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
        {status === "connecting" && <StatusRow label="Waiting for LinkedIn authorization…" />}
        {status === "importing" && <StatusRow label="Mapping your profile into an executive resume…" />}
        {status === "done" && (
          <p className="text-sm text-[#2F6E52] font-semibold flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> Profile imported — review it on the right.
          </p>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Voice AI panel                                                         */
/* ---------------------------------------------------------------------- */
function VoicePanel({ onResume }) {
  const [status, setStatus] = useState("idle"); // idle | recording | transcribing | structuring | done
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  const startRecording = () => {
    setStatus("recording");
    setSeconds(0);
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
  };

  const stopRecording = () => {
    clearInterval(timerRef.current);
    setStatus("transcribing");
    setTimeout(() => {
      setStatus("structuring");
      setTimeout(() => {
        setStatus("done");
        onResume({
          ...EMPTY_RESUME,
          title: "Resume from Voice AI",
          professional_summary: "Operations coordinator with hands-on experience across logistics and vendor management.",
          experiences: [
            {
              company: "Metro Supply Co.",
              role: "Operations Coordinator",
              start_date: "2021-06",
              end_date: null,
              is_current: true,
              bullet_points: ["Coordinated daily dispatch for a fleet of 40+ vehicles", "Negotiated vendor contracts saving 12% annually"],
            },
          ],
          education: [{ institution: "Mumbai University", degree: "B.Com" }],
          skills: [{ name: "Logistics" }, { name: "Vendor management" }, { name: "Excel" }],
        });
      }, 1400);
    }, 1300);
  };

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="font-sans">
      <h3 className="text-xl font-bold text-[#1C1E3D] mb-1 tracking-tight">Talk it through</h3>
      <p className="text-sm text-[#5B5E74] mb-5 font-normal">
        Describe your roles, achievements and skills out loud — AI structures it for you.
      </p>
      <div className="rounded-2xl border border-[#1C1E3D]/10 bg-white p-8 text-center">
        <button
          onClick={status === "recording" ? stopRecording : status === "idle" ? startRecording : undefined}
          disabled={status === "transcribing" || status === "structuring"}
          className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 transition-all ${
            status === "recording" ? "bg-red-600 text-white animate-pulse" : "bg-[#1C1E3D] text-white hover:bg-[#2a2d55]"
          } disabled:opacity-40 shadow-lg`}
        >
          {status === "recording" ? <Square className="w-6 h-6 fill-white" /> : <Mic className="w-6 h-6" />}
        </button>

        {status === "idle" && <p className="text-sm text-[#1C1E3D] font-semibold">Tap to start recording</p>}
        {status === "recording" && (
          <p className="text-sm text-red-600 font-bold">Recording… {fmt(seconds)} — tap to finish</p>
        )}
        {status === "transcribing" && <StatusRow label="Transcribing your audio with AI…" />}
        {status === "structuring" && <StatusRow label="Structuring executive bullet points from transcript…" />}
        {status === "done" && (
          <p className="text-sm text-[#2F6E52] font-semibold flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> Resume ready — review it on the right.
          </p>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Scratch panel — guided form with AI bullet suggestions                 */
/* ---------------------------------------------------------------------- */
function ScratchPanel({ resume, setResume }) {
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");
  const [suggesting, setSuggesting] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const suggestBullets = () => {
    if (!role.trim() || notes.trim().length < 10) return;
    setSuggesting(true);
    setTimeout(() => {
      setSuggestions([
        `Delivered ${role.toLowerCase()} work at ${company || "the company"} improving team output`,
        "Collaborated cross-functionally with product and design to ship on schedule",
        "Streamlined internal process, reducing turnaround time by 25%",
      ]);
      setSuggesting(false);
    }, 1100);
  };

  const addExperience = () => {
    if (!role.trim() || !company.trim()) return;
    setResume((r) => ({
      ...r,
      experiences: [
        ...r.experiences,
        { company, role, start_date: "", end_date: null, is_current: true, bullet_points: suggestions.length ? suggestions : [notes] },
      ],
    }));
    setRole(""); setCompany(""); setNotes(""); setSuggestions([]);
  };

  return (
    <div className="font-sans">
      <h3 className="text-xl font-bold text-[#1C1E3D] mb-1 tracking-tight">Build from scratch</h3>
      <p className="text-sm text-[#5B5E74] mb-5 font-normal">Add a role, jot rough notes, and let AI turn them into strong bullet points.</p>

      <div className="rounded-2xl border border-[#1C1E3D]/10 bg-white p-6 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role (e.g. Sales Associate)"
            className="rounded-lg border border-[#1C1E3D]/20 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9973F]/40" />
          <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company"
            className="rounded-lg border border-[#1C1E3D]/20 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9973F]/40" />
        </div>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
          placeholder="Rough notes: what did you actually do day to day?"
          className="w-full rounded-lg border border-[#1C1E3D]/20 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9973F]/40 resize-none" />

        <button onClick={suggestBullets} disabled={suggesting || !role.trim() || notes.trim().length < 10}
          className="text-sm font-semibold border border-[#1C1E3D]/20 text-[#1C1E3D] px-4 py-2 rounded-full disabled:opacity-30 flex items-center gap-1.5 hover:bg-[#1C1E3D]/5 transition-all">
          <Sparkles className="w-3.5 h-3.5 text-[#C9973F]" />
          <span>{suggesting ? "Thinking with AI…" : "Suggest bullet points"}</span>
        </button>

        {suggestions.length > 0 && (
          <ul className="space-y-1.5 pt-2">
            {suggestions.map((s, i) => (
              <li key={i} className="text-sm text-[#1C1E3D] bg-[#C9973F]/10 rounded-lg px-3 py-2 flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#C9973F] mt-1 shrink-0" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        )}

        <button onClick={addExperience} disabled={!role.trim() || !company.trim()}
          className="text-sm font-bold bg-[#1C1E3D] text-white px-5 py-2.5 rounded-full disabled:opacity-30 hover:bg-[#2a2d55] transition-all flex items-center gap-1.5">
          <Plus className="w-4 h-4" />
          <span>Add to Resume</span>
        </button>
      </div>
    </div>
  );
}

function StatusRow({ label }) {
  return (
    <p className="mt-3 text-sm text-[#5B5E74] font-semibold animate-pulse flex items-center justify-center gap-2">
      <Sparkles className="w-4 h-4 text-[#C9973F]" />
      {label}
    </p>
  );
}

/* ---------------------------------------------------------------------- */
/* Live editor — right-hand pane, reflects whatever `resume` currently is */
/* ---------------------------------------------------------------------- */
function LiveEditor({ resume, setResume }) {
  const updateSummary = (v) => setResume((r) => ({ ...r, professional_summary: v }));

  return (
    <div className="sticky top-6 rounded-2xl border border-[#1C1E3D]/10 bg-white p-6 max-h-[80vh] overflow-y-auto font-sans shadow-sm">
      <p className="text-[10px] uppercase tracking-wider text-[#C9973F] font-bold mb-1 flex items-center gap-1">
        <Sparkles className="w-3 h-3" /> Live Preview
      </p>
      <input
        value={resume.title}
        onChange={(e) => setResume((r) => ({ ...r, title: e.target.value }))}
        className="text-2xl font-bold text-[#1C1E3D] w-full mb-3 bg-transparent focus:outline-none tracking-tight"
      />
      <textarea
        value={resume.professional_summary}
        onChange={(e) => updateSummary(e.target.value)}
        placeholder="Professional summary will appear here…"
        rows={3}
        className="w-full text-sm text-[#5B5E74] bg-[#FAF8F3] rounded-lg p-3 mb-5 resize-none focus:outline-none focus:ring-2 focus:ring-[#C9973F]/40"
      />

      {resume.experiences.length > 0 && (
        <div className="mb-5">
          <h4 className="text-xs uppercase tracking-wider text-[#1C1E3D] font-bold mb-2">Experience</h4>
          {resume.experiences.map((exp, i) => (
            <div key={i} className="mb-3 pb-3 border-b border-[#1C1E3D]/10 last:border-0">
              <p className="text-sm font-bold text-[#1C1E3D]">{exp.role} · {exp.company}</p>
              <ul className="mt-1 space-y-1">
                {exp.bullet_points.map((b, j) => (
                  <li key={j} className="text-xs text-[#5B5E74] pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-[#C9973F]">{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {resume.education.length > 0 && (
        <div className="mb-5">
          <h4 className="text-xs uppercase tracking-wider text-[#1C1E3D] font-bold mb-2">Education</h4>
          {resume.education.map((edu, i) => (
            <p key={i} className="text-sm text-[#1C1E3D] font-semibold">{edu.degree} — {edu.institution}</p>
          ))}
        </div>
      )}

      {resume.skills.length > 0 && (
        <div>
          <h4 className="text-xs uppercase tracking-wider text-[#1C1E3D] font-bold mb-2">Skills</h4>
          <div className="flex flex-wrap gap-1.5">
            {resume.skills.map((s, i) => (
              <span key={i} className="text-xs font-semibold bg-[#C9973F]/15 text-[#8A6A28] rounded-full px-3 py-1">{s.name}</span>
            ))}
          </div>
        </div>
      )}

      {resume.experiences.length === 0 && resume.education.length === 0 && (
        <p className="text-sm text-[#5B5E74] italic font-normal">Pick a build path on the left to fill this in.</p>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Page shell                                                              */
/* ---------------------------------------------------------------------- */
export default function BuilderPage({ initialTab = "upload", onBack }) {
  const [tab, setTab] = useState(initialTab);
  const [resume, setResume] = useState(EMPTY_RESUME);

  return (
    <div className="min-h-screen bg-[#FAF8F3] font-sans antialiased text-[#1C1E3D]">
      <header className="max-w-6xl mx-auto flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="text-xs font-semibold text-[#5B5E74] hover:text-[#1C1E3D] transition-colors border border-[#1C1E3D]/15 px-3.5 py-1.5 rounded-full flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
          )}
          <span
            onClick={onBack}
            className={`text-xl font-extrabold tracking-tight text-[#1C1E3D] ${onBack ? 'cursor-pointer' : ''}`}
          >
            GoResume
          </span>
        </div>
        <button className="text-sm font-bold bg-[#1C1E3D] text-white px-5 py-2.5 rounded-full hover:bg-[#2a2d55] transition-all flex items-center gap-1.5">
          <Save className="w-4 h-4" />
          <span>Save & Continue</span>
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-[1fr_1fr] gap-10">
        <div>
          <div className="flex gap-2 mb-6 flex-wrap">
            {TABS.map((t) => {
              const TabIcon = t.icon;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`text-sm font-semibold px-4 py-2.5 rounded-full border transition-all flex items-center gap-2 ${
                    tab === t.key
                      ? "bg-[#1C1E3D] text-white border-[#1C1E3D] shadow-sm"
                      : "bg-white text-[#1C1E3D] border-[#1C1E3D]/15 hover:border-[#C9973F]/40"
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          {tab === "upload" && <UploadPanel onResume={setResume} />}
          {tab === "linkedin" && <LinkedInPanel onResume={setResume} />}
          {tab === "voice" && <VoicePanel onResume={setResume} />}
          {tab === "scratch" && <ScratchPanel resume={resume} setResume={setResume} />}
        </div>

        <LiveEditor resume={resume} setResume={setResume} />
      </main>
    </div>
  );
}
