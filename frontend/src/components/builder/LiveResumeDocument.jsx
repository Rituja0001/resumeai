import React, { useMemo } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Briefcase,
  GraduationCap,
  Sparkles,
  FolderGit2,
  Languages,
  CheckCircle2,
  Calendar,
} from "lucide-react";

/**
 * Normalizes resume data for document rendering
 */
function useNormalizedResume(resume, template, customAccent) {
  const accent = customAccent || resume?.accentColor || template?.accentColor || "#FA0C40";
  const firstName = resume?.personalDetails?.firstName || "";
  const lastName = resume?.personalDetails?.lastName || "";
  const fullName = (firstName || lastName) ? `${firstName} ${lastName}`.trim() : (template?.sampleName || "YOUR NAME");
  const jobTitle = resume?.personalDetails?.jobTitle || template?.sampleRole || "JOB TITLE / SPECIALIZATION";
  const city = resume?.personalDetails?.city || template?.sampleLocation?.split(",")?.[0] || "City";
  const country = resume?.personalDetails?.country || "India";
  const location = [city, country].filter(Boolean).join(", ");
  const email = resume?.personalDetails?.email || template?.sampleEmail || "email@domain.com";
  const phone = resume?.personalDetails?.phone || template?.samplePhone || "+91 00000 00000";
  const photo = resume?.personalDetails?.photo || null;
  const summary = resume?.professional_summary || template?.sampleSummary || "";

  const experiences = resume?.experiences?.length > 0
    ? resume.experiences
    : (template?.sampleExperience || []).map((exp, i) => ({
        id: i,
        role: exp.role,
        company: exp.company,
        city: "",
        startMonth: exp.duration?.split("-")?.[0]?.trim() || "2021",
        startYear: "",
        endMonth: exp.duration?.split("-")?.[1]?.trim() || "Present",
        endYear: "",
        isCurrent: exp.duration?.includes("Present") || false,
        description: exp.bullets ? exp.bullets.map((b) => `• ${b}`).join("\n") : "",
      }));

  const education = resume?.education?.length > 0
    ? resume.education
    : (template?.sampleEducation || []).map((edu, i) => ({
        id: i,
        institution: edu.institution,
        degree: edu.degree,
        city: "",
        marksType: "CGPA",
        marks: "",
        startYear: "",
        endYear: edu.year || "2021",
        isCurrent: false,
        description: "",
      }));

  const skills = resume?.skills?.length > 0
    ? resume.skills
    : (template?.sampleSkills || []).map((s, i) => ({
        id: i,
        name: typeof s === "string" ? s : s.name,
        level: 4,
      }));

  const hideSkillLevel = resume?.hideSkillLevel || false;
  const socialLinks = resume?.socialLinks || [];
  const hobbies = resume?.hobbies || "";
  const projects = resume?.additionalSections?.projects || [];
  const languages = resume?.additionalSections?.languages || [];

  const initials = fullName
    ? fullName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "ME";

  return {
    accent,
    fullName,
    jobTitle,
    location,
    email,
    phone,
    photo,
    initials,
    summary,
    experiences,
    education,
    skills,
    hideSkillLevel,
    socialLinks,
    hobbies,
    projects,
    languages,
  };
}

/**
 * Text height estimation helper for A4 paging
 */
function estimateTextHeight(text, charsPerLine = 65, lineHeightPx = 18) {
  if (!text) return 0;
  const lines = text.split("\n").reduce((acc, line) => {
    return acc + Math.max(1, Math.ceil((line.length || 1) / charsPerLine));
  }, 0);
  return lines * lineHeightPx;
}

function estimateExpHeight(exp) {
  const base = 36;
  const descHeight = estimateTextHeight(exp.description, 60, 18);
  return Math.max(50, base + descHeight);
}

function estimateEduHeight(edu) {
  const base = 34;
  const descHeight = estimateTextHeight(edu.description, 60, 16);
  return Math.max(45, base + descHeight);
}

function estimateProjHeight(proj) {
  const base = 36;
  const descHeight = estimateTextHeight(proj.description, 60, 18);
  return Math.max(50, base + descHeight);
}

/**
 * Robust A4 multi-page pagination algorithm
 * Distributes sections and entry cards across distinct A4 page sheets
 */
