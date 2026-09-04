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
      <div className="w-1.5 shrink-0" style={{ backgroundColor: accentColor }} />

      {/* Content Container */}
      <div className="p-2.5 sm:p-3 flex-1 flex flex-col justify-between overflow-hidden">
        <div className="space-y-1.5 overflow-hidden">
          {/* Header */}
          <div className="border-b pb-1" style={{ borderColor: `${accentColor}30` }}>
            <div className="flex justify-between items-baseline">
              <h4 className="font-extrabold text-[9.5px] sm:text-[10.5px] text-[#252525] tracking-tight leading-tight">
                {sampleName}
              </h4>
              <span className="text-[5px] font-bold px-1 py-0.2 rounded-full" style={{ backgroundColor: `${accentColor}15`, color: accentColor }}>
                Verified ATS
              </span>
            </div>
            <p className="text-[6.5px] font-bold" style={{ color: accentColor }}>
              {sampleRole}
            </p>
            <div className="flex flex-wrap gap-x-1.5 gap-y-0.5 text-[4.8px] text-[#777] mt-0.5">
              <span>{sampleLocation}</span>
              <span>·</span>
              <span>{sampleEmail}</span>
              <span>·</span>
              <span>{samplePhone}</span>
              {sampleLinks && sampleLinks.length > 0 && (
                <>
                  <span>·</span>
                  <span className="truncate">{sampleLinks[0].url}</span>
                </>
              )}
            </div>
          </div>

          {/* Summary */}
          {sampleSummary && (
            <div className="p-1 rounded" style={{ backgroundColor: `${accentColor}08` }}>
              <p className="text-[5.2px] text-[#555] leading-relaxed line-clamp-2">
                {sampleSummary}
              </p>
            </div>
          )}

          {/* Experience */}
          {sampleExperience.length > 0 && (
            <div>
              <span className="font-extrabold text-[5.8px] uppercase tracking-wider block mb-0.5" style={{ color: accentColor }}>
                Employment History
              </span>
              <div className="space-y-1">
                {sampleExperience.slice(0, 2).map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline text-[5.5px] font-bold text-[#252525]">
                      <span className="truncate">{exp.role} <span className="font-medium text-[#666]">· {exp.company}</span></span>
                      <span className="text-[4.8px] font-normal text-[#888] shrink-0">{exp.duration}</span>
                    </div>
                    {exp.bullets && (
                      <ul className="space-y-0.5 mt-0.5 text-[4.8px] text-[#555]">
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
              <span className="font-extrabold text-[5.8px] uppercase tracking-wider block mb-0.5" style={{ color: accentColor }}>
                Projects
              </span>
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

        {/* Footer: Education & Skills */}
        <div className="border-t border-slate-100 pt-1 space-y-0.5 text-[5px]">
          <div className="flex justify-between items-center">
            <div>
              <span className="font-bold text-[#252525]">Edu: </span>
              <span className="text-[#666]">{sampleEducation[0]?.institution} ({sampleEducation[0]?.year})</span>
            </div>
            <div className="flex gap-0.5">
              {sampleSkills.slice(0, 4).map((skill, idx) => (
                <span key={idx} className="bg-slate-100 px-1 py-0.2 rounded text-[4.8px] font-medium text-[#555]">
                  {typeof skill === "string" ? skill : skill.name}
                </span>
              ))}
            </div>
          </div>
          {(sampleLanguages.length > 0 || sampleHobbies) && (
            <div className="flex justify-between text-[4.5px] text-[#777]">
              {sampleLanguages.length > 0 && (
                <span className="truncate">Languages: {sampleLanguages.slice(0, 2).map((l) => typeof l === "string" ? l : l.name).join(", ")}</span>
              )}
              {sampleHobbies && (
                <span className="truncate">Interests: {sampleHobbies}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

