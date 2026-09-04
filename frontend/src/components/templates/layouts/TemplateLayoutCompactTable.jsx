import React from "react";

export default function TemplateLayoutCompactTable({ template }) {
  const {
    sampleName,
    sampleRole,
    sampleLocation,
    sampleEmail,
    samplePhone,
    sampleSummary,
    sampleExperience = [],
    sampleEducation = [],
    sampleSkills = [],
    sampleProjects = [],
    sampleLanguages = [],
    sampleLinks = [],
    sampleHobbies,
    accentColor = "#065F46",
  } = template;

  return (
    <div className="w-full h-full bg-white p-2.5 sm:p-3 flex flex-col justify-between select-none font-['Plus_Jakarta_Sans'] text-[#252525] overflow-hidden text-[5.5px]">
      {/* Dense Header */}
      <div className="space-y-1.5 overflow-hidden">
        <div className="flex justify-between items-baseline border-b-2 pb-1" style={{ borderColor: accentColor }}>
          <div>
            <h4 className="font-extrabold text-[9.5px] sm:text-[10.5px] text-[#252525] tracking-tight leading-tight">
              {sampleName}
            </h4>
            <p className="text-[6.5px] font-bold" style={{ color: accentColor }}>
              {sampleRole}
            </p>
          </div>
          <div className="text-right text-[4.8px] text-[#777]">
            <p className="truncate">{sampleLocation} · {sampleEmail}</p>
            <p className="truncate">{samplePhone}</p>
            {sampleLinks && sampleLinks.length > 0 && (
              <p className="truncate">🔗 {sampleLinks[0].url}</p>
            )}
          </div>
        </div>

        {/* Dense Summary */}
        {sampleSummary && (
          <p className="text-[5.2px] text-[#555] leading-snug line-clamp-2">
            {sampleSummary}
          </p>
        )}

        {/* Compact Experience Table */}
        {sampleExperience.length > 0 && (
          <div>
            <div className="flex justify-between items-center text-[5.8px] font-extrabold uppercase tracking-wider mb-0.5 pb-0.5 border-b border-slate-100" style={{ color: accentColor }}>
              <span>Professional History</span>
              <span className="font-normal text-[4.8px] text-[#888]">Chronological</span>
            </div>

            <div className="space-y-1">
              {sampleExperience.slice(0, 2).map((exp, idx) => (
                <div key={idx} className="bg-slate-50/70 p-1 rounded border border-slate-100">
                  <div className="flex justify-between items-baseline text-[5.5px] font-bold text-[#252525]">
                    <span className="truncate">{exp.role} <span className="font-semibold text-emerald-800">@{exp.company}</span></span>
                    <span className="text-[4.8px] font-normal text-[#888] shrink-0">{exp.duration}</span>
                  </div>
                  {exp.bullets && (
                    <ul className="space-y-0.5 mt-0.5 text-[4.8px] text-[#555]">
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

        {/* Key Projects */}
        {sampleProjects.length > 0 && (
          <div>
            <div className="text-[5.8px] font-extrabold uppercase tracking-wider mb-0.5 pb-0.5 border-b border-slate-100" style={{ color: accentColor }}>
              Key Projects
            </div>
            <div className="space-y-0.5">
              {sampleProjects.slice(0, 1).map((proj, idx) => (
                <div key={idx} className="text-[5px]">
                  <span className="font-bold text-[#252525] truncate">{proj.title || proj.name}</span>
                  <span className="text-[#888]"> · {proj.techStack || proj.tech_stack}</span>
                  {proj.description && (
                    <p className="text-[4.8px] text-[#555] line-clamp-1">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Dense Bottom Grid: Education & Skills */}
      <div className="border-t border-slate-200 pt-1 grid grid-cols-2 gap-2 text-[5px]">
        <div>
          <span className="font-bold text-[#252525] block uppercase tracking-wider text-[5.2px]">Education:</span>
          <p className="text-[#666] truncate text-[4.8px]">{sampleEducation[0]?.institution} — {sampleEducation[0]?.degree} ({sampleEducation[0]?.year})</p>
          {sampleHobbies && (
            <p className="text-[#777] truncate text-[4.5px] mt-0.5">Interests: {sampleHobbies}</p>
          )}
        </div>
        <div>
          <span className="font-bold text-[#252525] block uppercase tracking-wider text-[5.2px]">Technical & Languages:</span>
          <p className="text-[#666] truncate text-[4.8px]">{sampleSkills.slice(0, 4).map((s) => typeof s === "string" ? s : s.name).join(" · ")}</p>
          {sampleLanguages.length > 0 && (
            <p className="text-[#777] truncate text-[4.5px] mt-0.5">Lang: {sampleLanguages.slice(0, 2).map((l) => typeof l === "string" ? l : l.name).join(", ")}</p>
          )}
        </div>
      </div>
    </div>
  );
}

