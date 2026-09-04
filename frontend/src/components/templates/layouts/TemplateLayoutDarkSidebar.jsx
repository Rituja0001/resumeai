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
  } = template;

  return (
    <div className="w-full h-full bg-white grid grid-cols-[35%_65%] select-none font-['Plus_Jakarta_Sans'] overflow-hidden text-[5.5px]">
      {/* Dark Sidebar */}
      <div className="bg-[#111827] text-white p-2 sm:p-2.5 flex flex-col justify-between overflow-hidden">
        <div className="space-y-1.5 overflow-hidden">
          <div className="border-b border-gray-800 pb-1">
            <h5 className="font-extrabold text-[8.5px] leading-tight text-white">
              {sampleName}
            </h5>
            <p className="text-[5.8px] text-blue-400 font-medium mt-0.5">
              {sampleRole}
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-0.5 text-[4.8px] text-gray-400">
            <p className="truncate">📍 {sampleLocation}</p>
            <p className="truncate">✉️ {sampleEmail}</p>
            <p className="truncate">📞 {samplePhone}</p>
            {sampleLinks && sampleLinks.length > 0 && (
              <p className="truncate">🔗 {sampleLinks[0].url}</p>
            )}
          </div>

          {/* Skills Section */}
          {sampleSkills.length > 0 && (
            <div className="border-t border-gray-800 pt-1">
              <p className="font-extrabold text-[5.5px] uppercase tracking-wider text-gray-300 mb-0.5">
                Expertise
              </p>
              <div className="space-y-0.5 text-[4.8px] text-gray-400">
                {sampleSkills.slice(0, 4).map((skill, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-gray-900/80 px-1 py-0.2 rounded">
                    <span className="truncate">{typeof skill === "string" ? skill : skill.name}</span>
                    <span className="text-[4.2px] text-blue-400 shrink-0">Expert</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {sampleLanguages.length > 0 && (
            <div className="border-t border-gray-800 pt-1">
              <p className="font-extrabold text-[5.5px] uppercase tracking-wider text-gray-300 mb-0.5">
                Languages
              </p>
              <div className="space-y-0.5 text-[4.8px] text-gray-400">
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
            <div className="border-t border-gray-800 pt-1">
              <p className="font-extrabold text-[5.5px] uppercase tracking-wider text-gray-300 mb-0.5">
                Interests
              </p>
              <p className="text-[4.8px] text-gray-400 line-clamp-1">{sampleHobbies}</p>
            </div>
          )}
        </div>

        <div className="text-[4.5px] text-gray-600 border-t border-gray-800 pt-0.5">
          Indian Tech Talent Pool
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-2.5 sm:p-3 flex flex-col justify-between text-[#252525] overflow-hidden">
        <div className="space-y-1.5 overflow-hidden">
          {/* Summary */}
          {sampleSummary && (
            <div>
              <p className="font-extrabold text-[6px] uppercase tracking-wider text-gray-900 mb-0.5 pb-0.5 border-b border-gray-100">
                Executive Profile
              </p>
              <p className="text-[5.2px] text-gray-600 leading-relaxed line-clamp-2">
                {sampleSummary}
              </p>
            </div>
          )}

          {/* Work Experience */}
          {sampleExperience.length > 0 && (
            <div>
              <p className="font-extrabold text-[6px] uppercase tracking-wider text-gray-900 mb-0.5 pb-0.5 border-b border-gray-100">
                Work History
              </p>
              <div className="space-y-1">
                {sampleExperience.slice(0, 2).map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline text-[5.5px] font-bold text-gray-900">
                      <span className="truncate">{exp.role} <span className="font-normal text-gray-500">· {exp.company}</span></span>
                      <span className="text-[4.8px] font-normal text-gray-400 shrink-0">{exp.duration}</span>
                    </div>
                    {exp.bullets && (
                      <ul className="space-y-0.5 mt-0.5 text-[4.8px] text-gray-600">
                        {exp.bullets.slice(0, 2).map((bullet, bIdx) => (
                          <li key={bIdx} className="line-clamp-1 pl-1.5 relative before:content-['•'] before:absolute before:left-0 before:text-blue-600">
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
              <p className="font-extrabold text-[6px] uppercase tracking-wider text-gray-900 mb-0.5 pb-0.5 border-b border-gray-100">
                Key Projects
              </p>
              <div className="space-y-0.5">
                {sampleProjects.slice(0, 1).map((proj, idx) => (
                  <div key={idx} className="text-[5px]">
                    <span className="font-bold text-gray-900 truncate">{proj.title || proj.name}</span>
                    <span className="text-gray-400"> · {proj.techStack || proj.tech_stack}</span>
                    {proj.description && (
                      <p className="text-[4.8px] text-gray-600 line-clamp-1">{proj.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Education */}
        {sampleEducation.length > 0 && (
          <div className="border-t border-gray-100 pt-1 text-[5px]">
            <p className="font-extrabold text-[5.5px] uppercase tracking-wider text-gray-900 mb-0.5">
              Education & Credentials
            </p>
            {sampleEducation.slice(0, 1).map((edu, idx) => (
              <div key={idx} className="flex justify-between items-baseline text-gray-600">
                <span className="font-bold text-gray-900 truncate">{edu.degree} · <span className="font-normal text-gray-500">{edu.institution}</span></span>
                <span className="text-gray-400 shrink-0">{edu.year}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

