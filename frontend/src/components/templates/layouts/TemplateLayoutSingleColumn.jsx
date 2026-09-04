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
    <div className="w-full h-full bg-white p-2.5 sm:p-3 flex flex-col justify-between text-[#252525] font-['Plus_Jakarta_Sans'] select-none overflow-hidden text-[5.5px]">
      <div className="space-y-1.5 overflow-hidden">
        {/* Header */}
        <div className="border-b-2 pb-1" style={{ borderColor: accentColor }}>
          <h4 className="font-extrabold text-[9.5px] sm:text-[10.5px] text-[#252525] tracking-tight leading-tight">
            {sampleName}
          </h4>
          <p className="text-[6.5px] font-bold" style={{ color: accentColor }}>
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
                <span className="truncate">{sampleLinks[0].label}: {sampleLinks[0].url}</span>
              </>
            )}
          </div>
        </div>

        {/* Summary */}
        {sampleSummary && (
          <div>
            <p className="text-[5.2px] text-[#555] leading-relaxed line-clamp-2">
              {sampleSummary}
            </p>
          </div>
        )}

        {/* Experience */}
        {sampleExperience.length > 0 && (
          <div>
            <div className="flex items-center gap-1 mb-0.5">
              <span className="font-extrabold text-[5.8px] uppercase tracking-wider" style={{ color: accentColor }}>
                Experience
              </span>
              <div className="flex-1 h-[0.5px] bg-slate-200" />
            </div>
            <div className="space-y-1">
              {sampleExperience.slice(0, 2).map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline text-[5.5px] font-bold text-[#252525]">
                    <span className="truncate">{exp.role} <span className="font-medium text-[#6B6B6B]">· {exp.company}</span></span>
                    <span className="text-[4.8px] font-normal text-[#888] shrink-0">{exp.duration}</span>
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="mt-0.5 space-y-0.5 text-[4.8px] text-[#555]">
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

        {/* Education */}
        {sampleEducation.length > 0 && (
          <div>
            <div className="flex items-center gap-1 mb-0.5">
              <span className="font-extrabold text-[5.8px] uppercase tracking-wider" style={{ color: accentColor }}>
                Education
              </span>
              <div className="flex-1 h-[0.5px] bg-slate-200" />
            </div>
            <div className="space-y-0.5">
              {sampleEducation.slice(0, 1).map((edu, idx) => (
                <div key={idx} className="flex justify-between items-baseline text-[5.2px]">
                  <span className="font-bold text-[#252525] truncate">{edu.degree} · <span className="font-normal text-[#6B6B6B]">{edu.institution}</span></span>
                  <span className="text-[4.8px] text-[#888] shrink-0">{edu.year}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {sampleProjects.length > 0 && (
          <div>
            <div className="flex items-center gap-1 mb-0.5">
              <span className="font-extrabold text-[5.8px] uppercase tracking-wider" style={{ color: accentColor }}>
                Key Projects
              </span>
              <div className="flex-1 h-[0.5px] bg-slate-200" />
            </div>
            <div className="space-y-0.5">
              {sampleProjects.slice(0, 1).map((proj, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline text-[5.2px]">
                    <span className="font-bold text-[#252525] truncate">{proj.title || proj.name}</span>
                    <span className="text-[4.8px] text-[#888] shrink-0">{proj.techStack || proj.tech_stack}</span>
                  </div>
                  {proj.description && (
                    <p className="text-[4.8px] text-[#555] line-clamp-1">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer: Skills & Languages / Hobbies */}
      <div className="border-t border-slate-100 pt-1 space-y-1">
        {sampleSkills.length > 0 && (
          <div className="flex items-center justify-between text-[5px]">
            <span className="font-bold text-[#252525] uppercase tracking-wider">Skills:</span>
            <div className="flex flex-wrap gap-0.5 justify-end">
              {sampleSkills.slice(0, 5).map((skill, idx) => (
                <span key={idx} className="bg-slate-100 text-[#444] px-1 py-0.2 rounded font-medium text-[4.8px]">
                  {typeof skill === "string" ? skill : skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
        {(sampleLanguages.length > 0 || sampleHobbies) && (
          <div className="flex items-center justify-between text-[4.8px] text-[#777]">
            {sampleLanguages.length > 0 && (
              <span className="truncate">Languages: {sampleLanguages.slice(0, 2).map((l) => typeof l === "string" ? l : l.name).join(", ")}</span>
            )}
            {sampleHobbies && (
              <span className="truncate text-right">Interests: {sampleHobbies}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

