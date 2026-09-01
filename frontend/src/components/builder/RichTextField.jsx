import React, { useRef } from "react";
import {
  Bold,
  Italic,
  List,
  Link as LinkIcon,
  Sparkles,
} from "lucide-react";

/**
 * RichTextField — reusable textarea with markdown formatting toolbar, character count, and AI assistant
 */
export default function RichTextField({
  value = "",
  onChange,
  placeholder = "Write or paste details…",
  rows = 3,
  maxLength = 2000,
  onAskAi,
  isAiThinking = false,
  aiLabel = "Ask AI",
  className = "",
}) {
  const textareaRef = useRef(null);

  const applyFormat = (prefix, suffix = "") => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.substring(start, end);
    const replacement = prefix + (selected || "text") + suffix;
    const nextVal = value.substring(0, start) + replacement + value.substring(end);
    onChange(nextVal);

    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + prefix.length, start + prefix.length + (selected.length || 4));
    }, 0);
  };

  const applyBullet = () => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.substring(start, end);

    if (selected) {
      const bulleted = selected
        .split("\n")
        .map((line) => (line.startsWith("• ") ? line : `• ${line}`))
        .join("\n");
      const nextVal = value.substring(0, start) + bulleted + value.substring(end);
      onChange(nextVal);
    } else {
      const nextVal = value.substring(0, start) + "\n• " + value.substring(end);
      onChange(nextVal);
      setTimeout(() => {
        el.focus();
        el.setSelectionRange(start + 3, start + 3);
      }, 0);
    }
  };

  const applyLink = () => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.substring(start, end);
    const replacement = `[${selected || "Link Text"}](https://example.com)`;
    const nextVal = value.substring(0, start) + replacement + value.substring(end);
    onChange(nextVal);
  };

  return (
    <div className={`rounded-xl border border-[#252525]/15 bg-[#FAFAFA] focus-within:border-[#FA0C40] focus-within:ring-2 focus-within:ring-[#FA0C40]/20 transition-all ${className}`}>
      {/* Formatting Toolbar */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#252525]/10 bg-white/70 rounded-t-xl">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => applyFormat("**", "**")}
            className="w-7 h-7 rounded-lg hover:bg-[#252525]/5 flex items-center justify-center text-[#6B6B6B] hover:text-[#252525] transition-colors cursor-pointer"
            title="Bold (**text**)"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => applyFormat("*", "*")}
            className="w-7 h-7 rounded-lg hover:bg-[#252525]/5 flex items-center justify-center text-[#6B6B6B] hover:text-[#252525] transition-colors cursor-pointer"
            title="Italic (*text*)"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={applyBullet}
            className="w-7 h-7 rounded-lg hover:bg-[#252525]/5 flex items-center justify-center text-[#6B6B6B] hover:text-[#252525] transition-colors cursor-pointer"
            title="Bullet List (• item)"
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={applyLink}
            className="w-7 h-7 rounded-lg hover:bg-[#252525]/5 flex items-center justify-center text-[#6B6B6B] hover:text-[#252525] transition-colors cursor-pointer"
            title="Add Link"
          >
            <LinkIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Ask AI Button */}
        {onAskAi && (
          <button
            type="button"
            onClick={onAskAi}
            disabled={isAiThinking}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FA0C400D] hover:bg-[#FA0C40]/10 border border-[#FA0C40]/25 text-[#FA0C40] text-[11px] font-extrabold transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <Sparkles className={`w-3 h-3 ${isAiThinking ? "animate-spin" : ""}`} />
            <span>{isAiThinking ? "Generating…" : aiLabel}</span>
          </button>
        )}
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        rows={rows}
        maxLength={maxLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 bg-transparent text-xs sm:text-sm text-[#252525] focus:outline-none resize-none placeholder:text-[#6B6B6B]/60 font-['Plus_Jakarta_Sans'] leading-relaxed"
      />

      {/* Character Counter */}
      <div className="px-3 py-1 text-right text-[10px] text-[#6B6B6B] border-t border-[#252525]/5 font-medium">
        {value.length} / {maxLength}
      </div>
    </div>
  );
}

