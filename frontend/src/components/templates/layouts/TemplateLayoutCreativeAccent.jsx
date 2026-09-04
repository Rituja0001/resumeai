import React from "react";

export default function TemplateLayoutCreativeAccent({ template }) {
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
    accentColor = "#2563EB",
    sampleGithub = "github.com/in-dev",
  } = template;

  return (
    <div className="w-full h-full bg-white p-2.5 sm:p-3 flex flex-col justify-between select-none font-['Plus_Jakarta_Sans'] text-[#252525] overflow-hidden text-[5.5px]">
      {/* Dev Header */}
      <div className="space-y-1.5 overflow-hidden">
        <div className="bg-slate-50 border border-slate-200/80 p-1.5 rounded-lg flex justify-between items-center">
          <div>
            <h4 className="font-mono font-extrabold text-[9.5px] text-[#252525] leading-tight">
              {sampleName}
            </h4>
            <p className="text-[6px] font-bold font-mono" style={{ color: accentColor }}>
              {sampleRole}
            </p>
          </div>
          <div className="text-right text-[4.8px] font-mono text-[#666]">
            <span className="bg-blue-50 text-blue-700 px-1 py-0.2 rounded border border-blue-200 block mb-0.5 truncate">
              {sampleLinks && sampleLinks.length > 0 ? sampleLinks[0].url : sampleGithub}
            </span>
            <span className="truncate">{sampleLocation}</span>
          </div>
        </div>

        {/* Stack Chips */}
        {sampleSkills.length > 0 && (
          <div className="flex flex-wrap gap-0.5">
            {sampleSkills.slice(0, 5).map((skill, idx) => (
              <span key={idx} className="bg-slate-100 font-mono text-[4.8px] text-[#333] px-1 py-0.2 rounded border border-slate-200">
                {typeof skill === "string" ? skill : skill.name}
              </span>
            ))}
          </div>
        )}

        {/* Summary */}
        {sampleSummary && (
          <p className="text-[5.2px] text-[#555] leading-relaxed line-clamp-2">
            {sampleSummary}
          </p>
        )}

        {/* Experience */}
        {sampleExperience.length > 0 && (
          <div>
            <span className="font-mono font-bold text-[5.8px] uppercase tracking-wider block mb-0.5" style={{ color: accentColor }}>
              // Work Experience
            </span>
            <div className="space-y-1">
              {sampleExperience.slice(0, 2).map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline text-[5.5px] font-bold text-[#252525]">
                    <span className="truncate">{exp.role} <span className="font-mono font-normal text-[#666]">@ {exp.company}</span></span>
                    <span className="font-mono text-[4.8px] text-[#888] shrink-0">{exp.duration}</span>
                  </div>
                  {exp.bullets && (
                    <ul className="space-y-0.5 mt-0.5 text-[4.8px] text-[#555]">
                      {exp.bullets.slice(0, 2).map((bullet, bIdx) => (
                        <li key={bIdx} className="line-clamp-1 pl-1.5 relative before:content-['$'] before:absolute before:left-0 before:text-blue-500 font-sans">
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
            <span className="font-mono font-bold text-[5.8px] uppercase tracking-wider block mb-0.5" style={{ color: accentColor }}>
              // Key Projects
            </span>
            <div className="space-y-0.5">
              {sampleProjects.slice(0, 1).map((proj, idx) => (
                <div key={idx} className="text-[5px]">
                  <span className="font-bold font-mono text-[#252525] truncate">{proj.title || proj.name}</span>
                  <span className="text-[#888] font-mono"> · {proj.techStack || proj.tech_stack}</span>
                  {proj.description && (
                    <p className="text-[4.8px] text-[#555] line-clamp-1">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer: Education, Languages/Hobbies & Contact */}
      <div className="border-t border-slate-100 pt-1 space-y-0.5 font-mono text-[5px] text-[#666]">
        <div className="flex justify-between">
          <span className="truncate">Edu: {sampleEducation[0]?.institution} ({sampleEducation[0]?.year})</span>
          <span className="truncate">{sampleEmail} · {samplePhone}</span>
        </div>
        {(sampleLanguages.length > 0 || sampleHobbies) && (
          <div className="flex justify-between text-[4.5px] text-[#888]">
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

