import React, { useState } from "react";

export default function Footer({ openBuilder, onLogoClick }) {
  const [logoLoaded, setLogoLoaded] = useState(true);

  return (
    <footer className="bg-[#FAF8F7] text-[#6B6B6B] font-['Plus_Jakarta_Sans'] border-t border-[#252525]/10 py-6 md:py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-center md:text-left">
        {/* Left: Brand Logo & Wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (onLogoClick) onLogoClick();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 group select-none transition-transform active:scale-95 cursor-pointer"
        >
          {logoLoaded ? (
            <img
              src="/images/logo-taktal.png"
              alt="ResumeCraft"
              onError={() => setLogoLoaded(false)}
              className="h-8 sm:h-9 w-auto object-contain select-none max-w-[170px]"
            />
          ) : (
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#FA0C40] to-[#D40936] text-white flex items-center justify-center text-xs font-extrabold shadow-sm">
                R
              </span>
              <span className="font-extrabold text-base tracking-tight text-[#252525] group-hover:text-[#FA0C40] transition-colors">
                ResumeCraft
              </span>
            </div>
          )}
        </a>

        {/* Center: Muted One-line Copyright */}
        <p className="text-xs text-[#6B6B6B] font-normal leading-relaxed">
          © 2026 ResumeCraft — Next-Gen AI Resume & ATS Engine. All rights reserved.
        </p>

        {/* Right: Inline Navigation Links */}
        <div className="flex items-center gap-4 sm:gap-6 text-xs font-semibold text-[#6B6B6B]">
          <button
            type="button"
            className="hover:text-[#FA0C40] transition-colors cursor-pointer"
            onClick={() => openBuilder("upload")}
          >
            Upload
          </button>
          <button
            type="button"
            className="hover:text-[#FA0C40] transition-colors cursor-pointer"
            onClick={() => openBuilder("linkedin")}
          >
            LinkedIn
          </button>
          <button
            type="button"
            className="hover:text-[#FA0C40] transition-colors cursor-pointer"
            onClick={() => openBuilder("voice")}
          >
            Voice AI
          </button>
          <button
            type="button"
            className="hover:text-[#FA0C40] transition-colors cursor-pointer"
            onClick={() => openBuilder("scratch")}
          >
            Scratch
          </button>
        </div>
      </div>
    </footer>
  );
}
