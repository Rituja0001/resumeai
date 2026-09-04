import React from "react";

export default function TemplateLayoutSidebarLeft({ template }) {
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
    accentColor = "#1F2937",
  } = template;

  const initials = sampleName
    ? sampleName.split(" ").map((n) => n[0]).join("").slice(0, 2)
    : "IN";

  return (
    <div className="w-full h-full bg-white grid grid-cols-[33%_67%] select-none font-['Plus_Jakarta_Sans'] overflow-hidden text-[5.5px]">
      {/* Left Sidebar */}
      <div className="p-2 sm:p-2.5 flex flex-col justify-between text-white" style={{ backgroundColor: accentColor }}>
        <div className="space-y-1.5 overflow-hidden">
          {/* Avatar Monogram */}
          <div className="w-6 h-6 rounded-full bg-white/20 border border-white/40 flex items-center justify-center font-extrabold text-[8px] text-white shadow-xs">
            {initials}
          </div>

          <div>
            <h5 className="font-extrabold text-[8px] leading-tight text-white">
              {sampleName}
            </h5>
            <p className="text-[5.5px] text-white/80 leading-tight font-medium">
              {sampleRole}
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-0.5 text-[4.8px] text-white/75 border-t border-white/15 pt-1">
            <p className="truncate">📍 {sampleLocation}</p>
            <p className="truncate">✉️ {sampleEmail}</p>
            <p className="truncate">📞 {samplePhone}</p>
            {sampleLinks && sampleLinks.length > 0 && (
              <p className="truncate">🔗 {sampleLinks[0].url}</p>
            )}
          </div>

          {/* Skills Section */}
          {sampleSkills.length > 0 && (
            <div className="border-t border-white/15 pt-1">
              <p className="font-extrabold text-[5.5px] uppercase tracking-wider text-white/90 mb-0.5">
                Core Skills
              </p>
              <div className="space-y-0.5 text-[4.8px] text-white/80">
                {sampleSkills.slice(0, 4).map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    <span className="w-0.8 h-0.8 rounded-full bg-white/60" />
                    <span className="truncate">{typeof skill === "string" ? skill : skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {sampleLanguages.length > 0 && (
            <div className="border-t border-white/15 pt-1">
              <p className="font-extrabold text-[5.5px] uppercase tracking-wider text-white/90 mb-0.5">
                Languages
              </p>
              <div className="space-y-0.5 text-[4.8px] text-white/80">
                {sampleLanguages.slice(0, 2).map((lang, idx) => (
                  <p key={idx} className="truncate">
                    • {typeof lang === "string" ? lang : `${lang.name} (${lang.proficiency || "Fluent"})`}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Interests */}
          {sampleHobbies && (
            <div className="border-t border-white/15 pt-1">
              <p className="font-extrabold text-[5.5px] uppercase tracking-wider text-white/90 mb-0.5">
                Interests
              </p>
              <p className="text-[4.8px] text-white/75 line-clamp-1">{sampleHobbies}</p>
            </div>
          )}
        </div>

        <div className="text-[4.5px] text-white/50 border-t border-white/10 pt-0.5">
          ATS Verified Document
        </div>
      </div>

      {/* Right Main Body */}
      <div className="p-2.5 sm:p-3 flex flex-col justify-between text-[#252525] overflow-hidden">
        <div className="space-y-1.5 overflow-hidden">
          {/* Executive Summary */}
          {sampleSummary && (
            <div>
              <p className="font-extrabold text-[6px] uppercase tracking-wider text-[#252525] mb-0.5 pb-0.5 border-b border-slate-100">
                Executive Profile
              </p>
              <p className="text-[5.2px] text-[#555] leading-relaxed line-clamp-2">
                {sampleSummary}
              </p>
            </div>
          )}

          {/* Experience */}
          {sampleExperience.length > 0 && (
            <div>
              <p className="font-extrabold text-[6px] uppercase tracking-wider text-[#252525] mb-0.5 pb-0.5 border-b border-slate-100">
                Professional Experience
              </p>
              <div className="space-y-1">
                {sampleExperience.slice(0, 2).map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline text-[5.5px] font-bold text-[#252525]">
                      <span className="truncate">{exp.role}</span>
                      <span className="text-[4.8px] font-normal text-[#888] shrink-0">{exp.duration}</span>
                    </div>
                    <p className="text-[5px] font-medium text-[#666]">{exp.company}</p>
                    {exp.bullets && (
                      <ul className="space-y-0.5 mt-0.5 text-[4.8px] text-[#555]">
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
              <p className="font-extrabold text-[6px] uppercase tracking-wider text-[#252525] mb-0.5 pb-0.5 border-b border-slate-100">
                Key Projects
              </p>
              <div className="space-y-0.5">
                {sampleProjects.slice(0, 1).map((proj, idx) => (
                  <div key={idx} className="text-[5px]">
                    <span className="font-bold text-[#252525]">{proj.title || proj.name}</span>
                    <span className="text-[#888]"> · {proj.techStack || proj.tech_stack}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Education */}
        {sampleEducation.length > 0 && (
          <div className="border-t border-slate-100 pt-1">
            <p className="font-extrabold text-[5.8px] uppercase tracking-wider text-[#252525] mb-0.5">
              Education & Credentials
            </p>
            {sampleEducation.slice(0, 1).map((edu, idx) => (
              <div key={idx} className="flex justify-between text-[5px] text-[#555]">
                <span className="font-bold text-[#252525] truncate">{edu.degree} · <span className="font-normal text-[#666]">{edu.institution}</span></span>
                <span className="text-[#888] shrink-0">{edu.year}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

