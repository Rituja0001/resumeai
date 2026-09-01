import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Trash2,
} from "lucide-react";

/**
 * RepeatableEntryCard — Collapsible card for Work Experience, Education, Projects, Custom sections
 */
export default function RepeatableEntryCard({
  title = "Untitled Entry",
  subtitle = "No details specified",
  dateRange = "",
  isOpenDefault = true,
  onDuplicate,
  onDelete,
  children,
}) {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  return (
    <div className="bg-white rounded-2xl border border-[#252525]/10 shadow-[0_2px_10px_rgba(37,37,37,0.02)] overflow-hidden transition-all mb-3.5">
      {/* Header Bar */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 sm:px-5 py-3.5 bg-slate-50/70 hover:bg-slate-100/70 border-b border-[#252525]/5 flex items-center justify-between cursor-pointer transition-colors"
      >
        <div className="flex items-center gap-3 truncate pr-2">
          <button
            type="button"
            className="w-6 h-6 rounded-md hover:bg-[#252525]/10 flex items-center justify-center text-[#6B6B6B] shrink-0"
            aria-label="Toggle section"
          >
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <div className="truncate">
            <h4 className="text-xs sm:text-sm font-extrabold text-[#252525] truncate">
              {title}
            </h4>
            <p className="text-[11px] text-[#6B6B6B] truncate">
              {subtitle} {dateRange ? `· ${dateRange}` : ""}
            </p>
          </div>
        </div>

        {/* Actions (Duplicate & Delete) */}
        <div
          className="flex items-center gap-1 shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          {onDuplicate && (
            <button
              type="button"
              onClick={onDuplicate}
              className="w-7 h-7 rounded-lg hover:bg-[#252525]/10 text-[#6B6B6B] hover:text-[#252525] flex items-center justify-center transition-colors cursor-pointer"
              title="Duplicate entry"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="w-7 h-7 rounded-lg hover:bg-rose-50 text-[#6B6B6B] hover:text-rose-600 flex items-center justify-center transition-colors cursor-pointer"
              title="Delete entry"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Expandable Body */}
      {isOpen && (
        <div className="p-4 sm:p-5 space-y-3.5 animate-scale-in">
          {children}
        </div>
      )}
    </div>
  );
}

