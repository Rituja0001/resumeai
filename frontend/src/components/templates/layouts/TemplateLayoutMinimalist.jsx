import React from "react";

export default function TemplateLayoutMinimalist({ template }) {
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
    accentColor = "#475569",
  } = template;

  return (
    <div className="w-full h-full bg-white p-2.5 sm:p-3 flex flex-col justify-between select-none font-['Plus_Jakarta_Sans'] text-[#252525] overflow-hidden text-[5.5px]">
      {/* Minimal Header */}
      <div className="space-y-1.5 overflow-hidden">
        <div className="text-center pb-0.5">
          <h4 className="font-serif font-bold text-[9.5px] sm:text-[10.5px] tracking-wide text-[#1E293B] uppercase">
            {sampleName}
          </h4>
          <p className="text-[6px] font-medium tracking-wider text-[#64748B] uppercase mt-0.5">
            {sampleRole}
          </p>
          <div className="flex flex-wrap justify-center gap-x-1.5 gap-y-0.5 text-[4.8px] text-[#94A3B8] mt-0.5 border-t border-b border-slate-100 py-0.5">
            <span>{sampleLocation}</span>
            <span>·</span>
            <span>{sampleEmail}</span>
            <span>·</span>
            <span>{samplePhone}</span>
            {sampleLinks && sampleLinks.length > 0 && (
              <>
                <span>·</span>
                <span>{sampleLinks[0].url}</span>
              </>
            )}
          </div>
        </div>

        {/* Summary */}
        {sampleSummary && (
          <p className="text-[5.2px] text-[#475569] leading-relaxed text-center italic line-clamp-2 px-1">
            "{sampleSummary}"
          </p>
        )}

        {/* Experience */}
        {sampleExperience.length > 0 && (
          <div>
            <span className="font-serif font-bold text-[5.8px] uppercase tracking-widest text-[#1E293B] block text-center border-b border-slate-200 pb-0.5 mb-1">
              Experience
            </span>

            <div className="space-y-1 text-left">
              {sampleExperience.slice(0, 2).map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline text-[5.5px] font-bold text-[#1E293B]">
                    <span className="truncate">{exp.role} <span className="font-serif italic font-normal text-[#64748B]">at {exp.company}</span></span>
                    <span className="text-[4.8px] font-normal text-[#94A3B8] shrink-0">{exp.duration}</span>
                  </div>
                  {exp.bullets && (
                    <ul className="space-y-0.5 mt-0.5 text-[4.8px] text-[#475569]">
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

        {/* Key Projects */}
        {sampleProjects.length > 0 && (
          <div>
            <span className="font-serif font-bold text-[5.8px] uppercase tracking-widest text-[#1E293B] block text-center border-b border-slate-200 pb-0.5 mb-0.5">
              Projects
            </span>
            <div className="space-y-0.5">
              {sampleProjects.slice(0, 1).map((proj, idx) => (
                <div key={idx} className="text-[5px]">
                  <span className="font-bold text-[#1E293B] truncate">{proj.title || proj.name}</span>
                  <span className="text-[#64748B]"> · {proj.techStack || proj.tech_stack}</span>
                  {proj.description && (
                    <p className="text-[4.8px] text-[#475569] line-clamp-1">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Split: Education & Competencies */}
      <div className="border-t border-slate-200 pt-1 space-y-0.5 text-[5px] text-[#64748B]">
        <div className="flex justify-between items-center">
          <div>
            <span className="font-serif font-bold text-[#1E293B]">Education: </span>
            <span>{sampleEducation[0]?.institution} ({sampleEducation[0]?.year})</span>
          </div>
          <div className="flex gap-0.5 text-[4.8px]">
            {sampleSkills.slice(0, 4).map((skill, idx) => (
              <span key={idx} className="border border-slate-200 px-1 rounded text-[#475569]">
                {typeof skill === "string" ? skill : skill.name}
              </span>
            ))}
          </div>
        </div>
        {(sampleLanguages.length > 0 || sampleHobbies) && (
          <div className="flex justify-between text-[4.5px] text-[#94A3B8]">
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

