import React from "react";

export default function TemplateLayoutSingleColumn({ template }) {
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
    accentColor = "#FA0C40",
  } = template;

  return (
    <div className="w-full h-full bg-white p-2.5 sm:p-3 flex flex-col justify-start text-[#252525] font-['Plus_Jakarta_Sans'] select-none overflow-hidden text-[5.5px]">
      <div className="space-y-1.5 overflow-hidden flex-1 flex flex-col justify-between">
        {/* Header */}
        <div className="border-b-2 pb-1" style={{ borderColor: accentColor }}>
          <div className="flex justify-between items-baseline">
            <h4 className="font-extrabold text-[10px] sm:text-[11px] text-[#252525] tracking-tight leading-tight uppercase">
              {sampleName}
            </h4>
            <span className="text-[5px] font-bold px-1 py-0.2 rounded" style={{ backgroundColor: `${accentColor}15`, color: accentColor }}>
              ATS 98%
            </span>
          </div>
          <p className="text-[6.8px] font-bold mt-0.2" style={{ color: accentColor }}>
            {sampleRole}
          </p>
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[5px] text-[#6B6B6B] mt-0.5">
            <span>{sampleLocation}</span>
            <span>•</span>
            <span>{sampleEmail}</span>
            <span>•</span>
            <span>{samplePhone}</span>
            {sampleLinks && sampleLinks.length > 0 && (
              <>
                <span>•</span>
                <span className="truncate">{sampleLinks[0].label || "Link"}: {sampleLinks[0].url.replace(/^https?:\/\//, '')}</span>
              </>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {sampleSummary && (
          <div className="bg-slate-50/70 p-1 rounded border-l-2" style={{ borderColor: accentColor }}>
            <p className="text-[5.3px] text-[#444] leading-relaxed line-clamp-2 font-normal">
              {sampleSummary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {sampleExperience.length > 0 && (
          <div>
            <div className="flex items-center gap-1 mb-0.5">
              <span className="font-extrabold text-[6px] uppercase tracking-wider" style={{ color: accentColor }}>
                Work Experience
              </span>
              <div className="flex-1 h-[0.5px] bg-slate-200" />
            </div>
            <div className="space-y-1">
              {sampleExperience.slice(0, 2).map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline text-[5.6px] font-bold text-[#252525]">
                    <span className="truncate">{exp.role} <span className="font-medium text-[#6B6B6B]">· {exp.company}</span></span>
                    <span className="text-[4.8px] font-medium text-[#888] shrink-0">{exp.duration}</span>
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="mt-0.5 space-y-0.5 text-[5px] text-[#555]">
                      {exp.bullets.slice(0, 2).map((bullet, bIdx) => (
                        <li key={bIdx} className="line-clamp-1 pl-1.5 relative before:content-['•'] before:absolute before:left-0 before:text-slate-400">
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
            <div className="flex items-center gap-1 mb-0.5">
              <span className="font-extrabold text-[6px] uppercase tracking-wider" style={{ color: accentColor }}>
                Key Projects
              </span>
              <div className="flex-1 h-[0.5px] bg-slate-200" />
            </div>
            <div className="space-y-0.8">
              {sampleProjects.slice(0, 2).map((proj, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline text-[5.3px]">
                    <span className="font-bold text-[#252525] truncate">{proj.title || proj.name}</span>
                    <span className="text-[4.8px] text-[#777] font-medium shrink-0">{proj.techStack || proj.tech_stack}</span>
                  </div>
                  {proj.description && (
                    <p className="text-[5px] text-[#555] line-clamp-1 mt-0.2">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {sampleEducation.length > 0 && (
          <div>
            <div className="flex items-center gap-1 mb-0.5">
              <span className="font-extrabold text-[6px] uppercase tracking-wider" style={{ color: accentColor }}>
                Education
              </span>
              <div className="flex-1 h-[0.5px] bg-slate-200" />
            </div>
            <div className="space-y-0.5">
              {sampleEducation.slice(0, 1).map((edu, idx) => (
                <div key={idx} className="text-[5.2px]">
                  <div className="flex justify-between items-baseline font-bold text-[#252525]">
                    <span className="truncate">{edu.degree}</span>
                    <span className="text-[4.8px] font-normal text-[#888] shrink-0">{edu.year}</span>
                  </div>
                  <p className="text-[#6B6B6B] text-[4.8px] truncate">{edu.institution} {edu.description ? `· ${edu.description}` : ""}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills & Additional Info */}
        <div className="border-t border-slate-100 pt-1 space-y-0.8">
          {sampleSkills.length > 0 && (
            <div className="flex items-center gap-1 text-[5px]">
              <span className="font-bold text-[#252525] uppercase tracking-wider shrink-0 text-[5.2px]">Skills:</span>
              <div className="flex flex-wrap gap-0.5 overflow-hidden">
                {sampleSkills.slice(0, 7).map((skill, idx) => (
                  <span key={idx} className="bg-slate-100 text-[#333] px-1 py-0.2 rounded font-medium text-[4.8px]">
                    {typeof skill === "string" ? skill : skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          {(sampleLanguages.length > 0 || sampleHobbies) && (
            <div className="flex items-center justify-between text-[4.8px] text-[#777]">
              {sampleLanguages.length > 0 && (
                <span className="truncate"><b>Languages:</b> {sampleLanguages.slice(0, 3).map((l) => typeof l === "string" ? l : l.name).join(", ")}</span>
              )}
              {sampleHobbies && (
                <span className="truncate text-right"><b>Interests:</b> {sampleHobbies}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
