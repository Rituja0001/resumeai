import React from "react";
import { Link } from "react-router-dom";
import { HelpCircle, Sparkles, ArrowRight } from "lucide-react";
import FaqItem from "./FaqItem";
import { FAQS } from "./constants";

export default function FaqSection({ openBuilder }) {
  return (
    <section id="faq" className="bg-[#FFFFFF] py-11 md:py-[52px] lg:py-[68px] px-4 sm:px-6 md:px-8 border-t border-[#252525]/5 relative overflow-hidden font-['Plus_Jakarta_Sans']">
      {/* Subtle Ambient Crimson Radial Glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#FA0C400D] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-14 items-start">
        {/* Left Column: Heading, Subtitle & Support CTA Card */}
        <div className="text-left lg:sticky lg:top-28">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#FA0C40]/20 bg-[#FA0C400D] text-[#FA0C40] text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#FA0C40]" />
            <span>Got Questions?</span>
          </div>

          {/* Headline */}
          <h2 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#252525] mb-4 leading-[1.12] tracking-tight">
            Still in Doubt?{" "}
            <span className="text-[#FA0C40] block font-bold italic mt-1">
              We Have Answers.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="font-['Plus_Jakarta_Sans'] text-sm sm:text-base text-[#6B6B6B] leading-relaxed mb-6 font-normal">
            Everything you need to know about GoResume's AI ATS engine, data security, formatting compatibility, and free plan.
          </p>

          {/* Support / Quick Start Card */}
          <div className="rounded-3xl border border-[#252525]/10 bg-white p-6 sm:p-7 shadow-[0_4px_20px_rgba(37,37,37,0.04)]">
            <div className="w-10 h-10 rounded-xl bg-[#FA0C40]/10 text-[#FA0C40] flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#252525] mb-1.5">Ready to build your resume?</h4>
            <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#6B6B6B] leading-relaxed mb-5 font-normal">
              Join 15,000+ candidates who got hired at top tech and enterprise companies. Free to start in 2 minutes.
            </p>
            <button
              onClick={() => openBuilder("upload")}
              className="w-full font-bold text-xs sm:text-sm bg-[#FA0C40] hover:bg-[#D40936] text-white py-3.5 px-5 rounded-full flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(250,12,64,0.25)] hover:shadow-[0_6px_22px_rgba(250,12,64,0.4)] transition-all group cursor-pointer"
            >
              <span>Create My Free Resume</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Right Column: FAQ Accordions & Full FAQ Page Link */}
        <div className="space-y-4">
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <FaqItem key={f.q} {...f} defaultOpen={i === 0} />
            ))}
          </div>

          {/* Link to Full Searchable FAQ Directory */}
          <div className="pt-2">
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#FA0C40]/30 hover:border-[#FA0C40] bg-[#FA0C400D]/40 hover:bg-[#FA0C400D] text-[#FA0C40] font-extrabold text-xs sm:text-sm transition-all duration-200 group cursor-pointer shadow-xs hover:shadow-sm"
            >
              <span>View all FAQs & Help Directory</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
