import React from "react";

export default function TemplateLayoutColorBand({ template }) {
  const { sampleName, sampleRole, sampleLocation, sampleEmail, samplePhone, sampleSummary, sampleExperience = [], sampleEducation = [], sampleSkills = [], accentColor = "#B45309" } = template;

  return (
    <div className="w-full h-full bg-white flex select-none font-['Plus_Jakarta_Sans'] text-[#252525] overflow-hidden">
      {/* Colored Left Accent Strip */}
      <div className="w-1.5 shrink-0" style={{ backgroundColor: accentColor }} />

      {/* Content Container */}
      <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="border-b pb-1.5 mb-2" style={{ borderColor: `${accentColor}30` }}>
            <div className="flex justify-between items-baseline">
              <h4 className="font-extrabold text-[10px] sm:text-[11px] text-[#252525] tracking-tight">
                {sampleName}
              </h4>
              <span className="text-[5.5px] font-bold px-1.5 py-0.2 rounded-full" style={{ backgroundColor: `${accentColor}15`, color: accentColor }}>
                Verified ATS
              </span>
            </div>
            <p className="text-[6.8px] font-bold" style={{ color: accentColor }}>
              {sampleRole}
            </p>
            <p className="text-[5.2px] text-[#777] mt-0.5">
              {sampleLocation} · {sampleEmail} · {samplePhone}
            </p>
          </div>

          {/* Summary */}
          {sampleSummary && (
            <div className="mb-2 p-1 rounded-md" style={{ backgroundColor: `${accentColor}08` }}>
              <p className="text-[5.7px] text-[#555] leading-relaxed line-clamp-2">
                {sampleSummary}
              </p>
            </div>
          )}

          {/* Experience */}
          {sampleExperience.length > 0 && (
            <div className="mb-2">
              <span className="font-extrabold text-[6.5px] uppercase tracking-wider block mb-1" style={{ color: accentColor }}>
                Employment History
              </span>
              <div className="space-y-1.5">
                {sampleExperience.slice(0, 2).map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline text-[6.2px] font-bold text-[#252525]">
                      <span>{exp.role} <span className="font-medium text-[#666]">· {exp.company}</span></span>
                      <span className="text-[5.2px] font-normal text-[#888]">{exp.duration}</span>
                    </div>
                    {exp.bullets && (
                      <ul className="space-y-0.5 mt-0.5 text-[5.3px] text-[#555]">
                        {exp.bullets.slice(0, 2).map((bullet, bIdx) => (
                          <li key={bIdx} className="line-clamp-1 pl-1.5 relative before:content-['▸'] before:absolute before:left-0 before:text-amber-600">
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

        {/* Footer: Education & Skills */}
        <div className="border-t border-slate-100 pt-1 flex justify-between items-center text-[5.5px]">
          <div>
            <span className="font-bold text-[#252525]">Edu: </span>
            <span className="text-[#666]">{sampleEducation[0]?.institution}</span>
          </div>
          <div className="flex gap-1">
            {sampleSkills.slice(0, 4).map((skill, idx) => (
              <span key={idx} className="bg-slate-100 px-1 py-0.2 rounded text-[5px] font-medium text-[#555]">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

