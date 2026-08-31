import React, { useState, useEffect, useRef } from "react";
import { Star, X, CheckCircle2, MessageSquare, AlertCircle } from "lucide-react";
import { submitFeedback } from "../../api";

export default function FeedbackModal({ isOpen, onClose }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const modalRef = useRef(null);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setRating(5);
      setMessage("");
      setIsSuccess(false);
      setError("");
    }
  }, [isOpen]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setError("Please enter a short message before submitting.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await submitFeedback(message.trim(), rating);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2200);
    } catch (err) {
      setError(err.message || "Failed to submit feedback. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity font-['Plus_Jakarta_Sans']"
      onClick={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target) && !isSubmitting) {
          onClose();
        }
      }}
    >
      <style>{`
        @keyframes modalPop {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-modal-pop {
          animation: modalPop 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div
        ref={modalRef}
        className="animate-modal-pop relative w-full max-w-lg bg-white rounded-3xl border border-[#252525]/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] p-6 sm:p-8 text-left overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Decorative Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FA0C40] to-transparent" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#252525]/5 hover:bg-[#252525]/10 text-[#6B6B6B] hover:text-[#252525] flex items-center justify-center transition-colors cursor-pointer disabled:opacity-50"
          aria-label="Close Modal"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-4 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-[#252525] mb-2">
              Thank You for Your Feedback!
            </h3>
            <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-xs mx-auto leading-relaxed">
              Your insights help us continuously build a better resume creation platform.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-xl bg-[#FA0C400D] border border-[#FA0C40]/20 flex items-center justify-center text-[#FA0C40]">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-[#252525]">
                Share Your Feedback
              </h3>
            </div>
            <p className="text-xs text-[#6B6B6B] mb-5">
              Encountered a bug or have an idea to make ResumeCraft better? We'd love to hear from you.
            </p>

            {/* Error banner */}
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-[#FA0C40]/10 border border-[#FA0C40]/25 text-[#FA0C40] flex items-start gap-2 text-xs font-semibold">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Star Rating */}
              <div>
                <label className="block text-xs font-bold text-[#252525] mb-1.5">
                  How would you rate your experience so far?
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const active = (hoverRating || rating) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 rounded-lg hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                        aria-label={`${star} Stars`}
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${
                            active
                              ? "text-amber-400 fill-amber-400"
                              : "text-slate-200 fill-slate-100"
                          }`}
                        />
                      </button>
                    );
                  })}
                  <span className="ml-2 text-xs font-bold text-[#6B6B6B]">
                    {rating === 5
                      ? "Outstanding"
                      : rating === 4
                      ? "Great"
                      : rating === 3
                      ? "Good"
                      : rating === 2
                      ? "Needs Work"
                      : "Poor"}
                  </span>
                </div>
              </div>

              {/* Message Textarea */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-[#252525]">
                    Your Message / Suggestion
                  </label>
                  <span className="text-[10px] text-[#6B6B6B]">
                    {message.length}/1000
                  </span>
                </div>
                <textarea
                  rows={4}
                  maxLength={1000}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What's on your mind? Bugs, ideas, anything helps…"
                  className="w-full text-xs sm:text-sm text-[#252525] bg-[#252525]/[0.02] border border-[#252525]/15 focus:border-[#FA0C40] rounded-2xl p-3.5 focus:outline-none focus:ring-2 focus:ring-[#FA0C40]/30 transition-all resize-none leading-relaxed"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-4 py-2.5 rounded-full text-xs font-bold text-[#6B6B6B] hover:text-[#252525] hover:bg-[#252525]/5 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !message.trim()}
                  className="px-6 py-2.5 rounded-full bg-[#FA0C40] hover:bg-[#D40936] text-white text-xs font-extrabold shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Submitting…</span>
                    </>
                  ) : (
                    <span>Submit Feedback</span>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

