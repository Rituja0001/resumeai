import React from "react";

export default function TemplateLayoutSidebarRight({ template }) {
  const { sampleName, sampleRole, sampleLocation, sampleEmail, samplePhone, sampleSummary, sampleExperience = [], sampleEducation = [], sampleSkills = [], accentColor = "#0F766E", sampleMetrics = ["+42% Growth", "₹12Cr Revenue"] } = template;

  return (
    <div className="w-full h-full bg-white grid grid-cols-[68%_32%] select-none font-['Plus_Jakarta_Sans'] overflow-hidden">
      {/* Left Main Body */}
      <div className="p-3 sm:p-3.5 flex flex-col justify-between text-[#252525]">
        <div>
          {/* Header */}
          <div className="border-b pb-1.5 mb-2" style={{ borderColor: `${accentColor}40` }}>
            <h4 className="font-extrabold text-[10px] sm:text-[11px] text-[#252525] tracking-tight">
              {sampleName}
            </h4>
            <p className="text-[7px] font-bold" style={{ color: accentColor }}>
              {sampleRole}
            </p>
            <div className="flex gap-1.5 text-[5.5px] text-[#6B6B6B] mt-0.5">
              <span>{sampleLocation}</span>
              <span>•</span>
              <span>{sampleEmail}</span>
            </div>
          </div>

          {/* Summary */}
          {sampleSummary && (
            <div className="mb-2">
              <p className="text-[5.8px] text-[#555] leading-relaxed line-clamp-2">
                {sampleSummary}
              </p>
            </div>
          )}

          {/* Experience */}
          {sampleExperience.length > 0 && (
            <div>
              <p className="font-extrabold text-[6.5px] uppercase tracking-wider mb-1" style={{ color: accentColor }}>
                Work Experience
              </p>
              <div className="space-y-1.5">
                {sampleExperience.slice(0, 2).map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline text-[6.2px] font-bold text-[#252525]">
                      <span>{exp.role}</span>
                      <span className="text-[5.2px] font-normal text-[#888]">{exp.duration}</span>
                    </div>
                    <p className="text-[5.5px] font-medium text-[#666] mb-0.5">{exp.company}</p>
                    {exp.bullets && (
                      <ul className="space-y-0.5 text-[5.4px] text-[#555]">
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

        {/* Education */}
        {sampleEducation.length > 0 && (
          <div className="border-t border-slate-100 pt-1 text-[5.5px]">
            <span className="font-bold text-[#252525]">{sampleEducation[0]?.institution}</span>
            <p className="text-[#6B6B6B]">{sampleEducation[0]?.degree} ({sampleEducation[0]?.year})</p>
          </div>
        )}
      </div>

      {/* Right Column: Key Metrics & Competencies */}
      <div className="p-2.5 sm:p-3 bg-slate-50 border-l border-slate-100 flex flex-col justify-between text-[#252525]">
        <div>
          {/* Highlight Metric Cards */}
          <div className="mb-2.5">
            <p className="font-extrabold text-[5.8px] uppercase tracking-wider text-[#6B6B6B] mb-1">
              Key Metrics
            </p>
            <div className="space-y-1">
              {sampleMetrics.slice(0, 2).map((metric, idx) => (
                <div key={idx} className="bg-white p-1 rounded-md border border-slate-200/80 shadow-2xs text-center">
                  <span className="font-extrabold text-[7px] block" style={{ color: accentColor }}>
                    {metric}
                  </span>
                  <span className="text-[4.8px] text-[#777] block font-medium">Impact Indicator</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          {sampleSkills.length > 0 && (
            <div>
              <p className="font-extrabold text-[5.8px] uppercase tracking-wider text-[#6B6B6B] mb-1">
                Domain Skills
              </p>
              <div className="flex flex-wrap gap-1">
                {sampleSkills.slice(0, 6).map((skill, idx) => (
                  <span key={idx} className="bg-white text-[#444] border border-slate-200 px-1 py-0.2 rounded text-[5px] font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="text-[5px] text-[#888] border-t border-slate-200/60 pt-1">
          📞 {samplePhone}
        </div>
      </div>
    </div>
  );
}

