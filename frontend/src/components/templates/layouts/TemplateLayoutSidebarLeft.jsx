import React from "react";

export default function TemplateLayoutSidebarLeft({ template }) {
  const { sampleName, sampleRole, sampleLocation, sampleEmail, samplePhone, sampleSummary, sampleExperience = [], sampleEducation = [], sampleSkills = [], accentColor = "#1F2937" } = template;

  const initials = sampleName
    ? sampleName.split(" ").map((n) => n[0]).join("").slice(0, 2)
    : "IN";

  return (
    <div className="w-full h-full bg-white grid grid-cols-[33%_67%] select-none font-['Plus_Jakarta_Sans'] overflow-hidden">
      {/* Left Sidebar */}
      <div className="p-2.5 sm:p-3 flex flex-col justify-between text-white" style={{ backgroundColor: accentColor }}>
        <div>
          {/* Avatar Monogram */}
          <div className="w-7 h-7 rounded-full bg-white/20 border border-white/40 flex items-center justify-center font-extrabold text-[9px] mb-2 text-white shadow-xs">
            {initials}
          </div>

          <h5 className="font-extrabold text-[8.5px] leading-tight text-white mb-0.5">
            {sampleName}
          </h5>
          <p className="text-[5.8px] text-white/80 leading-tight mb-2.5 font-medium">
            {sampleRole}
          </p>

          {/* Contact Details */}
          <div className="space-y-1 text-[5.5px] text-white/75 border-t border-white/15 pt-2 mb-3">
            <p className="truncate">📍 {sampleLocation}</p>
            <p className="truncate">✉️ {sampleEmail}</p>
            <p className="truncate">📞 {samplePhone}</p>
          </div>

          {/* Skills Section */}
          {sampleSkills.length > 0 && (
            <div className="border-t border-white/15 pt-2">
              <p className="font-extrabold text-[6px] uppercase tracking-wider text-white/90 mb-1">
                Core Competencies
              </p>
              <div className="space-y-0.5 text-[5.5px] text-white/80">
                {sampleSkills.slice(0, 5).map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-white/60" />
                    <span className="truncate">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="text-[5px] text-white/50 border-t border-white/10 pt-1">
          ATS Optimized · Verified
        </div>
      </div>

      {/* Right Main Body */}
      <div className="p-2.5 sm:p-3 flex flex-col justify-between text-[#252525]">
        <div>
          {/* Executive Summary */}
          {sampleSummary && (
            <div className="mb-2">
              <p className="font-extrabold text-[6.5px] uppercase tracking-wider text-[#252525] mb-0.5 pb-0.5 border-b border-slate-100">
                Executive Profile
              </p>
              <p className="text-[5.8px] text-[#555] leading-relaxed line-clamp-2">
                {sampleSummary}
              </p>
            </div>
          )}

          {/* Experience */}
          {sampleExperience.length > 0 && (
            <div className="mb-2">
              <p className="font-extrabold text-[6.5px] uppercase tracking-wider text-[#252525] mb-1 pb-0.5 border-b border-slate-100">
                Professional Experience
              </p>
              <div className="space-y-1.5">
                {sampleExperience.slice(0, 2).map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline text-[6.2px] font-bold text-[#252525]">
                      <span className="truncate">{exp.role}</span>
                      <span className="text-[5.2px] font-normal text-[#888] shrink-0">{exp.duration}</span>
                    </div>
                    <p className="text-[5.5px] font-medium text-[#666] mb-0.5">{exp.company}</p>
                    {exp.bullets && (
                      <ul className="space-y-0.5 text-[5.3px] text-[#555]">
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

        {/* Education */}
        {sampleEducation.length > 0 && (
          <div className="border-t border-slate-100 pt-1">
            <p className="font-extrabold text-[6px] uppercase tracking-wider text-[#252525] mb-0.5">
              Education & Credentials
            </p>
            {sampleEducation.slice(0, 1).map((edu, idx) => (
              <div key={idx} className="flex justify-between text-[5.5px] text-[#555]">
                <span className="font-bold text-[#252525] truncate">{edu.institution} — {edu.degree}</span>
                <span className="text-[#888] shrink-0">{edu.year}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

