import React from "react";

export default function TemplateLayoutPhotoHeader({ template }) {
  const {
    sampleName,
    sampleRole,
    sampleLocation,
    sampleEmail,
    samplePhone,
    samplePhoto,
    sampleSummary,
    sampleExperience = [],
    sampleEducation = [],
    sampleSkills = [],
    sampleProjects = [],
    sampleLanguages = [],
    sampleLinks = [],
    sampleHobbies,
    accentColor = "#6D28D9",
  } = template;

  return (
    <div className="w-full h-full bg-white flex flex-col justify-start select-none font-['Plus_Jakarta_Sans'] overflow-hidden text-[5.5px]">
      {/* Top Banner Header */}
      <div className="p-2 sm:p-2.5 text-white shrink-0" style={{ backgroundColor: accentColor }}>
        <div className="flex items-center gap-2">
          {samplePhoto && (
            <img
              src={samplePhoto}
              alt={sampleName}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-white/60 shadow-xs shrink-0"
            />
          )}
          <div className="flex-1 overflow-hidden">
            <h4 className="font-extrabold text-[10px] sm:text-[11px] text-white tracking-tight leading-tight truncate">
              {sampleName}
            </h4>
            <p className="text-[6.5px] text-white/90 font-medium truncate">
              {sampleRole}
            </p>
          </div>
          <div className="text-right text-[4.8px] text-white/80 shrink-0">
            <p className="truncate">📍 {sampleLocation}</p>
            <p className="truncate">✉️ {sampleEmail}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-[4.8px] text-white/75 border-t border-white/20 pt-0.5 mt-1">
          {sampleLinks && sampleLinks.length > 0 && (
            <span>🔗 {sampleLinks[0].url.replace(/^https?:\/\//, '')}</span>
          )}
          <span>•</span>
          <span>📞 {samplePhone}</span>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-2.5 sm:p-3 flex-1 flex flex-col justify-between text-[#252525] overflow-hidden">
        <div className="space-y-1.5 overflow-hidden flex-1 flex flex-col justify-between">
          {/* Summary */}
          {sampleSummary && (
            <div className="bg-slate-50/80 p-1 rounded border-l-2" style={{ borderColor: accentColor }}>
              <p className="text-[5.3px] text-[#444] leading-relaxed line-clamp-2">
                {sampleSummary}
              </p>
            </div>
          )}

          {/* Work Experience */}
          {sampleExperience.length > 0 && (
            <div>
              <div className="flex items-center gap-1 mb-0.5">
                <span className="font-extrabold text-[6px] uppercase tracking-wider" style={{ color: accentColor }}>
                  Key Experience
                </span>
                <div className="flex-1 h-[0.5px] bg-slate-200" />
              </div>
              <div className="space-y-1">
                {sampleExperience.slice(0, 2).map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline text-[5.6px] font-bold text-[#252525]">
                      <span className="truncate">{exp.role} <span className="font-normal text-[#666]">· {exp.company}</span></span>
                      <span className="text-[4.8px] font-normal text-[#888] shrink-0">{exp.duration}</span>
                    </div>
                    {exp.bullets && (
                      <ul className="space-y-0.5 mt-0.5 text-[5px] text-[#555]">
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
                  Featured Projects
                </span>
                <div className="flex-1 h-[0.5px] bg-slate-200" />
              </div>
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

          {/* Bottom Split: Skills, Languages/Hobbies & Education */}
          <div className="border-t border-slate-100 pt-1 grid grid-cols-2 gap-2 text-[5px]">
            <div>
              <span className="font-bold text-[#252525] block mb-0.5 uppercase tracking-wider text-[5.3px]" style={{ color: accentColor }}>Skills & Languages</span>
              <div className="flex flex-wrap gap-0.5 mb-0.5">
                {sampleSkills.slice(0, 5).map((skill, idx) => (
                  <span key={idx} className="bg-slate-100 px-1 py-0.2 rounded text-[#444] font-medium text-[4.8px]">
                    {typeof skill === "string" ? skill : skill.name}
                  </span>
                ))}
              </div>
              {sampleLanguages.length > 0 && (
                <p className="text-[#777] text-[4.6px] truncate">
                  Lang: {sampleLanguages.slice(0, 2).map((l) => typeof l === "string" ? l : l.name).join(", ")}
                </p>
              )}
            </div>
            <div>
              <span className="font-bold text-[#252525] block mb-0.5 uppercase tracking-wider text-[5.3px]" style={{ color: accentColor }}>Education</span>
              {sampleEducation.slice(0, 1).map((edu, idx) => (
                <p key={idx} className="text-[#555] truncate text-[4.8px]">
                  <span className="font-medium text-[#252525]">{edu.degree}</span> · {edu.institution} ({edu.year})
                </p>
              ))}
              {sampleHobbies && (
                <p className="text-[#777] text-[4.6px] truncate mt-0.5">Interests: {sampleHobbies}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
