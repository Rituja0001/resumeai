import React, { useEffect } from "react";
import {
  X,
  UploadCloud,
  Share2,
  Sparkles,
  ArrowRight,
  Plus,
  ChevronRight,
  FileText,
} from "lucide-react";

/**
 * BuildMethodModal — "How would you like to build your resume?"
 * On mobile: Renders as a sleek, touch-friendly bottom sheet with stacked full-width rows.
 * On desktop/tablet: Renders as a centered dialog with 2-column cards.
 */
export default function BuildMethodModal({
  isOpen,
  onClose,
  onSelectMethod,
  selectedTemplateName = null,
}) {
  // Handle ESC key dismiss
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#252525]/60 backdrop-blur-md flex items-end sm:items-center justify-center sm:p-4 overflow-y-auto animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="build-method-title"
    >
      <div
        className="bg-white rounded-t-[32px] sm:rounded-3xl border border-[#252525]/10 shadow-[0_25px_60px_rgba(0,0,0,0.22)] max-w-lg w-full p-5 sm:p-8 relative font-['Plus_Jakarta_Sans'] text-[#252525] animate-slide-up sm:animate-scale-in max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Indicator Pill */}
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-3 sm:hidden" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 sm:top-5 right-4 sm:right-5 w-8 h-8 rounded-full bg-[#252525]/5 hover:bg-[#252525]/10 flex items-center justify-center text-[#6B6B6B] hover:text-[#252525] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-left mb-5 sm:mb-6 pr-6">
          <h2 id="build-method-title" className="text-lg sm:text-2xl font-extrabold text-[#252525] tracking-tight">
            How would you like to build your resume?
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1 leading-relaxed">
            Upload an existing one or start fresh — we'll build it around your chosen template{selectedTemplateName ? ` (${selectedTemplateName})` : ""}.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE PRESENTATION: Stacked Full-Width Interactive List (sm:hidden)       */}
        {/* ========================================================================= */}
        <div className="space-y-2.5 sm:hidden mb-2">
          {/* Option 1: Upload an existing resume */}
          <button
            type="button"
            onClick={() => onSelectMethod("upload")}
            className="w-full text-left p-3.5 rounded-2xl border border-[#252525]/10 bg-[#FAFAFA] active:bg-[#FA0C400D] active:border-[#FA0C40] flex items-center justify-between gap-3 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#FA0C400D] border border-[#FA0C40]/20 text-[#FA0C40] flex items-center justify-center shrink-0">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-extrabold text-sm text-[#252525] truncate">Upload an existing resume</h3>
                <p className="text-[11px] text-[#6B6B6B] truncate">PDF, DOCX, or Image (auto-parsed)</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#6B6B6B] shrink-0" />
          </button>

          {/* Option 2: Import from LinkedIn */}
          <button
            type="button"
            onClick={() => onSelectMethod("linkedin")}
            className="w-full text-left p-3.5 rounded-2xl border border-[#252525]/10 bg-[#FAFAFA] active:bg-blue-50 active:border-[#0A66C2] flex items-center justify-between gap-3 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-[#0A66C2] flex items-center justify-center shrink-0">
                <Share2 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-extrabold text-sm text-[#252525] truncate">Import from LinkedIn</h3>
                <p className="text-[11px] text-[#6B6B6B] truncate">Auto-fill directly from your profile</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#6B6B6B] shrink-0" />
          </button>

          {/* Option 3: Create with AI Assistance (Voice AI) */}
          <button
            type="button"
            onClick={() => onSelectMethod("voice")}
            className="w-full text-left p-3.5 rounded-2xl border border-[#252525]/10 bg-[#FAFAFA] active:bg-[#FA0C400D] active:border-[#FA0C40] flex items-center justify-between gap-3 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#FA0C400D] border border-[#FA0C40]/20 text-[#FA0C40] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-extrabold text-sm text-[#252525] truncate">Create with AI Assistance</h3>
                <p className="text-[11px] text-[#6B6B6B] truncate">Voice AI or guided bullet generation</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#6B6B6B] shrink-0" />
          </button>

          {/* Option 4: Start with a new resume (Scratch) */}
          <button
            type="button"
            onClick={() => onSelectMethod("scratch")}
            className="w-full text-left p-3.5 rounded-2xl border border-[#FA0C40]/30 bg-[#FA0C400D]/30 active:bg-[#FA0C40] active:text-white flex items-center justify-between gap-3 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#FA0C40] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Plus className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-extrabold text-sm text-[#252525] group-active:text-white truncate">Start with a new resume</h3>
                <p className="text-[11px] text-[#6B6B6B] group-active:text-white/80 truncate">Guided blank canvas with real-time tips</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#FA0C40] group-active:text-white shrink-0" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP & TABLET PRESENTATION (hidden on mobile, sm:block)                 */}
        {/* ========================================================================= */}
        <div className="hidden sm:block">
          {/* Side-by-Side 2 Cards (Upload & LinkedIn) */}
          <div className="grid grid-cols-2 gap-3.5 mb-3.5">
            {/* Card 1: Upload Resume */}
            <button
              type="button"
              onClick={() => onSelectMethod("upload")}
              className="group text-left p-4 sm:p-5 rounded-2xl border border-[#252525]/10 bg-white hover:border-[#FA0C40] hover:bg-[#FA0C400D]/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer flex flex-col justify-between"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FA0C400D] border border-[#FA0C40]/20 text-[#FA0C40] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-[#252525] group-hover:text-[#FA0C40] transition-colors">
                  Upload resume
                </h3>
                <p className="text-[11px] text-[#6B6B6B] mt-0.5 leading-snug">
                  PDF, DOCX, or Image (.png, .jpeg, .jpg)
                </p>
              </div>
            </button>

            {/* Card 2: Import LinkedIn */}
            <button
              type="button"
              onClick={() => onSelectMethod("linkedin")}
              className="group text-left p-4 sm:p-5 rounded-2xl border border-[#252525]/10 bg-white hover:border-[#0A66C2] hover:bg-blue-50/40 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer flex flex-col justify-between"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-[#0A66C2] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-[#252525] group-hover:text-[#0A66C2] transition-colors">
                  Import LinkedIn
                </h3>
                <p className="text-[11px] text-[#6B6B6B] mt-0.5 leading-snug">
                  Auto-fill directly from your profile
                </p>
              </div>
            </button>
          </div>

          {/* Card 3: Full-width Voice AI Option */}
          <button
            type="button"
            onClick={() => onSelectMethod("voice")}
            className="group w-full text-left p-4 sm:p-4.5 rounded-2xl border border-[#252525]/10 bg-white hover:border-[#FA0C40] hover:bg-[#FA0C400D]/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer flex items-center justify-between gap-4 mb-4"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#FA0C400D] border border-[#FA0C40]/20 text-[#FA0C40] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-[#252525] group-hover:text-[#FA0C40] transition-colors">
                  Create with AI Assistance
                </h3>
                <p className="text-[11px] text-[#6B6B6B] mt-0.5">
                  Speak or type — we'll structure and quantify your bullets
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#6B6B6B] group-hover:text-[#FA0C40] group-hover:translate-x-1 transition-all shrink-0" />
          </button>

          {/* Divider with "or" */}
          <div className="relative my-3.5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#252525]/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wider text-[#6B6B6B] font-bold">
              <span className="bg-white px-3">or</span>
            </div>
          </div>

          {/* Card 4: Full-Width Crimson Pill Button (From Scratch) */}
          <button
            type="button"
            onClick={() => onSelectMethod("scratch")}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#FA0C40] hover:bg-[#D40936] text-white font-extrabold text-xs sm:text-sm shadow-md shadow-[#FA0C40]/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Start from scratch</span>
          </button>
        </div>
      </div>
    </div>
  );
}
