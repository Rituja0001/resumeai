import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  FileText,
  Share2,
  Mic,
  PenTool,
  Sparkles,
  Zap,
  Target,
  Check,
  ArrowRight,
  Star,
  ShieldCheck,
  Flame,
  Plus,
  Minus,
  UploadCloud,
  FileCheck,
  CheckCircle2,
  Award,
  TrendingUp,
  Clock,
  Sparkle,
  HelpCircle
} from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import BuilderPage from "./pages/BuilderPage";

/**
 * GoResume — AI Resume Builder Landing Page
 * Font: Plus Jakarta Sans (universal)
 * Icons: Lucide Icons
 */

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600;1,700&display=swap');`;

function AnimatedNumber({ value, suffix = "", prefix = "", formatCommas = false }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!isInView) return;
    const num = parseInt(value, 10);
    if (isNaN(num)) return;
    let start = 0;
    const duration = 1600;
    const interval = 20;
    const step = num / (duration / interval);

    const timer = setInterval(() => {
      start += step;
      if (start >= num) {
        setCount(num);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isInView, value]);

  const display = isNaN(parseInt(value, 10))
    ? value
    : formatCommas
    ? count.toLocaleString()
    : count;

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

const FAQS = [
  {
    q: "Is GoResume free to use?",
    a: "Yes — building, editing, and checking your resume ATS score is 100% free. Premium exports and unlimited job tailoring are available on advanced plans.",
  },
  {
    q: "Can I build a resume without prior work experience?",
    a: "Absolutely. The Guided Canvas flow includes tailored prompts for projects, internships, coursework, and technical skills specifically designed for students and career switchers.",
  },
  {
    q: "How does the ATS score engine work?",
    a: "Our engine parses your resume against real ATS scanner rules and target job descriptions, identifying keyword coverage, quantifiable impact metrics, and structural formatting.",
  },
  {
    q: "Is my personal career data safe?",
    a: "Yes. All uploaded files, LinkedIn data, and voice transcripts are encrypted and stored in private cloud storage solely to generate your resume.",
  },
];

function HeroResumePreview() {
  return (
    <div className="relative w-full max-w-[460px] mx-auto select-none font-sans">
      {/* Glow Behind Main Card */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500/30 via-[#C9973F]/25 to-purple-500/30 rounded-3xl blur-xl opacity-75 animate-pulse" />

      {/* Main Resume Card */}
      <div className="relative rounded-2xl border border-white/15 bg-[#12142B]/90 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] p-6 sm:p-7 overflow-hidden text-left transition-all duration-300 hover:border-white/25">
        {/* Animated Laser Scanning Line */}
        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9973F] to-transparent scan-laser z-20" />

        {/* Card Header: Candidate Info */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#C9973F] to-indigo-500 flex items-center justify-center text-white font-bold text-base shadow-inner">
              AM
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">Alex Morgan</h4>
              <p className="text-xs text-slate-400 font-medium">Senior Full-Stack Engineer · San Francisco</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            ATS Ready
          </span>
        </div>

        {/* Professional Summary */}
        <div className="mb-4">
          <p className="text-[11px] leading-relaxed text-slate-300 bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
            Product-focused engineer with 5+ years building scalable SaaS platforms. Proven track record optimizing high-throughput distributed systems and leading cross-functional teams.
          </p>
        </div>

        {/* Experience Section */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-[#C9973F] font-bold">Experience</span>
            <span className="text-[10px] font-medium text-slate-400">2022 — Present</span>
          </div>

          <div className="border-l-2 border-indigo-500/40 pl-3 space-y-1.5">
            <p className="text-xs font-bold text-white">Lead Engineer · CloudScale Inc.</p>
            <p className="text-[10px] text-slate-300 leading-snug">
              • Architected microservices migration, reducing <span className="text-[#E5A84B] font-semibold bg-[#C9973F]/15 px-1 rounded">API latency by 42%</span>
            </p>
            <p className="text-[10px] text-slate-300 leading-snug">
              • Scaled real-time event pipeline processing <span className="text-[#E5A84B] font-semibold bg-[#C9973F]/15 px-1 rounded">10M+ daily events</span>
            </p>
            <p className="text-[10px] text-slate-300 leading-snug">
              • Mentored 8 engineers and championed automated CI/CD workflows
            </p>
          </div>
        </div>

        {/* Skills Tag Pills */}
        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#C9973F] font-bold block mb-2">Matched Core Skills</span>
          <div className="flex flex-wrap gap-1.5">
            {["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker", "GraphQL"].map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/10 text-slate-200 border border-white/10 hover:border-[#C9973F]/50 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Card 1: ATS Match Score (Top-Right) */}
      <div className="absolute -top-6 -right-3 sm:-right-6 bg-[#0E1026]/95 border border-emerald-500/40 rounded-2xl p-3.5 sm:p-4 shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-xl float-card z-30 flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex flex-col items-center justify-center text-emerald-400">
          <span className="text-lg font-extrabold leading-none">98</span>
          <span className="text-[8px] font-bold">%</span>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <p className="text-xs font-bold text-white">ATS Score: Elite</p>
          </div>
          <p className="text-[10px] text-slate-400 font-medium">18 / 18 JD keywords matched</p>
        </div>
      </div>

      {/* Floating Card 2: AI Keyword Tailoring (Bottom-Left) */}
      <div className="absolute -bottom-6 -left-3 sm:-left-6 bg-[#0E1026]/95 border border-[#C9973F]/40 rounded-2xl p-3.5 sm:p-4 shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-xl float-card-delayed z-30 max-w-[240px]">
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#C9973F]" />
          <p className="text-xs font-bold text-white">Claude AI Optimization</p>
        </div>
        <p className="text-[10px] text-slate-300 leading-snug mb-2 font-normal">
          Bullet points strengthened with quantified action metrics.
        </p>
        <div className="flex items-center justify-between text-[9px] font-bold text-[#C9973F] bg-[#C9973F]/10 px-2 py-1 rounded-md border border-[#C9973F]/20">
          <span>+3.8x Callback Rate</span>
          <span className="flex items-center gap-0.5"><Check className="w-2.5 h-2.5" /> Verified</span>
        </div>
      </div>

      {/* Floating Card 3: Quick Voice AI Badge (Top-Left) */}
      <div className="hidden sm:flex absolute top-20 -left-6 bg-[#0E1026]/90 border border-indigo-500/40 rounded-xl px-3 py-1.5 shadow-xl backdrop-blur-md items-center gap-2 float-card">
        <Mic className="w-3.5 h-3.5 text-indigo-400" />
        <span className="text-[10px] text-indigo-200 font-semibold">Voice AI Ready</span>
      </div>
    </div>
  );
}

function JobTailoringMockup({ onOpenBuilder }) {
  const SAMPLE_ROLES = [
    {
      id: "fullstack",
      label: "Full-Stack (Stripe)",
      text: "Seeking Senior Full-Stack Engineer with strong React, Node.js, and PostgreSQL expertise. Must have experience optimizing high-throughput distributed systems, GraphQL APIs, and AWS CI/CD pipelines.",
      score: 96,
      matched: ["React", "Node.js", "PostgreSQL", "Distributed Systems", "AWS"],
      missing: ["GraphQL", "CI/CD Pipelines"],
      bulletBefore: "Built backend APIs and maintained frontend components.",
      bulletAfter: "Architected microservices with React & Node.js, reducing API p99 latency by 42% across 2.5M active users.",
    },
    {
      id: "ai_eng",
      label: "AI / Python (OpenAI)",
      text: "Looking for Staff Python Engineer proficient in LLM prompt engineering, vector databases, Redis caching, and building scalable asynchronous background workers.",
      score: 94,
      matched: ["Python", "Redis", "Vector DBs", "Async Workers"],
      missing: ["Prompt Tuning"],
      bulletBefore: "Implemented Python scripts for search queries.",
      bulletAfter: "Engineered real-time vector search pipeline using Python & Redis, improving search retrieval accuracy by 35%.",
    },
  ];

  const [selectedRole, setSelectedRole] = useState(SAMPLE_ROLES[0]);
  const [customJd, setCustomJd] = useState(SAMPLE_ROLES[0].text);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setCustomJd(role.text);
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 500);
  };

  const handleCustomChange = (e) => {
    setCustomJd(e.target.value);
  };

  const currentScore = useMemo(() => {
    if (customJd.trim().length < 20) return 45;
    return Math.min(98, 65 + Math.floor(customJd.length / 10));
  }, [customJd]);

  return (
    <div className="relative w-full max-w-xl mx-auto select-none font-sans">
      {/* Outer Ambient Glow */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-500/25 via-[#C9973F]/30 to-indigo-500/25 rounded-3xl blur-xl opacity-75 animate-pulse" />

      {/* Main Glassmorphic UI Card */}
      <div className="relative rounded-3xl border border-white/15 bg-[#10122B]/90 backdrop-blur-2xl p-5 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden text-left transition-all duration-300 hover:border-white/25">
        {/* Animated Laser Scanning Line */}
        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9973F] to-transparent scan-laser z-20" />

        {/* Header with Preset Role Selectors */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Live AI Matcher</span>
          </div>
          <div className="flex gap-1.5">
            {SAMPLE_ROLES.map((r) => (
              <button
                key={r.id}
                onClick={() => handleSelectRole(r)}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-full transition-all ${
                  selectedRole.id === r.id
                    ? "bg-[#C9973F] text-[#090A17] shadow-sm font-bold"
                    : "bg-white/10 text-slate-300 hover:bg-white/15"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Job Description Input Area */}
        <div className="mb-4">
          <label className="text-[11px] font-semibold text-slate-400 block mb-1.5 flex items-center justify-between">
            <span>Target Job Description</span>
            <span className="text-[10px] text-[#C9973F] font-bold">100% Match Engine</span>
          </label>
          <textarea
            value={customJd}
            onChange={handleCustomChange}
            rows={3}
            placeholder="Paste role responsibilities or job description here…"
            className="w-full text-xs text-slate-200 bg-white/[0.04] border border-white/10 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#C9973F]/50 resize-none font-normal leading-relaxed"
          />
        </div>

        {/* Live ATS Match Score Bar */}
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white">Estimated ATS Match Score</span>
            </div>
            <span className="text-lg font-black text-emerald-400 tracking-tight">{isAnalyzing ? "…" : `${currentScore}%`}</span>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-[#E5A84B] to-[#C9973F] rounded-full transition-all duration-700"
              style={{ width: `${isAnalyzing ? 30 : currentScore}%` }}
            />
          </div>
        </div>

        {/* Extracted Matched & Missing Keywords */}
        <div className="mb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9973F] block mb-2">
            Matched Keywords
          </span>
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {selectedRole.matched.map((kw) => (
              <span
                key={kw}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
              >
                <Check className="w-2.5 h-2.5 text-emerald-400" />
                {kw}
              </span>
            ))}
            {selectedRole.missing.map((kw) => (
              <span
                key={kw}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#C9973F]/15 text-[#E5A84B] border border-[#C9973F]/30"
              >
                <Sparkles className="w-2.5 h-2.5 text-[#C9973F]" />
                + {kw} (AI Injected)
              </span>
            ))}
          </div>
        </div>

        {/* AI Bullet Optimization Diff Preview */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] uppercase font-bold text-slate-400">AI Bullet Point Enhancer</span>
            <span className="text-[9px] font-bold text-[#C9973F] bg-[#C9973F]/10 px-2 py-0.5 rounded">Tailored</span>
          </div>
          <p className="text-[10px] text-slate-400 line-through mb-1 leading-snug">
            "{selectedRole.bulletBefore}"
          </p>
          <p className="text-[11px] text-white font-medium leading-snug flex items-start gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C9973F] shrink-0 mt-0.5" />
            <span>"{selectedRole.bulletAfter}"</span>
          </p>
        </div>
      </div>

      {/* Floating Card: Callback Probability (Top-Right) */}
      <div className="hidden sm:flex absolute -top-5 -right-5 bg-[#0E1026]/95 border border-emerald-500/40 rounded-2xl p-3 shadow-2xl backdrop-blur-xl float-card z-30 items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <TrendingUp className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[11px] font-bold text-white">+48% Response</p>
          <p className="text-[9px] text-slate-400 font-medium">Recruiter Outreach</p>
        </div>
      </div>

      {/* Floating Card: AI Engine Speed (Bottom-Left) */}
      <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-[#0E1026]/95 border border-[#C9973F]/40 rounded-2xl px-3.5 py-2.5 shadow-2xl backdrop-blur-xl float-card-delayed z-30 items-center gap-2">
        <Sparkles className="w-4 h-4 text-[#C9973F]" />
        <div>
          <p className="text-[10px] font-bold text-white">Claude AI Engine</p>
          <p className="text-[9px] text-[#C9973F] font-semibold">1.2s Tailoring</p>
        </div>
      </div>
    </div>
  );
}

function TailoringDemo() {
  return <JobTailoringMockup onOpenBuilder={() => {}} />;
}

function FaqItem({ q, a, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 mb-3.5 overflow-hidden ${
        open
          ? "border-[#C9973F]/40 bg-white shadow-md"
          : "border-[#1C1E3D]/10 bg-white hover:border-[#C9973F]/30 hover:shadow-sm"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-5 sm:p-6 flex items-center justify-between text-left group transition-all"
      >
        <span
          className={`font-bold text-base sm:text-lg transition-colors pr-4 ${
            open ? "text-[#C9973F]" : "text-[#1C1E3D] group-hover:text-[#C9973F]"
          }`}
        >
          {q}
        </span>
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
            open
              ? "bg-[#C9973F] text-[#090A17] rotate-45 shadow-sm"
              : "bg-[#FAF8F3] text-[#1C1E3D] border border-[#1C1E3D]/10 group-hover:bg-[#1C1E3D] group-hover:text-white"
          }`}
        >
          <Plus className="w-4 h-4" />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-[#1C1E3D]/5 text-sm sm:text-base text-[#5B5E74] leading-relaxed font-normal">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("landing"); // landing | builder
  const [activeTab, setActiveTab] = useState("upload");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openBuilder = (tab = "upload") => {
    setActiveTab(tab);
    setPage("builder");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (page === "builder") {
    return <BuilderPage initialTab={activeTab} onBack={() => setPage("landing")} />;
  }

  return (
    <div className="min-h-screen bg-[#FAF8F3] font-sans antialiased text-[#1C1E3D]">
      <style>{`
        ${FONT_IMPORT}
        @keyframes floatSmooth {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes floatSmoothDelayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(8px); }
        }
        @keyframes scanLaser {
          0% { top: 0%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 98%; opacity: 0; }
        }
        .float-card { animation: floatSmooth 4.5s ease-in-out infinite; }
        .float-card-delayed { animation: floatSmoothDelayed 5.2s ease-in-out infinite; }
        .scan-laser { animation: scanLaser 3.6s cubic-bezier(.45,0,.55,1) infinite; }
      `}</style>

      {/* Sticky Glassmorphic Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#090A17]/85 backdrop-blur-md border-b border-white/10 shadow-[0_4px_25px_rgba(0,0,0,0.5)] py-3 sm:py-3.5"
            : "bg-[#090A17]/40 backdrop-blur-sm border-b border-white/5 py-5 sm:py-6"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8">
          {/* GoResume Logo on Left */}
          <div
            onClick={() => setPage("landing")}
            className="flex items-center gap-2.5 cursor-pointer group select-none transition-transform active:scale-95 duration-200"
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#C9973F] to-[#E5A84B] text-[#090A17] flex items-center justify-center text-base font-extrabold shadow-md transition-all duration-200 group-hover:scale-105">
              G
            </span>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-[#C9973F]">
              GoResume
            </span>
          </div>

          {/* Actions on Right */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => openBuilder("upload")}
              className="text-xs sm:text-sm font-semibold text-slate-300 px-3.5 sm:px-4 py-2 rounded-full hover:text-white hover:bg-white/10 active:scale-95 transition-all duration-200"
            >
              Sign In
            </button>
            <button
              onClick={() => openBuilder("upload")}
              className="text-xs sm:text-sm font-bold bg-gradient-to-r from-[#C9973F] to-[#d8a54c] text-[#090A17] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-[0_4px_16px_rgba(201,151,63,0.3)] hover:shadow-[0_6px_22px_rgba(201,151,63,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </header>

      {/* Modern Premium Hero Section */}
      <section className="relative bg-gradient-to-b from-[#090A17] via-[#0E1026] to-[#15173B] text-white pt-32 sm:pt-36 md:pt-40 pb-20 sm:pb-28 overflow-hidden">
        {/* Ambient Glows & Background Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-[-5%] w-[550px] h-[550px] bg-purple-600/12 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute -bottom-20 left-1/3 w-[450px] h-[450px] bg-[#C9973F]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-14 items-center">
          {/* Left Side: Content & CTAs */}
          <div className="text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/40 backdrop-blur-md text-slate-200 text-xs font-semibold mb-6 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Next-Gen ATS Scoring & Voice AI</span>
              <span className="text-[#C9973F] text-[11px] font-bold ml-1">v2.0</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] leading-[1.08] tracking-tight font-extrabold text-white mb-6">
              A resume that reads like you{" "}
              <span className="bg-gradient-to-r from-[#FAF8F3] via-[#E8C88B] to-[#C9973F] bg-clip-text text-transparent italic font-medium">
                got the job already.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-xl font-normal">
              Turn your experience into an ATS-optimized, recruiter-ready resume in minutes. Powered by Claude AI to match job descriptions, sharpen bullet points, and maximize interview callbacks.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {[
                { icon: Zap, title: "98% ATS Pass Rate", desc: "Screening proof", color: "text-amber-400" },
                { icon: Target, title: "Job Tailoring", desc: "1-click JD matching", color: "text-indigo-400" },
                { icon: Mic, title: "Voice AI & Import", desc: "Zero typing needed", color: "text-emerald-400" },
              ].map((feat) => {
                const IconComponent = feat.icon;
                return (
                  <div
                    key={feat.title}
                    className="rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-3 text-left hover:border-white/20 transition-colors"
                  >
                    <IconComponent className={`w-5 h-5 ${feat.color} mb-1.5`} />
                    <p className="text-xs font-bold text-white">{feat.title}</p>
                    <p className="text-[11px] text-slate-400 font-medium">{feat.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button
                onClick={() => openBuilder("upload")}
                className="group relative inline-flex items-center gap-2.5 bg-gradient-to-r from-[#C9973F] to-[#E5A84B] text-[#090A17] font-bold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-[0_8px_25px_rgba(201,151,63,0.35)] hover:shadow-[0_12px_30px_rgba(201,151,63,0.5)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200"
              >
                <span>Build my free resume</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              <a
                href="#tailor"
                className="inline-flex items-center gap-2 border border-white/20 bg-white/5 backdrop-blur-md text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-full hover:bg-white/10 hover:border-white/30 active:scale-95 transition-all duration-200"
              >
                <Sparkles className="w-4 h-4 text-[#C9973F]" />
                <span>See job tailoring</span>
              </a>
            </div>

            {/* Trust & Social Proof */}
            <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
              <div className="flex text-amber-400 text-sm gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-slate-300 font-bold">4.9/5 rating</span>
              <span className="text-slate-600">·</span>
              <span>Trusted by 15,000+ job seekers</span>
            </div>
          </div>

          {/* Right Side: Large Floating Resume Preview */}
          <div className="relative pt-6 lg:pt-0">
            <HeroResumePreview />
          </div>
        </div>
      </section>

      {/* 4 Ways to Build Your Resume Section */}
      <section id="build" className="relative bg-gradient-to-b from-[#15173B] via-[#0D0F26] to-[#0A0B1A] text-white py-24 sm:py-32 px-4 sm:px-6 md:px-8 overflow-hidden">
        {/* Ambient Glows & Background Orbs */}
        <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-purple-600/12 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-[-10%] w-[550px] h-[550px] bg-indigo-600/15 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-[#C9973F]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/50 backdrop-blur-md text-slate-200 text-xs font-semibold mb-4 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-[#C9973F]" />
              <span>Four Flexible Creation Paths</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9973F]" />
              <span className="text-[#C9973F] text-[11px] font-bold">100% ATS-Ready</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-5 leading-[1.15]">
              Four Ways to Build,{" "}
              <span className="bg-gradient-to-r from-[#FAF8F3] via-[#E8C88B] to-[#C9973F] bg-clip-text text-transparent italic font-medium">
                One Winning Resume.
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
              Pick the starting point that fits where you are today. Whether you have an existing file, a LinkedIn profile, a few spoken thoughts, or a blank page — GoResume crafts an executive-grade resume in minutes.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {/* Card 1: Upload Resume */}
            <div
              onClick={() => openBuilder("upload")}
              className="group relative rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 sm:p-7 flex flex-col justify-between hover:border-indigo-500/50 hover:bg-white/[0.07] hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.3)] hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-500/15 border border-indigo-500/25 px-2.5 py-1 rounded-full">
                    PDF / DOCX
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-indigo-200 transition-colors">
                  Upload Resume
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                  Drop your old resume in any format. Claude AI parses your career history, extracts key skills, and restructures it into ATS-compatible sections.
                </p>
                <ul className="space-y-2 text-xs text-slate-400 mb-6 font-medium">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Auto-extracts full history
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Fixes bad formatting
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> 45-second rebuild
                  </li>
                </ul>
              </div>
              <button className="w-full text-xs font-bold py-3 px-4 rounded-xl border border-white/15 bg-white/5 text-white flex items-center justify-center gap-2 group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all duration-200">
                <span>Upload File</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Card 2: Import LinkedIn */}
            <div
              onClick={() => openBuilder("linkedin")}
              className="group relative rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 sm:p-7 flex flex-col justify-between hover:border-blue-500/50 hover:bg-white/[0.07] hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.3)] hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Share2 className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 bg-blue-500/15 border border-blue-500/25 px-2.5 py-1 rounded-full">
                    1-Click Sync
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-blue-200 transition-colors">
                  Import LinkedIn
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                  Connect your LinkedIn profile with one click. We pull your positions, skills, and certifications, generating an executive summary automatically.
                </p>
                <ul className="space-y-2 text-xs text-slate-400 mb-6 font-medium">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Zero manual typing
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Generates executive summary
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Secure OAuth 2.0
                  </li>
                </ul>
              </div>
              <button className="w-full text-xs font-bold py-3 px-4 rounded-xl border border-white/15 bg-white/5 text-white flex items-center justify-center gap-2 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-200">
                <span>Sync Profile</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Card 3: Voice AI (HIGHLIGHTED / FOCUS CARD) */}
            <div
              onClick={() => openBuilder("voice")}
              className="group relative rounded-3xl p-[1.5px] bg-gradient-to-b from-[#C9973F] via-indigo-500 to-[#C9973F]/50 shadow-[0_0_40px_-5px_rgba(201,151,63,0.35)] hover:shadow-[0_0_50px_0px_rgba(201,151,63,0.55)] hover:-translate-y-3 transition-all duration-300 cursor-pointer lg:-translate-y-2"
            >
              {/* Highlight Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-gradient-to-r from-[#C9973F] to-[#E5A84B] text-[#090A17] text-[10px] font-extrabold uppercase tracking-wider shadow-lg z-20 flex items-center gap-1.5 whitespace-nowrap">
                <Flame className="w-3.5 h-3.5 fill-[#090A17]" />
                Most Popular · New
              </div>

              <div className="h-full rounded-[22px] bg-gradient-to-b from-[#1C1E45]/95 via-[#131532]/95 to-[#0E1026]/95 backdrop-blur-2xl p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#C9973F]/20 border border-[#C9973F]/40 flex items-center justify-center text-[#E5A84B] shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <Mic className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-[#E5A84B] bg-[#C9973F]/20 border border-[#C9973F]/40 px-2.5 py-1 rounded-full font-bold">
                      Voice AI
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-[#E5A84B] transition-colors">
                    Just Talk It Through
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6 font-normal">
                    Speak naturally about your career. Voice AI listens, strips filler words, and turns spoken conversation into quantified, ATS-optimized bullet points.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300 mb-6 font-medium">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Real-time speech transcription
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Quantified metric generation
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> 3-minute turnaround
                    </li>
                  </ul>
                </div>
                <button className="w-full text-xs font-bold py-3 px-4 rounded-xl bg-gradient-to-r from-[#C9973F] to-[#E5A84B] text-[#090A17] flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(201,151,63,0.35)] group-hover:shadow-[0_6px_22px_rgba(201,151,63,0.55)] transition-all duration-200">
                  <span>Start Voice Session</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Card 4: Start from Scratch */}
            <div
              onClick={() => openBuilder("scratch")}
              className="group relative rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 sm:p-7 flex flex-col justify-between hover:border-violet-500/50 hover:bg-white/[0.07] hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.3)] hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-400 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <PenTool className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-violet-300 bg-violet-500/15 border border-violet-500/25 px-2.5 py-1 rounded-full">
                    Guided Canvas
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-violet-200 transition-colors">
                  Build from Scratch
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                  Start fresh with real-time AI assistance. Jot down your role and rough notes — our guided assistant crafts compelling, action-verb-led bullets on the fly.
                </p>
                <ul className="space-y-2 text-xs text-slate-400 mb-6 font-medium">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Live AI bullet suggestions
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Role-specific ATS keywords
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Interactive live editor
                  </li>
                </ul>
              </div>
              <button className="w-full text-xs font-bold py-3 px-4 rounded-xl border border-white/15 bg-white/5 text-white flex items-center justify-center gap-2 group-hover:bg-violet-600 group-hover:border-violet-500 transition-all duration-200">
                <span>Start Blank</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Premium ATS Statistics Section */}
      <section className="relative bg-gradient-to-b from-[#0A0B1A] via-[#0E1029] to-[#0A0B1A] py-24 sm:py-32 px-4 sm:px-6 md:px-8 text-white overflow-hidden font-sans">
        {/* Ambient Glows & Blurred Background Orbs */}
        <div className="absolute top-1/3 left-[-5%] w-[500px] h-[500px] bg-purple-600/12 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-[-5%] w-[550px] h-[550px] bg-indigo-600/15 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-[#C9973F]/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-35" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Top Trustpilot-Style Rating Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 backdrop-blur-md text-slate-200 text-xs font-semibold shadow-[0_0_25px_rgba(16,185,129,0.2)] float-card">
              <div className="w-5 h-5 bg-[#00B67A] text-white flex items-center justify-center rounded-[4px] shadow-sm">
                <Star className="w-3.5 h-3.5 fill-white text-white" />
              </div>
              <div className="flex gap-0.5 text-[#00B67A]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#00B67A] text-[#00B67A]" />
                ))}
              </div>
              <span className="text-slate-300 font-bold">4.9 / 5</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300 font-medium">Recruiter Verified</span>
            </div>
          </div>

          {/* Section Heading & Subtitle */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-5 leading-[1.15]">
              Proven to Beat ATS Algorithms &{" "}
              <span className="bg-gradient-to-r from-[#FAF8F3] via-[#E8C88B] to-[#C9973F] bg-clip-text text-transparent italic font-medium">
                Land Real Interviews.
              </span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
              Backed by data from over 150,000+ resumes processed and calibrated against top corporate ATS screening benchmarks.
            </p>
          </div>

          {/* 3 Glassmorphism Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-16">
            {/* Card 1: 8x More Interviews */}
            <div className="group relative rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 flex flex-col justify-between hover:border-[#C9973F]/50 hover:bg-white/[0.07] hover:shadow-[0_25px_50px_-12px_rgba(201,151,63,0.25)] hover:-translate-y-2 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#C9973F]/15 border border-[#C9973F]/30 flex items-center justify-center text-[#E5A84B] shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5A84B] bg-[#C9973F]/15 border border-[#C9973F]/25 px-3 py-1 rounded-full">
                    Impact Multiplier
                  </span>
                </div>
                <div className="mb-4">
                  <span className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FAF8F3] via-[#FAF8F3] to-[#E5A84B] tracking-tight">
                    <AnimatedNumber value="8" suffix="×" />
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#E5A84B] transition-colors">
                  More Interview Callbacks
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-6">
                  Resumes optimized with GoResume match recruiter AI scoring rules, yielding up to 8× more interview invites compared to standard generic templates.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[#E5A84B]">
                <span>+78% First-round response</span>
                <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Proven</span>
              </div>
            </div>

            {/* Card 2: 98% ATS Pass Rate (Featured Card) */}
            <div className="group relative rounded-3xl p-[1.5px] bg-gradient-to-b from-emerald-400 via-indigo-500 to-[#C9973F] shadow-[0_0_40px_-5px_rgba(16,185,129,0.25)] hover:shadow-[0_0_50px_0px_rgba(16,185,129,0.45)] hover:-translate-y-3 transition-all duration-300 lg:-translate-y-2">
              <div className="h-full rounded-[22px] bg-gradient-to-b from-[#131E35]/95 via-[#0E1528]/95 to-[#0A0D1E]/95 backdrop-blur-2xl p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 rounded-full">
                      ATS Verified
                    </span>
                  </div>
                  <div className="mb-4">
                    <span className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-[#FAF8F3] to-[#E5A84B] tracking-tight">
                      <AnimatedNumber value="98" suffix="%" />
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                    ATS Screening Pass Rate
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal mb-6">
                    Tested against Workday, Taleo, Greenhouse, Lever, and 40+ industry screening parsers with zero formatting glitches or dropped sections.
                  </p>
                </div>
                <div className="pt-4 border-t border-emerald-500/20 flex items-center justify-between text-xs font-semibold text-emerald-300">
                  <span>Tested on 50+ ATS engines</span>
                  <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5" /> 100% Parsable</span>
                </div>
              </div>
            </div>

            {/* Card 3: Under 2 Min Completion */}
            <div className="group relative rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 flex flex-col justify-between hover:border-indigo-500/50 hover:bg-white/[0.07] hover:shadow-[0_25px_50px_-12px_rgba(99,102,241,0.25)] hover:-translate-y-2 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Clock className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-500/15 border border-indigo-500/25 px-3 py-1 rounded-full">
                    Lightning Fast
                  </span>
                </div>
                <div className="mb-4">
                  <span className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-[#FAF8F3] to-[#E5A84B] tracking-tight">
                    <AnimatedNumber value="2" prefix="< " suffix=" Min" />
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-200 transition-colors">
                  Average Generation Time
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-6">
                  Upload an old document, connect LinkedIn, or speak your experience out loud. Claude AI formats and polishes your executive resume in record time.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-indigo-300">
                <span>Instant PDF & DOCX export</span>
                <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> 45s Setup</span>
              </div>
            </div>
          </div>

          {/* Premium CTA Button Below */}
          <div className="text-center">
            <button
              onClick={() => openBuilder("upload")}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#C9973F] to-[#E5A84B] text-[#090A17] font-bold text-base px-9 py-4 rounded-full shadow-[0_10px_35px_rgba(201,151,63,0.35)] hover:shadow-[0_15px_45px_rgba(201,151,63,0.6)] hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all duration-300"
            >
              <span>Build My ATS-Ready Resume Free</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
            <p className="text-xs text-slate-400 mt-3 font-medium">
              ✨ 100% Free to start · No credit card required · Instant download
            </p>
          </div>
        </div>
      </section>

      {/* Step 4: Job-Specific AI Resume Tailoring Section */}
      <section id="tailor" className="relative bg-gradient-to-b from-[#0A0B1A] via-[#0E1026] to-[#141638] text-white py-24 sm:py-32 px-4 sm:px-6 md:px-8 relative overflow-hidden font-sans">
        {/* Ambient Glows & Blurred Background Orbs */}
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-purple-600/12 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-[-5%] w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-[#C9973F]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-35" />

        <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-[1.1fr_1.2fr] gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading, Description, Feature List & CTA */}
          <div className="text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/40 backdrop-blur-md text-slate-200 text-xs font-semibold mb-6 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
              <Target className="w-3.5 h-3.5 text-[#C9973F]" />
              <span>Real-Time Job Tailoring</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9973F]" />
              <span className="text-[#C9973F] text-[11px] font-bold">Claude 3.5 Sonnet</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-[1.12] tracking-tight">
              Land More Interviews.{" "}
              <span className="bg-gradient-to-r from-[#FAF8F3] via-[#E8C88B] to-[#C9973F] bg-clip-text text-transparent italic font-medium">
                Tailor to Every Single Job.
              </span>
            </h2>

            {/* Supporting Description */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 font-normal">
              Generic resumes get filtered out. GoResume analyzes the target job description in seconds, extracts must-have ATS keywords, re-ranks your experience, and rewrites bullet points to match the exact requirements of the hiring manager.
            </p>

            {/* Feature Checkpoints */}
            <div className="grid sm:grid-cols-2 gap-3.5 mb-8">
              {[
                { title: "Match Missing Keywords", desc: "Injects missing skills naturally" },
                { title: "Instant Score Boost", desc: "Elevate ATS match to 95%+" },
                { title: "Quantified Bullets", desc: "Impact action-verb rewrites" },
                { title: "1-Click Tailored PDF", desc: "Job-ready export in seconds" },
              ].map((feat) => (
                <div
                  key={feat.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-3.5 flex items-start gap-3 hover:border-white/20 transition-colors"
                >
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{feat.title}</h4>
                    <p className="text-[11px] text-slate-400 font-medium">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => openBuilder("upload")}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#C9973F] to-[#E5A84B] text-[#090A17] font-bold text-base px-8 py-4 rounded-full shadow-[0_10px_35px_rgba(201,151,63,0.35)] hover:shadow-[0_15px_45px_rgba(201,151,63,0.6)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200"
              >
                <span>Tailor My Resume with AI</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive AI Job Tailoring UI Mockup */}
          <div className="relative pt-6 lg:pt-0">
            <JobTailoringMockup onOpenBuilder={openBuilder} />
          </div>
        </div>
      </section>

      {/* Step 5: Modern FAQ Section */}
      <section className="bg-[#FAF8F3] py-24 sm:py-32 px-4 sm:px-6 md:px-8 border-t border-[#1C1E3D]/5 relative overflow-hidden font-sans">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#C9973F]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading, Subtitle & Support CTA Card */}
          <div className="text-left lg:sticky lg:top-28">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#1C1E3D]/10 bg-[#1C1E3D]/5 text-[#1C1E3D] text-xs font-bold mb-4">
              <HelpCircle className="w-3.5 h-3.5 text-[#C9973F]" />
              <span>Got Questions?</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1C1E3D] mb-5 leading-[1.12] tracking-tight">
              Still in Doubt?{" "}
              <span className="text-[#C9973F] block font-medium italic mt-1">
                We Have Answers.
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#5B5E74] leading-relaxed mb-8 font-normal">
              Everything you need to know about GoResume's AI ATS engine, data security, formatting compatibility, and free plan.
            </p>

            {/* Support / Quick Start Card */}
            <div className="rounded-3xl border border-[#1C1E3D]/10 bg-white p-6 sm:p-7 shadow-[0_4px_20px_rgba(28,30,61,0.04)]">
              <div className="w-10 h-10 rounded-xl bg-[#C9973F]/15 text-[#C9973F] flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#1C1E3D] mb-1.5">Ready to build your resume?</h4>
              <p className="text-xs text-[#5B5E74] leading-relaxed mb-5 font-normal">
                Join 15,000+ candidates who got hired at top tech and enterprise companies. Free to start in 2 minutes.
              </p>
              <button
                onClick={() => openBuilder("upload")}
                className="w-full font-bold text-xs sm:text-sm bg-[#1C1E3D] text-white py-3.5 px-5 rounded-full hover:bg-[#2a2d55] flex items-center justify-center gap-2 shadow-sm transition-all group"
              >
                <span>Create My Free Resume</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: FAQ Accordions */}
          <div>
            {FAQS.map((f, i) => (
              <FaqItem key={f.q} {...f} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Last Section: Modern Premium Final CTA */}
      <section className="relative bg-gradient-to-b from-[#090A17] via-[#0E1026] to-[#070812] text-white py-24 sm:py-32 px-4 sm:px-6 md:px-8 overflow-hidden font-sans border-t border-white/5">
        {/* Ambient Gradient Glows & Floating Orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[500px] bg-gradient-to-tr from-purple-600/20 via-[#C9973F]/20 to-indigo-600/20 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Glassmorphic Container Card */}
          <div className="relative rounded-3xl border border-white/15 bg-white/[0.03] backdrop-blur-2xl p-8 sm:p-14 lg:p-16 text-center shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* Animated Laser Scanning Accent */}
            <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9973F]/60 to-transparent scan-laser z-20" />

            {/* Top Uppercase Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9973F]/30 bg-[#C9973F]/10 text-[#E5A84B] text-[11px] font-extrabold uppercase tracking-wider mb-6 shadow-[0_0_20px_rgba(201,151,63,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>START FOR FREE — NO CARD NEEDED</span>
            </div>

            {/* Main Headline with Animated User Count */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold tracking-tight text-white mb-6 leading-[1.14] max-w-4xl mx-auto">
              Join{" "}
              <span className="bg-gradient-to-r from-[#FAF8F3] via-[#E8C88B] to-[#C9973F] bg-clip-text text-transparent italic font-medium">
                <AnimatedNumber value="769524" formatCommas={true} suffix="+" />
              </span>{" "}
              Professionals Building Better Resumes.
            </h2>

            {/* Supporting Copy */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10 font-normal">
              Upload your old resume, speak for a few minutes, or sync your LinkedIn profile. Walk away with an ATS-proof, recruiter-ready resume in under 2 minutes.
            </p>

            {/* Prominent CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <button
                onClick={() => openBuilder("upload")}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#C9973F] to-[#E5A84B] text-[#090A17] font-extrabold text-base sm:text-lg px-9 sm:px-11 py-4 sm:py-4.5 rounded-full shadow-[0_10px_35px_rgba(201,151,63,0.4)] hover:shadow-[0_15px_50px_rgba(201,151,63,0.65)] hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all duration-300"
              >
                <span>Build My Resume Free</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Trust & Guarantee Micro-Pills */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Instant AI Generation</span>
              </div>
              <span className="hidden sm:inline text-slate-600">·</span>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>98% ATS Compatibility</span>
              </div>
              <span className="hidden sm:inline text-slate-600">·</span>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span>100% Private & Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="bg-[#070812] text-slate-400 font-sans border-t border-white/5 py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div
            onClick={() => {
              setPage("landing");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#C9973F] to-[#E5A84B] text-[#090A17] flex items-center justify-center text-sm font-extrabold shadow-sm transition-transform group-hover:scale-105">
              G
            </span>
            <span className="text-lg font-bold tracking-tight text-white transition-colors group-hover:text-[#C9973F]">
              GoResume
            </span>
          </div>

          <p className="text-xs text-slate-500 font-normal text-center sm:text-left">
            © 2026 GoResume — Next-Gen AI Resume & ATS Engine. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
            <span className="hover:text-white transition-colors cursor-pointer" onClick={() => openBuilder("upload")}>Upload</span>
            <span className="hover:text-white transition-colors cursor-pointer" onClick={() => openBuilder("linkedin")}>LinkedIn</span>
            <span className="hover:text-white transition-colors cursor-pointer" onClick={() => openBuilder("voice")}>Voice AI</span>
            <span className="hover:text-white transition-colors cursor-pointer" onClick={() => openBuilder("scratch")}>Scratch</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
