import React from "react";
import { Sparkles, ShieldCheck, Check, Mic } from "lucide-react";

export default function ScanningResumeMockup() {
  return (
    <div className="relative w-full max-w-[460px] mx-auto select-none font-sans">
      {/* Glow Behind Main Card */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-[#FA0C40]/25 via-purple-600/20 to-[#FA0C40]/25 rounded-3xl blur-xl opacity-75 animate-pulse" />

      {/* Main Resume Card */}
      <div className="relative rounded-2xl border border-white/15 bg-[#1C1C1C]/90 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] p-6 sm:p-7 overflow-hidden text-left transition-all duration-300 hover:border-white/25">
        {/* Animated Laser Scanning Line in Crimson */}
        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FA0C40] to-transparent scan-laser z-20" />

        {/* Card Header: Candidate Info */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#FA0C40] to-[#D40936] flex items-center justify-center text-white font-bold text-base shadow-inner">
              AM
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">Alex Morgan</h4>
              <p className="text-xs text-slate-400 font-medium">Senior Full-Stack Engineer · San Francisco</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#FA0C40]/15 text-[#FA0C40] border border-[#FA0C40]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FA0C40] animate-ping" />
            ATS Ready
          </span>
        </div>

        {/* Professional Summary */}
        <div className="mb-4">
          <p className="text-[11px] leading-relaxed text-slate-300 bg-white/[0.03] p-2.5 rounded-lg border border-white/5 font-normal">
            Product-focused engineer with 5+ years building scalable SaaS platforms. Proven track record optimizing high-throughput distributed systems and leading cross-functional teams.
          </p>
        </div>

        {/* Experience Section */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-[#FA0C40] font-bold">Experience</span>
            <span className="text-[10px] font-medium text-slate-400">2022 — Present</span>
          </div>

          <div className="border-l-2 border-[#FA0C40]/50 pl-3 space-y-1.5">
            <p className="text-xs font-bold text-white">Lead Engineer · CloudScale Inc.</p>
            <p className="text-[10px] text-slate-300 leading-snug">
              • Architected microservices migration, reducing <span className="text-white font-semibold bg-[#FA0C40]/25 px-1 rounded">API latency by 42%</span>
            </p>
            <p className="text-[10px] text-slate-300 leading-snug">
              • Scaled real-time event pipeline processing <span className="text-white font-semibold bg-[#FA0C40]/25 px-1 rounded">10M+ daily events</span>
            </p>
            <p className="text-[10px] text-slate-300 leading-snug">
              • Mentored 8 engineers and championed automated CI/CD workflows
            </p>
          </div>
        </div>

        {/* Skills Tag Cloud */}
        <div>
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block mb-2">Verified Skills</span>
          <div className="flex flex-wrap gap-1.5">
            {["React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Docker", "GraphQL", "Redis"].map((s) => (
              <span
                key={s}
                className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-slate-200 font-medium"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Card 1: ATS Pass Score (Top-Right) */}
      <div className="absolute -top-4 -right-4 sm:-right-6 float-card rounded-2xl border border-white/20 bg-[#252525]/95 backdrop-blur-xl p-3.5 shadow-2xl z-30 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#FA0C40]/20 text-[#FA0C40] flex items-center justify-center font-black text-sm border border-[#FA0C40]/30">
          98%
        </div>
        <div className="text-left">
          <p className="text-xs font-bold text-white flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FA0C40]" />
            ATS Match Score
          </p>
          <p className="text-[10px] text-slate-300 font-medium">Top 2% of applicants</p>
        </div>
      </div>

      {/* Floating Card 2: AI Suggestion (Bottom-Left) */}
      <div className="absolute -bottom-5 -left-4 sm:-left-6 float-card-delayed rounded-2xl border border-white/20 bg-[#252525]/95 backdrop-blur-xl p-3 shadow-2xl z-30 flex items-center gap-3 max-w-[240px]">
        <div className="w-9 h-9 rounded-xl bg-[#FA0C40]/20 text-[#FA0C40] flex items-center justify-center shrink-0 border border-[#FA0C40]/30">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="text-left">
          <p className="text-[11px] font-bold text-white">Claude AI Optimized</p>
          <p className="text-[10px] text-slate-300 leading-tight">+6 keywords matched to JD</p>
        </div>
      </div>

      {/* Floating Card 3: Voice AI Active (Bottom-Right) */}
      <div className="absolute -bottom-8 right-2 sm:right-6 float-card rounded-xl border border-white/15 bg-white/10 backdrop-blur-lg px-3 py-1.5 shadow-xl z-25 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#FA0C40] animate-ping" />
        <span className="text-[10px] font-semibold text-slate-200 flex items-center gap-1">
          <Mic className="w-3 h-3 text-[#FA0C40]" />
          Voice AI Ready
        </span>
      </div>
    </div>
  );
}
