import React from "react";

export default function TemplateLayoutSingleColumn({ template }) {
  const { sampleName, sampleRole, sampleLocation, sampleEmail, samplePhone, sampleSummary, sampleExperience = [], sampleEducation = [], sampleSkills = [], accentColor = "#FA0C40" } = template;

  return (
    <div className="w-full h-full bg-white p-3 sm:p-3.5 flex flex-col justify-between text-[#252525] font-['Plus_Jakarta_Sans'] select-none">
      {/* Header */}
      <div>
        <div className="border-b-2 pb-1.5 mb-2" style={{ borderColor: accentColor }}>
          <h4 className="font-extrabold text-[10px] sm:text-[11px] text-[#252525] tracking-tight leading-tight">
            {sampleName}
          </h4>
          <p className="text-[7px] font-bold mt-0.5" style={{ color: accentColor }}>
            {sampleRole}
          </p>
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[5.5px] text-[#6B6B6B] mt-0.5">
            <span>{sampleLocation}</span>
            <span>•</span>
            <span>{sampleEmail}</span>
            <span>•</span>
            <span>{samplePhone}</span>
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
          <div className="mb-2">
            <div className="flex items-center gap-1 mb-1">
              <span className="font-extrabold text-[6.5px] uppercase tracking-wider" style={{ color: accentColor }}>
                Experience
              </span>
              <div className="flex-1 h-[1px] bg-slate-100" />
            </div>

            <div className="space-y-1.5">
              {sampleExperience.slice(0, 2).map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline text-[6.2px] font-bold text-[#252525]">
                    <span>{exp.role} <span className="font-medium text-[#6B6B6B]">· {exp.company}</span></span>
                    <span className="text-[5.5px] font-normal text-[#888]">{exp.duration}</span>
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="mt-0.5 space-y-0.5 text-[5.5px] text-[#555]">
                      {exp.bullets.slice(0, 2).map((bullet, bIdx) => (
                        <li key={bIdx} className="line-clamp-1 pl-2 relative before:content-['•'] before:absolute before:left-0 before:text-slate-400">
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

        {/* Education */}
        {sampleEducation.length > 0 && (
          <div className="mb-2">
            <div className="flex items-center gap-1 mb-1">
              <span className="font-extrabold text-[6.5px] uppercase tracking-wider" style={{ color: accentColor }}>
                Education
              </span>
              <div className="flex-1 h-[1px] bg-slate-100" />
            </div>
            <div className="space-y-1">
              {sampleEducation.slice(0, 1).map((edu, idx) => (
                <div key={idx} className="flex justify-between items-baseline text-[6px]">
                  <div>
                    <span className="font-bold text-[#252525]">{edu.institution}</span>
                    <p className="text-[5.5px] text-[#6B6B6B]">{edu.degree}</p>
                  </div>
                  <span className="text-[5.5px] text-[#888]">{edu.year}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Skills Footer */}
      {sampleSkills.length > 0 && (
        <div className="border-t border-slate-100 pt-1 flex items-center justify-between text-[5.8px]">
          <span className="font-bold text-[#252525] uppercase tracking-wider text-[5.5px]">Skills</span>
          <div className="flex flex-wrap gap-1">
            {sampleSkills.slice(0, 4).map((skill, idx) => (
              <span key={idx} className="bg-slate-100 text-[#444] px-1 py-0.2 rounded font-medium text-[5.5px]">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

