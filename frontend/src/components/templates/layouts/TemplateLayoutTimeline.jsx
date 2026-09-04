import React from "react";

export default function TemplateLayoutTimeline({ template }) {
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
    accentColor = "#BE123C",
  } = template;

  return (
    <div className="w-full h-full bg-white p-2.5 sm:p-3 flex flex-col justify-between select-none font-['Plus_Jakarta_Sans'] text-[#252525] overflow-hidden text-[5.5px]">
      {/* Header */}
      <div className="space-y-1.5 overflow-hidden">
        <div className="flex justify-between items-baseline border-b border-slate-100 pb-1">
          <div>
            <h4 className="font-extrabold text-[9.5px] sm:text-[10.5px] text-[#252525] tracking-tight leading-tight">
              {sampleName}
            </h4>
            <p className="text-[6.5px] font-bold" style={{ color: accentColor }}>
              {sampleRole}
            </p>
          </div>
          <div className="text-right text-[4.8px] text-[#777]">
            <p className="truncate">{sampleLocation}</p>
            <p className="truncate">{sampleEmail} · {samplePhone}</p>
            {sampleLinks && sampleLinks.length > 0 && (
              <p className="truncate">🔗 {sampleLinks[0].url}</p>
            )}
          </div>
        </div>

        {/* Summary */}
        {sampleSummary && (
          <p className="text-[5.2px] text-[#555] leading-relaxed line-clamp-2">
            {sampleSummary}
          </p>
        )}

        {/* Timeline Work History */}
        {sampleExperience.length > 0 && (
          <div>
            <span className="font-extrabold text-[5.8px] uppercase tracking-wider block mb-0.5" style={{ color: accentColor }}>
              Career Timeline
            </span>

            {/* Vertical timeline */}
            <div className="relative pl-2.5 space-y-1 border-l border-slate-200 ml-1">
              {sampleExperience.slice(0, 2).map((exp, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline Dot */}
                  <div
                    className="absolute -left-[12.5px] top-1 w-1.5 h-1.5 rounded-full border-2 border-white shadow-2xs"
                    style={{ backgroundColor: accentColor }}
                  />
                  <div className="flex justify-between text-[5.5px] font-bold text-[#252525]">
                    <span className="truncate">{exp.role} <span className="font-normal text-[#666]">· {exp.company}</span></span>
                    <span className="text-[4.8px] font-normal text-[#888] shrink-0">{exp.duration}</span>
                  </div>
                  {exp.bullets && (
                    <p className="text-[4.8px] text-[#555] line-clamp-1">
                      {exp.bullets[0]}
                    </p>
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
      <div className="border-t border-slate-100 pt-1 space-y-0.5">
        <div className="flex justify-between items-center text-[5px]">
          <div>
            <span className="font-bold text-[#252525]">Edu: </span>
            <span className="text-[#666]">{sampleEducation[0]?.institution} ({sampleEducation[0]?.year})</span>
          </div>
          <div className="flex gap-0.5">
            {sampleSkills.slice(0, 4).map((skill, idx) => (
              <span key={idx} className="bg-slate-100 text-[#444] px-1 py-0.2 rounded text-[4.8px] font-medium">
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
  );
}

