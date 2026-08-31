import React, { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FaqItem({ q, a, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 mb-3.5 overflow-hidden font-['Plus_Jakarta_Sans'] ${
        open
          ? "border-[#FA0C40]/40 bg-white shadow-md"
          : "border-[#252525]/10 bg-white hover:border-[#FA0C40]/30 hover:shadow-sm"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-5 sm:p-6 flex items-center justify-between text-left group transition-all cursor-pointer"
      >
        <span
          className={`font-bold text-base sm:text-lg transition-colors pr-4 ${
            open ? "text-[#FA0C40]" : "text-[#252525] group-hover:text-[#FA0C40]"
          }`}
        >
          {q}
        </span>
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
            open
              ? "bg-[#FA0C40] text-white rotate-45 shadow-sm"
              : "bg-[#FA0C400D] text-[#252525] border border-[#FA0C40]/15 group-hover:bg-[#252525] group-hover:text-white"
          }`}
        >
          <Plus className="w-4 h-4" />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-[#252525]/5 text-sm sm:text-base text-[#6B6B6B] leading-relaxed font-normal">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
