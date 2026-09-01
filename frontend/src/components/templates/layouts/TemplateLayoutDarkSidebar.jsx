import React from "react";

export default function TemplateLayoutDarkSidebar({ template }) {
  const { sampleName, sampleRole, sampleLocation, sampleEmail, samplePhone, sampleSummary, sampleExperience = [], sampleEducation = [], sampleSkills = [], accentColor = "#1E3A8A" } = template;

  return (
    <div className="w-full h-full bg-white grid grid-cols-[35%_65%] select-none font-['Plus_Jakarta_Sans'] overflow-hidden">
      {/* Dark Sidebar */}
      <div className="bg-[#111827] text-white p-2.5 sm:p-3 flex flex-col justify-between">
        <div>
          <div className="border-b border-gray-800 pb-2 mb-2">
            <h5 className="font-extrabold text-[8.5px] leading-tight text-white">
              {sampleName}
            </h5>
            <p className="text-[5.8px] text-blue-400 font-medium mt-0.5">
              {sampleRole}
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-1 text-[5.2px] text-gray-400 mb-3">
            <p>📍 {sampleLocation}</p>
            <p className="truncate">✉️ {sampleEmail}</p>
            <p>📞 {samplePhone}</p>
          </div>

          {/* Skills Section */}
          {sampleSkills.length > 0 && (
            <div>
              <p className="font-extrabold text-[5.8px] uppercase tracking-wider text-gray-300 mb-1">
                Expertise
              </p>
              <div className="space-y-0.8 text-[5.3px] text-gray-400">
                {sampleSkills.slice(0, 5).map((skill, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-gray-900/80 px-1 py-0.5 rounded">
                    <span>{skill}</span>
                    <span className="text-[4.5px] text-blue-400">Advanced</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="text-[5px] text-gray-600 border-t border-gray-800 pt-1">
          Indian Tech Talent Pool
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-2.5 sm:p-3 flex flex-col justify-between text-[#252525]">
        <div>
          {/* Summary */}
          {sampleSummary && (
            <div className="mb-2">
              <p className="font-extrabold text-[6.5px] uppercase tracking-wider text-gray-900 mb-0.5 pb-0.5 border-b border-gray-100">
                Summary
              </p>
              <p className="text-[5.8px] text-gray-600 leading-relaxed line-clamp-2">
                {sampleSummary}
              </p>
            </div>
          )}

          {/* Work Experience */}
          {sampleExperience.length > 0 && (
            <div className="mb-2">
              <p className="font-extrabold text-[6.5px] uppercase tracking-wider text-gray-900 mb-1 pb-0.5 border-b border-gray-100">
                Work History
              </p>
              <div className="space-y-1.5">
                {sampleExperience.slice(0, 2).map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline text-[6.2px] font-bold text-gray-900">
                      <span>{exp.role}</span>
                      <span className="text-[5px] font-normal text-gray-400">{exp.duration}</span>
                    </div>
                    <p className="text-[5.5px] font-medium text-gray-600 mb-0.5">{exp.company}</p>
                    {exp.bullets && (
                      <ul className="space-y-0.5 text-[5.2px] text-gray-600">
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
        </div>

        {/* Education */}
        {sampleEducation.length > 0 && (
          <div className="border-t border-gray-100 pt-1 text-[5.5px]">
            <span className="font-bold text-gray-900">{sampleEducation[0]?.institution}</span>
            <p className="text-gray-500">{sampleEducation[0]?.degree} ({sampleEducation[0]?.year})</p>
          </div>
        )}
      </div>
    </div>
  );
}

