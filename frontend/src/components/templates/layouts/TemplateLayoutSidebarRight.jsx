import React from "react";

export default function TemplateLayoutSidebarRight({ template }) {
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
    accentColor = "#0F766E",
    sampleMetrics = ["+42% Growth", "₹12Cr Revenue"],
  } = template;

  return (
    <div className="w-full h-full bg-white grid grid-cols-[68%_32%] select-none font-['Plus_Jakarta_Sans'] overflow-hidden text-[5.5px]">
      {/* Left Main Body */}
      <div className="p-2.5 sm:p-3 flex flex-col justify-between text-[#252525] overflow-hidden">
        <div className="space-y-1.5 overflow-hidden">
          {/* Header */}
          <div className="border-b pb-1" style={{ borderColor: `${accentColor}40` }}>
            <h4 className="font-extrabold text-[9.5px] sm:text-[10.5px] text-[#252525] tracking-tight leading-tight">
              {sampleName}
            </h4>
            <p className="text-[6.5px] font-bold" style={{ color: accentColor }}>
              {sampleRole}
            </p>
            <div className="flex flex-wrap gap-x-1.5 gap-y-0.5 text-[5px] text-[#6B6B6B] mt-0.5">
              <span>{sampleLocation}</span>
              <span>•</span>
              <span>{sampleEmail}</span>
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
                  Work Experience
                </span>
                <div className="flex-1 h-[0.5px] bg-slate-200" />
              </div>
              <div className="space-y-1">
                {sampleExperience.slice(0, 2).map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline text-[5.5px] font-bold text-[#252525]">
                      <span className="truncate">{exp.role} <span className="font-normal text-[#666]">· {exp.company}</span></span>
                      <span className="text-[4.8px] font-normal text-[#888] shrink-0">{exp.duration}</span>
                    </div>
                    {exp.bullets && (
                      <ul className="space-y-0.5 mt-0.5 text-[4.8px] text-[#555]">
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

        {/* Education */}
        {sampleEducation.length > 0 && (
          <div className="border-t border-slate-100 pt-1 text-[5px]">
            <span className="font-bold text-[#252525] uppercase tracking-wider block text-[5.2px] mb-0.5">Education</span>
            {sampleEducation.slice(0, 1).map((edu, idx) => (
              <div key={idx} className="flex justify-between items-baseline text-[#555]">
                <span className="font-medium text-[#252525] truncate">{edu.degree} · <span className="text-[#777]">{edu.institution}</span></span>
                <span className="text-[#888] shrink-0">{edu.year}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Column: Metrics, Skills, Languages, Contact */}
      <div className="p-2 sm:p-2.5 bg-slate-50 border-l border-slate-100 flex flex-col justify-between text-[#252525] overflow-hidden">
        <div className="space-y-1.5 overflow-hidden">
          {/* Highlight Metric Cards */}
          {sampleMetrics && sampleMetrics.length > 0 && (
            <div>
              <p className="font-extrabold text-[5.5px] uppercase tracking-wider text-[#6B6B6B] mb-0.5">
                Key Metrics
              </p>
              <div className="space-y-0.5">
                {sampleMetrics.slice(0, 2).map((metric, idx) => (
                  <div key={idx} className="bg-white p-0.8 rounded border border-slate-200/80 shadow-2xs text-center">
                    <span className="font-extrabold text-[6.5px] block leading-tight" style={{ color: accentColor }}>
                      {metric}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {sampleSkills.length > 0 && (
            <div>
              <p className="font-extrabold text-[5.5px] uppercase tracking-wider text-[#6B6B6B] mb-0.5">
                Domain Skills
              </p>
              <div className="flex flex-wrap gap-0.5">
                {sampleSkills.slice(0, 5).map((skill, idx) => (
                  <span key={idx} className="bg-white text-[#444] border border-slate-200 px-1 py-0.2 rounded text-[4.8px] font-medium">
                    {typeof skill === "string" ? skill : skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {sampleLanguages.length > 0 && (
            <div>
              <p className="font-extrabold text-[5.5px] uppercase tracking-wider text-[#6B6B6B] mb-0.5">
                Languages
              </p>
              <div className="space-y-0.5 text-[4.8px] text-[#666]">
                {sampleLanguages.slice(0, 2).map((lang, idx) => (
                  <p key={idx} className="truncate">
                    • {typeof lang === "string" ? lang : `${lang.name} (${lang.proficiency || "Fluent"})`}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Interests */}
          {sampleHobbies && (
            <div>
              <p className="font-extrabold text-[5.5px] uppercase tracking-wider text-[#6B6B6B] mb-0.5">
                Interests
              </p>
              <p className="text-[4.8px] text-[#666] line-clamp-1">{sampleHobbies}</p>
            </div>
          )}
        </div>

        {/* Contact info */}
        <div className="text-[4.8px] text-[#777] border-t border-slate-200/60 pt-1 space-y-0.5">
          <p className="truncate">📞 {samplePhone}</p>
          {sampleLinks && sampleLinks.length > 0 && (
            <p className="truncate">🔗 {sampleLinks[0].url}</p>
          )}
        </div>
      </div>
    </div>
  );
}

