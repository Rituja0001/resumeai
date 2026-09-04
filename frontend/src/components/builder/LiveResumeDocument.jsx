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
  Languages as LangIcon,
  CheckCircle2,
  Calendar,
  ExternalLink,
  Heart,
  Code,
} from "lucide-react";

/**
 * Format resume date range reliably avoiding Present + Year bugs
 */
export function formatResumeDateRange(startMonth, startYear, endMonth, endYear, isCurrent) {
  const sm = (startMonth || "").replace(/present/i, "").trim();
  const sy = (startYear || "").replace(/present/i, "").trim();
  const startStr = `${sm} ${sy}`.trim();

  if (isCurrent) {
    return startStr ? `${startStr} - Present` : "Present";
  }

  const em = (endMonth || "").replace(/present/i, "").trim();
  const ey = (endYear || "").replace(/present/i, "").trim();
  const endStr = em === ey || !em ? ey : `${em} ${ey}`.trim();

  if (startStr && endStr) {
    return `${startStr} - ${endStr}`;
  }
  return startStr || endStr || "";
}

/**
 * Normalizes resume data for document rendering
 */
function useNormalizedResume(resume, template, customAccent, isSamplePreview = false) {
  const accent = customAccent || resume?.accentColor || template?.accentColor || "#FA0C40";
  const isSample = isSamplePreview || (!resume && Boolean(template));

  const firstName = resume?.personalDetails?.firstName || "";
  const lastName = resume?.personalDetails?.lastName || "";
  const fullName = (firstName || lastName)
    ? `${firstName} ${lastName}`.trim()
    : isSample
    ? (template?.sampleName || "YOUR NAME")
    : "YOUR NAME";

  const jobTitle = resume?.personalDetails?.jobTitle || (isSample ? (template?.sampleRole || "") : "");
  const city = resume?.personalDetails?.city || (isSample ? (template?.sampleLocation?.split(",")?.[0] || "") : "");
  const country = resume?.personalDetails?.country || "India";
  const location = [city, country].filter(Boolean).join(", ");
  const email = resume?.personalDetails?.email || (isSample ? (template?.sampleEmail || "") : "");
  const phone = resume?.personalDetails?.phone || (isSample ? (template?.samplePhone || "") : "");
  const photo = resume?.personalDetails?.photo || null;
  const summary = resume?.professional_summary || (isSample ? (template?.sampleSummary || "") : "");

  // Filter out completely blank experiences
  const validUserExperiences = (resume?.experiences || []).filter(
    (exp) => (exp.role && exp.role.trim()) || (exp.company && exp.company.trim()) || (exp.description && exp.description.trim())
  );
  const experiences = validUserExperiences.length > 0
    ? validUserExperiences
    : isSample
    ? (template?.sampleExperience || []).map((exp, i) => ({
        id: i,
        role: exp.role,
        company: exp.company,
        city: "",
        startMonth: exp.duration?.split("-")?.[0]?.trim() || "Jun",
        startYear: "2021",
        endMonth: exp.duration?.split("-")?.[1]?.trim() || "Present",
        endYear: "2024",
        isCurrent: exp.duration?.includes("Present") || false,
        description: exp.bullets ? exp.bullets.map((b) => `• ${b}`).join("\n") : "",
      }))
    : [];

  // Filter out blank education
  const validUserEdu = (resume?.education || []).filter(
    (edu) => (edu.institution && edu.institution.trim()) || (edu.degree && edu.degree.trim()) || (edu.description && edu.description.trim())
  );
  const education = validUserEdu.length > 0
    ? validUserEdu
    : isSample
    ? (template?.sampleEducation || []).map((edu, i) => ({
        id: i,
        institution: edu.institution,
        degree: edu.degree,
        city: "",
        marksType: "CGPA",
        marks: "",
        startYear: "2017",
        endYear: edu.year || "2021",
        isCurrent: false,
        description: edu.description || "",
      }))
    : [];

  // Filter out blank skills
  const validUserSkills = (resume?.skills || []).filter(
    (s) => (typeof s === "string" ? s.trim() : s?.name && s.name.trim())
  );
  const skills = validUserSkills.length > 0
    ? validUserSkills
    : isSample
    ? (template?.sampleSkills || []).map((s, i) => ({
        id: i,
        name: typeof s === "string" ? s : s.name,
        level: 4,
      }))
    : [];

  // Filter out blank projects
  const validUserProjects = (resume?.additionalSections?.projects || []).filter(
    (p) => (p.title && p.title.trim()) || (p.description && p.description.trim())
  );
  const projects = validUserProjects.length > 0
    ? validUserProjects
    : isSample
    ? (template?.sampleProjects || [])
    : [];

  // Filter out blank languages
  const validUserLanguages = (resume?.additionalSections?.languages || []).filter(
    (l) => l.name && l.name.trim()
  );
  const languages = validUserLanguages.length > 0
    ? validUserLanguages
    : isSample
    ? (template?.sampleLanguages || [])
    : [];

  const socialLinks = (resume?.socialLinks || []).filter((l) => l.url && l.url.trim());
  const hobbies = resume?.hobbies || (isSample ? (template?.sampleHobbies || "") : "");

  const initials = fullName
    ? fullName.split(" ").filter(Boolean).map((n) => n[0]).join("").slice(0, 2).toUpperCase()
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
    hideSkillLevel: resume?.hideSkillLevel || false,
    socialLinks,
    hobbies,
    projects,
    languages,
  };
}

