import React from "react";

export default function TemplateLayoutCreativeAccent({ template }) {
  const { sampleName, sampleRole, sampleLocation, sampleEmail, samplePhone, sampleSummary, sampleExperience = [], sampleEducation = [], sampleSkills = [], accentColor = "#2563EB", sampleGithub = "github.com/in-dev" } = template;

  return (
    <div className="w-full h-full bg-white p-3 sm:p-3.5 flex flex-col justify-between select-none font-['Plus_Jakarta_Sans'] text-[#252525]">
      {/* Dev Header */}
      <div>
        <div className="bg-slate-50 border border-slate-200/80 p-2 rounded-xl mb-2 flex justify-between items-center">
          <div>
            <h4 className="font-mono font-extrabold text-[10px] text-[#252525]">
              {sampleName}
            </h4>
            <p className="text-[6.5px] font-bold font-mono" style={{ color: accentColor }}>
              {sampleRole}
            </p>
          </div>
          <div className="text-right text-[5.2px] font-mono text-[#666]">
            <span className="bg-blue-50 text-blue-700 px-1 py-0.2 rounded border border-blue-200 block mb-0.5">
              {sampleGithub}
            </span>
            <span>{sampleLocation}</span>
          </div>
        </div>

        {/* Stack Chips */}
        {sampleSkills.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {sampleSkills.slice(0, 5).map((skill, idx) => (
              <span key={idx} className="bg-slate-100 font-mono text-[5.2px] text-[#333] px-1 py-0.2 rounded border border-slate-200">
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Summary */}
        {sampleSummary && (
          <p className="text-[5.7px] text-[#555] leading-relaxed line-clamp-2 mb-2">
            {sampleSummary}
          </p>
        )}

        {/* Experience */}
        {sampleExperience.length > 0 && (
          <div className="mb-2">
            <span className="font-mono font-bold text-[6.5px] uppercase tracking-wider block mb-1" style={{ color: accentColor }}>
              // Work Experience
            </span>
            <div className="space-y-1.5">
              {sampleExperience.slice(0, 2).map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline text-[6.2px] font-bold text-[#252525]">
                    <span>{exp.role} <span className="font-mono font-normal text-[#666]">@ {exp.company}</span></span>
                    <span className="font-mono text-[5.2px] text-[#888]">{exp.duration}</span>
                  </div>
                  {exp.bullets && (
                    <ul className="space-y-0.5 mt-0.5 text-[5.3px] text-[#555]">
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
      </div>

      {/* Footer: Education & Contact */}
      <div className="border-t border-slate-100 pt-1 flex justify-between text-[5.5px] text-[#666] font-mono">
        <span>Edu: {sampleEducation[0]?.institution}</span>
        <span>{sampleEmail}</span>
      </div>
    </div>
  );
}

