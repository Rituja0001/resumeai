import React from "react";

export default function TemplateLayoutTimeline({ template }) {
  const { sampleName, sampleRole, sampleLocation, sampleEmail, samplePhone, sampleSummary, sampleExperience = [], sampleEducation = [], sampleSkills = [], accentColor = "#BE123C" } = template;

  return (
    <div className="w-full h-full bg-white p-3 sm:p-3.5 flex flex-col justify-between select-none font-['Plus_Jakarta_Sans'] text-[#252525]">
      {/* Header */}
      <div>
        <div className="flex justify-between items-baseline border-b border-slate-100 pb-1.5 mb-2">
          <div>
            <h4 className="font-extrabold text-[10px] sm:text-[11px] text-[#252525] tracking-tight">
              {sampleName}
            </h4>
            <p className="text-[6.8px] font-bold" style={{ color: accentColor }}>
              {sampleRole}
            </p>
          </div>
          <div className="text-right text-[5.2px] text-[#777]">
            <p>{sampleLocation}</p>
            <p>{sampleEmail} · {samplePhone}</p>
          </div>
        </div>

        {/* Summary */}
        {sampleSummary && (
          <p className="text-[5.8px] text-[#555] leading-relaxed line-clamp-2 mb-2">
            {sampleSummary}
          </p>
        )}

        {/* Timeline Work History */}
        {sampleExperience.length > 0 && (
          <div className="mb-2">
            <span className="font-extrabold text-[6.5px] uppercase tracking-wider block mb-1" style={{ color: accentColor }}>
              Career Timeline
            </span>

            {/* Vertical timeline */}
            <div className="relative pl-3 space-y-2 border-l border-slate-200 ml-1">
              {sampleExperience.slice(0, 2).map((exp, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline Dot */}
                  <div
                    className="absolute -left-[15.5px] top-1 w-2 h-2 rounded-full border-2 border-white shadow-2xs"
                    style={{ backgroundColor: accentColor }}
                  />
                  <div className="flex justify-between text-[6px] font-bold text-[#252525]">
                    <span>{exp.role} <span className="font-normal text-[#666]">· {exp.company}</span></span>
                    <span className="text-[5px] font-normal text-[#888]">{exp.duration}</span>
                  </div>
                  {exp.bullets && (
                    <p className="text-[5.3px] text-[#555] mt-0.5 line-clamp-1">
                      {exp.bullets[0]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer: Education & Skills */}
      <div className="border-t border-slate-100 pt-1.5 flex justify-between items-center text-[5.5px]">
        <div>
          <span className="font-bold text-[#252525]">Education: </span>
          <span className="text-[#666]">{sampleEducation[0]?.institution}</span>
        </div>
        <div className="flex gap-1">
          {sampleSkills.slice(0, 3).map((skill, idx) => (
            <span key={idx} className="bg-slate-100 text-[#444] px-1 py-0.2 rounded text-[5px] font-medium">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

