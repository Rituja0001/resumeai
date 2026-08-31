import React from "react";
import { STATS } from "./constants";
import AnimatedNumber from "./AnimatedNumber";
import useScrollReveal from "./useScrollReveal";

export default function StatsSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.15);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative bg-[#252525] text-white py-11 md:py-[52px] lg:py-[68px] px-4 sm:px-6 md:px-8 overflow-hidden font-['Plus_Jakarta_Sans'] border-y border-white/5"
    >
      {/* Subtle Background Pattern & Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#FA0C400D] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Responsive 3-Column Grid with Vertical Dividers on Desktop/Tablet */}
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10 items-stretch">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
              }}
              className={`text-center py-6 sm:py-2 sm:px-6 lg:px-8 flex flex-col items-center justify-center transition-all duration-500 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              {/* Stat Number in Crimson */}
              <div className="mb-2">
                <AnimatedNumber
                  value={stat.value}
                  prefix={stat.prefix || ""}
                  suffix={stat.suffix || ""}
                  duration={1400}
                  className="font-['Plus_Jakarta_Sans'] font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#FA0C40] tracking-tight"
                />
              </div>

              {/* Stat Label */}
              <h3 className="font-['Plus_Jakarta_Sans'] font-extrabold text-base sm:text-lg text-white mb-1.5 tracking-tight">
                {stat.label}
              </h3>

              {/* Stat Description */}
              <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-slate-400 font-normal leading-relaxed max-w-[260px] mx-auto">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
