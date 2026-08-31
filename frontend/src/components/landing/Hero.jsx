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
    <section className="relative bg-[#FFFFFF] text-[#252525] py-11 md:py-[52px] lg:py-[68px] px-4 sm:px-6 md:px-8 overflow-hidden font-['Plus_Jakarta_Sans']">
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
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#FA0C400D] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-[#FA0C40]/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#25252508_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

      <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-[1.12fr_1fr] gap-12 lg:gap-14 items-center">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: Badge, Headline, Copy, Tags, CTA, Trust Counter */}
        {/* ========================================================================= */}
        <div className="text-left">
          {/* 1. Pill Badge at Top */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#FA0C40]/30 bg-[#FA0C400D] text-[#FA0C40] text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#FA0C40] animate-pulse" />
            <span>Now with Voice AI & Job Tailoring</span>
          </div>

          {/* 2. Large Bold Headline */}
          <h1 className="font-['Plus_Jakarta_Sans'] text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#252525] leading-[1.1] tracking-tight mb-6">
            Build an executive resume that{" "}
            <span className="text-[#FA0C40] italic font-bold">
              actually gets read.
            </span>
          </h1>

          {/* 3. Supporting Paragraph */}
          <p className="font-['Plus_Jakarta_Sans'] text-[#6B6B6B] text-base sm:text-lg leading-relaxed mb-6 max-w-xl font-normal">
            Whether you upload an old resume, sync LinkedIn, speak your achievements out loud with Voice AI, or build from scratch — our intelligent engine crafts an interview-winning, ATS-proof resume in minutes.
          </p>

          {/* 4. Rounded Pill Tags Row */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {tags.map((tag) => (
              <span
                key={tag.label}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  tag.highlight
                    ? "border-[#FA0C40] text-[#FA0C40] bg-[#FA0C400D] font-bold shadow-sm"
                    : "border-[#252525]/10 bg-[#252525]/5 text-[#252525]/80 font-medium"
                }`}
              >
                {tag.label}
              </span>
            ))}
          </div>

          {/* 5. Primary Crimson CTA Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            <button
              onClick={() => openBuilder("upload")}
              className="cta-pulse-glow group relative inline-flex items-center justify-center gap-3 bg-[#FA0C40] hover:bg-[#D40936] text-white font-extrabold text-base sm:text-lg px-8 sm:px-9 py-4 rounded-full hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 motion-reduce:animate-none cursor-pointer"
            >
              <span>Build My Free Resume</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

          {/* 6. Trust Line with JS Count-Up Counter */}
          <div ref={countRef} className="flex items-center gap-3 text-xs sm:text-sm text-[#6B6B6B] font-medium">
            <div className="flex text-[#FA0C40] gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#FA0C40] text-[#FA0C40]" />
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
        {/* RIGHT COLUMN: Real-Look Resume Preview Card + Overlapping Popover Modal */}
        {/* ========================================================================= */}
        <div className="relative pt-4 lg:pt-0">
          <div className="hero-float-card motion-reduce:animate-none relative w-full max-w-[480px] mx-auto select-none">
            {/* Background Soft Glow */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#FA0C40]/10 via-rose-100/50 to-[#FA0C40]/10 rounded-[32px] blur-xl opacity-80" />

            {/* Main Resume Card */}
            <div className="relative bg-white rounded-3xl border border-[#252525]/10 shadow-[0_20px_50px_rgba(37,37,37,0.08)] p-6 sm:p-7 overflow-hidden text-left">
              {/* Top Accent Stripe */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FA0C40] via-rose-400 to-[#FA0C40]" />

              {/* Resume Header */}
              <div className="flex items-start justify-between border-b border-[#252525]/10 pb-4 mb-4">
                <div className="pr-3">
                  <h3 className="font-['Plus_Jakarta_Sans'] font-extrabold text-xl sm:text-2xl text-[#252525] tracking-tight mb-1">
                    ALEXANDER MORGAN
                  </h3>
                  <p className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#6B6B6B]">
                    Lead Software Architect · San Francisco, CA
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-[10px] text-[#6B6B6B] font-medium">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#FA0C40]" /> alex.morgan@email.com
                    </span>
                    <span>•</span>
                    <span>github.com/alexmorgan</span>
                  </div>
                </div>

                {/* Candidate Photo / Fallback Avatar */}
                <div className="shrink-0">
                  {photoLoaded ? (
                    <img
                      src="/images/resume-photo.jpg"
                      alt="Alex Morgan"
                      onError={() => setPhotoLoaded(false)}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-[#FA0C40]/20 shadow-sm"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FA0C40]/15 to-rose-100 border-2 border-[#FA0C40]/20 flex items-center justify-center font-['Plus_Jakarta_Sans'] font-extrabold text-lg text-[#FA0C40] shadow-sm">
                      AM
                    </div>
                  )}
                </div>
              </div>

              {/* Professional Summary */}
              <div className="mb-4">
                <p className="font-['Plus_Jakarta_Sans'] text-[10px] font-bold uppercase tracking-wider text-[#FA0C40] mb-1">
                  EXECUTIVE SUMMARY
                </p>
                <p className="text-xs text-[#252525] bg-[#252525]/[0.02] p-2.5 rounded-xl border border-[#252525]/5 italic leading-relaxed font-normal">
                  “Results-driven technical lead with 7+ years architecting high-throughput SaaS platforms, reducing API p99 latency by 42% across 2.5M+ active users.”
                </p>
              </div>

              {/* Experience Section */}
              <div className="space-y-2.5 mb-4">
                <div className="flex items-center justify-between">
                  <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-bold uppercase tracking-wider text-[#FA0C40]">
                    WORK EXPERIENCE
                  </span>
                  <span className="text-[10px] font-medium text-[#6B6B6B]">2022 — Present</span>
                </div>

                <div className="border-l-2 border-[#FA0C40]/40 pl-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-[#252525]">Staff Engineer · CloudScale Inc.</p>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#FA0C40]/10 text-[#FA0C40] font-bold uppercase tracking-wider">
                      ATS 98%
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6B6B6B] leading-snug font-normal">
                    • Scaled event-driven microservices processing 12M daily transactions.
                  </p>
                </div>
              </div>

              {/* Skills Tags */}
              <div>
                <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-bold uppercase tracking-wider text-[#6B6B6B] block mb-1.5">
                  CORE COMPETENCIES
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "GraphQL"].map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#252525]/5 text-[#252525] border border-[#252525]/10"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Popover Card */}
            <div className="popover-slide-in mt-6 lg:mt-0 lg:absolute lg:-bottom-6 lg:-left-8 z-20 w-full lg:w-[320px] bg-white/95 backdrop-blur-xl rounded-2xl border border-[#252525]/15 shadow-[0_20px_45px_rgba(37,37,37,0.14)] p-4 text-left">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#252525]/10">
                <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-xs sm:text-sm text-[#252525]">
                  How would you like to build?
                </h4>
                <span className="text-[9px] font-bold uppercase tracking-wider bg-[#FA0C400D] text-[#FA0C40] px-2 py-0.5 rounded-full border border-[#FA0C40]/20">
                  AI Ready
                </span>
              </div>

              <div className="space-y-1.5 mb-3">
                {/* Row 1: Upload */}
                <div
                  onClick={() => openBuilder("upload")}
                  className="flex items-center justify-between p-2 rounded-xl border border-transparent hover:border-[#FA0C40]/20 hover:bg-[#FA0C400D] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#252525]/5 text-[#252525] flex items-center justify-center group-hover:bg-[#FA0C40]/10 group-hover:text-[#FA0C40] transition-colors">
                      <UploadCloud className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#252525] group-hover:text-[#FA0C40] transition-colors">
                        Upload Existing Resume
                      </p>
                      <p className="text-[10px] text-[#6B6B6B]">PDF / Word file auto-parse</p>
                    </div>
                  </div>
                  <ArrowRight className="w-3 h-3 text-[#6B6B6B] group-hover:text-[#FA0C40] group-hover:translate-x-0.5 transition-all" />
                </div>

                {/* Row 2: LinkedIn */}
                <div
                  onClick={() => openBuilder("linkedin")}
                  className="flex items-center justify-between p-2 rounded-xl border border-transparent hover:border-[#FA0C40]/20 hover:bg-[#FA0C400D] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#252525]/5 text-[#252525] flex items-center justify-center group-hover:bg-[#FA0C40]/10 group-hover:text-[#FA0C40] transition-colors">
                      <Share2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#252525] group-hover:text-[#FA0C40] transition-colors">
                        Import from LinkedIn
                      </p>
                      <p className="text-[10px] text-[#6B6B6B]">1-Click profile sync</p>
                    </div>
                  </div>
                  <ArrowRight className="w-3 h-3 text-[#6B6B6B] group-hover:text-[#FA0C40] group-hover:translate-x-0.5 transition-all" />
                </div>

                {/* Row 3: Voice AI */}
                <div
                  onClick={() => openBuilder("voice")}
                  className="flex items-center justify-between p-2 rounded-xl border border-transparent hover:border-[#FA0C40]/20 hover:bg-[#FA0C400D] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#FA0C40]/10 text-[#FA0C40] flex items-center justify-center">
                      <Mic className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-bold text-[#252525] group-hover:text-[#FA0C40] transition-colors">
                          Talk with Voice AI
                        </p>
                        <span className="text-[9px] font-extrabold bg-[#FA0C40] text-white px-1.5 py-0.2 rounded-full">
                          NEW
                        </span>
                      </div>
                      <p className="text-[10px] text-[#6B6B6B]">No typing required</p>
                    </div>
                  </div>
                  <ArrowRight className="w-3 h-3 text-[#6B6B6B] group-hover:text-[#FA0C40] group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>

              {/* Row 4: Start from Scratch */}
              <button
                onClick={() => openBuilder("scratch")}
                className="w-full bg-[#FA0C40] hover:bg-[#D40936] text-white py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer"
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
