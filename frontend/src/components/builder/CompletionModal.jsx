import React, { useEffect } from "react";
import {
  CheckCircle2,
  Star,
  Check,
  ArrowRight,
  X,
  Sparkles,
} from "lucide-react";

/**
 * CompletionModal — Displayed upon finishing onboarding flow
 */
export default function CompletionModal({
  isOpen,
  onClose,
  filename = "My_Resume",
  onSetupProfile,
}) {
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
      className="fixed inset-0 z-50 bg-[#252525]/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl border border-[#252525]/10 shadow-[0_25px_60px_rgba(0,0,0,0.18)] max-w-lg w-full p-6 sm:p-8 relative font-['Plus_Jakarta_Sans'] text-[#252525] animate-scale-in my-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#252525]/5 hover:bg-[#252525]/10 flex items-center justify-center text-[#6B6B6B] hover:text-[#252525] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Success Icon */}
        <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-3.5 shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        {/* Heading */}
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#252525] tracking-tight">
          Resume created!
        </h2>
        <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1 mb-6">
          <span className="font-bold text-[#252525]">{filename}</span> is ready to customize and download.
        </p>

        {/* Secondary Benefit Card */}
        <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-5 text-left mb-6 relative overflow-hidden">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Star className="w-3.5 h-3.5 fill-amber-600" />
              </div>
              <h4 className="font-extrabold text-xs sm:text-sm text-[#252525]">
                One more thing while you're here
              </h4>
            </div>
            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full shrink-0">
              Takes ~20s
            </span>
          </div>

          <p className="text-xs text-[#6B6B6B] mb-3 leading-relaxed">
            Turn this resume into a sleek, verified public link you can add to your LinkedIn bio and job applications.
          </p>

          <div className="space-y-1.5 text-xs text-[#252525] font-medium">
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>resumecraft.ai/u/your-name — permanent link</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Auto-updates instantly every time you edit</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={onSetupProfile}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#FA0C40] hover:bg-[#D40936] text-white font-extrabold text-xs sm:text-sm shadow-md shadow-[#FA0C40]/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>Set up my public profile</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-[#6B6B6B] hover:text-[#252525] transition-colors cursor-pointer py-1"
          >
            Skip, return to editor
          </button>
        </div>
      </div>
    </div>
  );
}