/**
 * Text height estimation helper for A4 paging (calibrated for standard A4 794x1123 aspect ratio)
 */
function estimateTextHeight(text, charsPerLine = 90, lineHeightPx = 16) {
  if (!text) return 0;
  const lines = text.split("\n").reduce((acc, line) => {
    return acc + Math.max(1, Math.ceil((line.length || 1) / charsPerLine));
  }, 0);
  return lines * lineHeightPx;
}

function estimateExpHeight(exp) {
  const base = 28;
  const descHeight = estimateTextHeight(exp.description, 85, 16);
  return Math.max(38, base + descHeight);
}

function estimateEduHeight(edu) {
  const base = 24;
  const descHeight = estimateTextHeight(edu.description, 85, 15);
  return Math.max(32, base + descHeight);
}

function estimateProjHeight(proj) {
  const base = 26;
  const descHeight = estimateTextHeight(proj.description, 85, 16);
  return Math.max(34, base + descHeight);
}

/**
 * Robust A4 multi-page pagination algorithm
 * Distributes sections and entry cards across distinct A4 page sheets without premature splits.
 */
function paginateResumeData(data, layoutStyle) {
  const isSidebarLayout = ["sidebar-left", "sidebar-right", "dark-sidebar"].includes(layoutStyle);
  const isPhotoHeader = ["photo-header", "header-banner"].includes(layoutStyle);

  // Usable vertical budget inside an A4 sheet (1123px total)
  const PAGE_1_CAPACITY = isSidebarLayout ? 940 : isPhotoHeader ? 900 : 960;
  const PAGE_N_CAPACITY = 1000;

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
    const summaryH = 30 + estimateTextHeight(data.summary, 90, 16);
    currentPage.summary = data.summary;
    currentUsed += summaryH;
  }

  // 2. Work Experiences
  if (data.experiences && data.experiences.length > 0) {
    const sectionHeaderH = 28;
    currentUsed += sectionHeaderH;

    for (const exp of data.experiences) {
      const expH = estimateExpHeight(exp);
      if (currentUsed + expH > currentCapacity && currentPage.experiences.length > 0) {
        pushAndStartNewPage();
      }
      currentPage.experiences.push(exp);
      currentUsed += expH + 8;
    }
  }

  // 3. Education
  if (data.education && data.education.length > 0) {
    const eduSectionHeaderH = 26;
    currentUsed += eduSectionHeaderH;

    for (const edu of data.education) {
      const eduH = estimateEduHeight(edu);
      if (currentUsed + eduH > currentCapacity && (currentPage.education.length > 0 || currentPage.experiences.length > 0)) {
        pushAndStartNewPage();
      }
      currentPage.education.push(edu);
      currentUsed += eduH + 8;
    }
  }

  // 4. Skills (for main column layouts)
  if (!isSidebarLayout && data.skills && data.skills.length > 0) {
    const skillsH = 26 + Math.ceil(data.skills.length / 5) * 22;
    if (currentUsed + skillsH > currentCapacity && currentUsed > 400) {
      pushAndStartNewPage();
    }
    currentPage.skills = data.skills;
    currentUsed += skillsH + 8;
  }

  // 5. Projects
  if (data.projects && data.projects.length > 0) {
    const projHeaderH = 26;
    currentUsed += projHeaderH;

    for (const proj of data.projects) {
      const projH = estimateProjHeight(proj);
      if (currentUsed + projH > currentCapacity && (currentPage.projects.length > 0 || currentPage.education.length > 0)) {
        pushAndStartNewPage();
      }
      currentPage.projects.push(proj);
      currentUsed += projH + 8;
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
    // Sidebar layouts have skills/languages/links/hobbies in the sidebar
    currentPage.skills = data.skills;
    currentPage.languages = data.languages;
    currentPage.socialLinks = data.socialLinks;
    currentPage.hobbies = data.hobbies;
  }

  pages.push(currentPage);
  return pages;
}

