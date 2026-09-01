import React from "react";

export default function TemplateLayoutMinimalist({ template }) {
  const { sampleName, sampleRole, sampleLocation, sampleEmail, samplePhone, sampleSummary, sampleExperience = [], sampleEducation = [], sampleSkills = [], accentColor = "#475569" } = template;

  return (
    <div className="w-full h-full bg-white p-3.5 sm:p-4 flex flex-col justify-between select-none font-['Plus_Jakarta_Sans'] text-[#252525]">
      {/* Minimal Header */}
      <div>
        <div className="mb-2 text-center">
          <h4 className="font-serif font-bold text-[10.5px] sm:text-[11.5px] tracking-wide text-[#1E293B] uppercase">
            {sampleName}
          </h4>
          <p className="text-[6.5px] font-medium tracking-wider text-[#64748B] uppercase mt-0.5">
            {sampleRole}
          </p>
          <div className="flex justify-center gap-2 text-[5.2px] text-[#94A3B8] mt-1 border-t border-b border-slate-100 py-0.5">
            <span>{sampleLocation}</span>
            <span>·</span>
            <span>{sampleEmail}</span>
            <span>·</span>
            <span>{samplePhone}</span>
          </div>
        </div>

        {/* Summary */}
        {sampleSummary && (
          <p className="text-[5.7px] text-[#475569] leading-relaxed text-center italic line-clamp-2 mb-2 px-1">
            "{sampleSummary}"
          </p>
        )}

        {/* Experience */}
        {sampleExperience.length > 0 && (
          <div className="mb-2">
            <span className="font-serif font-bold text-[6.5px] uppercase tracking-widest text-[#1E293B] block text-center border-b border-slate-200 pb-0.5 mb-1.5">
              Experience
            </span>

            <div className="space-y-1.5 text-left">
              {sampleExperience.slice(0, 2).map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline text-[6.2px] font-bold text-[#1E293B]">
                    <span>{exp.role} <span className="font-serif italic font-normal text-[#64748B]">at {exp.company}</span></span>
                    <span className="text-[5.2px] font-normal text-[#94A3B8]">{exp.duration}</span>
                  </div>
                  {exp.bullets && (
                    <ul className="space-y-0.5 mt-0.5 text-[5.3px] text-[#475569]">
                      {exp.bullets.slice(0, 2).map((bullet, bIdx) => (
                        <li key={bIdx} className="line-clamp-1 pl-1.5 relative before:content-['–'] before:absolute before:left-0 before:text-slate-400">
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

      {/* Footer Split: Education & Competencies */}
      <div className="border-t border-slate-200 pt-1 flex justify-between items-center text-[5.5px] text-[#64748B]">
        <div>
          <span className="font-serif font-bold text-[#1E293B]">Education: </span>
          <span>{sampleEducation[0]?.institution}</span>
        </div>
        <div className="flex gap-1 text-[5px]">
          {sampleSkills.slice(0, 3).map((skill, idx) => (
            <span key={idx} className="border border-slate-200 px-1 rounded text-[#475569]">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

