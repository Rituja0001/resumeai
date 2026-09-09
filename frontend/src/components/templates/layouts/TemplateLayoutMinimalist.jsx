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
    <div className="w-full h-full bg-white p-2.5 sm:p-3 flex flex-col justify-start select-none font-serif text-[#252525] overflow-hidden text-[5.5px]">
      <div className="space-y-1.5 overflow-hidden flex-1 flex flex-col justify-between">
        {/* Minimal Header */}
        <div className="text-center pb-0.5">
          <h4 className="font-bold text-[10px] sm:text-[11px] tracking-wide text-[#1E293B] uppercase">
            {sampleName}
          </h4>
          <p className="text-[6.5px] font-medium tracking-wider text-[#64748B] uppercase mt-0.5">
            {sampleRole}
          </p>
          <div className="flex flex-wrap justify-center gap-x-1.5 gap-y-0.5 text-[5px] text-[#94A3B8] mt-0.5 border-t border-b border-slate-100 py-0.5 font-sans">
            <span>{sampleLocation}</span>
            <span>·</span>
            <span>{sampleEmail}</span>
            <span>·</span>
            <span>{samplePhone}</span>
            {sampleLinks && sampleLinks.length > 0 && (
              <>
                <span>·</span>
                <span>{sampleLinks[0].url.replace(/^https?:\/\//, '')}</span>
              </>
            )}
          </div>
        </div>

        {/* Summary */}
        {sampleSummary && (
          <p className="text-[5.3px] text-[#475569] leading-relaxed text-center italic line-clamp-2 px-1">
            "{sampleSummary}"
          </p>
        )}

        {/* Experience */}
        {sampleExperience.length > 0 && (
          <div>
            <span className="font-bold text-[6px] uppercase tracking-widest text-[#1E293B] block text-center border-b border-slate-200 pb-0.5 mb-1">
              Professional Experience
            </span>

            <div className="space-y-1 text-left">
              {sampleExperience.slice(0, 2).map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline text-[5.6px] font-bold text-[#1E293B]">
                    <span className="truncate">{exp.role} <span className="italic font-normal text-[#64748B]">at {exp.company}</span></span>
                    <span className="text-[4.8px] font-normal text-[#94A3B8] shrink-0 font-sans">{exp.duration}</span>
                  </div>
                  {exp.bullets && (
                    <ul className="space-y-0.5 mt-0.5 text-[5px] text-[#475569] font-sans">
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

        {/* Projects */}
        {sampleProjects.length > 0 && (
          <div>
            <span className="font-bold text-[6px] uppercase tracking-widest text-[#1E293B] block text-center border-b border-slate-200 pb-0.5 mb-1">
              Selected Works
            </span>
            <div className="space-y-0.8 text-left font-sans">
              {sampleProjects.slice(0, 2).map((proj, idx) => (
                <div key={idx} className="text-[5.2px]">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-[#1E293B] truncate">{proj.title || proj.name}</span>
                    <span className="text-[#888] text-[4.8px] shrink-0">{proj.techStack || proj.tech_stack}</span>
                  </div>
                  {proj.description && (
                    <p className="text-[5px] text-[#475569] line-clamp-1 mt-0.2">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Skills */}
        <div className="border-t border-slate-200 pt-1 space-y-0.8 font-sans">
          <div className="flex justify-between text-[5.2px] text-[#334155]">
            <span className="truncate"><b>Education:</b> {sampleEducation[0]?.degree} · {sampleEducation[0]?.institution}</span>
            <span className="shrink-0 text-[4.8px] text-[#888]">{sampleEducation[0]?.year}</span>
          </div>
          {sampleSkills.length > 0 && (
            <p className="text-[4.8px] text-[#64748B] truncate">
              <b>Skills:</b> {sampleSkills.slice(0, 7).map((s) => typeof s === "string" ? s : s.name).join(" · ")}
            </p>
          )}
          {(sampleLanguages.length > 0 || sampleHobbies) && (
            <div className="flex justify-between text-[4.8px] text-[#888]">
              {sampleLanguages.length > 0 && (
                <span className="truncate">Languages: {sampleLanguages.slice(0, 3).map((l) => typeof l === "string" ? l : l.name).join(", ")}</span>
              )}
              {sampleHobbies && (
                <span className="truncate">Interests: {sampleHobbies}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