/* ========================================================================= */
/* LAYOUT 1: SINGLE COLUMN PAGE (Clean Executive Modern)                     */
/* ========================================================================= */
function SingleColumnPage({ pageData, fullData, pageIndex, totalPages }) {
  const { accent, fullName, jobTitle, location, email, phone, photo, hideSkillLevel } = fullData;
  const isFirst = pageIndex === 1;

  return (
    <div className="p-6 sm:p-8 space-y-4 text-[#252525]">
      {/* Header */}
      {isFirst ? (
        <div className="border-b-2 pb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4" style={{ borderColor: accent }}>
          <div className="flex items-start gap-3.5">
            {photo && <img src={photo} alt={fullName} className="w-14 h-14 rounded-full object-cover border-2 shrink-0 shadow-xs" style={{ borderColor: accent }} />}
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#252525] tracking-tight uppercase leading-none">{fullName}</h1>
              <p className="text-xs font-bold mt-1" style={{ color: accent }}>{jobTitle}</p>
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-right text-[10px] text-[#6B6B6B] min-w-[140px] space-y-0.5">
            <p className="font-extrabold text-[9px] uppercase tracking-wider text-[#252525] border-b border-slate-200 pb-0.5 mb-1">Contact</p>
            {location && <p>{location}</p>}
            {email && <p className="truncate">{email}</p>}
            {phone && <p>{phone}</p>}
          </div>
        </div>
      ) : (
        <div className="border-b pb-2 flex items-center justify-between text-xs" style={{ borderColor: `${accent}40` }}>
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
          <h4 className="font-extrabold text-xs uppercase tracking-wider mb-1 pb-0.5 border-b border-slate-100" style={{ color: accent }}>Professional Summary</h4>
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
                  <span className="text-[10px] font-normal text-[#888]">{formatResumeDateRange(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.isCurrent)}</span>
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
              <div key={idx} className="text-xs">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-[#252525]">{edu.institution}</span>
                    <p className="text-[11px] text-[#6B6B6B]">{edu.degree} {edu.marks ? `· ${edu.marksType}: ${edu.marks}` : ""}</p>
                  </div>
                  <span className="text-[10px] text-[#888]">{edu.startYear ? `${edu.startYear} - ` : ""}{edu.isCurrent ? "Present" : edu.endYear}</span>
                </div>
                {edu.description && (
                  <p className="text-[10.5px] text-[#666] mt-0.5 whitespace-pre-line leading-relaxed italic bg-slate-50/60 p-1.5 rounded border border-slate-100">
                    {edu.description}
                  </p>
                )}
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
                  {p.link && <span className="text-[10px]" style={{ color: accent }}>{p.link.replace(/^https?:\/\//, "")}</span>}
                </div>
                {p.description && <p className="text-[11px] text-[#555] mt-0.5 leading-relaxed">{p.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages, Hobbies & Links */}
      {(pageData.languages?.length > 0 || pageData.socialLinks?.length > 0 || pageData.hobbies) && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-100 pt-3 text-[10px]">
          {pageData.languages?.length > 0 && (
            <div>
              <span className="font-bold text-[#252525] block mb-0.5">Languages:</span>
              <p className="text-[#666]">{pageData.languages.map((l) => `${l.name} (${l.proficiency})`).join(" · ")}</p>
            </div>
          )}
          {pageData.socialLinks?.length > 0 && (
            <div>
              <span className="font-bold text-[#252525] block mb-0.5">Links:</span>
              <p className="text-[#666] truncate">{pageData.socialLinks.map((l) => `${l.label}: ${l.url?.replace(/^https?:\/\//, "")}`).join(" · ")}</p>
            </div>
          )}
          {pageData.hobbies && (
            <div>
              <span className="font-bold text-[#252525] block mb-0.5">Interests:</span>
              <p className="text-[#666]">{pageData.hobbies}</p>
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
      <div className="p-6 text-white flex flex-col justify-between space-y-5" style={{ backgroundColor: accent }}>
        <div className="space-y-4">
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
                {location && <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 shrink-0 text-white/70" /> <span>{location}</span></p>}
                {email && <p className="flex items-center gap-1.5 truncate"><Mail className="w-3.5 h-3.5 shrink-0 text-white/70" /> <span className="truncate">{email}</span></p>}
                {phone && <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 shrink-0 text-white/70" /> <span>{phone}</span></p>}
              </div>

              {/* Social Links in Sidebar */}
              {fullData.socialLinks?.length > 0 && (
                <div className="border-t border-white/20 pt-2 text-[10px] text-white/80 space-y-1">
                  <p className="font-extrabold uppercase text-[9px] text-white/90">Links</p>
                  {fullData.socialLinks.map((l, idx) => (
                    <p key={idx} className="truncate">
                      <span className="font-bold">{l.label}:</span> {l.url?.replace(/^https?:\/\//, "")}
                    </p>
                  ))}
                </div>
              )}
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
            <div className="border-t border-white/20 pt-2 text-[11px] text-white/80">
              <h5 className="font-extrabold text-[10px] uppercase tracking-wider text-white/90 mb-1">Languages</h5>
              <div className="space-y-0.5 text-[10px]">
                {fullData.languages.map((l, idx) => (
                  <p key={idx} className="flex justify-between"><span>{l.name}</span> <span className="text-white/60">{l.proficiency}</span></p>
                ))}
              </div>
            </div>
          )}

          {/* Hobbies in Sidebar */}
          {fullData.hobbies && isFirst && (
            <div className="border-t border-white/20 pt-2 text-[10px] text-white/80">
              <h5 className="font-extrabold uppercase text-[9px] text-white/90 mb-1">Interests</h5>
              <p>{fullData.hobbies}</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Main Body */}
      <div className="p-6 sm:p-7 space-y-4 bg-white flex-1">
        {pageData.summary && (
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider mb-1 pb-0.5 border-b" style={{ borderColor: `${accent}30`, color: accent }}>About Me</h4>
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
                    <span className="text-[10px] font-normal text-[#888]">{formatResumeDateRange(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.isCurrent)}</span>
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
                <div key={idx} className="text-xs">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <span className="font-bold text-[#252525]">{edu.institution}</span>
                      <p className="text-[11px] text-[#6B6B6B]">{edu.degree} {edu.marks ? `· ${edu.marksType}: ${edu.marks}` : ""}</p>
                    </div>
                    <span className="text-[10px] text-[#888]">{edu.startYear ? `${edu.startYear} - ` : ""}{edu.isCurrent ? "Present" : edu.endYear}</span>
                  </div>
                  {edu.description && <p className="text-[10.5px] text-[#666] mt-0.5 italic">{edu.description}</p>}
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
  const { accent, fullName, jobTitle, location, email, phone, hideSkillLevel } = fullData;
  const isFirst = pageIndex === 1;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[68%_32%] min-h-[1060px] h-full w-full text-[#252525]">
      {/* Left Main Body */}
      <div className="p-6 sm:p-7 space-y-4 bg-white sm:border-r border-slate-100 flex-1">
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
            <h4 className="font-extrabold text-xs uppercase tracking-wider mb-1 pb-0.5 border-b border-slate-100" style={{ color: accent }}>Executive Profile</h4>
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
                    <span className="text-[10px] font-normal text-[#888]">{formatResumeDateRange(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.isCurrent)}</span>
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
      <div className="p-5 sm:p-6 space-y-4" style={{ backgroundColor: `${accent}0A` }}>
        {isFirst && (
          <div className="space-y-1 text-[11px] text-[#555]">
            <h5 className="font-extrabold text-[10px] uppercase tracking-wider mb-2" style={{ color: accent }}>Contact</h5>
            {location && <p>📍 {location}</p>}
            {email && <p className="truncate">✉️ {email}</p>}
            {phone && <p>📞 {phone}</p>}
          </div>
        )}

        {/* Education in Sidebar */}
        {fullData.education?.length > 0 && isFirst && (
          <div className="border-t border-slate-200/80 pt-3">
            <h5 className="font-extrabold text-[10px] uppercase tracking-wider mb-2" style={{ color: accent }}>Education</h5>
            <div className="space-y-2 text-xs">
              {fullData.education.map((edu, idx) => (
                <div key={idx}>
                  <p className="font-bold text-[#252525] leading-tight">{edu.degree}</p>
                  <p className="text-[10px] text-[#6B6B6B]">{edu.institution} ({edu.endYear})</p>
                  {edu.description && <p className="text-[9.5px] text-[#777] mt-0.5 italic">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
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

        {/* Languages & Links in Sidebar */}
        {fullData.languages?.length > 0 && isFirst && (
          <div className="border-t border-slate-200/80 pt-3 text-[10px]">
            <h5 className="font-extrabold uppercase mb-1" style={{ color: accent }}>Languages</h5>
            <p className="text-[#555]">{fullData.languages.map((l) => `${l.name} (${l.proficiency})`).join(", ")}</p>
          </div>
        )}

        {fullData.socialLinks?.length > 0 && isFirst && (
          <div className="border-t border-slate-200/80 pt-3 text-[10px]">
            <h5 className="font-extrabold uppercase mb-1" style={{ color: accent }}>Links</h5>
            {fullData.socialLinks.map((l, idx) => (
              <p key={idx} className="truncate text-[#555]">{l.label}: {l.url?.replace(/^https?:\/\//, "")}</p>
            ))}
          </div>
        )}

        {fullData.hobbies && isFirst && (
          <div className="border-t border-slate-200/80 pt-3 text-[10px]">
            <h5 className="font-extrabold uppercase mb-1" style={{ color: accent }}>Interests</h5>
            <p className="text-[#555]">{fullData.hobbies}</p>
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
            {location && <p>{location}</p>}
            {email && <p>{email}</p>}
            {phone && <p>{phone}</p>}
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
        <div className="space-y-4">
          {pageData.summary && (
            <div>
              <h4 className="font-extrabold text-xs uppercase tracking-wider mb-1 pb-0.5 border-b" style={{ borderColor: `${accent}30`, color: accent }}>Profile</h4>
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
                      <span className="text-[10px] font-normal text-[#888]">{formatResumeDateRange(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.isCurrent)}</span>
                    </div>
                    {exp.description && <p className="mt-1 text-[11px] text-[#555] whitespace-pre-line leading-relaxed">{exp.description}</p>}
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

        <div className="space-y-4">
          {pageData.education.length > 0 && (
            <div>
              <h4 className="font-extrabold text-xs uppercase tracking-wider mb-2 pb-0.5 border-b" style={{ borderColor: `${accent}30`, color: accent }}>Education</h4>
              <div className="space-y-2">
                {pageData.education.map((edu, idx) => (
                  <div key={idx} className="text-xs">
                    <p className="font-bold text-[#252525]">{edu.degree}</p>
                    <p className="text-[11px] text-[#6B6B6B]">{edu.institution} ({edu.endYear})</p>
                    {edu.description && <p className="text-[10px] text-[#777] mt-0.5 italic">{edu.description}</p>}
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

          {/* Languages, Links & Hobbies */}
          {fullData.languages?.length > 0 && (
            <div className="text-[10px]">
              <h5 className="font-extrabold uppercase mb-1" style={{ color: accent }}>Languages</h5>
              <p className="text-[#555]">{fullData.languages.map((l) => `${l.name} (${l.proficiency})`).join(", ")}</p>
            </div>
          )}

          {fullData.socialLinks?.length > 0 && (
            <div className="text-[10px]">
              <h5 className="font-extrabold uppercase mb-1" style={{ color: accent }}>Links</h5>
              {fullData.socialLinks.map((l, idx) => (
                <p key={idx} className="truncate text-[#555]">{l.label}: {l.url?.replace(/^https?:\/\//, "")}</p>
              ))}
            </div>
          )}

          {fullData.hobbies && (
            <div className="text-[10px]">
              <h5 className="font-extrabold uppercase mb-1" style={{ color: accent }}>Interests</h5>
              <p className="text-[#555]">{fullData.hobbies}</p>
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
    <div className="p-6 sm:p-8 space-y-5 text-[#252525]">
      {isFirst ? (
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b pb-3" style={{ borderColor: `${accent}30` }}>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#252525] tracking-tight">{fullName}</h1>
            <p className="text-xs font-extrabold" style={{ color: accent }}>{jobTitle}</p>
          </div>
          <div className="text-right text-[10px] text-[#6B6B6B] flex gap-3 mt-1 sm:mt-0">
            {location && <span>📍 {location}</span>}
            {email && <span>✉️ {email}</span>}
            {phone && <span>📞 {phone}</span>}
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
          <div className="relative pl-5 border-l-2 ml-1 space-y-3" style={{ borderColor: `${accent}40` }}>
            {pageData.experiences.map((exp, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white shadow-xs" style={{ backgroundColor: accent }} />
                <div className="flex justify-between items-baseline text-xs font-bold text-[#252525]">
                  <span>{exp.role} <span className="font-medium text-[#6B6B6B]">· {exp.company}</span></span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: accent }}>
                    {formatResumeDateRange(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.isCurrent)}
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
                {edu.description && <p className="text-[10.5px] text-[#777] mt-0.5 italic">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills in Timeline */}
      {pageData.skills.length > 0 && (
        <div>
          <h4 className="font-extrabold text-xs uppercase tracking-wider mb-2" style={{ color: accent }}>Competencies</h4>
          <div className="flex flex-wrap gap-1.5">
            {pageData.skills.map((s, idx) => (
              <span key={idx} className="bg-slate-100 text-[#333] px-2.5 py-0.5 rounded-md text-[10px] font-bold border border-slate-200">
                {s.name || s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {pageData.projects.length > 0 && (
        <div>
          <h4 className="font-extrabold text-xs uppercase tracking-wider mb-2" style={{ color: accent }}>Projects</h4>
          <div className="space-y-2">
            {pageData.projects.map((p, idx) => (
              <div key={idx} className="text-xs">
                <span className="font-bold">{p.title}</span> <span className="text-[#888] text-[10px]">({p.techStack})</span>
                {p.description && <p className="text-[11px] text-[#555] mt-0.5">{p.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Info */}
      {(pageData.languages?.length > 0 || pageData.socialLinks?.length > 0 || pageData.hobbies) && (
        <div className="border-t border-slate-100 pt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px] text-[#666]">
          {pageData.languages?.length > 0 && <p><b>Languages:</b> {pageData.languages.map((l) => l.name).join(", ")}</p>}
          {pageData.socialLinks?.length > 0 && <p className="truncate"><b>Links:</b> {pageData.socialLinks.map((l) => l.label).join(", ")}</p>}
          {pageData.hobbies && <p><b>Interests:</b> {pageData.hobbies}</p>}
        </div>
      )}
    </div>
  );
}

/* ========================================================================= */
/* LAYOUT 6: MINIMALIST PAGE (Classic Serif Typography)                      */
/* ========================================================================= */
function MinimalistPage({ pageData, fullData, pageIndex, totalPages }) {
  const { accent, fullName, jobTitle, location, email, phone } = fullData;
  const isFirst = pageIndex === 1;

  return (
    <div className="p-8 sm:p-10 space-y-5 text-[#252525] font-serif">
      {isFirst ? (
        <div className="text-center border-b pb-4 space-y-1" style={{ borderColor: `${accent}40` }}>
          <h1 className="text-2xl sm:text-3xl font-normal tracking-wide text-[#252525] uppercase">{fullName}</h1>
          <p className="text-xs tracking-widest uppercase font-sans font-bold" style={{ color: accent }}>{jobTitle}</p>
          <p className="text-[10px] font-sans text-[#6B6B6B] tracking-wider mt-1">{[location, email, phone].filter(Boolean).join(" • ")}</p>
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
                  <span className="text-[10px] text-[#777]">{formatResumeDateRange(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.isCurrent)}</span>
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
              <div key={idx} className="text-xs">
                <div className="flex justify-between">
                  <span><strong className="font-bold">{edu.institution}</strong> — {edu.degree}</span>
                  <span className="text-[10px] text-[#777]">{edu.endYear}</span>
                </div>
                {edu.description && <p className="text-[10.5px] text-[#666] font-serif italic mt-0.5">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {pageData.skills.length > 0 && (
        <div className="space-y-1.5">
          <h4 className="font-sans font-bold text-[11px] uppercase tracking-widest text-[#252525] border-b pb-0.5">Skills</h4>
          <p className="font-sans text-xs text-[#555]">{pageData.skills.map((s) => s.name || s).join(" • ")}</p>
        </div>
      )}

      {pageData.projects.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-sans font-bold text-[11px] uppercase tracking-widest text-[#252525] border-b pb-0.5">Projects</h4>
          <div className="space-y-1.5 font-sans text-xs">
            {pageData.projects.map((p, idx) => (
              <div key={idx}>
                <span className="font-bold">{p.title}</span> <span className="text-[10px] text-[#888]">({p.techStack})</span>
                {p.description && <p className="text-[11px] font-serif text-[#555]">{p.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {(pageData.languages?.length > 0 || pageData.socialLinks?.length > 0 || pageData.hobbies) && (
        <div className="font-sans text-[10px] text-[#777] border-t pt-2 space-y-0.5">
          {pageData.languages?.length > 0 && <p><b>Languages:</b> {pageData.languages.map((l) => l.name).join(", ")}</p>}
          {pageData.socialLinks?.length > 0 && <p><b>Links:</b> {pageData.socialLinks.map((l) => `${l.label}: ${l.url?.replace(/^https?:\/\//, "")}`).join(" | ")}</p>}
          {pageData.hobbies && <p><b>Interests:</b> {pageData.hobbies}</p>}
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
      <div className="h-3.5 w-full" style={{ backgroundColor: accent }} />
      <div className="p-6 sm:p-8 space-y-4 flex-1">
        {isFirst ? (
          <div className="bg-slate-50 border-l-4 p-4 rounded-r-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3" style={{ borderColor: accent }}>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#252525] leading-none uppercase">{fullName}</h1>
              <p className="text-xs font-bold mt-1" style={{ color: accent }}>{jobTitle}</p>
            </div>
            <div className="text-right text-[10px] text-[#6B6B6B]">
              {location && <p>{location}</p>}
              {email && <p>{email}</p>}
              {phone && <p>{phone}</p>}
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
                    <span className="text-[10px] text-[#888]">{formatResumeDateRange(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.isCurrent)}</span>
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
                <div key={idx} className="bg-slate-50/70 border border-slate-200/60 p-2 rounded-lg">
                  <div className="flex justify-between">
                    <span><strong>{edu.institution}</strong> · {edu.degree}</span>
                    <span className="text-[10px] text-[#888]">{edu.endYear}</span>
                  </div>
                  {edu.description && <p className="text-[10px] text-[#666] mt-0.5 italic">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {pageData.skills.length > 0 && (
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider mb-2" style={{ color: accent }}>Skills</h4>
            <div className="flex flex-wrap gap-1.5">
              {pageData.skills.map((s, idx) => (
                <span key={idx} className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-[10px] font-bold">
                  {s.name || s}
                </span>
              ))}
            </div>
          </div>
        )}

        {pageData.projects.length > 0 && (
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider mb-2" style={{ color: accent }}>Projects</h4>
            <div className="space-y-2">
              {pageData.projects.map((p, idx) => (
                <div key={idx} className="text-xs">
                  <span className="font-bold">{p.title}</span> <span className="text-[10px] text-[#888]">({p.techStack})</span>
                  {p.description && <p className="text-[11px] text-[#555] mt-0.5">{p.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {(pageData.languages?.length > 0 || pageData.socialLinks?.length > 0 || pageData.hobbies) && (
          <div className="border-t pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px] text-[#666]">
            {pageData.languages?.length > 0 && <p><b>Languages:</b> {pageData.languages.map((l) => l.name).join(", ")}</p>}
            {pageData.socialLinks?.length > 0 && <p className="truncate"><b>Links:</b> {pageData.socialLinks.map((l) => l.label).join(", ")}</p>}
            {pageData.hobbies && <p><b>Interests:</b> {pageData.hobbies}</p>}
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
          <div className="p-3.5 bg-slate-50">
            <h1 className="text-lg sm:text-xl font-extrabold uppercase text-[#252525]">{fullName}</h1>
            <p className="text-xs font-bold" style={{ color: accent }}>{jobTitle}</p>
          </div>
          <div className="p-3.5 text-[10px] text-white flex flex-col justify-center" style={{ backgroundColor: accent }}>
            {location && <p>{location}</p>}
            {email && <p className="truncate">{email}</p>}
            {phone && <p>{phone}</p>}
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
                  <span className="text-[10px] text-[#888]">{formatResumeDateRange(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.isCurrent)}</span>
                </div>
                {exp.description && <p className="mt-1 text-[11px] text-[#555] leading-relaxed whitespace-pre-line">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {pageData.education.length > 0 && (
        <div>
          <h4 className="font-extrabold text-xs uppercase tracking-wider mb-2" style={{ color: accent }}>Education Record</h4>
          <div className="grid grid-cols-1 gap-2">
            {pageData.education.map((edu, idx) => (
              <div key={idx} className="border border-slate-200 rounded-lg p-2 text-xs">
                <div className="flex justify-between font-bold">
                  <span>{edu.institution} — {edu.degree}</span>
                  <span className="text-[10px] text-[#888]">{edu.endYear}</span>
                </div>
                {edu.description && <p className="text-[10.5px] text-[#666] mt-0.5 italic">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {pageData.skills.length > 0 && (
        <div>
          <h4 className="font-extrabold text-xs uppercase tracking-wider mb-1.5" style={{ color: accent }}>Core Skills</h4>
          <div className="flex flex-wrap gap-1.5">
            {pageData.skills.map((s, idx) => (
              <span key={idx} className="bg-white border border-slate-300 text-[#252525] px-2 py-0.5 rounded text-[10px] font-bold">
                {s.name || s}
              </span>
            ))}
          </div>
        </div>
      )}

      {pageData.projects.length > 0 && (
        <div>
          <h4 className="font-extrabold text-xs uppercase tracking-wider mb-1.5" style={{ color: accent }}>Key Projects</h4>
          <div className="space-y-1.5">
            {pageData.projects.map((p, idx) => (
              <div key={idx} className="text-xs">
                <span className="font-bold">{p.title}</span> <span className="text-[10px] text-[#888]">({p.techStack})</span>
                {p.description && <p className="text-[11px] text-[#555]">{p.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {(pageData.languages?.length > 0 || pageData.socialLinks?.length > 0 || pageData.hobbies) && (
        <div className="border-t pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px] text-[#666]">
          {pageData.languages?.length > 0 && <p><b>Languages:</b> {pageData.languages.map((l) => l.name).join(", ")}</p>}
          {pageData.socialLinks?.length > 0 && <p className="truncate"><b>Links:</b> {pageData.socialLinks.map((l) => l.label).join(", ")}</p>}
          {pageData.hobbies && <p><b>Interests:</b> {pageData.hobbies}</p>}
        </div>
      )}
    </div>
  );
}

/* ========================================================================= */
/* LAYOUT 9: CREATIVE ACCENT PAGE (Code / Tech Styled)                       */
/* ========================================================================= */
function CreativeAccentPage({ pageData, fullData, pageIndex, totalPages }) {
  const { accent, fullName, jobTitle, location, email, phone } = fullData;
  const isFirst = pageIndex === 1;

  return (
    <div className="p-6 sm:p-8 space-y-4 text-[#252525]">
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
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider mb-2 text-[#252525]">
            // {isFirst ? "EXPERIENCE" : "EXPERIENCE (CONT.)"}
          </h4>
          <div className="space-y-3 font-sans">
            {pageData.experiences.map((exp, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200/80 p-3 rounded-xl">
                <div className="flex justify-between items-baseline text-xs font-bold">
                  <span>{exp.role} <span className="font-normal text-[#6B6B6B]">@ {exp.company}</span></span>
                  <span className="font-mono text-[10px] text-[#888]">{formatResumeDateRange(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.isCurrent)}</span>
                </div>
                {exp.description && <p className="mt-1 text-[11px] text-[#555] leading-relaxed whitespace-pre-line">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {pageData.education.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>// EDUCATION</h4>
          <div className="space-y-2">
            {pageData.education.map((edu, idx) => (
              <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <div className="flex justify-between font-bold">
                  <span>{edu.degree} · <span className="text-[#6B6B6B]">{edu.institution}</span></span>
                  <span className="font-mono text-[10px] text-[#888]">{edu.endYear}</span>
                </div>
                {edu.description && <p className="text-[10.5px] text-[#666] mt-0.5 italic">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {pageData.skills.length > 0 && (
        <div className="space-y-1.5">
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>// TECH STACK & SKILLS</h4>
          <div className="flex flex-wrap gap-1.5">
            {pageData.skills.map((s, idx) => (
              <span key={idx} className="bg-slate-900 text-white font-mono px-2 py-0.5 rounded text-[10px] font-semibold">
                {s.name || s}
              </span>
            ))}
          </div>
        </div>
      )}

      {pageData.projects.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>// KEY PROJECTS</h4>
          <div className="space-y-2">
            {pageData.projects.map((p, idx) => (
              <div key={idx} className="p-2.5 bg-white border border-slate-200 rounded-lg text-xs">
                <div className="flex justify-between font-bold">
                  <span>{p.title}</span>
                  {p.link && <span className="text-[10px] text-[#FA0C40] font-mono">{p.link.replace(/^https?:\/\//, "")}</span>}
                </div>
                {p.techStack && <p className="text-[10px] font-mono text-[#888]">{p.techStack}</p>}
                {p.description && <p className="text-[11px] text-[#555] mt-0.5">{p.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {(pageData.languages?.length > 0 || pageData.socialLinks?.length > 0 || pageData.hobbies) && (
        <div className="font-mono text-[10px] text-[#777] border-t pt-2 space-y-0.5">
          {pageData.languages?.length > 0 && <p>// Languages: {pageData.languages.map((l) => l.name).join(", ")}</p>}
          {pageData.socialLinks?.length > 0 && <p>// Links: {pageData.socialLinks.map((l) => `${l.label}: ${l.url}`).join(" | ")}</p>}
          {pageData.hobbies && <p>// Interests: {pageData.hobbies}</p>}
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
      <div className="p-6 bg-[#18181B] text-white flex flex-col justify-between space-y-5">
        <div className="space-y-4">
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
                {location && <p>📍 {location}</p>}
                {email && <p className="truncate">✉️ {email}</p>}
                {phone && <p>📞 {phone}</p>}
              </div>

              {fullData.socialLinks?.length > 0 && (
                <div className="border-t border-white/10 pt-2 text-[10px] text-white/70 space-y-1">
                  <p className="font-bold text-white uppercase text-[9px]">Links</p>
                  {fullData.socialLinks.map((l, idx) => (
                    <p key={idx} className="truncate">{l.label}: {l.url?.replace(/^https?:\/\//, "")}</p>
                  ))}
                </div>
              )}
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

          {fullData.languages?.length > 0 && isFirst && (
            <div className="border-t border-white/10 pt-2 text-[10px] text-white/70">
              <p className="font-bold text-white uppercase text-[9px] mb-0.5">Languages</p>
              <p>{fullData.languages.map((l) => `${l.name} (${l.proficiency})`).join(", ")}</p>
            </div>
          )}

          {fullData.hobbies && isFirst && (
            <div className="border-t border-white/10 pt-2 text-[10px] text-white/70">
              <p className="font-bold text-white uppercase text-[9px] mb-0.5">Interests</p>
              <p>{fullData.hobbies}</p>
            </div>
          )}
        </div>
      </div>

      {/* Main White Body */}
      <div className="p-6 sm:p-7 space-y-4 bg-white flex-1">
        {pageData.summary && (
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider mb-1 pb-0.5 border-b" style={{ borderColor: `${accent}30`, color: accent }}>Profile</h4>
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
                    <span className="text-[10px] font-normal text-[#888]">{formatResumeDateRange(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.isCurrent)}</span>
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
                <div key={idx} className="text-xs">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <span className="font-bold text-[#252525]">{edu.institution}</span>
                      <p className="text-[11px] text-[#6B6B6B]">{edu.degree}</p>
                    </div>
                    <span className="text-[10px] text-[#888]">{edu.endYear}</span>
                  </div>
                  {edu.description && <p className="text-[10.5px] text-[#666] mt-0.5 italic">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {pageData.projects.length > 0 && (
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider mb-2 pb-0.5 border-b" style={{ borderColor: `${accent}30`, color: accent }}>Key Projects</h4>
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
export default function LiveResumeDocument({ resume, template, customAccent, onPageCountChange, isSamplePreview = false }) {
  const normalizedData = useNormalizedResume(resume, template, customAccent, isSamplePreview);
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