function paginateResumeData(data, layoutStyle) {
  const isSidebarLayout = ["sidebar-left", "sidebar-right", "dark-sidebar"].includes(layoutStyle);
  const isPhotoHeader = ["photo-header", "header-banner"].includes(layoutStyle);

  // Usable vertical budget (in pixels) inside an A4 sheet (1123px total)
  const PAGE_1_CAPACITY = isSidebarLayout ? 880 : isPhotoHeader ? 800 : 820;
  const PAGE_N_CAPACITY = isSidebarLayout ? 960 : 960;

  const pages = [];

  let currentPage = {
    pageNumber: 1,
    isFirstPage: true,
    summary: "",
    experiences: [],
    education: [],
    skills: [],
    projects: [],
    languages: [],
    socialLinks: [],
    hobbies: "",
  };

  let currentUsed = 0;
  let currentCapacity = PAGE_1_CAPACITY;

  function pushAndStartNewPage() {
    pages.push(currentPage);
    currentPage = {
      pageNumber: pages.length + 1,
      isFirstPage: false,
      summary: "",
      experiences: [],
      education: [],
      skills: [],
      projects: [],
      languages: [],
      socialLinks: [],
      hobbies: "",
    };
    currentUsed = 0;
    currentCapacity = PAGE_N_CAPACITY;
  }

  // 1. Professional Summary (Page 1 focus)
  if (data.summary) {
    const summaryH = 35 + estimateTextHeight(data.summary, 70, 18);
    currentPage.summary = data.summary;
    currentUsed += summaryH;
  }

  // 2. Work Experiences
  if (data.experiences && data.experiences.length > 0) {
    const sectionHeaderH = 34;
    if (currentUsed + sectionHeaderH + 60 > currentCapacity && currentUsed > 100) {
      pushAndStartNewPage();
    }
    currentUsed += sectionHeaderH;

    for (const exp of data.experiences) {
      const expH = estimateExpHeight(exp);
      if (currentUsed + expH > currentCapacity && currentPage.experiences.length > 0) {
        pushAndStartNewPage();
      }
      currentPage.experiences.push(exp);
      currentUsed += expH + 12;
    }
  }

  // 3. Education (in full-width or non-sidebar main body)
  if (data.education && data.education.length > 0) {
    const eduSectionHeaderH = 32;
    if (currentUsed + eduSectionHeaderH + 50 > currentCapacity && currentUsed > 120) {
      pushAndStartNewPage();
    }
    currentUsed += eduSectionHeaderH;

    for (const edu of data.education) {
      const eduH = estimateEduHeight(edu);
      if (currentUsed + eduH > currentCapacity && (currentPage.education.length > 0 || currentPage.experiences.length > 0)) {
        pushAndStartNewPage();
      }
      currentPage.education.push(edu);
      currentUsed += eduH + 10;
    }
  }

  // 4. Skills (for single-column / timeline / creative / minimalist layouts)
  if (!isSidebarLayout && data.skills && data.skills.length > 0) {
    const skillsH = 32 + Math.ceil(data.skills.length / 4) * 26;
    if (currentUsed + skillsH > currentCapacity && currentUsed > 150) {
      pushAndStartNewPage();
    }
    currentPage.skills = data.skills;
    currentUsed += skillsH + 12;
  }

  // 5. Projects
  if (data.projects && data.projects.length > 0) {
    const projHeaderH = 32;
    if (currentUsed + projHeaderH + 50 > currentCapacity && currentUsed > 150) {
      pushAndStartNewPage();
    }
    currentUsed += projHeaderH;

    for (const proj of data.projects) {
      const projH = estimateProjHeight(proj);
      if (currentUsed + projH > currentCapacity && (currentPage.projects.length > 0 || currentPage.education.length > 0)) {
        pushAndStartNewPage();
      }
      currentPage.projects.push(proj);
      currentUsed += projH + 10;
    }
  }

  // 6. Additional (Languages, Hobbies, Links)
  if (!isSidebarLayout) {
    if (data.languages && data.languages.length > 0) {
      currentPage.languages = data.languages;
    }
    if (data.socialLinks && data.socialLinks.length > 0) {
      currentPage.socialLinks = data.socialLinks;
    }
    if (data.hobbies) {
      currentPage.hobbies = data.hobbies;
    }
  } else {
    // Sidebar layouts have skills/languages in the sidebar column
    currentPage.skills = data.skills;
    currentPage.languages = data.languages;
    currentPage.socialLinks = data.socialLinks;
    currentPage.hobbies = data.hobbies;
  }

  pages.push(currentPage);
  return pages;
}

