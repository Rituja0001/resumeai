import React from "react";

export default function TemplateLayoutColorBand({ template }) {
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
    accentColor = "#B45309",
  } = template;

  return (
    <div className="w-full h-full bg-white flex select-none font-['Plus_Jakarta_Sans'] text-[#252525] overflow-hidden text-[5.5px]">
      {/* Colored Left Accent Strip */}
      <div className="w-2 shrink-0" style={{ backgroundColor: accentColor }} />

      {/* Content Container */}
      <div className="p-2.5 sm:p-3 flex-1 flex flex-col justify-start overflow-hidden">
        <div className="space-y-1.5 overflow-hidden flex-1 flex flex-col justify-between">
          {/* Header */}
          <div className="border-b pb-1" style={{ borderColor: `${accentColor}30` }}>
            <div className="flex justify-between items-baseline">
              <h4 className="font-extrabold text-[10px] sm:text-[11px] text-[#252525] tracking-tight leading-tight">
                {sampleName}
              </h4>
              <span className="text-[5px] font-bold px-1 py-0.2 rounded" style={{ backgroundColor: `${accentColor}15`, color: accentColor }}>
                Verified ATS
              </span>
            </div>
            <p className="text-[6.8px] font-bold" style={{ color: accentColor }}>
              {sampleRole}
            </p>
            <div className="flex flex-wrap gap-x-1.5 gap-y-0.5 text-[5px] text-[#777] mt-0.5">
              <span>{sampleLocation}</span>
              <span>·</span>
              <span>{sampleEmail}</span>
              <span>·</span>
              <span>{samplePhone}</span>
              {sampleLinks && sampleLinks.length > 0 && (
                <>
                  <span>·</span>
                  <span className="truncate">{sampleLinks[0].url.replace(/^https?:\/\//, '')}</span>
                </>
              )}
            </div>
          </div>

          {/* Summary */}
          {sampleSummary && (
            <div className="p-1 rounded" style={{ backgroundColor: `${accentColor}08` }}>
              <p className="text-[5.3px] text-[#555] leading-relaxed line-clamp-2">
                {sampleSummary}
              </p>
            </div>
          )}

          {/* Experience */}
          {sampleExperience.length > 0 && (
            <div>
              <span className="font-extrabold text-[6px] uppercase tracking-wider block mb-0.5" style={{ color: accentColor }}>
                Employment History
              </span>
              <div className="space-y-1">
                {sampleExperience.slice(0, 2).map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline text-[5.6px] font-bold text-[#252525]">
                      <span className="truncate">{exp.role} <span className="font-medium text-[#666]">· {exp.company}</span></span>
                      <span className="text-[4.8px] font-normal text-[#888] shrink-0">{exp.duration}</span>
                    </div>
                    {exp.bullets && (
                      <ul className="space-y-0.5 mt-0.5 text-[5px] text-[#555]">
                        {exp.bullets.slice(0, 2).map((bullet, bIdx) => (
                          <li key={bIdx} className="line-clamp-1 pl-1.5 relative before:content-['▸'] before:absolute before:left-0" style={{ color: accentColor }}>
                            <span className="text-[#555]">{bullet}</span>
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
              <span className="font-extrabold text-[6px] uppercase tracking-wider block mb-0.5" style={{ color: accentColor }}>
                Key Projects & Products
              </span>
              <div className="space-y-0.8">
                {sampleProjects.slice(0, 2).map((proj, idx) => (
                  <div key={idx} className="text-[5.2px]">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-[#252525] truncate">{proj.title || proj.name}</span>
                      <span className="text-[#888] text-[4.8px] shrink-0">{proj.techStack || proj.tech_stack}</span>
                    </div>
                    {proj.description && (
                      <p className="text-[5px] text-[#555] line-clamp-1 mt-0.2">{proj.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education & Skills */}
          <div className="border-t border-slate-100 pt-1 space-y-0.8">
            <div className="flex justify-between text-[5.2px]">
              <span className="truncate"><b>Education:</b> {sampleEducation[0]?.degree} · {sampleEducation[0]?.institution}</span>
              <span className="text-[#888] text-[4.8px] shrink-0">{sampleEducation[0]?.year}</span>
            </div>
            {sampleSkills.length > 0 && (
              <div className="flex items-center gap-1">
                <span className="font-bold text-[5.2px] text-[#252525]">Skills:</span>
                <div className="flex flex-wrap gap-0.5">
                  {sampleSkills.slice(0, 6).map((skill, idx) => (
                    <span key={idx} className="bg-slate-100 text-[#444] px-1 py-0.2 rounded text-[4.8px] font-medium">
                      {typeof skill === "string" ? skill : skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {(sampleLanguages.length > 0 || sampleHobbies) && (
              <div className="flex justify-between text-[4.8px] text-[#777]">
                {sampleLanguages.length > 0 && (
                  <span className="truncate">Languages: {sampleLanguages.slice(0, 3).map((l) => typeof l === "string" ? l : l.name).join(", ")}</span>
                )}
                {sampleHobbies && (
                  <span className="truncate">Interests: {sampleHobbies}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
