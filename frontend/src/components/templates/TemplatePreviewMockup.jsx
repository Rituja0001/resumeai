import React from "react";

/**
 * High-fidelity, scaled CSS/HTML visual mockup representing a resume template design.
 */
export default function TemplatePreviewMockup({ template }) {
  if (!template) return null;
  const { layoutStyle, sampleName = "Alex Morgan", sampleRole = "Software Engineer" } = template;

  return (
    <div className="w-full aspect-[1/1.36] bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-[#252525]/10 overflow-hidden select-none p-3.5 sm:p-4 text-[7px] sm:text-[8px] leading-tight font-['Plus_Jakarta_Sans'] flex flex-col justify-between transition-transform duration-300">
      {/* ------------------------------------------------------------------ */}
      {/* 1. Single Column Modern Minimal                                    */}
      {/* ------------------------------------------------------------------ */}
      {layoutStyle === "single-column" && (
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="border-b border-[#FA0C40]/30 pb-1.5 mb-2">
              <h4 className="font-extrabold text-[10px] sm:text-[11px] text-[#252525] tracking-tight">
                {sampleName}
              </h4>
              <p className="text-[7px] text-[#FA0C40] font-bold">{sampleRole}</p>
              <div className="flex gap-2 text-[5.5px] text-[#6B6B6B] mt-0.5">
                <span>San Francisco, CA</span>
                <span>•</span>
                <span>sarah@example.com</span>
                <span>•</span>
                <span>linkedin.com/in/sarah</span>
              </div>
            </div>

            {/* Summary */}
            <div className="mb-2">
              <p className="text-[6px] text-[#6B6B6B] leading-relaxed line-clamp-2">
                Senior full-stack engineer with 6+ years designing scalable cloud architectures, distributed systems, and real-time APIs.
              </p>
            </div>

            {/* Experience */}
            <div className="space-y-1.5 mb-2">
              <p className="font-extrabold text-[7px] text-[#FA0C40] uppercase tracking-wider">
                Experience
              </p>
              <div>
                <div className="flex justify-between font-bold text-[#252525]">
                  <span>Lead Platform Engineer · Stripe</span>
                  <span className="text-[#6B6B6B] font-normal">2022 - Present</span>
                </div>
                <div className="space-y-0.5 mt-0.5 text-[#6B6B6B]">
                  <div className="h-1 bg-[#252525]/15 rounded w-full" />
                  <div className="h-1 bg-[#252525]/10 rounded w-11/12" />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-bold text-[#252525]">
                  <span>Software Engineer · Vercel</span>
                  <span className="text-[#6B6B6B] font-normal">2019 - 2022</span>
                </div>
                <div className="space-y-0.5 mt-0.5 text-[#6B6B6B]">
                  <div className="h-1 bg-[#252525]/15 rounded w-full" />
                  <div className="h-1 bg-[#252525]/10 rounded w-4/5" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Skills Row */}
          <div className="border-t border-[#252525]/10 pt-1.5 flex justify-between items-center text-[6px]">
            <span className="font-bold text-[#252525]">Skills</span>
            <div className="flex gap-1 text-[#6B6B6B]">
              <span className="bg-[#252525]/5 px-1 py-0.2 rounded">React</span>
              <span className="bg-[#252525]/5 px-1 py-0.2 rounded">TypeScript</span>
              <span className="bg-[#252525]/5 px-1 py-0.2 rounded">PostgreSQL</span>
              <span className="bg-[#252525]/5 px-1 py-0.2 rounded">AWS</span>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 2. Executive Left Sidebar                                          */}
      {/* ------------------------------------------------------------------ */}
      {layoutStyle === "left-sidebar" && (
        <div className="grid grid-cols-[35%_65%] h-full gap-2 -m-3.5 sm:-m-4">
          {/* Left Dark Sidebar */}
          <div className="bg-[#252525] text-white p-2.5 flex flex-col justify-between">
            <div>
              <div className="w-6 h-6 rounded-full bg-[#FA0C40] text-white flex items-center justify-center font-extrabold text-[8px] mb-1.5 shadow-sm">
                MV
              </div>
              <h5 className="font-extrabold text-[8px] text-white leading-tight">
                {sampleName}
              </h5>
              <p className="text-[5.5px] text-white/70">{sampleRole}</p>

              <div className="mt-3 space-y-1.5">
                <p className="font-bold text-[6px] text-[#FA0C40] uppercase tracking-wider">
                  Core Skills
                </p>
                <div className="space-y-0.5 text-[5.5px] text-white/80">
                  <div>• Org Leadership</div>
                  <div>• Cloud Scaling</div>
                  <div>• Budget & P&L</div>
                  <div>• OKR Delivery</div>
                </div>
              </div>
            </div>

            <div className="text-[5.5px] text-white/50 border-t border-white/10 pt-1">
              New York, NY
            </div>
          </div>

          {/* Right Content */}
          <div className="p-2.5 flex flex-col justify-between">
            <div>
              <div className="mb-2">
                <p className="font-bold text-[7px] text-[#252525] uppercase tracking-wider mb-0.5">
                  Executive Profile
                </p>
                <div className="h-1 bg-[#252525]/15 rounded w-full mb-0.5" />
                <div className="h-1 bg-[#252525]/10 rounded w-5/6" />
              </div>

              <div className="space-y-1.5">
                <p className="font-bold text-[7px] text-[#252525] uppercase tracking-wider">
                  Leadership Experience
                </p>
                <div>
                  <p className="font-bold text-[7px] text-[#252525]">VP Engineering · Datadog</p>
                  <p className="text-[5.5px] text-[#6B6B6B] mb-0.5">2021 - Present</p>
                  <div className="h-1 bg-[#252525]/15 rounded w-full mb-0.5" />
                  <div className="h-1 bg-[#252525]/10 rounded w-11/12" />
                </div>
                <div>
                  <p className="font-bold text-[7px] text-[#252525]">Director of Eng · Twilio</p>
                  <p className="text-[5.5px] text-[#6B6B6B] mb-0.5">2018 - 2021</p>
                  <div className="h-1 bg-[#252525]/15 rounded w-full" />
                </div>
              </div>
            </div>

            <div className="border-t border-[#252525]/10 pt-1 text-[5.5px] text-[#6B6B6B]">
              Education: MS Comp Sci, Columbia University
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 3. Tech Stack Pro (Monospace / Code Focus)                         */}
      {/* ------------------------------------------------------------------ */}
      {layoutStyle === "single-column-code" && (
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="bg-slate-50 border border-slate-200 p-1.5 rounded-lg mb-2 flex justify-between items-center">
              <div>
                <h4 className="font-extrabold text-[9px] text-[#252525] font-mono">
                  {sampleName}
                </h4>
                <p className="text-[6.5px] text-blue-600 font-semibold">{sampleRole}</p>
              </div>
              <span className="text-[6px] bg-blue-100 text-blue-700 px-1 py-0.2 rounded font-mono">
                github.com/dchen
              </span>
            </div>

            {/* Skills Badges */}
            <div className="flex flex-wrap gap-1 mb-2">
              <span className="bg-slate-100 text-[#252525] px-1 py-0.2 rounded text-[5.5px] font-mono">
                Go / Rust
              </span>
              <span className="bg-slate-100 text-[#252525] px-1 py-0.2 rounded text-[5.5px] font-mono">
                Kubernetes
              </span>
              <span className="bg-slate-100 text-[#252525] px-1 py-0.2 rounded text-[5.5px] font-mono">
                gRPC
              </span>
              <span className="bg-slate-100 text-[#252525] px-1 py-0.2 rounded text-[5.5px] font-mono">
                Kafka
              </span>
            </div>

            {/* Experience */}
            <div className="space-y-1.5">
              <p className="font-bold text-[7px] text-slate-800 uppercase tracking-wider">
                Engineering Experience
              </p>
              <div>
                <div className="flex justify-between font-bold text-[6.5px] text-[#252525]">
                  <span>Staff Distributed Eng · Cloudflare</span>
                  <span className="text-[#6B6B6B]">2021 - Present</span>
                </div>
                <div className="space-y-0.5 mt-0.5">
                  <div className="h-1 bg-slate-300 rounded w-full" />
                  <div className="h-1 bg-slate-200 rounded w-11/12" />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-bold text-[6.5px] text-[#252525]">
                  <span>Backend Engineer · Redis Labs</span>
                  <span className="text-[#6B6B6B]">2019 - 2021</span>
                </div>
                <div className="space-y-0.5 mt-0.5">
                  <div className="h-1 bg-slate-300 rounded w-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="text-[5.5px] text-[#6B6B6B] border-t border-slate-100 pt-1">
            Projects: Open-Source Raft Consensus Engine (1.4k stars)
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 4. Classic Ivy Corporate                                           */}
      {/* ------------------------------------------------------------------ */}
      {layoutStyle === "classic-serif" && (
        <div className="flex flex-col h-full justify-between text-center">
          <div>
            <div className="border-b-2 border-[#1E293B] pb-1.5 mb-2">
              <h4 className="font-serif font-bold text-[10px] text-[#1E293B] tracking-wider uppercase">
                {sampleName}
              </h4>
              <p className="font-serif text-[6.5px] text-[#1E293B]/80 italic">
                {sampleRole}
              </p>
              <p className="text-[5.5px] text-[#6B6B6B] mt-0.5">
                Boston, MA · 555-0192 · eleanor.s@ivy.edu
              </p>
            </div>

            <div className="text-left space-y-1.5 mb-2">
              <div className="border-b border-[#1E293B]/20 pb-0.5">
                <span className="font-serif font-bold text-[6.5px] text-[#1E293B] uppercase tracking-wider">
                  Professional Experience
                </span>
              </div>
              <div>
                <div className="flex justify-between font-bold text-[6.5px] text-[#1E293B]">
                  <span>Goldman Sachs & Co. · Vice President</span>
                  <span className="font-normal text-[#6B6B6B]">2020 - Present</span>
                </div>
                <div className="space-y-0.5 mt-0.5">
                  <div className="h-1 bg-[#1E293B]/20 rounded w-full" />
                  <div className="h-1 bg-[#1E293B]/15 rounded w-5/6" />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-bold text-[6.5px] text-[#1E293B]">
                  <span>Morgan Stanley · Senior Analyst</span>
                  <span className="font-normal text-[#6B6B6B]">2017 - 2020</span>
                </div>
                <div className="space-y-0.5 mt-0.5">
                  <div className="h-1 bg-[#1E293B]/20 rounded w-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#1E293B]/20 pt-1 text-[5.5px] text-[#6B6B6B] text-left">
            <span className="font-bold text-[#1E293B]">Education: </span>
            Harvard University — B.A. Economics (Magna Cum Laude)
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 5. Creative Studio / Design Banner                                 */}
      {/* ------------------------------------------------------------------ */}
      {layoutStyle === "header-banner" && (
        <div className="flex flex-col h-full justify-between -m-3.5 sm:-m-4">
          <div className="bg-gradient-to-r from-violet-600 to-purple-500 text-white p-3">
            <h4 className="font-extrabold text-[10px] text-white">
              {sampleName}
            </h4>
            <p className="text-[6.5px] text-violet-200">{sampleRole}</p>
            <div className="flex gap-2 text-[5.5px] text-violet-100 mt-1">
              <span>portfolio.mayalin.design</span>
              <span>•</span>
              <span>Figma Community Creator</span>
            </div>
          </div>

          <div className="p-3 space-y-2 flex-1">
            <div>
              <p className="font-extrabold text-[7px] text-violet-700 uppercase tracking-wider mb-0.5">
                Product Design Experience
              </p>
              <div className="space-y-1">
                <div>
                  <div className="flex justify-between font-bold text-[6.5px] text-[#252525]">
                    <span>Staff Designer · Figma</span>
                    <span className="text-[#6B6B6B]">2022 - Present</span>
                  </div>
                  <div className="h-1 bg-violet-200 rounded w-full mt-0.5" />
                  <div className="h-1 bg-violet-100 rounded w-4/5 mt-0.5" />
                </div>
              </div>
            </div>

            <div>
              <p className="font-extrabold text-[7px] text-violet-700 uppercase tracking-wider mb-0.5">
                Design Systems & Tooling
              </p>
              <div className="flex gap-1 text-[5.5px]">
                <span className="bg-violet-50 text-violet-700 px-1 py-0.2 rounded border border-violet-200">
                  Figma Tokens
                </span>
                <span className="bg-violet-50 text-violet-700 px-1 py-0.2 rounded border border-violet-200">
                  Design Systems
                </span>
                <span className="bg-violet-50 text-violet-700 px-1 py-0.2 rounded border border-violet-200">
                  Prototyping
                </span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border-t border-slate-200 px-3 py-1 text-[5.5px] text-[#6B6B6B]">
            Honors: Apple Design Award Nominee 2023
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 6. Clean Fresher & Graduate                                        */}
      {/* ------------------------------------------------------------------ */}
      {layoutStyle === "education-first" && (
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="border-b border-emerald-500/30 pb-1.5 mb-2">
              <h4 className="font-extrabold text-[10px] text-[#252525]">
                {sampleName}
              </h4>
              <p className="text-[6.5px] text-emerald-600 font-bold">{sampleRole}</p>
              <p className="text-[5.5px] text-[#6B6B6B] mt-0.5">
                rohan@alumni.edu · +1 (555) 492-3021 · GitHub / Portfolio
              </p>
            </div>

            {/* Education First Block */}
            <div className="mb-2 bg-emerald-50/70 border border-emerald-200/60 p-1.5 rounded-lg">
              <p className="font-extrabold text-[6.5px] text-emerald-800 uppercase tracking-wider">
                Education
              </p>
              <div className="flex justify-between font-bold text-[6.5px] text-[#252525]">
                <span>B.S. in Computer Science · UC Berkeley</span>
                <span className="text-emerald-700">GPA: 3.92 / 4.0</span>
              </div>
              <p className="text-[5.5px] text-[#6B6B6B]">
                Relevant Coursework: Data Structures, Algorithms, Distributed Systems, ML
              </p>
            </div>

            {/* Projects & Internships */}
            <div className="space-y-1">
              <p className="font-extrabold text-[6.5px] text-emerald-700 uppercase tracking-wider">
                Projects & Internships
              </p>
              <div>
                <p className="font-bold text-[6.5px] text-[#252525]">SWE Intern · Microsoft</p>
                <div className="h-1 bg-emerald-200 rounded w-full mt-0.5" />
                <div className="h-1 bg-emerald-100 rounded w-5/6 mt-0.5" />
              </div>
            </div>
          </div>

          <div className="border-t border-emerald-100 pt-1 flex justify-between text-[5.5px] text-[#6B6B6B]">
            <span>Hackathon Winner (CalHacks '23)</span>
            <span className="font-bold text-emerald-700">Python · Java · C++ · React</span>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 7. Dense One-Pager (Teal Accent)                                   */}
      {/* ------------------------------------------------------------------ */}
      {layoutStyle === "dense-grid" && (
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="flex justify-between items-baseline border-b border-teal-600 pb-1 mb-1.5">
              <div>
                <h4 className="font-extrabold text-[9.5px] text-teal-950">
                  {sampleName}
                </h4>
                <p className="text-[6.5px] text-teal-700 font-bold">{sampleRole}</p>
              </div>
              <span className="text-[5.5px] text-[#6B6B6B]">NYC · alex@quant.io</span>
            </div>

            <div className="space-y-1.5">
              <div>
                <div className="flex justify-between font-bold text-[6.5px] text-[#252525]">
                  <span>Citadel LLC · Senior Quant Dev</span>
                  <span className="text-[#6B6B6B]">2021 - Present</span>
                </div>
                <div className="space-y-0.5 mt-0.5">
                  <div className="h-0.5 bg-teal-300 rounded w-full" />
                  <div className="h-0.5 bg-teal-200 rounded w-11/12" />
                  <div className="h-0.5 bg-teal-100 rounded w-4/5" />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-bold text-[6.5px] text-[#252525]">
                  <span>Two Sigma · Quantitative Analyst</span>
                  <span className="text-[#6B6B6B]">2018 - 2021</span>
                </div>
                <div className="space-y-0.5 mt-0.5">
                  <div className="h-0.5 bg-teal-300 rounded w-full" />
                  <div className="h-0.5 bg-teal-200 rounded w-5/6" />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-bold text-[6.5px] text-[#252525]">
                  <span>DE Shaw · Research Associate</span>
                  <span className="text-[#6B6B6B]">2016 - 2018</span>
                </div>
                <div className="h-0.5 bg-teal-200 rounded w-full mt-0.5" />
              </div>
            </div>
          </div>

          <div className="border-t border-teal-100 pt-0.5 flex justify-between text-[5.5px] text-[#6B6B6B]">
            <span>C++20 · Python · NumPy · CUDA</span>
            <span>M.S. Financial Eng, MIT</span>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 8. Product & Growth (Right Split Metrics)                          */}
      {/* ------------------------------------------------------------------ */}
      {layoutStyle === "two-column-right" && (
        <div className="grid grid-cols-[68%_32%] h-full gap-2">
          {/* Main Area */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="border-b border-amber-400 pb-1 mb-1.5">
                <h4 className="font-extrabold text-[9px] text-[#252525]">
                  {sampleName}
                </h4>
                <p className="text-[6px] text-amber-600 font-bold">{sampleRole}</p>
              </div>

              <div className="space-y-1">
                <p className="font-extrabold text-[6.5px] text-[#252525] uppercase">
                  Product Leadership
                </p>
                <div>
                  <p className="font-bold text-[6.5px] text-[#252525]">Principal PM · Airbnb</p>
                  <div className="h-1 bg-amber-200 rounded w-full mt-0.5" />
                  <div className="h-1 bg-amber-100 rounded w-11/12 mt-0.5" />
                </div>
                <div>
                  <p className="font-bold text-[6.5px] text-[#252525]">Lead PM · Uber</p>
                  <div className="h-1 bg-amber-100 rounded w-full mt-0.5" />
                </div>
              </div>
            </div>

            <div className="text-[5.5px] text-[#6B6B6B] border-t border-amber-100 pt-1">
              Stanford MBA '19
            </div>
          </div>

          {/* Right Metrics Sidebar */}
          <div className="bg-amber-50/70 border border-amber-200/60 rounded-lg p-1.5 flex flex-col justify-between text-center">
            <div>
              <p className="font-extrabold text-[5.5px] text-amber-800 uppercase mb-1">
                Impact KPIs
              </p>
              <div className="space-y-1">
                <div className="bg-white p-1 rounded border border-amber-200">
                  <span className="font-extrabold text-[7px] text-amber-600 block">+48%</span>
                  <span className="text-[4.5px] text-[#6B6B6B]">Conversion Rate</span>
                </div>
                <div className="bg-white p-1 rounded border border-amber-200">
                  <span className="font-extrabold text-[7px] text-amber-600 block">$18M</span>
                  <span className="text-[4.5px] text-[#6B6B6B]">ARR Added</span>
                </div>
              </div>
            </div>
            <div className="text-[5px] text-amber-900 font-bold">
              Agile · SQL · Amplitude
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 9. Marketing & Strategy (Pink Accent)                              */}
      {/* ------------------------------------------------------------------ */}
      {layoutStyle === "modern-split" && (
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="flex justify-between items-center border-b-2 border-pink-500 pb-1 mb-2">
              <div>
                <h4 className="font-extrabold text-[9.5px] text-[#252525]">
                  {sampleName}
                </h4>
                <p className="text-[6.5px] text-pink-600 font-bold">{sampleRole}</p>
              </div>
              <span className="text-[5.5px] bg-pink-50 text-pink-700 px-1.5 py-0.5 rounded-full font-bold border border-pink-200">
                Growth Specialist
              </span>
            </div>

            <div className="space-y-1.5">
              <div>
                <div className="flex justify-between font-bold text-[6.5px] text-[#252525]">
                  <span>VP Growth · Calm App</span>
                  <span className="text-[#6B6B6B]">2021 - Present</span>
                </div>
                <div className="h-1 bg-pink-200 rounded w-full mt-0.5" />
                <div className="h-1 bg-pink-100 rounded w-4/5 mt-0.5" />
              </div>
              <div>
                <div className="flex justify-between font-bold text-[6.5px] text-[#252525]">
                  <span>Head of Acquisition · Duolingo</span>
                  <span className="text-[#6B6B6B]">2018 - 2021</span>
                </div>
                <div className="h-1 bg-pink-200 rounded w-full mt-0.5" />
              </div>
            </div>
          </div>

          <div className="border-t border-pink-100 pt-1 flex justify-between text-[5.5px] text-[#6B6B6B]">
            <span>Channels: Paid Social, SEO, Influencer, Lifecycle</span>
            <span className="font-bold text-pink-600">3x Organic Scaling</span>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 10. Nordic Slate Minimal                                           */}
      {/* ------------------------------------------------------------------ */}
      {layoutStyle === "nordic-clean" && (
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="border-b border-slate-300 pb-1.5 mb-2">
              <h4 className="font-extrabold text-[10px] text-slate-800 tracking-wide">
                {sampleName}
              </h4>
              <p className="text-[6.5px] text-slate-500 tracking-wider uppercase font-semibold">
                {sampleRole}
              </p>
              <p className="text-[5.5px] text-slate-400 mt-0.5">
                Stockholm, Sweden · henrik@nordic.se
              </p>
            </div>

            <div className="space-y-1.5">
              <div>
                <div className="flex justify-semibold text-[6.5px] text-slate-800">
                  <span>Spotify · VP Strategy</span>
                  <span className="text-slate-400">2020 - Present</span>
                </div>
                <div className="h-1 bg-slate-200 rounded w-full mt-0.5" />
                <div className="h-1 bg-slate-150 rounded w-5/6 mt-0.5" />
              </div>
              <div>
                <div className="flex justify-semibold text-[6.5px] text-slate-800">
                  <span>Klarna · Director of Product</span>
                  <span className="text-slate-400">2016 - 2020</span>
                </div>
                <div className="h-1 bg-slate-200 rounded w-full mt-0.5" />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-1 text-[5.5px] text-slate-500 flex justify-between">
            <span>Stockholm School of Economics</span>
            <span>Product Strategy & Scaling</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Named export support as well
export { TemplatePreviewMockup };

