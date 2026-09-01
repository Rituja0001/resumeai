import React from "react";

export default function TemplateLayoutPhotoHeader({ template }) {
  const { sampleName, sampleRole, sampleLocation, sampleEmail, samplePhone, sampleSummary, sampleExperience = [], sampleEducation = [], sampleSkills = [], accentColor = "#6D28D9", samplePortfolio = "portfolio.design" } = template;

  return (
    <div className="w-full h-full bg-white flex flex-col justify-between select-none font-['Plus_Jakarta_Sans'] overflow-hidden">
      {/* Top Banner Header */}
      <div className="p-2.5 sm:p-3 text-white" style={{ backgroundColor: accentColor }}>
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-extrabold text-[10px] sm:text-[11px] text-white tracking-tight leading-tight">
              {sampleName}
            </h4>
            <p className="text-[6.5px] text-white/90 font-medium">
              {sampleRole}
            </p>
          </div>
          <div className="text-right text-[5.2px] text-white/80">
            <p>{sampleLocation}</p>
            <p>{sampleEmail}</p>
          </div>
        </div>

        <div className="flex gap-2 text-[5px] text-white/70 border-t border-white/20 pt-1 mt-1">
          <span>🔗 {samplePortfolio}</span>
          <span>•</span>
          <span>📞 {samplePhone}</span>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-3 flex-1 flex flex-col justify-between text-[#252525]">
        <div>
          {/* Summary */}
          {sampleSummary && (
            <div className="mb-2">
              <p className="text-[5.8px] text-[#555] leading-relaxed line-clamp-2">
                {sampleSummary}
              </p>
            </div>
          )}

          {/* Work Experience */}
          {sampleExperience.length > 0 && (
            <div className="mb-2">
              <p className="font-extrabold text-[6.5px] uppercase tracking-wider mb-1" style={{ color: accentColor }}>
                Key Experience
              </p>
              <div className="space-y-1.5">
                {sampleExperience.slice(0, 2).map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline text-[6.2px] font-bold text-[#252525]">
                      <span>{exp.role} <span className="font-normal text-[#666]">· {exp.company}</span></span>
                      <span className="text-[5.2px] font-normal text-[#888]">{exp.duration}</span>
                    </div>
                    {exp.bullets && (
                      <ul className="space-y-0.5 mt-0.5 text-[5.3px] text-[#555]">
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
        </div>

        {/* Bottom Split: Skills & Education */}
        <div className="border-t border-slate-100 pt-1.5 grid grid-cols-2 gap-2 text-[5.5px]">
          <div>
            <span className="font-bold text-[#252525] block mb-0.5">Toolkit & Stack</span>
            <div className="flex flex-wrap gap-1">
              {sampleSkills.slice(0, 4).map((skill, idx) => (
                <span key={idx} className="bg-slate-100 px-1 py-0.2 rounded text-[#444] font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="font-bold text-[#252525] block mb-0.5">Education</span>
            {sampleEducation.slice(0, 1).map((edu, idx) => (
              <p key={idx} className="text-[#666] truncate">
                {edu.institution} ({edu.year})
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

