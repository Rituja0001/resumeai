import React from "react";
import { ArrowRight, Zap, ShieldCheck, Lock } from "lucide-react";
import AnimatedNumber from "./AnimatedNumber";
import useScrollReveal from "./useScrollReveal";

export default function CtaSection({ openBuilder }) {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.15);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white text-[#252525] py-11 md:py-[52px] lg:py-[68px] px-4 sm:px-6 md:px-8 overflow-hidden font-['Plus_Jakarta_Sans'] border-t border-[#252525]/5"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Large Rounded Dark Ink (#252525) Card */}
        <div
          className={`relative rounded-3xl bg-[#252525] text-white border border-white/10 p-6 sm:p-10 lg:p-14 text-center shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] overflow-hidden transition-all duration-500 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {/* Subtle Off-Center Top Radial Glow in Crimson */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[550px] sm:w-[700px] h-[300px] bg-[#FA0C40]/20 rounded-full blur-[110px] pointer-events-none" />

          {/* Thin Decorative Horizontal Crimson Beam */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FA0C40]/80 to-transparent" />

          {/* 1. Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#FA0C40]/35 bg-[#FA0C40]/15 text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest mb-6 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FA0C40] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FA0C40]" />
            </span>
            <span>START FOR FREE — NO CARD NEEDED</span>
          </div>

          {/* 2. Large Bold Heading with Inline Animated Number */}
          <h2 className="font-['Plus_Jakarta_Sans'] text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-5 leading-[1.15] max-w-4xl mx-auto">
            Join{" "}
            <AnimatedNumber
              value="720000"
              formatCommas={true}
              suffix="+"
              className="text-[#FA0C40] italic font-bold"
            />{" "}
            ambitious job seekers getting hired faster.
          </h2>

          {/* 3. Supporting Paragraph */}
          <p className="font-['Plus_Jakarta_Sans'] text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            Upload your existing resume, speak for 3 minutes, or sync LinkedIn. Build an ATS-screened, recruiter-ready resume in under 2 minutes.
          </p>

          {/* 4. Large Crimson Pill CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              onClick={() => openBuilder("upload")}
              className="cta-pulse-glow group relative inline-flex items-center gap-3 bg-[#FA0C40] hover:bg-[#D40936] text-white font-extrabold text-sm sm:text-base px-8 sm:px-10 py-3.5 sm:py-4 rounded-full shadow-[0_8px_25px_rgba(250,12,64,0.35)] hover:shadow-[0_15px_45px_rgba(250,12,64,0.6)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 motion-reduce:animate-none cursor-pointer"
            >
              <span>Build My Resume Free</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

          {/* 5. Trust Indicators Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-300 font-medium">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Instant AI generation</span>
            </div>
            <span className="hidden sm:inline text-slate-600">•</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FA0C40]" />
              <span>98% ATS screening pass</span>
            </div>
            <span className="hidden sm:inline text-slate-600">•</span>
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% private & encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
