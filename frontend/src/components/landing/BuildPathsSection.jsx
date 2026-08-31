import React from "react";
import {
  UploadCloud,
  Share2,
  Mic,
  PenTool,
  Check,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { BUILD_PATHS } from "./constants";
import useScrollReveal from "./useScrollReveal";

export default function BuildPathsSection({ openBuilder }) {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.15);

  const iconMap = {
    upload: UploadCloud,
    linkedin: Share2,
    voice: Mic,
    scratch: PenTool,
  };

  return (
    <section
      id="build"
      ref={sectionRef}
      className="relative bg-[#FBF9F8] text-[#252525] py-11 md:py-[52px] lg:py-[68px] px-4 sm:px-6 md:px-8 border-t border-[#252525]/5 overflow-hidden font-['Plus_Jakarta_Sans']"
    >
      {/* Subtle Ambient Radial Wash */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#FA0C400D] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#FA0C40]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          {/* 1. Eyebrow Label */}
          <p className="font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase tracking-widest text-[#FA0C40] mb-3 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>RESUME CREATION</span>
          </p>

          {/* 2. Section Heading */}
          <h2 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#252525] mb-4 leading-[1.15]">
            Four Flexible Ways to Build,{" "}
            <span className="text-[#FA0C40] italic font-bold">
              One Winning Resume.
            </span>
          </h2>

          {/* 3. Supporting Subtitle */}
          <p className="font-['Plus_Jakarta_Sans'] text-[#6B6B6B] text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            Choose the starting point that fits your schedule today. Whether you have an existing resume, a LinkedIn profile, a few spoken thoughts, or a blank page — we craft an interview-ready resume in minutes.
          </p>
        </div>

        {/* 4 Cards Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch">
          {BUILD_PATHS.map((card, index) => {
            const Icon = iconMap[card.key] || UploadCloud;

            return (
              <div
                key={card.key}
                onClick={() => openBuilder(card.key)}
                style={{
                  transitionDelay: isVisible ? `${index * 90}ms` : "0ms",
                }}
                className={`group relative bg-white rounded-3xl border p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 cursor-pointer shadow-[0_4px_20px_rgba(37,37,37,0.03)] hover:shadow-[0_15px_35px_rgba(250,12,64,0.12)] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none ${
                  card.highlight
                    ? "border-[#FA0C40]/40 ring-1 ring-[#FA0C40]/20 hover:border-[#FA0C40]"
                    : "border-[#252525]/10 hover:border-[#FA0C40]/50"
                } ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div>
                  {/* Card Top: Icon Badge & Tag */}
                  <div className="flex items-center justify-between mb-5">
                    {/* Rounded Tinted Badge/Circle for Icon */}
                    <div className="w-12 h-12 rounded-2xl bg-[#FA0C400D] border border-[#FA0C40]/15 text-[#FA0C40] flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110">
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Tag in Plus Jakarta Sans uppercase */}
                    <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-bold uppercase tracking-wider text-[#FA0C40] bg-[#FA0C400D] border border-[#FA0C40]/20 px-2.5 py-1 rounded-full">
                      {card.tag}
                    </span>
                  </div>

                  {/* Title in Plus Jakarta Sans */}
                  <h3 className="font-['Plus_Jakarta_Sans'] font-extrabold text-lg sm:text-xl text-[#252525] mb-2.5 transition-colors group-hover:text-[#FA0C40]">
                    {card.title}
                  </h3>

                  {/* Body in Plus Jakarta Sans */}
                  <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#6B6B6B] leading-relaxed mb-6 font-normal">
                    {card.body}
                  </p>

                  {/* Feature Checkpoints */}
                  <ul className="space-y-2 text-xs text-[#6B6B6B] mb-6 font-medium">
                    {card.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#FA0C40] shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA Button */}
                <button
                  type="button"
                  className={`w-full text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                    card.highlight
                      ? "bg-[#FA0C40] text-white shadow-sm hover:bg-[#D40936]"
                      : "border border-[#252525]/10 bg-[#252525]/5 text-[#252525] group-hover:bg-[#FA0C40] group-hover:text-white group-hover:border-[#FA0C40]"
                  }`}
                >
                  <span>{card.btnText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
