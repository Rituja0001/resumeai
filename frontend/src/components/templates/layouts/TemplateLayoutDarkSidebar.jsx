import React from "react";

export default function TemplateLayoutDarkSidebar({ template }) {
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
    accentColor = "#1E3A8A",
    sampleMetrics = ["120+ Engineers", "₹18,000Cr GMV"],
  } = template;

  const initials = sampleName
    ? sampleName.split(" ").map((n) => n[0]).join("").slice(0, 2)
    : "IN";

  return (
    <div className="w-full h-full bg-white grid grid-cols-[34%_66%] select-none font-['Plus_Jakarta_Sans'] overflow-hidden text-[5.5px]">
      {/* Dark Sidebar */}
      <div className="bg-[#0F172A] text-white p-2 sm:p-2.5 flex flex-col justify-between overflow-hidden">
        <div className="space-y-1.5 overflow-hidden">
          {/* Avatar Monogram */}
          <div className="flex items-center gap-1.5 border-b border-slate-800 pb-1">
            <div className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-400 flex items-center justify-center font-extrabold text-[8px] text-blue-300 shadow-xs shrink-0">
              {initials}
            </div>
            <div className="overflow-hidden">
              <h5 className="font-extrabold text-[8px] leading-tight text-white truncate">
                {sampleName}
              </h5>
              <p className="text-[5.3px] text-blue-400 font-medium truncate">
                {sampleRole}
              </p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-0.5 text-[4.8px] text-slate-300">
            <p className="truncate">📍 {sampleLocation}</p>
            <p className="truncate">✉️ {sampleEmail}</p>
            <p className="truncate">📞 {samplePhone}</p>
            {sampleLinks && sampleLinks.length > 0 && (
              <p className="truncate">🔗 {sampleLinks[0].url.replace(/^https?:\/\//, '')}</p>
            )}
          </div>

          {/* Impact Metric */}
          {sampleMetrics && sampleMetrics.length > 0 && (
            <div className="bg-slate-800/80 p-1 rounded border border-slate-700">
              <span className="text-[4.5px] uppercase font-bold text-slate-400 block">Leadership Scale</span>
              <span className="font-extrabold text-[6.5px] text-blue-400">{sampleMetrics[0]}</span>
            </div>
          )}

          {/* Skills Section */}
          {sampleSkills.length > 0 && (
            <div className="border-t border-slate-800 pt-1">
              <p className="font-extrabold text-[5.5px] uppercase tracking-wider text-slate-300 mb-0.5">
                Technical Expertise
              </p>
              <div className="space-y-0.5 text-[4.8px] text-slate-300">
                {sampleSkills.slice(0, 6).map((skill, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-slate-800/60 px-1 py-0.2 rounded">
                    <span className="truncate">{typeof skill === "string" ? skill : skill.name}</span>
                    <span className="text-[4.2px] text-blue-400 shrink-0">95%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {sampleLanguages.length > 0 && (
            <div className="border-t border-slate-800 pt-1">
              <p className="font-extrabold text-[5.5px] uppercase tracking-wider text-slate-300 mb-0.5">
                Languages
              </p>
              <div className="space-y-0.5 text-[4.8px] text-slate-300">
                {sampleLanguages.slice(0, 3).map((lang, idx) => (
                  <p key={idx} className="truncate">
                    • {typeof lang === "string" ? lang : `${lang.name} (${lang.proficiency || "Fluent"})`}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Interests */}
          {sampleHobbies && (
            <div className="border-t border-slate-800 pt-1">
              <p className="font-extrabold text-[5.5px] uppercase tracking-wider text-slate-300 mb-0.5">
                Interests
              </p>
              <p className="text-[4.8px] text-slate-400 line-clamp-1">{sampleHobbies}</p>
            </div>
          )}
        </div>

        <div className="text-[4.5px] text-slate-500 border-t border-slate-800 pt-0.5">
          Executive Portfolio
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-2.5 sm:p-3 flex flex-col justify-between text-[#252525] overflow-hidden">
        <div className="space-y-1.5 overflow-hidden flex-1 flex flex-col justify-between">
          {/* Summary */}
          {sampleSummary && (
            <div>
              <p className="font-extrabold text-[6px] uppercase tracking-wider text-slate-900 mb-0.5 pb-0.5 border-b border-slate-100">
                Executive Profile
              </p>
              <p className="text-[5.3px] text-[#555] leading-relaxed line-clamp-2">
                {sampleSummary}
              </p>
            </div>
          )}

          {/* Experience */}
          {sampleExperience.length > 0 && (
            <div>
              <p className="font-extrabold text-[6px] uppercase tracking-wider text-slate-900 mb-0.5 pb-0.5 border-b border-slate-100">
                Professional Leadership
              </p>
              <div className="space-y-1">
                {sampleExperience.slice(0, 2).map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline text-[5.6px] font-bold text-slate-900">
                      <span className="truncate">{exp.role}</span>
                      <span className="text-[4.8px] font-normal text-slate-500 shrink-0">{exp.duration}</span>
                    </div>
                    <p className="text-[5px] font-semibold text-blue-900">{exp.company}</p>
                    {exp.bullets && (
                      <ul className="space-y-0.5 mt-0.5 text-[5px] text-[#555]">
                        {exp.bullets.slice(0, 2).map((bullet, bIdx) => (
                          <li key={bIdx} className="line-clamp-1 pl-1.5 relative before:content-['▪'] before:absolute before:left-0 before:text-blue-600">
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
              <p className="font-extrabold text-[6px] uppercase tracking-wider text-slate-900 mb-0.5 pb-0.5 border-b border-slate-100">
                Key Initiatives & Platforms
              </p>
              <div className="space-y-0.8">
                {sampleProjects.slice(0, 2).map((proj, idx) => (
                  <div key={idx} className="text-[5.2px]">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900 truncate">{proj.title || proj.name}</span>
                      <span className="text-slate-500 text-[4.8px] shrink-0">{proj.techStack || proj.tech_stack}</span>
                    </div>
                    {proj.description && (
                      <p className="text-[5px] text-[#555] line-clamp-1 mt-0.2">{proj.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {sampleEducation.length > 0 && (
            <div className="border-t border-slate-100 pt-1">
              <p className="font-extrabold text-[6px] uppercase tracking-wider text-slate-900 mb-0.5">
                Education & Credentials
              </p>
              {sampleEducation.slice(0, 2).map((edu, idx) => (
                <div key={idx} className="flex justify-between text-[5.2px] text-[#555] mb-0.5">
                  <span className="font-bold text-slate-900 truncate">{edu.degree} · <span className="font-normal text-slate-600">{edu.institution}</span></span>
                  <span className="text-slate-500 text-[4.8px] shrink-0">{edu.year}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
