import React from "react";
import { Target, Check, ArrowRight, Sparkles } from "lucide-react";
import TailoringDemo from "./TailoringDemo";
import useScrollReveal from "./useScrollReveal";

export default function TailoringSection({ openBuilder }) {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.15);

  const features = [
    {
      title: "Target Keyword Matching",
      desc: "Automatically weaves in high-impact ATS keywords naturally.",
    },
    {
      title: "Instant Score Calibration",
      desc: "Boosts screening match score from 50% to 95%+.",
    },
    {
      title: "Quantified Bullet Rewrites",
      desc: "Upgrades weak bullets with strong action verbs and metrics.",
    },
    {
      title: "One-Click Tailored Export",
      desc: "Download an interview-ready PDF or DOCX in seconds.",
    },
  ];

  return (
    <section
      id="tailor"
      ref={sectionRef}
      className="relative bg-[#FFFFFF] text-[#252525] py-11 md:py-[52px] lg:py-[68px] px-4 sm:px-6 md:px-8 border-t border-[#252525]/5 overflow-hidden font-['Plus_Jakarta_Sans']"
    >
      {/* Subtle Ambient Radial Wash */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#FA0C400D] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-[#FA0C40]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-[1.08fr_1.15fr] gap-12 lg:gap-16 items-center">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: Badge, 2-line Heading, Copy, 2x2 Feature Grid, CTA */}
        {/* ========================================================================= */}
        <div
          className={`text-left transition-all duration-500 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-6"
          }`}
        >
          {/* 1. Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#FA0C40]/30 bg-[#FA0C400D] text-xs font-bold mb-6 shadow-sm">
            <Target className="w-3.5 h-3.5 text-[#FA0C40]" />
            <span className="text-[#FA0C40]">Real-time job tailoring</span>
            <span className="text-[#252525]/40">•</span>
            <span className="text-[#252525]">Powered by Claude</span>
          </div>

          {/* 2. Large Bold Heading (2-tone emphasis) */}
          <h2 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#252525] mb-5 leading-[1.14] tracking-tight">
            Beat automated screening.{" "}
            <span className="text-[#FA0C40] italic font-bold block sm:inline">
              Tailored to every single job.
            </span>
          </h2>

          {/* 3. Supporting Paragraph */}
          <p className="font-['Plus_Jakarta_Sans'] text-[#6B6B6B] text-sm sm:text-base leading-relaxed mb-8 font-normal">
            Generic resumes get filtered out by recruiters' AI. GoResume parses the target job description in seconds, extracts essential keywords, re-ranks your work history, and rewrites bullet points to match the exact requirements of the hiring manager.
          </p>

          {/* 4. 2x2 Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
            {features.map((feat) => (
              <div
                key={feat.title}
                className="rounded-2xl border border-[#252525]/10 bg-[#252525]/[0.02] p-3.5 flex items-start gap-3 hover:border-[#FA0C40]/30 transition-colors shadow-sm"
              >
                <div className="w-7 h-7 rounded-xl bg-[#FA0C400D] text-[#FA0C40] flex items-center justify-center shrink-0 mt-0.5 border border-[#FA0C40]/15">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-['Plus_Jakarta_Sans'] text-xs font-extrabold text-[#252525]">
                    {feat.title}
                  </h4>
                  <p className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#6B6B6B] font-normal leading-snug mt-0.5">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 5. Primary Crimson CTA Button */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => openBuilder("upload")}
              className="cta-pulse-glow group relative inline-flex items-center gap-3 bg-[#FA0C40] hover:bg-[#D40936] text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-full shadow-[0_8px_25px_rgba(250,12,64,0.3)] hover:shadow-[0_12px_35px_rgba(250,12,64,0.5)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <span>Tailor My Resume with AI</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Interactive Live AI Matcher Card */}
        {/* ========================================================================= */}
        <div
          className={`relative pt-4 lg:pt-0 transition-all duration-500 ease-out delay-100 motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-6"
          }`}
        >
          <TailoringDemo onOpenBuilder={openBuilder} />
        </div>
      </div>
    </section>
  );
}
