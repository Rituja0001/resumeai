import React, { useState, useEffect } from "react";
import { FileText, Sparkles, ShieldCheck } from "lucide-react";

/**
 * ProcessingDocumentModal — displays scanning animation & progress state
 * while Claude AI synchronously parses the uploaded resume file.
 */
export default function ProcessingDocumentModal({ isOpen, templateName = "Modern Minimal" }) {
  const [statusIndex, setStatusIndex] = useState(0);

  const STATUS_MESSAGES = [
    "Scanning document…",
    "Extracting career history & quantified metrics…",
    "Identifying technical competencies & keywords…",
    `Structuring content into ${templateName} template…`,
  ];

  useEffect(() => {
    if (!isOpen) {
      setStatusIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isOpen, STATUS_MESSAGES.length]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#252525]/75 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in font-['Plus_Jakarta_Sans'] select-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="processing-modal-title"
    >
      <div className="bg-white rounded-3xl border border-[#252525]/10 shadow-[0_25px_60px_rgba(0,0,0,0.25)] max-w-md w-full p-8 text-center relative overflow-hidden animate-scale-in">
        {/* Glow behind scanning card */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#FA0C40]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Animated Scanning Document Card */}
        <div className="relative w-28 h-36 mx-auto mb-6 rounded-2xl bg-[#252525] border-2 border-[#FA0C40]/40 shadow-xl overflow-hidden flex flex-col justify-between p-3.5 group motion-safe:animate-pulse">
          {/* Laser scanning beam line */}
          <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FA0C40] to-transparent scan-laser z-20 shadow-[0_0_8px_#FA0C40]" />

          {/* Mini document skeleton lines */}
          <div className="space-y-2 relative z-10 opacity-70">
            <div className="w-10 h-2 bg-white/40 rounded-full" />
            <div className="w-16 h-1.5 bg-white/20 rounded-full" />
            <div className="w-12 h-1.5 bg-[#FA0C40]/60 rounded-full" />
            <div className="pt-2 space-y-1">
              <div className="w-full h-1 bg-white/15 rounded-full" />
              <div className="w-4/5 h-1 bg-white/15 rounded-full" />
              <div className="w-3/5 h-1 bg-white/15 rounded-full" />
            </div>
          </div>

          <div className="flex items-center justify-between relative z-10 pt-2 border-t border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-[#FA0C40] animate-spin" style={{ animationDuration: "4s" }} />
            <span className="text-[9px] font-extrabold text-white/80 uppercase tracking-wider">AI Parsing</span>
          </div>
        </div>

        {/* Modal Heading */}
        <h3 id="processing-modal-title" className="text-xl sm:text-2xl font-extrabold text-[#252525] tracking-tight mb-2">
          Processing Document
        </h3>

        {/* Dynamic Status Line with Smooth Fade */}
        <div className="min-h-[28px] flex items-center justify-center mb-4">
          <p className="text-xs sm:text-sm font-bold text-[#FA0C40] flex items-center justify-center gap-2 transition-all duration-300">
            <span className="w-2 h-2 rounded-full bg-[#FA0C40] animate-ping" />
            <span>{STATUS_MESSAGES[statusIndex]}</span>
          </p>
        </div>

        {/* Helper Note */}
        <p className="text-xs text-[#6B6B6B] leading-relaxed max-w-xs mx-auto border-t border-slate-100 pt-3">
          This might take up to 1–2 minutes. Please be patient while we analyze and structure your resume.
        </p>

        {/* ATS Quality Badge */}
        <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FA0C400D] border border-[#FA0C40]/20 text-[11px] font-bold text-[#FA0C40]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Calibrating against 50+ ATS Rules</span>
        </div>
      </div>
    </div>
  );
}

