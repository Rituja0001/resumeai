import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  ArrowRight,
  UploadCloud,
  Share2,
  Mic,
  PenTool,
  CheckCircle2,
  Star,
} from "lucide-react";

/**
 * Pure JS Count-Up Hook via standard IntersectionObserver (Zero external animation libraries)
 */
function useCountUp(targetNumber, duration = 1600) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const steps = 50;
          const increment = targetNumber / steps;
          const stepTime = duration / steps;
          const timer = setInterval(() => {
            start += increment;
            if (start >= targetNumber) {
              setCount(targetNumber);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, stepTime);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [targetNumber, duration]);

  return { count, ref };
}

export default function Hero({ openBuilder }) {
  const { count, ref: countRef } = useCountUp(700000, 1500);
  const [photoLoaded, setPhotoLoaded] = useState(true);

  const tags = [
    { label: "ATS Friendly", highlight: true },
    { label: "Free Resume Builder", highlight: false },
    { label: "AI Resume Generator", highlight: false },
    { label: "No Design Skills Needed", highlight: false },
  ];

  return (
    <section className="relative bg-[#FFFFFF] text-[#252525] py-8 sm:py-11 md:py-[52px] lg:py-[68px] px-3.5 sm:px-6 md:px-8 overflow-x-hidden font-['Plus_Jakarta_Sans'] w-full max-w-full">
      <style>{`
        @keyframes heroGentleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }
        @keyframes ctaPulseGlow {
          0%, 100% {
            box-shadow: 0 8px 25px rgba(250, 12, 64, 0.28);
          }
          50% {
            box-shadow: 0 12px 35px rgba(250, 12, 64, 0.52);
          }
        }
        @keyframes popoverSlideUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .hero-float-card {
          animation: heroGentleFloat 5.5s ease-in-out infinite;
        }
        .cta-pulse-glow {
          animation: ctaPulseGlow 3.2s ease-in-out infinite;
        }
        .popover-slide-in {
          animation: popoverSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Subtle Background Radial Atmosphere */}
      <div className="absolute top-0 right-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#FA0C400D] rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-[#FA0C40]/5 rounded-full blur-[90px] sm:blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#25252508_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[1.12fr_1fr] gap-8 lg:gap-14 items-center w-full min-w-0">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: Badge, Headline, Copy, Tags, CTA, Trust Counter */}
        {/* ========================================================================= */}
        <div className="text-left w-full min-w-0">
          {/* 1. Pill Badge at Top */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full border border-[#FA0C40]/30 bg-[#FA0C400D] text-[#FA0C40] text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-4 sm:mb-6 shadow-xs max-w-full">
            <Sparkles className="w-3.5 h-3.5 text-[#FA0C40] shrink-0 animate-pulse" />
            <span className="truncate">Now with Voice AI & Job Tailoring</span>
          </div>

          {/* 2. Large Bold Headline */}
          <h1 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-[#252525] leading-[1.15] sm:leading-[1.1] tracking-tight mb-4 sm:mb-6 break-words">
            Build an executive resume that{" "}
            <span className="text-[#FA0C40] italic font-bold inline-block">
              actually gets read.
            </span>
          </h1>

          {/* 3. Supporting Paragraph */}
          <p className="font-['Plus_Jakarta_Sans'] text-[#6B6B6B] text-sm sm:text-base lg:text-lg leading-relaxed mb-5 sm:mb-6 max-w-xl font-normal">
            Whether you upload an old resume, sync LinkedIn, speak your achievements out loud with Voice AI, or build from scratch — our intelligent engine crafts an interview-winning, ATS-proof resume in minutes.
          </p>

          {/* 4. Rounded Pill Tags Row */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-6 sm:mb-8">
            {tags.map((tag) => (
              <span
                key={tag.label}
                className={`text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border transition-colors ${
                  tag.highlight
                    ? "border-[#FA0C40] text-[#FA0C40] bg-[#FA0C400D] font-bold shadow-xs"
                    : "border-[#252525]/10 bg-[#252525]/5 text-[#252525]/80 font-medium"
                }`}
              >
                {tag.label}
              </span>
            ))}
          </div>

          {/* 5. Primary Crimson CTA Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <button
              onClick={() => openBuilder("upload")}
              className="cta-pulse-glow group relative inline-flex items-center justify-center gap-2.5 sm:gap-3 bg-[#FA0C40] hover:bg-[#D40936] text-white font-extrabold text-sm sm:text-base lg:text-lg px-7 sm:px-9 py-3.5 sm:py-4 rounded-full hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 motion-reduce:animate-none cursor-pointer w-full sm:w-auto shadow-md"
            >
              <span>Build My Free Resume</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

          {/* 6. Trust Line with JS Count-Up Counter */}
          <div ref={countRef} className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-[#6B6B6B] font-medium flex-wrap">
            <div className="flex text-[#FA0C40] gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#FA0C40] text-[#FA0C40]" />
              ))}
            </div>
            <span>
              Trusted by{" "}
              <strong className="font-['Plus_Jakarta_Sans'] font-extrabold text-[#252525]">
                {count.toLocaleString()}+
              </strong>{" "}
              job seekers worldwide
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Real-Look Resume Preview Card + Overlapping/Stacked Popover */}
        {/* ========================================================================= */}
        <div className="relative pt-2 lg:pt-0 w-full min-w-0 max-w-full">
          <div className="hero-float-card motion-reduce:animate-none relative w-full max-w-[480px] mx-auto select-none min-w-0">
            {/* Background Soft Glow */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#FA0C40]/10 via-rose-100/50 to-[#FA0C40]/10 rounded-[32px] blur-xl opacity-80 pointer-events-none" />

            {/* Main Resume Card */}
            <div className="relative bg-white rounded-2xl sm:rounded-3xl border border-[#252525]/10 shadow-[0_20px_50px_rgba(37,37,37,0.08)] p-4 sm:p-7 overflow-hidden text-left w-full min-w-0">
              {/* Top Accent Stripe */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FA0C40] via-rose-400 to-[#FA0C40]" />

              {/* Resume Header */}
              <div className="flex items-start justify-between border-b border-[#252525]/10 pb-3.5 sm:pb-4 mb-3.5 sm:mb-4 gap-2.5">
                <div className="min-w-0 flex-1">
                  <h3 className="font-['Plus_Jakarta_Sans'] font-extrabold text-lg sm:text-2xl text-[#252525] tracking-tight mb-0.5 truncate">
                    ALEXANDER MORGAN
                  </h3>
                  <p className="font-['Plus_Jakarta_Sans'] text-[11px] sm:text-xs font-semibold text-[#6B6B6B] truncate">
                    Lead Software Architect · San Francisco, CA
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1.5 text-[9px] sm:text-[10px] text-[#6B6B6B] font-medium">
                    <span className="flex items-center gap-1 truncate">
                      <CheckCircle2 className="w-3 h-3 text-[#FA0C40] shrink-0" />
                      <span className="truncate">alex.morgan@email.com</span>
                    </span>
                    <span className="hidden xs:inline">•</span>
                    <span className="truncate hidden xs:inline">github.com/alexmorgan</span>
                  </div>
                </div>

                {/* Candidate Photo / Fallback Avatar */}
                <div className="shrink-0">
                  {photoLoaded ? (
                    <img
                      src="/images/resume-photo.jpg"
                      alt="Alex Morgan"
                      onError={() => setPhotoLoaded(false)}
                      className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl object-cover border-2 border-[#FA0C40]/20 shadow-xs"
                    />
                  ) : (
                    <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-[#FA0C40]/15 to-rose-100 border-2 border-[#FA0C40]/20 flex items-center justify-center font-['Plus_Jakarta_Sans'] font-extrabold text-sm sm:text-lg text-[#FA0C40] shadow-xs">
                      AM
                    </div>
                  )}
                </div>
              </div>

              {/* Professional Summary */}
              <div className="mb-3.5 sm:mb-4">
                <p className="font-['Plus_Jakarta_Sans'] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#FA0C40] mb-1">
                  EXECUTIVE SUMMARY
                </p>
                <p className="text-[11px] sm:text-xs text-[#252525] bg-[#252525]/[0.02] p-2 sm:p-2.5 rounded-xl border border-[#252525]/5 italic leading-relaxed font-normal">
                  “Results-driven technical lead with 7+ years architecting high-throughput SaaS platforms, reducing API p99 latency by 42% across 2.5M+ active users.”
                </p>
              </div>

              {/* Experience Section */}
              <div className="space-y-2 sm:space-y-2.5 mb-3.5 sm:mb-4">
                <div className="flex items-center justify-between">
                  <span className="font-['Plus_Jakarta_Sans'] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#FA0C40]">
                    WORK EXPERIENCE
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-medium text-[#6B6B6B]">2022 — Present</span>
                </div>

                <div className="border-l-2 border-[#FA0C40]/40 pl-2.5 sm:pl-3 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[11px] sm:text-xs font-bold text-[#252525] truncate">Staff Engineer · CloudScale Inc.</p>
                    <span className="text-[8px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 rounded-full bg-[#FA0C40]/10 text-[#FA0C40] font-bold uppercase tracking-wider shrink-0">
                      ATS 98%
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#6B6B6B] leading-snug font-normal">
                    • Scaled event-driven microservices processing 12M daily transactions.
                  </p>
                </div>
              </div>

              {/* Skills Tags */}
              <div>
                <span className="font-['Plus_Jakarta_Sans'] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#6B6B6B] block mb-1.5">
                  CORE COMPETENCIES
                </span>
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {["React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "GraphQL"].map((s) => (
                    <span
                      key={s}
                      className="text-[9px] sm:text-[10px] font-medium px-1.5 sm:px-2 py-0.5 rounded-md bg-[#252525]/5 text-[#252525] border border-[#252525]/10"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* "How would you like to build?" Popover Card */}
            {/* On mobile (<lg): Stacks cleanly below the card as relative full-width block */}
            {/* On desktop (lg+): Absolutely positioned overlapping the bottom-left */}
            <div className="popover-slide-in mt-4 lg:mt-0 lg:absolute lg:-bottom-6 lg:-left-8 z-20 w-full lg:w-[320px] bg-white/95 backdrop-blur-xl rounded-2xl border border-[#252525]/15 shadow-[0_12px_35px_rgba(37,37,37,0.1)] lg:shadow-[0_20px_45px_rgba(37,37,37,0.14)] p-3.5 sm:p-4 text-left box-border">
              <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-3 pb-2 border-b border-[#252525]/10">
                <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-xs sm:text-sm text-[#252525] truncate">
                  How would you like to build?
                </h4>
                <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider bg-[#FA0C400D] text-[#FA0C40] px-2 py-0.5 rounded-full border border-[#FA0C40]/20 shrink-0">
                  AI Ready
                </span>
              </div>

              <div className="space-y-1 sm:space-y-1.5 mb-2.5 sm:mb-3">
                {/* Row 1: Upload */}
                <div
                  onClick={() => openBuilder("upload")}
                  className="flex items-center justify-between p-2 rounded-xl border border-transparent hover:border-[#FA0C40]/20 hover:bg-[#FA0C400D] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-[#252525]/5 text-[#252525] flex items-center justify-center group-hover:bg-[#FA0C40]/10 group-hover:text-[#FA0C40] transition-colors shrink-0">
                      <UploadCloud className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#252525] group-hover:text-[#FA0C40] transition-colors truncate">
                        Upload Existing Resume
                      </p>
                      <p className="text-[10px] text-[#6B6B6B] truncate">PDF / Word file auto-parse</p>
                    </div>
                  </div>
                  <ArrowRight className="w-3 h-3 text-[#6B6B6B] group-hover:text-[#FA0C40] group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>

                {/* Row 2: LinkedIn */}
                <div
                  onClick={() => openBuilder("linkedin")}
                  className="flex items-center justify-between p-2 rounded-xl border border-transparent hover:border-[#FA0C40]/20 hover:bg-[#FA0C400D] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-[#252525]/5 text-[#252525] flex items-center justify-center group-hover:bg-[#FA0C40]/10 group-hover:text-[#FA0C40] transition-colors shrink-0">
                      <Share2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#252525] group-hover:text-[#FA0C40] transition-colors truncate">
                        Import from LinkedIn
                      </p>
                      <p className="text-[10px] text-[#6B6B6B] truncate">1-Click profile sync</p>
                    </div>
                  </div>
                  <ArrowRight className="w-3 h-3 text-[#6B6B6B] group-hover:text-[#FA0C40] group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>

                {/* Row 3: Voice AI */}
                <div
                  onClick={() => openBuilder("voice")}
                  className="flex items-center justify-between p-2 rounded-xl border border-transparent hover:border-[#FA0C40]/20 hover:bg-[#FA0C400D] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-[#FA0C40]/10 text-[#FA0C40] flex items-center justify-center shrink-0">
                      <Mic className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-bold text-[#252525] group-hover:text-[#FA0C40] transition-colors truncate">
                          Talk with Voice AI
                        </p>
                        <span className="text-[8px] sm:text-[9px] font-extrabold bg-[#FA0C40] text-white px-1.5 py-0.2 rounded-full shrink-0">
                          NEW
                        </span>
                      </div>
                      <p className="text-[10px] text-[#6B6B6B] truncate">No typing required</p>
                    </div>
                  </div>
                  <ArrowRight className="w-3 h-3 text-[#6B6B6B] group-hover:text-[#FA0C40] group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              </div>

              {/* Row 4: Start from Scratch */}
              <button
                onClick={() => openBuilder("scratch")}
                className="w-full bg-[#FA0C40] hover:bg-[#D40936] text-white py-2 sm:py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer"
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Start from Scratch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
