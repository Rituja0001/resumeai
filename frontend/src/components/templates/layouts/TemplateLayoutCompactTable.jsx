import React from "react";

export default function TemplateLayoutCompactTable({ template }) {
  const { sampleName, sampleRole, sampleLocation, sampleEmail, samplePhone, sampleSummary, sampleExperience = [], sampleEducation = [], sampleSkills = [], accentColor = "#065F46" } = template;

  return (
    <div className="w-full h-full bg-white p-3 sm:p-3.5 flex flex-col justify-between select-none font-['Plus_Jakarta_Sans'] text-[#252525]">
      {/* Dense Header */}
      <div>
        <div className="flex justify-between items-baseline border-b-2 pb-1 mb-1.5" style={{ borderColor: accentColor }}>
          <div>
            <h4 className="font-extrabold text-[10px] sm:text-[11px] text-[#252525] tracking-tight">
              {sampleName}
            </h4>
            <p className="text-[6.8px] font-bold" style={{ color: accentColor }}>
              {sampleRole}
            </p>
          </div>
          <div className="text-right text-[5px] text-[#777]">
            <p>{sampleLocation} · {sampleEmail}</p>
            <p>{samplePhone}</p>
          </div>
        </div>

        {/* Dense Summary */}
        {sampleSummary && (
          <p className="text-[5.5px] text-[#555] leading-snug line-clamp-2 mb-1.5">
            {sampleSummary}
          </p>
        )}

        {/* Compact Experience Table */}
        {sampleExperience.length > 0 && (
          <div className="mb-1.5">
            <div className="flex justify-between items-center text-[6px] font-extrabold uppercase tracking-wider mb-1 pb-0.5 border-b border-slate-100" style={{ color: accentColor }}>
              <span>Professional History</span>
              <span className="font-normal text-[5px] text-[#888]">Chronological</span>
            </div>

            <div className="space-y-1">
              {sampleExperience.slice(0, 2).map((exp, idx) => (
                <div key={idx} className="bg-slate-50/70 p-1 rounded border border-slate-100">
                  <div className="flex justify-between items-baseline text-[6px] font-bold text-[#252525]">
                    <span>{exp.role} <span className="font-semibold text-emerald-800">@{exp.company}</span></span>
                    <span className="text-[5px] font-normal text-[#888]">{exp.duration}</span>
                  </div>
                  {exp.bullets && (
                    <ul className="space-y-0.5 mt-0.5 text-[5.2px] text-[#555]">
                      {exp.bullets.slice(0, 2).map((bullet, bIdx) => (
                        <li key={bIdx} className="line-clamp-1 pl-1.5 relative before:content-['•'] before:absolute before:left-0 before:text-emerald-700">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Dense Bottom Grid: Education & Skills */}
      <div className="border-t border-slate-200 pt-1 grid grid-cols-2 gap-2 text-[5.3px]">
        <div>
          <span className="font-bold text-[#252525] block">Education:</span>
          <p className="text-[#666] truncate">{sampleEducation[0]?.institution} — {sampleEducation[0]?.degree}</p>
        </div>
        <div>
          <span className="font-bold text-[#252525] block">Technical Competencies:</span>
          <p className="text-[#666] truncate">{sampleSkills.slice(0, 4).join(" · ")}</p>
        </div>
      </div>
    </div>
  );
}

