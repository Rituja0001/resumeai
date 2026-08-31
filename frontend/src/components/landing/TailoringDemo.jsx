import React, { useState, useMemo } from "react";
import { ShieldCheck, Check, Sparkles, TrendingUp, Target } from "lucide-react";
import { SAMPLE_ROLES } from "./constants";

export default function TailoringDemo({ onOpenBuilder }) {
  const [selectedRole, setSelectedRole] = useState(SAMPLE_ROLES[0]);
  const [customJd, setCustomJd] = useState(SAMPLE_ROLES[0].text);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setCustomJd(role.text);
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 550);
  };

  const handleCustomChange = (e) => {
    setCustomJd(e.target.value);
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 400);
  };

  const currentScore = useMemo(() => {
    if (customJd.trim().length < 20) return 48;
    return Math.min(98, 68 + Math.floor(customJd.length / 14));
  }, [customJd]);

  return (
    <div className="relative w-full max-w-xl mx-auto select-none font-['Plus_Jakarta_Sans']">
      <style>{`
        @keyframes floatSlow1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes floatSlow2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(6px); }
        }
        @keyframes shimmerBar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .float-badge-1 {
          animation: floatSlow1 4.8s ease-in-out infinite;
        }
        .float-badge-2 {
          animation: floatSlow2 5.4s ease-in-out infinite;
        }
        .shimmer-active {
          animation: shimmerBar 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      {/* Outer Soft Atmosphere */}
      <div className="absolute -inset-2 bg-gradient-to-tr from-[#FA0C40]/10 via-rose-100/40 to-[#FA0C40]/10 rounded-[36px] blur-xl opacity-75 pointer-events-none" />

      {/* Main Glassmorphic White UI Card */}
      <div className="relative bg-white rounded-3xl border border-[#252525]/10 shadow-[0_20px_50px_rgba(37,37,37,0.08)] p-5 sm:p-7 overflow-hidden text-left transition-all duration-300 hover:border-[#FA0C40]/30">
        {/* Animated Laser Scanning Accent */}
        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FA0C40]/60 to-transparent scan-laser z-20" />

        {/* Card Header with Live Indicator & Preset Selectors */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#252525]/10 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FA0C40] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FA0C40]" />
            </span>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#252525]">
              Live AI Matcher
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {SAMPLE_ROLES.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => handleSelectRole(r)}
                className={`text-[11px] font-bold px-3 py-1 rounded-full transition-all cursor-pointer ${
                  selectedRole.id === r.id
                    ? "bg-[#FA0C40] text-white shadow-sm"
                    : "bg-[#252525]/5 text-[#252525]/80 hover:bg-[#252525]/10"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Target Job Description Textarea */}
        <div className="mb-4">
          <label className="text-[11px] font-bold text-[#252525] block mb-1.5 flex items-center justify-between">
            <span>Target job description</span>
            <span className="text-[10px] text-[#FA0C40] font-extrabold uppercase tracking-wider">
              ATS match engine
            </span>
          </label>
          <textarea
            value={customJd}
            onChange={handleCustomChange}
            rows={3}
            placeholder="Paste role responsibilities or job description here…"
            className="w-full text-xs text-[#252525] bg-[#252525]/[0.02] border border-[#252525]/10 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#FA0C40]/30 focus:border-[#FA0C40]/50 resize-none font-normal leading-relaxed transition-all"
          />
        </div>

        {/* Live ATS Match Score Section */}
        <div className="rounded-2xl bg-[#252525]/[0.02] border border-[#252525]/10 p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#FA0C400D] text-[#FA0C40] flex items-center justify-center">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-[#252525]">
                Estimated ATS match score
              </span>
            </div>
            <span className="text-xl sm:text-2xl font-extrabold text-[#FA0C40] tracking-tight">
              {isAnalyzing ? "…" : `${currentScore}%`}
            </span>
          </div>

          <div className="h-2.5 rounded-full bg-[#252525]/10 overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-[#FA0C40] via-rose-400 to-[#FA0C40] rounded-full transition-all duration-700"
              style={{ width: `${isAnalyzing ? 35 : currentScore}%` }}
            />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent shimmer-active" />
            )}
          </div>
        </div>

        {/* Matched & Suggested Keywords Section */}
        <div className="mb-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6B6B] block mb-2">
            MATCHED KEYWORDS
          </span>
          <div className="flex flex-wrap gap-1.5 mb-1">
            {selectedRole.matched.map((kw) => (
              <span
                key={kw}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#252525]/5 text-[#252525] border border-[#252525]/10"
              >
                <Check className="w-2.5 h-2.5 text-[#FA0C40]" />
                {kw}
              </span>
            ))}
            {selectedRole.missing.map((kw) => (
              <span
                key={kw}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-[#FA0C400D] text-[#FA0C40] border border-[#FA0C40]/25 shadow-sm"
              >
                <Sparkles className="w-2.5 h-2.5 text-[#FA0C40]" />
                + {kw} (AI Suggested)
              </span>
            ))}
          </div>
        </div>

        {/* AI Bullet Enhancer Diff Panel */}
        <div className="rounded-2xl border border-[#252525]/10 bg-[#252525]/[0.02] p-3.5 sm:p-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#6B6B6B]">
              AI Bullet Point Enhancer
            </span>
            <span className="text-[9px] font-extrabold text-[#FA0C40] bg-[#FA0C400D] border border-[#FA0C40]/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Tailored
            </span>
          </div>
          <p className="text-[11px] text-[#8E8E93] line-through mb-1.5 leading-snug font-normal">
            "{selectedRole.bulletBefore}"
          </p>
          <p className="text-xs text-[#252525] font-semibold leading-snug flex items-start gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#FA0C40] shrink-0 mt-0.5" />
            <span>"{selectedRole.bulletAfter}"</span>
          </p>
        </div>
      </div>

      {/* Floating Badge 1: Top-Right Response Rate */}
      <div className="hidden sm:flex absolute -top-4 -right-4 bg-white/95 border border-[#252525]/15 rounded-2xl p-3 shadow-xl backdrop-blur-xl float-badge-1 z-30 items-center gap-2.5 motion-reduce:animate-none">
        <div className="w-8 h-8 rounded-xl bg-[#FA0C400D] border border-[#FA0C40]/20 flex items-center justify-center text-[#FA0C40]">
          <TrendingUp className="w-4 h-4" />
        </div>
        <div className="text-left">
          <p className="text-xs font-extrabold text-[#252525]">+48% Response Rate</p>
          <p className="text-[10px] text-[#6B6B6B] font-medium">Recruiter Outreach</p>
        </div>
      </div>

      {/* Floating Badge 2: Bottom-Left Engine Speed */}
      <div className="hidden sm:flex absolute -bottom-4 -left-4 bg-white/95 border border-[#252525]/15 rounded-2xl px-3.5 py-2 shadow-xl backdrop-blur-xl float-badge-2 z-30 items-center gap-2 motion-reduce:animate-none">
        <Sparkles className="w-4 h-4 text-[#FA0C40]" />
        <div className="text-left">
          <p className="text-[11px] font-extrabold text-[#252525]">AI Engine</p>
          <p className="text-[10px] text-[#FA0C40] font-bold">~1.2s Tailoring</p>
        </div>
      </div>
    </div>
  );
}
