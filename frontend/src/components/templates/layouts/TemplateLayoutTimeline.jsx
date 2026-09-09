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
      <div className="space-y-1.5 overflow-hidden flex-1 flex flex-col justify-between">
        {/* Header */}
        <div className="flex justify-between items-baseline border-b border-slate-200 pb-1">
          <div>
            <h4 className="font-extrabold text-[10px] sm:text-[11px] text-[#252525] tracking-tight leading-tight">
              {sampleName}
            </h4>
            <p className="text-[6.8px] font-bold" style={{ color: accentColor }}>
              {sampleRole}
            </p>
          </div>
          <div className="text-right text-[4.8px] text-[#777]">
            <p className="truncate">{sampleLocation}</p>
            <p className="truncate">{sampleEmail} · {samplePhone}</p>
            {sampleLinks && sampleLinks.length > 0 && (
              <p className="truncate">🔗 {sampleLinks[0].url.replace(/^https?:\/\//, '')}</p>
            )}
          </div>
        </div>

        {/* Summary */}
        {sampleSummary && (
          <p className="text-[5.3px] text-[#555] leading-relaxed line-clamp-2">
            {sampleSummary}
          </p>
        )}

        {/* Timeline Work History */}
        {sampleExperience.length > 0 && (
          <div>
            <span className="font-extrabold text-[6px] uppercase tracking-wider block mb-0.5" style={{ color: accentColor }}>
              Career Milestones
            </span>

            {/* Vertical timeline */}
            <div className="relative pl-2.5 space-y-1 border-l-2 ml-1" style={{ borderColor: `${accentColor}30` }}>
              {sampleExperience.slice(0, 2).map((exp, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline Dot */}
                  <div
                    className="absolute -left-[13px] top-1 w-1.5 h-1.5 rounded-full border-2 border-white shadow-2xs"
                    style={{ backgroundColor: accentColor }}
                  />
                  <div className="flex justify-between text-[5.6px] font-bold text-[#252525]">
                    <span className="truncate">{exp.role} <span className="font-normal text-[#666]">· {exp.company}</span></span>
                    <span className="text-[4.8px] font-normal text-[#888] shrink-0">{exp.duration}</span>
                  </div>
                  {exp.bullets && (
                    <ul className="space-y-0.5 mt-0.5 text-[5px] text-[#555]">
                      {exp.bullets.slice(0, 2).map((b, bIdx) => (
                        <li key={bIdx} className="line-clamp-1">{b}</li>
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
              Campaign & Tech Initiatives
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

        {/* Education & Skills Grid */}
        <div className="border-t border-slate-100 pt-1 space-y-0.8">
          <div className="flex justify-between items-center text-[5.2px]">
            <div>
              <span className="font-bold text-[#252525]">Education: </span>
              <span className="text-[#666]">{sampleEducation[0]?.degree} · {sampleEducation[0]?.institution} ({sampleEducation[0]?.year})</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-bold text-[#252525] text-[5.2px]">Skills:</span>
            <div className="flex flex-wrap gap-0.5">
              {sampleSkills.slice(0, 6).map((skill, idx) => (
                <span key={idx} className="bg-slate-100 text-[#444] px-1 py-0.2 rounded text-[4.8px] font-medium">
                  {typeof skill === "string" ? skill : skill.name}
                </span>
              ))}
            </div>
          </div>
          {(sampleLanguages.length > 0 || sampleHobbies) && (
            <div className="flex justify-between text-[4.8px] text-[#777]">
              {sampleLanguages.length > 0 && (
                <span className="truncate"><b>Languages:</b> {sampleLanguages.slice(0, 3).map((l) => typeof l === "string" ? l : l.name).join(", ")}</span>
              )}
              {sampleHobbies && (
                <span className="truncate"><b>Interests:</b> {sampleHobbies}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