/* ========================================================================= */
/* LAYOUT 1: SINGLE COLUMN PAGE                                              */
/* ========================================================================= */
function SingleColumnPage({ pageData, fullData, pageIndex, totalPages }) {
  const { accent, fullName, jobTitle, location, email, phone, photo, hideSkillLevel } = fullData;
  const isFirst = pageIndex === 1;

  return (
    <div className="p-6 sm:p-8 space-y-5 text-[#252525]">
      {/* Page 1 Header */}
      {isFirst ? (
        <div className="border-b-2 pb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4" style={{ borderColor: accent }}>
          <div className="flex items-start gap-3.5">
            {photo && <img src={photo} alt={fullName} className="w-13 h-13 rounded-full object-cover border-2 shrink-0 shadow-xs" style={{ borderColor: accent }} />}
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#252525] tracking-tight uppercase leading-none">{fullName}</h1>
              <p className="text-xs font-bold mt-1" style={{ color: accent }}>{jobTitle}</p>
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-right text-[10px] text-[#6B6B6B] min-w-[140px] space-y-0.5">
            <p className="font-extrabold text-[9px] uppercase tracking-wider text-[#252525] border-b border-slate-200 pb-0.5 mb-1">Contact</p>
            <p>{location}</p>
            <p className="truncate">{email}</p>
            <p>{phone}</p>
          </div>
        </div>
      ) : (
        /* Page 2+ Continuation Header */
        <div className="border-b pb-2.5 flex items-center justify-between text-xs" style={{ borderColor: `${accent}40` }}>
          <div>
            <span className="font-extrabold uppercase tracking-tight text-[#252525]">{fullName}</span>
            <span className="text-[11px] font-bold ml-2" style={{ color: accent }}>{jobTitle}</span>
          </div>
          <span className="text-[10px] text-[#888] font-bold">Resume · Page {pageIndex}</span>
        </div>
      )}

      {/* Summary */}
      {pageData.summary && (
        <div>
          <h4 className="font-extrabold text-xs uppercase tracking-wider mb-1.5 pb-0.5 border-b border-slate-100" style={{ color: accent }}>Professional Summary</h4>
          <p className="text-xs text-[#555] leading-relaxed whitespace-pre-line">{pageData.summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {pageData.experiences.length > 0 && (
        <div>
          <h4 className="font-extrabold text-xs uppercase tracking-wider mb-2 pb-0.5 border-b border-slate-100" style={{ color: accent }}>
            {isFirst ? "Work Experience" : "Work Experience (Continued)"}
          </h4>
          <div className="space-y-3">
            {pageData.experiences.map((exp, idx) => (
              <div key={idx} className="relative pl-3 border-l-2" style={{ borderColor: `${accent}30` }}>
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
                <div className="flex justify-between items-baseline text-xs font-bold text-[#252525]">
                  <span>{exp.role || "Role"} <span className="font-medium text-[#6B6B6B]">· {exp.company || "Company"}</span></span>
                  <span className="text-[10px] font-normal text-[#888]">{exp.startMonth} {exp.startYear} - {exp.isCurrent ? "Present" : `${exp.endMonth} ${exp.endYear}`}</span>
                </div>
                {exp.description && <p className="mt-1 text-[11px] text-[#555] whitespace-pre-line leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {pageData.education.length > 0 && (
        <div>
          <h4 className="font-extrabold text-xs uppercase tracking-wider mb-2 pb-0.5 border-b border-slate-100" style={{ color: accent }}>
            {isFirst ? "Education" : "Education (Continued)"}
          </h4>
          <div className="space-y-2">
            {pageData.education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-baseline text-xs">
                <div>
                  <span className="font-bold text-[#252525]">{edu.institution}</span>
                  <p className="text-[11px] text-[#6B6B6B]">{edu.degree} {edu.marks ? `· ${edu.marksType}: ${edu.marks}` : ""}</p>
                  {edu.description && <p className="text-[10px] text-[#777] mt-0.5">{edu.description}</p>}
                </div>
                <span className="text-[10px] text-[#888]">{edu.startYear ? `${edu.startYear} - ` : ""}{edu.isCurrent ? "Present" : edu.endYear}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {pageData.skills.length > 0 && (
        <div>
          <h4 className="font-extrabold text-xs uppercase tracking-wider mb-2 pb-0.5 border-b border-slate-100" style={{ color: accent }}>Skills & Competencies</h4>
          <div className="flex flex-wrap gap-1.5">
            {pageData.skills.map((s, idx) => (
              <span key={idx} className="bg-slate-100 text-[#444] border border-slate-200 px-2.5 py-0.5 rounded-md text-[10px] font-medium flex items-center gap-1.5">
                <span>{s.name || s}</span>
                {!hideSkillLevel && s.level && <span className="text-[8px] font-extrabold px-1 rounded bg-white text-[#FA0C40]">{s.level}/5</span>}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {pageData.projects.length > 0 && (
        <div>
          <h4 className="font-extrabold text-xs uppercase tracking-wider mb-2 pb-0.5 border-b border-slate-100" style={{ color: accent }}>Key Projects</h4>
          <div className="space-y-2">
            {pageData.projects.map((p, idx) => (
              <div key={idx} className="text-xs">
                <div className="flex justify-between font-bold text-[#252525]">
                  <span>{p.title} <span className="font-normal text-[#888] text-[10px]">({p.techStack})</span></span>
                  {p.link && <span className="text-[10px]" style={{ color: accent }}>View Demo →</span>}
                </div>
                {p.description && <p className="text-[11px] text-[#555] mt-0.5">{p.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages & Links */}
      {(pageData.languages?.length > 0 || pageData.socialLinks?.length > 0) && (
        <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-3 text-[10px]">
          {pageData.languages?.length > 0 && (
            <div>
              <span className="font-bold text-[#252525] block mb-1">Languages:</span>
              <p className="text-[#666]">{pageData.languages.map((l) => `${l.name} (${l.proficiency})`).join(" · ")}</p>
            </div>
          )}
          {pageData.socialLinks?.length > 0 && (
            <div>
              <span className="font-bold text-[#252525] block mb-1">Links:</span>
              <p className="text-[#666] truncate">{pageData.socialLinks.map((l) => l.label).join(" · ")}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ========================================================================= */
/* LAYOUT 2: SIDEBAR LEFT PAGE                                               */
/* ========================================================================= */
function SidebarLeftPage({ pageData, fullData, pageIndex, totalPages }) {
  const { accent, fullName, jobTitle, location, email, phone, photo, initials, hideSkillLevel } = fullData;
  const isFirst = pageIndex === 1;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[32%_68%] min-h-[1060px] h-full w-full text-[#252525]">
      {/* Left Colored Sidebar */}
      <div className="p-6 text-white flex flex-col justify-between space-y-6" style={{ backgroundColor: accent }}>
        <div className="space-y-5">
          {isFirst ? (
            <>
              {photo ? (
                <img src={photo} alt={fullName} className="w-16 h-16 rounded-full object-cover border-2 border-white/80 shadow-sm" />
              ) : (
                <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center font-extrabold text-lg text-white shadow-xs">
                  {initials}
                </div>
              )}
              <div>
                <h2 className="font-extrabold text-base sm:text-lg leading-tight text-white">{fullName}</h2>
                <p className="text-xs text-white/85 mt-0.5 font-medium">{jobTitle}</p>
              </div>

              <div className="space-y-1.5 text-[11px] text-white/80 border-t border-white/20 pt-3">
                <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 shrink-0 text-white/70" /> <span>{location}</span></p>
                <p className="flex items-center gap-1.5 truncate"><Mail className="w-3.5 h-3.5 shrink-0 text-white/70" /> <span className="truncate">{email}</span></p>
                <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 shrink-0 text-white/70" /> <span>{phone}</span></p>
              </div>
            </>
          ) : (
            <div className="border-b border-white/20 pb-3">
              <span className="font-extrabold text-sm text-white block">{fullName}</span>
              <span className="text-[10px] text-white/80">Page {pageIndex}</span>
            </div>
          )}

          {/* Skills in Sidebar */}
          {fullData.skills?.length > 0 && isFirst && (
            <div className="border-t border-white/20 pt-3">
              <h5 className="font-extrabold text-[10px] uppercase tracking-wider text-white/90 mb-2">Core Skills</h5>
              <div className="space-y-1.5 text-[11px]">
                {fullData.skills.map((s, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-white/90 font-bold text-[10px]">
                      <span>{s.name || s}</span>
                      {!hideSkillLevel && s.level && <span>{s.level * 20}%</span>}
                    </div>
                    {!hideSkillLevel && (
                      <div className="w-full h-1 bg-white/20 rounded-full mt-0.5 overflow-hidden">
                        <div className="h-full bg-white rounded-full" style={{ width: `${(s.level || 4) * 20}%` }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages in Sidebar */}
          {fullData.languages?.length > 0 && isFirst && (
            <div className="border-t border-white/20 pt-3 text-[11px] text-white/80">
              <h5 className="font-extrabold text-[10px] uppercase tracking-wider text-white/90 mb-1.5">Languages</h5>
              <div className="space-y-0.5 text-[10px]">
                {fullData.languages.map((l, idx) => (
                  <p key={idx} className="flex justify-between"><span>{l.name}</span> <span className="text-white/60">{l.proficiency}</span></p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Main Body */}
      <div className="p-6 sm:p-7 space-y-5 bg-white flex-1">
        {pageData.summary && (
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider mb-1.5 pb-0.5 border-b" style={{ borderColor: `${accent}30`, color: accent }}>About Me</h4>
            <p className="text-xs text-[#555] leading-relaxed whitespace-pre-line">{pageData.summary}</p>
          </div>
        )}

        {pageData.experiences.length > 0 && (
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider mb-2 pb-0.5 border-b" style={{ borderColor: `${accent}30`, color: accent }}>
              {isFirst ? "Experience" : "Experience (Continued)"}
            </h4>
            <div className="space-y-3">
              {pageData.experiences.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline text-xs font-bold text-[#252525]">
                    <span>{exp.role} <span className="font-medium text-[#6B6B6B]">· {exp.company}</span></span>
                    <span className="text-[10px] font-normal text-[#888]">{exp.startMonth} {exp.startYear} - {exp.isCurrent ? "Present" : `${exp.endMonth} ${exp.endYear}`}</span>
                  </div>
                  {exp.description && <p className="mt-1 text-[11px] text-[#555] whitespace-pre-line leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {pageData.education.length > 0 && (
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider mb-2 pb-0.5 border-b" style={{ borderColor: `${accent}30`, color: accent }}>Education</h4>
            <div className="space-y-2">
              {pageData.education.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-baseline text-xs">
                  <div>
                    <span className="font-bold text-[#252525]">{edu.institution}</span>
                    <p className="text-[11px] text-[#6B6B6B]">{edu.degree} {edu.marks ? `· ${edu.marksType}: ${edu.marks}` : ""}</p>
                  </div>
                  <span className="text-[10px] text-[#888]">{edu.startYear ? `${edu.startYear} - ` : ""}{edu.isCurrent ? "Present" : edu.endYear}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {pageData.projects.length > 0 && (
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider mb-2 pb-0.5 border-b" style={{ borderColor: `${accent}30`, color: accent }}>Projects</h4>
            <div className="space-y-2">
              {pageData.projects.map((p, idx) => (
                <div key={idx} className="text-xs">
                  <span className="font-bold text-[#252525]">{p.title}</span> <span className="text-[10px] text-[#888]">({p.techStack})</span>
                  {p.description && <p className="text-[11px] text-[#555] mt-0.5">{p.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ========================================================================= */
/* LAYOUT 3: SIDEBAR RIGHT PAGE                                              */
/* ========================================================================= */
function SidebarRightPage({ pageData, fullData, pageIndex, totalPages }) {
  const { accent, fullName, jobTitle, location, email, phone } = fullData;
  const isFirst = pageIndex === 1;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[68%_32%] min-h-[1060px] h-full w-full text-[#252525]">
      {/* Left Main Body */}
      <div className="p-6 sm:p-7 space-y-5 bg-white sm:border-r border-slate-100 flex-1">
        {isFirst ? (
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#252525] tracking-tight uppercase leading-none">{fullName}</h1>
            <p className="text-xs font-bold mt-1" style={{ color: accent }}>{jobTitle}</p>
          </div>
        ) : (
          <div className="border-b pb-2 flex justify-between items-center text-xs">
            <span className="font-bold uppercase text-[#252525]">{fullName}</span>
            <span className="text-[10px] text-[#888]">Page {pageIndex}</span>
          </div>
        )}

        {pageData.summary && (
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider mb-1.5 pb-0.5 border-b border-slate-100" style={{ color: accent }}>Executive Profile</h4>
            <p className="text-xs text-[#555] leading-relaxed whitespace-pre-line">{pageData.summary}</p>
          </div>
        )}

        {pageData.experiences.length > 0 && (
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider mb-2 pb-0.5 border-b border-slate-100" style={{ color: accent }}>
              {isFirst ? "Professional History" : "Professional History (Continued)"}
            </h4>
            <div className="space-y-3">
              {pageData.experiences.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline text-xs font-bold text-[#252525]">
                    <span>{exp.role} <span className="font-medium text-[#6B6B6B]">· {exp.company}</span></span>
                    <span className="text-[10px] font-normal text-[#888]">{exp.startMonth} {exp.startYear} - {exp.isCurrent ? "Present" : `${exp.endMonth} ${exp.endYear}`}</span>
                  </div>
                  {exp.description && <p className="mt-1 text-[11px] text-[#555] whitespace-pre-line leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {pageData.projects.length > 0 && (
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider mb-2 pb-0.5 border-b border-slate-100" style={{ color: accent }}>Key Projects</h4>
            <div className="space-y-2">
              {pageData.projects.map((p, idx) => (
                <div key={idx} className="text-xs">
                  <span className="font-bold text-[#252525]">{p.title}</span> <span className="text-[10px] text-[#888]">({p.techStack})</span>
                  {p.description && <p className="text-[11px] text-[#555] mt-0.5">{p.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Tinted Sidebar */}
      <div className="p-5 sm:p-6 space-y-5" style={{ backgroundColor: `${accent}0A` }}>
        {isFirst && (
          <div className="space-y-1 text-[11px] text-[#555]">
            <h5 className="font-extrabold text-[10px] uppercase tracking-wider mb-2" style={{ color: accent }}>Contact</h5>
            <p>📍 {location}</p>
            <p className="truncate">✉️ {email}</p>
            <p>📞 {phone}</p>
          </div>
        )}

        {fullData.education?.length > 0 && isFirst && (
          <div className="border-t border-slate-200/80 pt-3">
            <h5 className="font-extrabold text-[10px] uppercase tracking-wider mb-2" style={{ color: accent }}>Education</h5>
            <div className="space-y-2 text-xs">
              {fullData.education.map((edu, idx) => (
                <div key={idx}>
                  <p className="font-bold text-[#252525] leading-tight">{edu.degree}</p>
                  <p className="text-[10px] text-[#6B6B6B]">{edu.institution} ({edu.endYear})</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {fullData.skills?.length > 0 && isFirst && (
          <div className="border-t border-slate-200/80 pt-3">
            <h5 className="font-extrabold text-[10px] uppercase tracking-wider mb-2" style={{ color: accent }}>Competencies</h5>
            <div className="flex flex-wrap gap-1.5">
              {fullData.skills.map((s, idx) => (
                <span key={idx} className="bg-white border border-slate-200 text-[#333] px-2 py-0.5 rounded text-[10px] font-bold shadow-2xs">
                  {s.name || s}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ========================================================================= */
/* LAYOUT 4: PHOTO HEADER PAGE                                              */
/* ========================================================================= */
function PhotoHeaderPage({ pageData, fullData, pageIndex, totalPages }) {
  const { accent, fullName, jobTitle, location, email, phone, photo, initials } = fullData;
  const isFirst = pageIndex === 1;

  return (
    <div className="min-h-[1060px] text-[#252525] flex flex-col">
      {/* Top Banner */}
      {isFirst ? (
        <div className="p-6 sm:p-7 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ backgroundColor: accent }}>
          <div className="flex items-center gap-4">
            {photo ? (
              <img src={photo} alt={fullName} className="w-16 h-16 rounded-full object-cover border-2 border-white/80 shadow-md" />
            ) : (
              <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center font-extrabold text-xl text-white shadow-xs">
                {initials}
              </div>
            )}
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight uppercase leading-none">{fullName}</h1>
              <p className="text-xs font-semibold text-white/90 mt-1">{jobTitle}</p>
            </div>
          </div>
          <div className="text-right text-[11px] text-white/85 space-y-0.5">
            <p>{location}</p>
            <p>{email}</p>
            <p>{phone}</p>
          </div>
        </div>
      ) : (
        <div className="p-3 text-white flex justify-between items-center text-xs px-6" style={{ backgroundColor: accent }}>
          <span className="font-extrabold uppercase">{fullName}</span>
          <span className="text-[10px]">Page {pageIndex} of {totalPages}</span>
        </div>
      )}

      {/* 2-Column Body */}
      <div className="p-6 sm:p-7 grid grid-cols-1 sm:grid-cols-[62%_38%] gap-6 flex-1">
        <div className="space-y-5">
          {pageData.summary && (
            <div>
              <h4 className="font-extrabold text-xs uppercase tracking-wider mb-1.5 pb-0.5 border-b" style={{ borderColor: `${accent}30`, color: accent }}>Profile</h4>
              <p className="text-xs text-[#555] leading-relaxed whitespace-pre-line">{pageData.summary}</p>
            </div>
          )}

          {pageData.experiences.length > 0 && (
            <div>
              <h4 className="font-extrabold text-xs uppercase tracking-wider mb-2 pb-0.5 border-b" style={{ borderColor: `${accent}30`, color: accent }}>
                {isFirst ? "Experience" : "Experience (Continued)"}
              </h4>
              <div className="space-y-3">
                {pageData.experiences.map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline text-xs font-bold text-[#252525]">
                      <span>{exp.role} <span className="font-medium text-[#6B6B6B]">· {exp.company}</span></span>
                      <span className="text-[10px] font-normal text-[#888]">{exp.startMonth} {exp.startYear} - {exp.isCurrent ? "Present" : `${exp.endMonth} ${exp.endYear}`}</span>
                    </div>
                    {exp.description && <p className="mt-1 text-[11px] text-[#555] whitespace-pre-line leading-relaxed">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-5">
          {pageData.education.length > 0 && (
            <div>
              <h4 className="font-extrabold text-xs uppercase tracking-wider mb-2 pb-0.5 border-b" style={{ borderColor: `${accent}30`, color: accent }}>Education</h4>
              <div className="space-y-2">
                {pageData.education.map((edu, idx) => (
                  <div key={idx} className="text-xs">
                    <p className="font-bold text-[#252525]">{edu.degree}</p>
                    <p className="text-[11px] text-[#6B6B6B]">{edu.institution} ({edu.endYear})</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {pageData.skills.length > 0 && (
            <div>
              <h4 className="font-extrabold text-xs uppercase tracking-wider mb-2 pb-0.5 border-b" style={{ borderColor: `${accent}30`, color: accent }}>Expertise</h4>
              <div className="flex flex-wrap gap-1.5">
                {pageData.skills.map((s, idx) => (
                  <span key={idx} className="bg-slate-100 text-[#333] border border-slate-200 px-2 py-0.5 rounded text-[10px] font-semibold">
                    {s.name || s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* LAYOUT 5: TIMELINE PAGE                                                   */
/* ========================================================================= */
function TimelinePage({ pageData, fullData, pageIndex, totalPages }) {
  const { accent, fullName, jobTitle, location, email, phone } = fullData;
  const isFirst = pageIndex === 1;

  return (
    <div className="p-6 sm:p-8 space-y-6 text-[#252525]">
      {isFirst ? (
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b pb-3" style={{ borderColor: `${accent}30` }}>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#252525] tracking-tight">{fullName}</h1>
            <p className="text-xs font-extrabold" style={{ color: accent }}>{jobTitle}</p>
          </div>
          <div className="text-right text-[10px] text-[#6B6B6B] flex gap-3 mt-1 sm:mt-0">
            <span>📍 {location}</span>
            <span>✉️ {email}</span>
            <span>📞 {phone}</span>
          </div>
        </div>
      ) : (
        <div className="border-b pb-2 flex justify-between items-center text-xs" style={{ borderColor: `${accent}30` }}>
          <span className="font-bold text-[#252525]">{fullName} · {jobTitle}</span>
          <span className="text-[10px] text-[#888]">Timeline Page {pageIndex}</span>
        </div>
      )}

      {pageData.summary && (
        <p className="text-xs text-[#555] leading-relaxed italic bg-slate-50 p-3 rounded-xl border border-slate-100">
          "{pageData.summary}"
        </p>
      )}

      {pageData.experiences.length > 0 && (
        <div>
          <h4 className="font-extrabold text-xs uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: accent }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent }} />
            <span>{isFirst ? "Career Milestones" : "Career Milestones (Cont.)"}</span>
          </h4>
          <div className="relative pl-5 border-l-2 ml-1 space-y-4" style={{ borderColor: `${accent}40` }}>
            {pageData.experiences.map((exp, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white shadow-xs" style={{ backgroundColor: accent }} />
                <div className="flex justify-between items-baseline text-xs font-bold text-[#252525]">
                  <span>{exp.role} <span className="font-medium text-[#6B6B6B]">· {exp.company}</span></span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: accent }}>
                    {exp.startYear || "2021"} - {exp.isCurrent ? "Present" : exp.endYear}
                  </span>
                </div>
                {exp.description && <p className="mt-1 text-[11px] text-[#555] whitespace-pre-line leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {pageData.education.length > 0 && (
        <div>
          <h4 className="font-extrabold text-xs uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: accent }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent }} />
            <span>Academic Background</span>
          </h4>
          <div className="relative pl-5 border-l-2 ml-1 space-y-3" style={{ borderColor: `${accent}40` }}>
            {pageData.education.map((edu, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white shadow-xs" style={{ backgroundColor: accent }} />
                <div className="flex justify-between items-baseline text-xs font-bold">
                  <span>{edu.degree} · <span className="font-medium text-[#6B6B6B]">{edu.institution}</span></span>
                  <span className="text-[10px] text-[#888]">{edu.endYear}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ========================================================================= */
/* LAYOUT 6: MINIMALIST PAGE                                                 */
/* ========================================================================= */
function MinimalistPage({ pageData, fullData, pageIndex, totalPages }) {
  const { accent, fullName, jobTitle, location, email, phone } = fullData;
  const isFirst = pageIndex === 1;

  return (
    <div className="p-8 sm:p-10 space-y-6 text-[#252525] font-serif">
      {isFirst ? (
        <div className="text-center border-b pb-4 space-y-1" style={{ borderColor: `${accent}40` }}>
          <h1 className="text-2xl sm:text-3xl font-normal tracking-wide text-[#252525] uppercase">{fullName}</h1>
          <p className="text-xs tracking-widest uppercase font-sans font-bold" style={{ color: accent }}>{jobTitle}</p>
          <p className="text-[10px] font-sans text-[#6B6B6B] tracking-wider mt-1">{location} • {email} • {phone}</p>
        </div>
      ) : (
        <div className="text-center border-b pb-2 font-sans text-xs" style={{ borderColor: `${accent}40` }}>
          <span className="font-bold uppercase tracking-wider">{fullName}</span> · Page {pageIndex}
        </div>
      )}

      {pageData.summary && (
        <div className="space-y-1">
          <h4 className="font-sans font-bold text-[11px] uppercase tracking-widest text-[#252525] border-b pb-0.5">Summary</h4>
          <p className="text-xs text-[#444] leading-relaxed">{pageData.summary}</p>
        </div>
      )}

      {pageData.experiences.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-sans font-bold text-[11px] uppercase tracking-widest text-[#252525] border-b pb-0.5">
            {isFirst ? "Experience" : "Experience (Continued)"}
          </h4>
          <div className="space-y-3 font-sans">
            {pageData.experiences.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline text-xs font-bold">
                  <span>{exp.role}, <span className="font-normal italic">{exp.company}</span></span>
                  <span className="text-[10px] text-[#777]">{exp.startMonth} {exp.startYear} - {exp.isCurrent ? "Present" : `${exp.endMonth} ${exp.endYear}`}</span>
                </div>
                {exp.description && <p className="mt-1 text-[11px] text-[#555] font-serif leading-relaxed whitespace-pre-line">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {pageData.education.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-sans font-bold text-[11px] uppercase tracking-widest text-[#252525] border-b pb-0.5">Education</h4>
          <div className="space-y-1.5 font-sans">
            {pageData.education.map((edu, idx) => (
              <div key={idx} className="flex justify-between text-xs">
                <span><strong className="font-bold">{edu.institution}</strong> — {edu.degree}</span>
                <span className="text-[10px] text-[#777]">{edu.endYear}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ========================================================================= */
/* LAYOUT 7: COLOR BAND PAGE                                                 */
/* ========================================================================= */
function ColorBandPage({ pageData, fullData, pageIndex, totalPages }) {
  const { accent, fullName, jobTitle, location, email, phone } = fullData;
  const isFirst = pageIndex === 1;

  return (
    <div className="min-h-[1060px] text-[#252525] flex flex-col">
      <div className="h-3 w-full" style={{ backgroundColor: accent }} />
      <div className="p-6 sm:p-8 space-y-5 flex-1">
        {isFirst ? (
          <div className="bg-slate-50 border-l-4 p-4 rounded-r-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3" style={{ borderColor: accent }}>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#252525] leading-none uppercase">{fullName}</h1>
              <p className="text-xs font-bold mt-1" style={{ color: accent }}>{jobTitle}</p>
            </div>
            <div className="text-right text-[10px] text-[#6B6B6B]">
              <p>{location}</p>
              <p>{email}</p>
              <p>{phone}</p>
            </div>
          </div>
        ) : (
          <div className="border-b pb-2 flex justify-between items-center text-xs">
            <span className="font-bold uppercase text-[#252525]">{fullName}</span>
            <span className="text-[10px] text-[#888]">Page {pageIndex}</span>
          </div>
        )}

        {pageData.summary && (
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider mb-1" style={{ color: accent }}>Overview</h4>
            <p className="text-xs text-[#555] leading-relaxed">{pageData.summary}</p>
          </div>
        )}

        {pageData.experiences.length > 0 && (
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider mb-2" style={{ color: accent }}>
              {isFirst ? "Work Experience" : "Work Experience (Cont.)"}
            </h4>
            <div className="space-y-3">
              {pageData.experiences.map((exp, idx) => (
                <div key={idx} className="bg-white border border-slate-200/80 p-3 rounded-xl">
                  <div className="flex justify-between items-baseline text-xs font-bold text-[#252525]">
                    <span>{exp.role} · <span className="font-semibold text-[#6B6B6B]">{exp.company}</span></span>
                    <span className="text-[10px] text-[#888]">{exp.startMonth} {exp.startYear} - {exp.isCurrent ? "Present" : `${exp.endMonth} ${exp.endYear}`}</span>
                  </div>
                  {exp.description && <p className="mt-1 text-[11px] text-[#555] leading-relaxed whitespace-pre-line">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {pageData.education.length > 0 && (
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider mb-2" style={{ color: accent }}>Education</h4>
            <div className="space-y-1.5 text-xs">
              {pageData.education.map((edu, idx) => (
                <div key={idx} className="flex justify-between">
                  <span><strong>{edu.institution}</strong> · {edu.degree}</span>
                  <span className="text-[10px] text-[#888]">{edu.endYear}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ========================================================================= */
/* LAYOUT 8: COMPACT TABLE PAGE                                              */
/* ========================================================================= */
function CompactTablePage({ pageData, fullData, pageIndex, totalPages }) {
  const { accent, fullName, jobTitle, location, email, phone } = fullData;
  const isFirst = pageIndex === 1;

  return (
    <div className="p-6 sm:p-7 space-y-4 text-[#252525]">
      {isFirst ? (
        <div className="grid grid-cols-1 sm:grid-cols-[60%_40%] border-2 rounded-xl overflow-hidden" style={{ borderColor: accent }}>
          <div className="p-3 bg-slate-50">
            <h1 className="text-lg sm:text-xl font-extrabold uppercase text-[#252525]">{fullName}</h1>
            <p className="text-xs font-bold" style={{ color: accent }}>{jobTitle}</p>
          </div>
          <div className="p-3 text-[10px] text-white flex flex-col justify-center" style={{ backgroundColor: accent }}>
            <p>{location}</p>
            <p className="truncate">{email}</p>
            <p>{phone}</p>
          </div>
        </div>
      ) : (
        <div className="border-b pb-2 flex justify-between text-xs">
          <span className="font-bold uppercase text-[#252525]">{fullName}</span>
          <span className="text-[10px] text-[#888]">Page {pageIndex}</span>
        </div>
      )}

      {pageData.summary && (
        <div className="text-xs text-[#555] bg-slate-50/70 p-2.5 rounded-lg border border-slate-200/80">
          {pageData.summary}
        </div>
      )}

      {pageData.experiences.length > 0 && (
        <div>
          <h4 className="font-extrabold text-xs uppercase tracking-wider mb-2" style={{ color: accent }}>Experience Record</h4>
          <div className="grid grid-cols-1 gap-2.5">
            {pageData.experiences.map((exp, idx) => (
              <div key={idx} className="border border-slate-200 rounded-lg p-2.5 text-xs">
                <div className="flex justify-between font-bold text-[#252525]">
                  <span>{exp.role} · {exp.company}</span>
                  <span className="text-[10px] text-[#888]">{exp.startYear} - {exp.isCurrent ? "Present" : exp.endYear}</span>
                </div>
                {exp.description && <p className="mt-1 text-[11px] text-[#555] leading-relaxed whitespace-pre-line">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ========================================================================= */
/* LAYOUT 9: CREATIVE ACCENT PAGE                                            */
/* ========================================================================= */
function CreativeAccentPage({ pageData, fullData, pageIndex, totalPages }) {
  const { accent, fullName, jobTitle, location, email, phone } = fullData;
  const isFirst = pageIndex === 1;

  return (
    <div className="p-6 sm:p-8 space-y-5 text-[#252525]">
      {isFirst ? (
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded text-white font-bold" style={{ backgroundColor: accent }}>
              {"<Resume />"}
            </span>
            <span className="text-xs text-[#888] font-mono">// verified profile</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">{fullName}</h1>
          <p className="text-xs font-bold mt-0.5" style={{ color: accent }}>{jobTitle} · {location}</p>
          <p className="text-[11px] text-[#6B6B6B] mt-0.5">{email} | {phone}</p>
        </div>
      ) : (
        <div className="border-b pb-2 flex justify-between text-xs font-mono">
          <span>// {fullName} · {jobTitle}</span>
          <span className="text-[10px] text-[#888]">Page {pageIndex}</span>
        </div>
      )}

      {pageData.summary && (
        <div className="p-3.5 rounded-xl border border-dashed" style={{ borderColor: accent, backgroundColor: `${accent}08` }}>
          <p className="text-xs text-[#444] leading-relaxed font-sans">{pageData.summary}</p>
        </div>
      )}

      {pageData.experiences.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>// WORK EXPERIENCE</h4>
          <div className="space-y-3">
            {pageData.experiences.map((exp, idx) => (
              <div key={idx} className="p-3 bg-white border border-slate-200 rounded-xl shadow-2xs">
                <div className="flex justify-between font-bold text-xs">
                  <span>{exp.role} <span className="text-[#888]">@ {exp.company}</span></span>
                  <span className="font-mono text-[10px] text-[#888]">{exp.startYear} - {exp.isCurrent ? "NOW" : exp.endYear}</span>
                </div>
                {exp.description && <p className="mt-1 text-[11px] text-[#555] leading-relaxed whitespace-pre-line">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ========================================================================= */
/* LAYOUT 10: DARK SIDEBAR PAGE                                              */
/* ========================================================================= */
function DarkSidebarPage({ pageData, fullData, pageIndex, totalPages }) {
  const { accent, fullName, jobTitle, location, email, phone, photo, initials } = fullData;
  const isFirst = pageIndex === 1;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[32%_68%] min-h-[1060px] h-full w-full text-[#252525]">
      {/* Dark Sidebar */}
      <div className="p-6 bg-[#18181B] text-white flex flex-col justify-between space-y-6">
        <div className="space-y-5">
          {isFirst ? (
            <>
              {photo ? (
                <img src={photo} alt={fullName} className="w-16 h-16 rounded-full object-cover border-2 shadow-sm" style={{ borderColor: accent }} />
              ) : (
                <div className="w-14 h-14 rounded-full bg-white/10 border-2 flex items-center justify-center font-extrabold text-lg text-white shadow-xs" style={{ borderColor: accent }}>
                  {initials}
                </div>
              )}

              <div>
                <h2 className="font-extrabold text-base sm:text-lg leading-tight text-white">{fullName}</h2>
                <p className="text-xs mt-0.5 font-bold" style={{ color: accent }}>{jobTitle}</p>
              </div>

              <div className="space-y-1.5 text-[11px] text-white/70 border-t border-white/10 pt-3">
                <p>📍 {location}</p>
                <p className="truncate">✉️ {email}</p>
                <p>📞 {phone}</p>
              </div>
            </>
          ) : (
            <div className="border-b border-white/10 pb-3">
              <span className="font-extrabold text-sm text-white block">{fullName}</span>
              <span className="text-[10px] text-white/70">Page {pageIndex}</span>
            </div>
          )}

          {fullData.skills?.length > 0 && isFirst && (
            <div className="border-t border-white/10 pt-3">
              <h5 className="font-extrabold text-[10px] uppercase tracking-wider text-white/80 mb-2">Core Skills</h5>
              <div className="space-y-1 text-[11px] text-white/90">
                {fullData.skills.map((s, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
                    <span className="truncate">{s.name || s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main White Body */}
      <div className="p-6 sm:p-7 space-y-5 bg-white flex-1">
        {pageData.summary && (
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider mb-1.5 pb-0.5 border-b" style={{ borderColor: `${accent}30`, color: accent }}>Profile</h4>
            <p className="text-xs text-[#555] leading-relaxed whitespace-pre-line">{pageData.summary}</p>
          </div>
        )}

        {pageData.experiences.length > 0 && (
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider mb-2 pb-0.5 border-b" style={{ borderColor: `${accent}30`, color: accent }}>
              {isFirst ? "Career History" : "Career History (Cont.)"}
            </h4>
            <div className="space-y-3">
              {pageData.experiences.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline text-xs font-bold text-[#252525]">
                    <span>{exp.role} <span className="font-medium text-[#6B6B6B]">· {exp.company}</span></span>
                    <span className="text-[10px] font-normal text-[#888]">{exp.startMonth} {exp.startYear} - {exp.isCurrent ? "Present" : `${exp.endMonth} ${exp.endYear}`}</span>
                  </div>
                  {exp.description && <p className="mt-1 text-[11px] text-[#555] whitespace-pre-line leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {pageData.education.length > 0 && (
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider mb-2 pb-0.5 border-b" style={{ borderColor: `${accent}30`, color: accent }}>Education</h4>
            <div className="space-y-2">
              {pageData.education.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-baseline text-xs">
                  <div>
                    <span className="font-bold text-[#252525]">{edu.institution}</span>
                    <p className="text-[11px] text-[#6B6B6B]">{edu.degree}</p>
                  </div>
                  <span className="text-[10px] text-[#888]">{edu.endYear}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Dispatches a single page to its matching layout template renderer
 */
function renderLayoutPage(layoutStyle, pageData, fullData, pageIndex, totalPages) {
  const props = { pageData, fullData, pageIndex, totalPages };
  switch (layoutStyle) {
    case "sidebar-left":
      return <SidebarLeftPage {...props} />;
    case "sidebar-right":
      return <SidebarRightPage {...props} />;
    case "photo-header":
    case "header-banner":
      return <PhotoHeaderPage {...props} />;
    case "timeline":
      return <TimelinePage {...props} />;
    case "minimalist":
    case "classic-serif":
      return <MinimalistPage {...props} />;
    case "color-band":
      return <ColorBandPage {...props} />;
    case "compact-table":
    case "dense-grid":
      return <CompactTablePage {...props} />;
    case "creative-accent":
    case "single-column-code":
      return <CreativeAccentPage {...props} />;
    case "dark-sidebar":
      return <DarkSidebarPage {...props} />;
    case "single-column":
    default:
      return <SingleColumnPage {...props} />;
  }
}

/* ========================================================================= */
/* MASTER MULTI-PAGE DISPATCHER: LiveResumeDocument                          */
/* ========================================================================= */
export default function LiveResumeDocument({ resume, template, customAccent, onPageCountChange }) {
  const normalizedData = useNormalizedResume(resume, template, customAccent);
  const layoutStyle = template?.layoutStyle || "single-column";

  // Calculate A4 pagination distribution
  const pages = useMemo(() => {
    return paginateResumeData(normalizedData, layoutStyle);
  }, [normalizedData, layoutStyle]);

  // Synchronize total page count with parent (e.g. BuilderPage indicator)
  React.useEffect(() => {
    if (onPageCountChange) {
      onPageCountChange(pages.length);
    }
  }, [pages.length, onPageCountChange]);

  return (
    <div className="w-full flex flex-col items-center space-y-4 sm:space-y-8 pb-8 motion-safe:transition-all">
      {pages.map((pageData, idx) => (
        <div
          key={idx}
          className="w-full max-w-[800px] min-w-0 min-h-[850px] sm:min-h-[1123px] sm:h-[1123px] bg-white rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.09)] border border-slate-200/90 overflow-hidden flex flex-col justify-between relative shrink-0 transition-all duration-300 select-text"
        >
          {/* Main Page Content */}
          <div className="flex-1 overflow-hidden">
            {renderLayoutPage(layoutStyle, pageData, normalizedData, idx + 1, pages.length)}
          </div>

          {/* Clean A4 Page Bottom Stamp */}
          <div className="px-6 py-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-bold bg-white shrink-0 select-none">
            <span className="truncate max-w-[70%]">
              {normalizedData.fullName} · {normalizedData.jobTitle}
            </span>
            <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-extrabold">
              Page {idx + 1} of {pages.length}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
