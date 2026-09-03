import React, { useState, useRef, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  FileText,
  Palette,
  Sparkles,
  Share2,
  Mic,
  PenTool,
  UploadCloud,
  CheckCircle2,
  Square,
  ArrowRight,
  ArrowLeft,
  Plus,
  Save,
  Check,
  Camera,
  Pencil,
  Download,
  Lightbulb,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Layers,
  User,
  SlidersHorizontal,
  Info,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Wrench,
  Globe,
  Heart,
  Settings2,
  PlusCircle,
  Link as LinkIcon,
  Code,
  Languages as LangIcon,
  FolderGit2,
  Trash2,
  Copy,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { TEMPLATES, TEMPLATE_CATEGORIES } from "../data/templatesData";
import TemplatePreviewMockup from "../components/templates/TemplatePreviewMockup";
import LiveResumeDocument from "../components/builder/LiveResumeDocument";
import BuildMethodModal from "../components/builder/BuildMethodModal";
import CompletionModal from "../components/builder/CompletionModal";
import RichTextField from "../components/builder/RichTextField";
import RepeatableEntryCard from "../components/builder/RepeatableEntryCard";
import UploadPanel from "../components/builder/UploadPanel";
import ProcessingDocumentModal from "../components/builder/ProcessingDocumentModal";
import UserMenu from "../components/landing/UserMenu";
import { useAuth } from "../contexts/AuthContext";
import { uploadResume, getResume, downloadResumePdf } from "../api";

/**
 * Predefined Accent Colors for the Customize Tab
 */
const COLOR_SWATCHES = [
  { name: "Crimson", color: "#FA0C40" },
  { name: "Deep Navy", color: "#1E3A8A" },
  { name: "Forest Emerald", color: "#065F46" },
  { name: "Warm Amber", color: "#B45309" },
  { name: "Slate Indigo", color: "#4338CA" },
  { name: "Deep Teal", color: "#0F766E" },
  { name: "Rose Berry", color: "#BE123C" },
  { name: "Charcoal Ink", color: "#1F2937" },
  { name: "Royal Violet", color: "#6D28D9" },
  { name: "Cobalt Blue", color: "#2563EB" },
];

/**
 * Months List for Dropdowns
 */
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const YEARS = Array.from({ length: 30 }, (_, i) => String(2026 - i));

/**
 * Initial 9-Step Unified Resume State
 */
const INITIAL_RESUME_STATE = {
  title: "Untitled Resume",
  templateId: "puffin",
  accentColor: "#FA0C40",
  personalDetails: {
    jobTitle: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    country: "India",
    photo: null,
  },
  professional_summary: "",
  experiences: [],
  education: [],
  skills: [],
  hideSkillLevel: false,
  socialLinks: [],
  hobbies: "",
  jobPreference: {
    shareWithRecruiters: true,
    currentSalary: "",
    desiredSalary: "",
    salaryCurrency: "INR (Lakhs/yr)",
    noticePeriod: "30 days",
    noticeNegotiable: true,
    workMode: "Hybrid",
    searchStatus: "Actively looking",
    willingToRelocate: true,
  },
  additionalSections: {
    projects: [],
    languages: [],
    customSections: [],
  },
};

const SUGGESTED_SKILLS_POOL = [
  "System Architecture", "Cloud Computing", "RESTful APIs", "GraphQL", "CI/CD Pipelines",
  "A/B Testing", "Agile & Scrum", "Data Modeling", "Kafka Streams", "Redis Caching",
  "UI/UX Prototyping", "Team Leadership", "Cost Optimization", "Problem Solving"
];

const SKILL_LEVEL_NAMES = {
  1: "Beginner",
  2: "Intermediate",
  3: "Skillful",
  4: "Advanced",
  5: "Expert",
};

const STEP_TITLES = [
  "Personal Details",
  "Professional Summary",
  "Work Experience",
  "Education",
  "Skills",
  "Website & Links",
  "Hobbies",
  "Job Preference",
  "Additional Sections",
];

/* ---------------------------------------------------------------------- */
/* Main Split-Pane Editor Page                                            */
/* ---------------------------------------------------------------------- */
export default function BuilderPage({ initialTab = "scratch", initialResumeId = null, onBack }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const queryPath = searchParams.get("path") || searchParams.get("tab") || initialTab || "scratch";
  const templateParam = searchParams.get("template") || "puffin";

  const [activeTab, setActiveTab] = useState("editor"); // "editor" | "customize" | "tailor"
  const [buildPath, setBuildPath] = useState(queryPath); // "scratch" | "upload" | "linkedin" | "voice"
  const [activeStep, setActiveStep] = useState(1); // Steps 1 - 9

  const [isProcessingUpload, setIsProcessingUpload] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const [isMethodModalOpen, setIsMethodModalOpen] = useState(false);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Customize tab filter states
  const [customizeCategory, setCustomizeCategory] = useState("All");
  const [customizeAtsOnly, setCustomizeAtsOnly] = useState(false);
  const [previewPageCount, setPreviewPageCount] = useState(1);

  // Resume State
  const [resume, setResume] = useState(() => {
    return {
      ...INITIAL_RESUME_STATE,
      templateId: templateParam,
      personalDetails: {
        ...INITIAL_RESUME_STATE.personalDetails,
        firstName: user?.first_name || (user?.username ? user.username.split(" ")[0] : "Ritesh"),
        lastName: user?.last_name || (user?.username ? user.username.split(" ")[1] || "Pandey" : "Pandey"),
        email: user?.email || "ritesh.pandey@example.com",
      },
    };
  });

  const fileInputRef = useRef(null);

  // Sync query params (path / template)
  useEffect(() => {
    if (queryPath && queryPath !== buildPath) {
      setBuildPath(queryPath);
    }
  }, [queryPath]);

  // Sync template from URL if changed
  useEffect(() => {
    if (templateParam && templateParam !== resume.templateId) {
      const found = TEMPLATES.find((t) => t.id === templateParam);
      if (found) {
        setResume((r) => ({ ...r, templateId: found.id, accentColor: found.accentColor || r.accentColor }));
      }
    }
  }, [templateParam]);

  // Selected Template Definition
  const selectedTemplate = useMemo(() => {
    return TEMPLATES.find((t) => t.id === resume.templateId) || TEMPLATES[0];
  }, [resume.templateId]);

  const currentAccent = resume.accentColor || selectedTemplate.accentColor || "#FA0C40";

  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  // Dynamic Strength Calculation (Heuristic across all 9 steps)
  const resumeStrength = useMemo(() => {
    let score = 0;
    const { personalDetails, professional_summary, experiences, education, skills, socialLinks, jobPreference, additionalSections } = resume;

    // Step 1: Personal (26%)
    if (personalDetails.firstName && personalDetails.lastName) score += 8;
    if (personalDetails.jobTitle) score += 6;
    if (personalDetails.email) score += 4;
    if (personalDetails.phone) score += 4;
    if (personalDetails.city) score += 4;

    // Step 2: Summary (14%)
    if (professional_summary && professional_summary.length > 20) score += 14;

    // Step 3: Experience (20%)
    if (experiences && experiences.length > 0 && experiences[0].role) score += 20;

    // Step 4: Education (12%)
    if (education && education.length > 0 && education[0].institution) score += 12;

    // Step 5: Skills (10%)
    if (skills && skills.length >= 3) score += 10;

    // Step 6: Links (6%)
    if (socialLinks && socialLinks.length > 0 && socialLinks[0].url) score += 6;

    // Step 8: Job Prefs (6%)
    if (jobPreference && (jobPreference.desiredSalary || jobPreference.noticePeriod)) score += 6;

    // Step 9: Extra (6%)
    if (additionalSections?.projects?.length > 0 || additionalSections?.languages?.length > 0) score += 6;

    return Math.min(100, score);
  }, [resume]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  // Real PDF Export Download Handler
  const handleDownloadPdf = async () => {
    if (isDownloadingPdf) return;
    setIsDownloadingPdf(true);
    showToast("Generating high-resolution vector PDF...");

    try {
      const activeResumeId = searchParams.get("resume") || initialResumeId;
      await downloadResumePdf(resume, activeResumeId);
      showToast("PDF downloaded successfully!");
    } catch (err) {
      showToast(err.message || "Failed to generate PDF. Please try again.");
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  // State Updaters
  const updatePersonal = (field, value) => {
    setResume((prev) => ({
      ...prev,
      personalDetails: { ...prev.personalDetails, [field]: value },
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showToast("Photo must be under 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      updatePersonal("photo", reader.result);
      showToast("Profile photo added.");
    };
    reader.readAsDataURL(file);
  };

  // Synchronous Resume File Upload & Parsing Handler
  const handleFileUpload = async (file) => {
    setUploadError("");
    setIsProcessingUpload(true);

    try {
      const parsedData = await uploadResume(file);
      const raw = parsedData.raw_ai_extraction || {};

      // Name & Title extraction
      let firstName = raw.first_name || "";
      let lastName = raw.last_name || "";
      if (!firstName && raw.full_name) {
        const parts = raw.full_name.trim().split(" ");
        firstName = parts[0] || "";
        lastName = parts.slice(1).join(" ") || "";
      }
      if (!firstName && parsedData.title) {
        const cleanTitle = parsedData.title.replace(/[_-]+/g, " ");
        const parts = cleanTitle.split(" ");
        firstName = parts[0] || user?.first_name || "Candidate";
        lastName = parts.slice(1).join(" ") || user?.last_name || "";
      }

      // Experiences mapping
      const mappedExperiences = (parsedData.experiences || []).map((exp, idx) => {
        const startParts = (exp.start_date || "").split("-");
        const endParts = (exp.end_date || "").split("-");
        const startMonth = startParts[1] ? MONTHS[parseInt(startParts[1], 10) - 1] : "Jun";
        const startYear = startParts[0] || "2021";
        const endMonth = endParts[1] ? MONTHS[parseInt(endParts[1], 10) - 1] : (exp.is_current ? "Present" : "May");
        const endYear = endParts[0] || (exp.is_current ? "Present" : "2024");

        let desc = "";
        if (Array.isArray(exp.bullet_points) && exp.bullet_points.length > 0) {
          desc = exp.bullet_points.map((b) => (b.startsWith("•") ? b : `• ${b}`)).join("\n");
        } else if (typeof exp.bullet_points === "string") {
          desc = exp.bullet_points;
        }

        return {
          id: exp.id || idx + 1,
          role: exp.role || "Software Engineer",
          company: exp.company || "Company",
          city: exp.location || "",
          startMonth,
          startYear,
          endMonth,
          endYear,
          isCurrent: Boolean(exp.is_current),
          description: desc,
        };
      });

      // Education mapping
      const mappedEducation = (parsedData.education || []).map((edu, idx) => {
        const startParts = (edu.start_date || "").split("-");
        const endParts = (edu.end_date || "").split("-");
        return {
          id: edu.id || idx + 1,
          institution: edu.institution || "University / Institute",
          degree: edu.degree || edu.field_of_study || "Bachelor Degree",
          city: "",
          marksType: "CGPA",
          marks: edu.grade || "",
          startMonth: "Aug",
          startYear: startParts[0] || "2017",
          endMonth: "May",
          endYear: endParts[0] || "2021",
          isCurrent: false,
          description: edu.field_of_study ? `Specialization in ${edu.field_of_study}` : "",
        };
      });

      // Skills mapping
      const mappedSkills = (parsedData.skills || [])
        .map((s, idx) => ({
          id: s.id || idx + 1,
          name: typeof s === "string" ? s : s.name || "",
          level: s.proficiency === "expert" ? 5 : s.proficiency === "advanced" ? 4 : 4,
        }))
        .filter((s) => s.name);

      // Projects mapping
      const mappedProjects = (parsedData.projects || []).map((p, idx) => ({
        id: p.id || idx + 1,
        title: p.name || `Project ${idx + 1}`,
        techStack: Array.isArray(p.tech_stack) ? p.tech_stack.join(", ") : p.tech_stack || "",
        link: p.link || "",
        description: p.description || "",
      }));

      // Languages mapping
      const mappedLanguages = (raw.languages || []).map((l, idx) => ({
        id: idx + 1,
        name: typeof l === "string" ? l : l.name || "English",
        proficiency: typeof l === "object" && l.proficiency ? l.proficiency : "Fluent",
      }));

      // Social Links mapping
      const mappedLinks = (raw.social_links || []).map((l, idx) => ({
        id: idx + 1,
        label: l.label || "Portfolio",
        url: l.url || "",
      }));

      // Update the unified shared resume state
      setResume((prev) => ({
        ...prev,
        title: parsedData.title || file.name.replace(/\.[^/.]+$/, "") || "Parsed_Resume",
        personalDetails: {
          ...prev.personalDetails,
          firstName: firstName || prev.personalDetails.firstName || user?.first_name || "Candidate",
          lastName: lastName || prev.personalDetails.lastName || user?.last_name || "",
          jobTitle: raw.job_title || mappedExperiences[0]?.role || prev.personalDetails.jobTitle || "Software Engineer",
          email: raw.email || user?.email || prev.personalDetails.email || "user@example.com",
          phone: raw.phone || prev.personalDetails.phone || "+91 98765 43210",
          city: raw.city || mappedExperiences[0]?.city || prev.personalDetails.city || "Bengaluru",
          country: raw.country || prev.personalDetails.country || "India",
        },
        professional_summary:
          parsedData.professional_summary || raw.professional_summary || prev.professional_summary || "",
        experiences: mappedExperiences.length > 0 ? mappedExperiences : prev.experiences,
        education: mappedEducation.length > 0 ? mappedEducation : prev.education,
        skills: mappedSkills.length > 0 ? mappedSkills : prev.skills,
        socialLinks: mappedLinks.length > 0 ? mappedLinks : prev.socialLinks,
        additionalSections: {
          ...prev.additionalSections,
          projects: mappedProjects.length > 0 ? mappedProjects : prev.additionalSections.projects,
          languages: mappedLanguages.length > 0 ? mappedLanguages : prev.additionalSections.languages,
        },
        hobbies: raw.hobbies || prev.hobbies || "",
      }));

      // Smoothly transition into the 9-step editor at Step 1
      setBuildPath("scratch");
      setActiveStep(1);
      setActiveTab("editor");
      setIsProcessingUpload(false);
      showToast("Resume parsed & loaded successfully! 9 sections auto-filled.");
    } catch (err) {
      setIsProcessingUpload(false);
      setUploadError(
        err.message || "Failed to parse resume document. Please try again with a clear PDF or DOCX file."
      );
    }
  };

  // Generic AI Assistant for generating bullet points or summaries
  const handleAiSuggest = (type, targetId = null) => {
    setIsAiThinking(true);
    setTimeout(() => {
      setIsAiThinking(false);
      if (type === "summary") {
        const title = resume.personalDetails.jobTitle || "Software Engineer";
        setResume((prev) => ({
          ...prev,
          professional_summary: `Results-driven ${title} with proven expertise designing high-availability systems, streamlining team delivery, and engineering high-impact customer solutions.`,
        }));
        showToast("AI generated professional summary.");
      } else if (type === "experience") {
        setResume((prev) => ({
          ...prev,
          experiences: prev.experiences.map((exp) => {
            if (exp.id === targetId) {
              return {
                ...exp,
                description: `${exp.description ? exp.description + "\n" : ""}• Spearheaded cross-functional initiative reducing turnaround time by 38%.\n• Designed and delivered scalable services supporting over 500k active users.\n• Automated regression pipelines, eliminating 90% of manual deployment overhead.`,
              };
            }
            return exp;
          }),
        }));
        showToast("AI synthesized quantified bullet points.");
      } else if (type === "education") {
        setResume((prev) => ({
          ...prev,
          education: prev.education.map((edu) => {
            if (edu.id === targetId) {
              return {
                ...edu,
                description: `${edu.description ? edu.description + "\n" : ""}• Core coursework: Distributed Systems, Advanced Algorithms, Machine Learning.\n• Awarded Academic Merit Scholarship for top 5% batch standing.`,
              };
            }
            return edu;
          }),
        }));
        showToast("AI added relevant coursework & honors.");
      } else if (type === "project") {
        setResume((prev) => ({
          ...prev,
          additionalSections: {
            ...prev.additionalSections,
            projects: prev.additionalSections.projects.map((p) => {
              if (p.id === targetId) {
                return {
                  ...p,
                  description: `${p.description ? p.description + "\n" : ""}• Benchmarked throughput across 10,000 concurrent requests with sub-15ms P99 latency.\n• Integrated continuous integration with 94% automated test coverage.`,
                };
              }
              return p;
            }),
          },
        }));
        showToast("AI generated project metrics.");
      }
    }, 1100);
  };

  // Navigation handlers
  const handleNextStep = () => {
    if (activeStep < 9) {
      setActiveStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsCompletionModalOpen(true);
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Filtered Templates in Customize tab
  const filteredCustomizeTemplates = useMemo(() => {
    return TEMPLATES.filter((tmpl) => {
      const matchCategory =
        customizeCategory === "All" ||
        tmpl.category === customizeCategory ||
        tmpl.tags.includes(customizeCategory);
      const matchAts = !customizeAtsOnly || tmpl.isAtsOnly;
      return matchCategory && matchAts;
    });
  }, [customizeCategory, customizeAtsOnly]);

  const userInitials = useMemo(() => {
    const f = resume.personalDetails.firstName?.[0] || "";
    const l = resume.personalDetails.lastName?.[0] || "";
    return (f + l).toUpperCase() || "ME";
  }, [resume.personalDetails.firstName, resume.personalDetails.lastName]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#252525] font-['Plus_Jakarta_Sans'] flex flex-col justify-between">
      {/* ========================================================================= */}
      {/* TOP NAVIGATION BAR                                                        */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-[#252525]/10 px-3 sm:px-6 py-2.5 sm:py-3 shadow-xs font-['Plus_Jakarta_Sans']">
        {/* ----------------------------------------------------------------- */}
        {/* MOBILE & TABLET TOP BAR (<lg)                                     */}
        {/* ----------------------------------------------------------------- */}
        <div className="lg:hidden flex flex-col gap-2.5">
          {/* Row 1: Exit link + Right Actions */}
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={onBack || (() => navigate("/dashboard"))}
              className="text-xs font-extrabold text-[#252525] hover:text-[#FA0C40] flex items-center gap-1.5 py-1 px-1 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#FA0C40]" />
              <span>← Exit Resume Editor</span>
            </button>

            <div className="flex items-center gap-1.5">
              {/* Quick Rename on Mobile */}
              {isEditingTitle ? (
                <input
                  type="text"
                  value={resume.title}
                  autoFocus
                  onBlur={() => setIsEditingTitle(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setIsEditingTitle(false);
                  }}
                  onChange={(e) => setResume((r) => ({ ...r, title: e.target.value }))}
                  className="px-2 py-1 text-xs font-extrabold text-[#252525] bg-white border border-[#FA0C40] rounded-lg focus:outline-none max-w-[110px]"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditingTitle(true)}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold text-[#6B6B6B] hover:text-[#252525] bg-[#252525]/5 max-w-[110px] truncate"
                  title="Click to rename"
                >
                  <span className="truncate">{resume.title || "Resume"}</span>
                  <Pencil className="w-3 h-3 text-[#6B6B6B] shrink-0" />
                </button>
              )}

              {/* Download PDF button on mobile */}
              <button
                type="button"
                disabled={isDownloadingPdf}
                onClick={handleDownloadPdf}
                className="w-8 h-8 rounded-full bg-[#FA0C40] hover:bg-[#D40936] text-white flex items-center justify-center shadow-xs cursor-pointer active:scale-95 disabled:opacity-50 transition-all"
                title="Download PDF"
              >
                {isDownloadingPdf ? (
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
              </button>

              {/* User Menu */}
              <UserMenu />
            </div>
          </div>

          {/* Row 2: 3 Navigation Tabs (Full Width) */}
          <div className="grid grid-cols-3 gap-1 bg-[#252525]/[0.04] p-1 rounded-full border border-[#252525]/10">
            <button
              type="button"
              onClick={() => setActiveTab("editor")}
              className={`py-1.5 px-2 rounded-full text-xs font-extrabold flex items-center justify-center gap-1 transition-all cursor-pointer truncate ${
                activeTab === "editor"
                  ? "bg-white text-[#252525] shadow-xs"
                  : "text-[#6B6B6B] hover:text-[#252525]"
              }`}
            >
              <FileText className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Editor</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("customize")}
              className={`py-1.5 px-2 rounded-full text-xs font-extrabold flex items-center justify-center gap-1 transition-all cursor-pointer truncate ${
                activeTab === "customize"
                  ? "bg-white text-[#252525] shadow-xs"
                  : "text-[#6B6B6B] hover:text-[#252525]"
              }`}
            >
              <Palette className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Preview</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("tailor")}
              className={`py-1.5 px-2 rounded-full text-xs font-extrabold flex items-center justify-center gap-1 transition-all cursor-pointer truncate ${
                activeTab === "tailor"
                  ? "bg-white text-[#252525] shadow-xs"
                  : "text-[#6B6B6B] hover:text-[#252525]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FA0C40] shrink-0" />
              <span className="truncate">Tailor</span>
            </button>
          </div>

          {/* Row 3: Resume Strength Meter (Full Width Row) */}
          <div className="flex items-center justify-between gap-2.5 bg-slate-50 border border-[#252525]/10 rounded-2xl px-3 py-1.5">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-[10px] font-extrabold text-[#FA0C40] bg-[#FA0C400D] px-2 py-0.5 rounded-full border border-[#FA0C40]/20 shrink-0">
                {resumeStrength}%
              </span>
              <span className="text-[11px] font-bold text-[#252525] truncate">Strength</span>
            </div>
            <div className="flex-1 max-w-[140px] sm:max-w-xs h-1.5 bg-[#252525]/10 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500 ease-out rounded-full"
                style={{
                  width: `${resumeStrength}%`,
                  backgroundColor: currentAccent,
                }}
              />
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>ATS Ready</span>
            </span>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* DESKTOP TOP BAR (lg+)                                             */}
        {/* ----------------------------------------------------------------- */}
        <div className="hidden lg:flex max-w-7xl mx-auto items-center justify-between gap-3">
          {/* Left: Strength Meter & Back */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onBack || (() => navigate("/dashboard"))}
              className="text-xs font-bold text-[#6B6B6B] hover:text-[#252525] border border-[#252525]/15 px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            {/* Resume Strength Meter */}
            <div className="flex items-center gap-2.5 bg-slate-50 border border-[#252525]/10 rounded-full px-3.5 py-1.5">
              <div className="text-left">
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-bold text-[#6B6B6B]">Strength:</span>
                  <span className="text-[11px] font-extrabold text-[#252525]">{resumeStrength}%</span>
                </div>
                <div className="w-24 sm:w-32 h-1.5 bg-[#252525]/10 rounded-full overflow-hidden mt-0.5">
                  <div
                    className="h-full transition-all duration-500 ease-out rounded-full"
                    style={{
                      width: `${resumeStrength}%`,
                      backgroundColor: currentAccent,
                    }}
                  />
                </div>
              </div>
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            </div>
          </div>

          {/* Center: 3 Navigation Tabs */}
          <div className="flex items-center justify-center gap-1 bg-[#252525]/[0.03] p-1 rounded-full border border-[#252525]/10 self-center">
            <button
              type="button"
              onClick={() => setActiveTab("editor")}
              className={`px-4 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === "editor"
                  ? "bg-white text-[#252525] shadow-xs"
                  : "text-[#6B6B6B] hover:text-[#252525]"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>
                {buildPath === "upload"
                  ? "Upload Resume"
                  : buildPath === "linkedin"
                  ? "LinkedIn Import"
                  : buildPath === "voice"
                  ? "Voice AI"
                  : `Editor (Step ${activeStep}/9)`}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("customize")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === "customize"
                  ? "bg-white text-[#252525] shadow-xs"
                  : "text-[#6B6B6B] hover:text-[#252525]"
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Customize</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("tailor")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === "tailor"
                  ? "bg-white text-[#252525] shadow-xs"
                  : "text-[#6B6B6B] hover:text-[#252525]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FA0C40]" />
              <span>Tailor</span>
            </button>
          </div>

          {/* Right: Filename, Download & User Menu */}
          <div className="flex items-center gap-2.5 justify-end">
            {/* Inline Rename */}
            <div className="relative flex items-center">
              {isEditingTitle ? (
                <input
                  type="text"
                  value={resume.title}
                  autoFocus
                  onBlur={() => setIsEditingTitle(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setIsEditingTitle(false);
                  }}
                  onChange={(e) => setResume((r) => ({ ...r, title: e.target.value }))}
                  className="px-2.5 py-1 text-xs font-extrabold text-[#252525] bg-white border border-[#FA0C40] rounded-lg focus:outline-none max-w-[140px] sm:max-w-[180px]"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditingTitle(true)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-extrabold text-[#252525] hover:bg-[#252525]/5 transition-colors cursor-pointer max-w-[140px] sm:max-w-[180px] truncate"
                  title="Click to rename"
                >
                  <span className="truncate">{resume.title || "My_Resume"}</span>
                  <Pencil className="w-3 h-3 text-[#6B6B6B] shrink-0" />
                </button>
              )}
            </div>

            {/* Build Method Trigger */}
            <button
              type="button"
              onClick={() => setIsMethodModalOpen(true)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#252525]/15 text-xs font-bold text-[#6B6B6B] hover:text-[#252525] transition-colors cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Build Path</span>
            </button>

            {/* Download PDF Button */}
            <button
              type="button"
              disabled={isDownloadingPdf}
              onClick={handleDownloadPdf}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FA0C40] hover:bg-[#D40936] text-white text-xs font-extrabold shadow-sm shadow-[#FA0C40]/25 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isDownloadingPdf ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Exporting PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            {/* User Avatar Dropdown */}
            <UserMenu />
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* TOAST ALERT                                                               */}
      {/* ========================================================================= */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#252525] text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-xl border border-white/10 animate-scale-in flex items-center gap-2">
          <Info className="w-4 h-4 text-[#FA0C40]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MAIN WORKSPACE BODY (EXACT 50/50 MATCHED HEIGHT SPLIT-PANE)               */}
      {/* ========================================================================= */}
      <main className="max-w-[1600px] w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-7 flex-1 overflow-x-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8 items-stretch w-full lg:h-[calc(100vh-145px)] lg:min-h-[680px]">
          {/* ----------------------------------------------------------------- */}
          {/* LEFT COLUMN: ACTIVE TAB WORKSPACE (MATCHED HEIGHT)                */}
          {/* ----------------------------------------------------------------- */}
          <div className={`w-full min-w-0 flex flex-col h-full overflow-hidden ${activeTab === "customize" ? "hidden lg:flex" : "flex"}`}>
            {/* BUILD PATH 1: UPLOAD PANEL */}
            {activeTab === "editor" && buildPath === "upload" && (
              <UploadPanel
                onFileUpload={handleFileUpload}
                onSwitchMethod={() => setIsMethodModalOpen(true)}
                onStartScratch={() => setBuildPath("scratch")}
                selectedTemplate={selectedTemplate}
                uploadError={uploadError}
                onClearError={() => setUploadError("")}
              />
            )}

            {/* BUILD PATH 2: LINKEDIN IMPORT */}
            {activeTab === "editor" && buildPath === "linkedin" && (
              <div className="bg-white rounded-3xl border border-[#252525]/10 shadow-[0_4px_20px_rgba(37,37,37,0.03)] p-6 sm:p-8 space-y-6 font-['Plus_Jakarta_Sans'] text-[#252525] animate-scale-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#252525]/10">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full border border-amber-200">
                        In Development · Coming Soon
                      </span>
                      {selectedTemplate && (
                        <span className="text-[10px] font-bold text-[#6B6B6B] bg-slate-100 px-2 py-0.5 rounded-full">
                          Template: {selectedTemplate.name}
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#252525] tracking-tight">
                      Import from LinkedIn
                    </h2>
                    <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1">
                      Direct LinkedIn OAuth 2.0 profile synchronization is currently in integration. In the meantime, you can upload your resume file or build using our 9-step guided editor.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMethodModalOpen(true)}
                    className="text-xs font-bold text-[#6B6B6B] hover:text-[#FA0C40] transition-colors self-start sm:self-auto cursor-pointer flex items-center gap-1 hover:underline"
                  >
                    <span>Switch Method</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="rounded-3xl border border-blue-100 bg-blue-50/40 p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 text-[#0A66C2] flex items-center justify-center shadow-xs">
                    <Share2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#252525]">
                    LinkedIn OAuth Integration in Progress
                  </h3>
                  <p className="text-xs text-[#6B6B6B] max-w-md leading-relaxed">
                    We are completing LinkedIn API partner verification. You can immediately upload your current PDF or DOCX resume for 1-click AI extraction, or begin typing on our blank canvas.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setBuildPath("upload")}
                      className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#FA0C40] hover:bg-[#D40936] text-white text-xs sm:text-sm font-extrabold shadow-md shadow-[#FA0C40]/25 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <UploadCloud className="w-4 h-4" />
                      <span>Upload Resume File Instead</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setBuildPath("scratch");
                        setActiveStep(1);
                      }}
                      className="w-full sm:w-auto px-6 py-3 rounded-full bg-white border border-[#252525]/15 hover:border-[#252525] text-[#252525] text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <PenTool className="w-4 h-4" />
                      <span>Build from Scratch</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-600 font-bold text-[11px] bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>Privacy compliant · Zero data retention without consent</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setBuildPath("scratch");
                      setActiveStep(1);
                    }}
                    className="text-xs font-bold text-[#6B6B6B] hover:text-[#FA0C40] transition-colors cursor-pointer"
                  >
                    Prefer typing? <strong className="underline text-[#252525] hover:text-[#FA0C40]">Start from scratch</strong>
                  </button>
                </div>
              </div>
            )}

            {/* BUILD PATH 3: VOICE AI */}
            {activeTab === "editor" && buildPath === "voice" && (
              <div className="bg-white rounded-3xl border border-[#252525]/10 shadow-[0_4px_20px_rgba(37,37,37,0.03)] p-6 sm:p-8 space-y-6 font-['Plus_Jakarta_Sans'] text-[#252525] animate-scale-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#252525]/10">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full border border-amber-200">
                        In Development · Coming Soon
                      </span>
                      {selectedTemplate && (
                        <span className="text-[10px] font-bold text-[#6B6B6B] bg-slate-100 px-2 py-0.5 rounded-full">
                          Template: {selectedTemplate.name}
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#252525] tracking-tight">
                      Talk to Voice AI
                    </h2>
                    <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1">
                      Real-time conversational speech transcription is in active engineering. In the meantime, you can use our built-in Claude AI bullet suggester directly in the editor.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMethodModalOpen(true)}
                    className="text-xs font-bold text-[#6B6B6B] hover:text-[#FA0C40] transition-colors self-start sm:self-auto cursor-pointer flex items-center gap-1 hover:underline"
                  >
                    <span>Switch Method</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="rounded-3xl border border-amber-200/70 bg-amber-50/30 p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-xs">
                    <Mic className="w-8 h-8" />
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#252525]">
                    Voice AI Speech Engine in Development
                  </h3>
                  <p className="text-xs text-[#6B6B6B] max-w-md leading-relaxed">
                    Our multi-lingual speech-to-text pipeline is undergoing quality tuning. You can immediately build from scratch (with real-time AI bullet generation on Step 3) or upload a resume file.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setBuildPath("scratch");
                        setActiveStep(1);
                      }}
                      className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#FA0C40] hover:bg-[#D40936] text-white text-xs sm:text-sm font-extrabold shadow-md shadow-[#FA0C40]/25 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Start with AI Bullet Suggestions</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setBuildPath("upload")}
                      className="w-full sm:w-auto px-6 py-3 rounded-full bg-white border border-[#252525]/15 hover:border-[#252525] text-[#252525] text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <UploadCloud className="w-4 h-4" />
                      <span>Upload Resume File</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 text-xs">
                  <div className="flex items-center gap-2 text-amber-800 font-bold text-[11px] bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Claude 3.5 Sonnet integrated for writing assistance in Editor</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setBuildPath("scratch");
                      setActiveStep(1);
                    }}
                    className="text-xs font-bold text-[#6B6B6B] hover:text-[#FA0C40] transition-colors cursor-pointer"
                  >
                    Prefer typing? <strong className="underline text-[#252525] hover:text-[#FA0C40]">Start from scratch</strong>
                  </button>
                </div>
              </div>
            )}


            {/* TAB 1: 9-STEP FORM (SCRATCH & POST-UPLOAD FLOW) */}
            {activeTab === "editor" && !["upload", "linkedin", "voice"].includes(buildPath) && (
              <div className="bg-white rounded-3xl border border-[#252525]/10 shadow-[0_4px_20px_rgba(37,37,37,0.03)] p-5 sm:p-7 h-full flex flex-col justify-between overflow-y-auto">
                <div className="flex-1 overflow-y-auto pr-1 space-y-4">
                  {/* STEP 1: PERSONAL DETAILS */}
                  {activeStep === 1 && (
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div>
                          <h2 className="text-xl font-extrabold text-[#252525] tracking-tight flex items-center gap-2">
                            <span>Personal Details</span>
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#FA0C400D] text-[#FA0C40] border border-[#FA0C40]/20">
                              +12%
                            </span>
                          </h2>
                          <p className="text-xs text-[#6B6B6B] mt-1 leading-relaxed">
                            Adding your verified email, phone, and location increases recruiter response rates by 64%.
                          </p>
                        </div>
                      </div>

                      {/* Photo Bar */}
                      <div className="flex items-center gap-4 py-4 border-y border-[#252525]/5 my-5">
                        <div className="relative group">
                          {resume.personalDetails.photo ? (
                            <img
                              src={resume.personalDetails.photo}
                              alt="Profile"
                              className="w-14 h-14 rounded-full object-cover border-2 border-[#FA0C40] shadow-sm"
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-full bg-[#FA0C400D] border-2 border-[#FA0C40]/30 text-[#FA0C40] font-extrabold text-base flex items-center justify-center shadow-xs">
                              {userInitials}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handlePhotoUpload}
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-4 py-2 rounded-full border border-[#252525]/15 hover:border-[#FA0C40] text-xs font-bold text-[#252525] hover:text-[#FA0C40] transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                          >
                            <Camera className="w-3.5 h-3.5" />
                            <span>{resume.personalDetails.photo ? "Change Photo" : "Add Photo"}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => showToast("AI Photo Studio enhancement model coming in next update.")}
                            className="px-4 py-2 rounded-full bg-[#FA0C400D] hover:bg-[#FA0C40]/10 border border-[#FA0C40]/20 text-xs font-bold text-[#FA0C40] transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Try AI Photo Studio</span>
                          </button>
                        </div>
                      </div>

                      {/* Inputs */}
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label className="text-xs font-bold text-[#252525]">Current Job Title</label>
                            <span className="text-[10px] font-bold text-[#FA0C40] bg-[#FA0C400D] px-1.5 py-0.2 rounded">+8%</span>
                          </div>
                          <input
                            type="text"
                            value={resume.personalDetails.jobTitle}
                            onChange={(e) => updatePersonal("jobTitle", e.target.value)}
                            placeholder="e.g. Senior Software Engineer"
                            className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-[#252525]/15 focus:border-[#FA0C40] rounded-xl text-xs sm:text-sm text-[#252525] focus:outline-none focus:ring-2 focus:ring-[#FA0C40]/20 transition-all placeholder:text-[#6B6B6B]/60"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div>
                            <label className="text-xs font-bold text-[#252525] block mb-1">First Name</label>
                            <input
                              type="text"
                              value={resume.personalDetails.firstName}
                              onChange={(e) => updatePersonal("firstName", e.target.value)}
                              placeholder="e.g. Ritesh"
                              className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-[#252525]/15 focus:border-[#FA0C40] rounded-xl text-xs sm:text-sm text-[#252525] focus:outline-none focus:ring-2 focus:ring-[#FA0C40]/20 transition-all"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-[#252525] block mb-1">Last Name</label>
                            <input
                              type="text"
                              value={resume.personalDetails.lastName}
                              onChange={(e) => updatePersonal("lastName", e.target.value)}
                              placeholder="e.g. Pandey"
                              className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-[#252525]/15 focus:border-[#FA0C40] rounded-xl text-xs sm:text-sm text-[#252525] focus:outline-none focus:ring-2 focus:ring-[#FA0C40]/20 transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div>
                            <label className="text-xs font-bold text-[#252525] block mb-1">Email Address</label>
                            <input
                              type="email"
                              value={resume.personalDetails.email}
                              onChange={(e) => updatePersonal("email", e.target.value)}
                              placeholder="e.g. ritesh.pandey@example.com"
                              className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-[#252525]/15 focus:border-[#FA0C40] rounded-xl text-xs sm:text-sm text-[#252525] focus:outline-none focus:ring-2 focus:ring-[#FA0C40]/20 transition-all"
                            />
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <label className="text-xs font-bold text-[#252525]">Phone Number</label>
                              <span className="text-[10px] font-bold text-[#FA0C40] bg-[#FA0C400D] px-1.5 py-0.2 rounded">+4%</span>
                            </div>
                            <input
                              type="tel"
                              value={resume.personalDetails.phone}
                              onChange={(e) => updatePersonal("phone", e.target.value)}
                              placeholder="e.g. +91 98450 12345"
                              className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-[#252525]/15 focus:border-[#FA0C40] rounded-xl text-xs sm:text-sm text-[#252525] focus:outline-none focus:ring-2 focus:ring-[#FA0C40]/20 transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div>
                            <label className="text-xs font-bold text-[#252525] block mb-1">City / Region</label>
                            <input
                              type="text"
                              value={resume.personalDetails.city}
                              onChange={(e) => updatePersonal("city", e.target.value)}
                              placeholder="e.g. Bengaluru"
                              className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-[#252525]/15 focus:border-[#FA0C40] rounded-xl text-xs sm:text-sm text-[#252525] focus:outline-none focus:ring-2 focus:ring-[#FA0C40]/20 transition-all"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-[#252525] block mb-1">Country</label>
                            <input
                              type="text"
                              value={resume.personalDetails.country}
                              onChange={(e) => updatePersonal("country", e.target.value)}
                              placeholder="e.g. India"
                              className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-[#252525]/15 focus:border-[#FA0C40] rounded-xl text-xs sm:text-sm text-[#252525] focus:outline-none focus:ring-2 focus:ring-[#FA0C40]/20 transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 bg-[#FA0C400D] border border-[#FA0C40]/15 rounded-2xl p-4 flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-[#FA0C40] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-[#252525]">Recruiter Pro Tip</p>
                          <p className="text-[11px] text-[#6B6B6B] mt-0.5 leading-relaxed">
                            Provide an active WhatsApp-enabled phone number and a clean professional email address for instant interview scheduling.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: PROFESSIONAL SUMMARY */}
                  {activeStep === 2 && (
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div>
                          <h2 className="text-xl font-extrabold text-[#252525] tracking-tight flex items-center gap-2">
                            <span>Professional Summary</span>
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#FA0C400D] text-[#FA0C40] border border-[#FA0C40]/20">
                              +16%
                            </span>
                          </h2>
                          <p className="text-xs text-[#6B6B6B] mt-1 leading-relaxed">
                            Summarize your years of experience, core technical specialties, and biggest quantifiable business impact.
                          </p>
                        </div>
                      </div>

                      <div className="my-5">
                        <RichTextField
                          value={resume.professional_summary}
                          onChange={(v) => setResume((r) => ({ ...r, professional_summary: v }))}
                          placeholder="e.g. Senior Software Engineer with 6+ years specializing in distributed systems, high-throughput microservices, and Kubernetes clusters at scale…"
                          rows={4}
                          onAskAi={() => handleAiSuggest("summary")}
                          isAiThinking={isAiThinking}
                          aiLabel="Write with AI"
                        />
                      </div>

                      <div className="mt-6 bg-[#FA0C400D] border border-[#FA0C40]/15 rounded-2xl p-4 flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-[#FA0C40] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-[#252525]">Summary Pro Tip</p>
                          <p className="text-[11px] text-[#6B6B6B] mt-0.5 leading-relaxed">
                            Keep your summary to 2-3 concise sentences focusing on your strongest impact metrics rather than generic buzzwords.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: WORK EXPERIENCE */}
                  {activeStep === 3 && (
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-4">
                        <div>
                          <h2 className="text-xl font-extrabold text-[#252525] tracking-tight flex items-center gap-2">
                            <span>Work Experience</span>
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#FA0C400D] text-[#FA0C40] border border-[#FA0C40]/20">
                              +20%
                            </span>
                          </h2>
                          <p className="text-xs text-[#6B6B6B] mt-1">
                            List your professional roles in reverse chronological order with action-driven bullet points.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const newExp = {
                              id: Date.now(),
                              role: "",
                              company: "",
                              city: "",
                              startMonth: "Jan",
                              startYear: "2022",
                              endMonth: "Present",
                              endYear: "Present",
                              isCurrent: true,
                              description: "",
                            };
                            setResume((r) => ({ ...r, experiences: [newExp, ...r.experiences] }));
                          }}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#252525] hover:bg-[#FA0C40] text-white text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Experience</span>
                        </button>
                      </div>

                      <div className="space-y-4 my-4">
                        {resume.experiences.map((exp) => (
                          <RepeatableEntryCard
                            key={exp.id}
                            title={exp.role || "Untitled Role"}
                            subtitle={exp.company || "No Employer"}
                            dateRange={`${exp.startMonth} ${exp.startYear} - ${exp.isCurrent ? "Present" : `${exp.endMonth} ${exp.endYear}`}`}
                            onDuplicate={() => {
                              const dupe = { ...exp, id: Date.now(), role: `${exp.role} (Copy)` };
                              setResume((r) => ({ ...r, experiences: [...r.experiences, dupe] }));
                              showToast("Experience entry duplicated.");
                            }}
                            onDelete={() => {
                              setResume((r) => ({
                                ...r,
                                experiences: r.experiences.filter((e) => e.id !== exp.id),
                              }));
                              showToast("Experience entry removed.");
                            }}
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="text-xs font-bold text-[#252525] block mb-1">Job Title</label>
                                <input
                                  type="text"
                                  value={exp.role}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setResume((r) => ({
                                      ...r,
                                      experiences: r.experiences.map((item) =>
                                        item.id === exp.id ? { ...item, role: val } : item
                                      ),
                                    }));
                                  }}
                                  placeholder="e.g. Lead Platform Engineer"
                                  className="w-full px-3 py-2 bg-[#FAFAFA] border border-[#252525]/15 focus:border-[#FA0C40] rounded-xl text-xs sm:text-sm text-[#252525] focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-bold text-[#252525] block mb-1">Company / Employer</label>
                                <input
                                  type="text"
                                  value={exp.company}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setResume((r) => ({
                                      ...r,
                                      experiences: r.experiences.map((item) =>
                                        item.id === exp.id ? { ...item, company: val } : item
                                      ),
                                    }));
                                  }}
                                  placeholder="e.g. Swiggy"
                                  className="w-full px-3 py-2 bg-[#FAFAFA] border border-[#252525]/15 focus:border-[#FA0C40] rounded-xl text-xs sm:text-sm text-[#252525] focus:outline-none"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="text-xs font-bold text-[#252525] block mb-1">City / Location</label>
                              <input
                                type="text"
                                value={exp.city}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setResume((r) => ({
                                    ...r,
                                    experiences: r.experiences.map((item) =>
                                      item.id === exp.id ? { ...item, city: val } : item
                                    ),
                                  }));
                                }}
                                placeholder="e.g. Bengaluru, India"
                                className="w-full px-3 py-2 bg-[#FAFAFA] border border-[#252525]/15 focus:border-[#FA0C40] rounded-xl text-xs sm:text-sm text-[#252525] focus:outline-none"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                              <div>
                                <label className="text-[11px] font-bold text-[#6B6B6B] block mb-1">Start Date</label>
                                <div className="grid grid-cols-2 gap-2">
                                  <select
                                    value={exp.startMonth}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setResume((r) => ({
                                        ...r,
                                        experiences: r.experiences.map((item) =>
                                          item.id === exp.id ? { ...item, startMonth: val } : item
                                        ),
                                      }));
                                    }}
                                    className="px-2.5 py-1.5 bg-[#FAFAFA] border border-[#252525]/15 rounded-lg text-xs"
                                  >
                                    {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                                  </select>
                                  <select
                                    value={exp.startYear}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setResume((r) => ({
                                        ...r,
                                        experiences: r.experiences.map((item) =>
                                          item.id === exp.id ? { ...item, startYear: val } : item
                                        ),
                                      }));
                                    }}
                                    className="px-2.5 py-1.5 bg-[#FAFAFA] border border-[#252525]/15 rounded-lg text-xs"
                                  >
                                    {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                                  </select>
                                </div>
                              </div>

                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <label className="text-[11px] font-bold text-[#6B6B6B]">End Date</label>
                                  <label className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#252525] cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={exp.isCurrent}
                                      onChange={(e) => {
                                        const checked = e.target.checked;
                                        setResume((r) => ({
                                          ...r,
                                          experiences: r.experiences.map((item) =>
                                            item.id === exp.id ? { ...item, isCurrent: checked } : item
                                          ),
                                        }));
                                      }}
                                      className="rounded text-[#FA0C40] focus:ring-[#FA0C40]"
                                    />
                                    <span>Currently here</span>
                                  </label>
                                </div>
                                {!exp.isCurrent ? (
                                  <div className="grid grid-cols-2 gap-2">
                                    <select
                                      value={exp.endMonth}
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        setResume((r) => ({
                                          ...r,
                                          experiences: r.experiences.map((item) =>
                                            item.id === exp.id ? { ...item, endMonth: val } : item
                                          ),
                                        }));
                                      }}
                                      className="px-2.5 py-1.5 bg-[#FAFAFA] border border-[#252525]/15 rounded-lg text-xs"
                                    >
                                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                                    </select>
                                    <select
                                      value={exp.endYear}
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        setResume((r) => ({
                                          ...r,
                                          experiences: r.experiences.map((item) =>
                                            item.id === exp.id ? { ...item, endYear: val } : item
                                          ),
                                        }));
                                      }}
                                      className="px-2.5 py-1.5 bg-[#FAFAFA] border border-[#252525]/15 rounded-lg text-xs"
                                    >
                                      {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                  </div>
                                ) : (
                                  <div className="px-3 py-1.5 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200">
                                    Present Role
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="pt-2">
                              <label className="text-xs font-bold text-[#252525] block mb-1">
                                Achievements & Responsibilities
                              </label>
                              <RichTextField
                                value={exp.description}
                                onChange={(val) => {
                                  setResume((r) => ({
                                    ...r,
                                    experiences: r.experiences.map((item) =>
                                      item.id === exp.id ? { ...item, description: val } : item
                                    ),
                                  }));
                                }}
                                placeholder="Use bullet points to display your achievements…"
                                rows={3}
                                onAskAi={() => handleAiSuggest("experience", exp.id)}
                                isAiThinking={isAiThinking}
                                aiLabel="Improve with AI"
                              />
                            </div>
                          </RepeatableEntryCard>
                        ))}
                      </div>

                      <div className="mt-6 bg-[#FA0C400D] border border-[#FA0C40]/15 rounded-2xl p-4 flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-[#FA0C40] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-[#252525]">Bullet Point Formula</p>
                          <p className="text-[11px] text-[#6B6B6B] mt-0.5 leading-relaxed">
                            Action Verb + Project/Task + Quantifiable Result (e.g. *"Migrated monolithic database to distributed PostgreSQL cluster, cutting query latency by 45%"*).
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: EDUCATION */}
                  {activeStep === 4 && (
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-4">
                        <div>
                          <h2 className="text-xl font-extrabold text-[#252525] tracking-tight flex items-center gap-2">
                            <span>Education</span>
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#FA0C400D] text-[#FA0C40] border border-[#FA0C40]/20">
                              +12%
                            </span>
                          </h2>
                          <p className="text-xs text-[#6B6B6B] mt-1">
                            Add your university degrees, colleges, diploma credentials, and academic coursework.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const newEdu = {
                              id: Date.now(),
                              institution: "",
                              degree: "",
                              city: "",
                              marksType: "CGPA",
                              marks: "",
                              startMonth: "2018",
                              startYear: "2018",
                              endMonth: "2022",
                              endYear: "2022",
                              isCurrent: false,
                              description: "",
                            };
                            setResume((r) => ({ ...r, education: [...r.education, newEdu] }));
                          }}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#252525] hover:bg-[#FA0C40] text-white text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Education</span>
                        </button>
                      </div>

                      <div className="space-y-4 my-4">
                        {resume.education.map((edu) => (
                          <RepeatableEntryCard
                            key={edu.id}
                            title={edu.degree || "Untitled Degree"}
                            subtitle={edu.institution || "School / College"}
                            dateRange={`${edu.startYear} - ${edu.isCurrent ? "Present" : edu.endYear}`}
                            onDuplicate={() => {
                              const dupe = { ...edu, id: Date.now(), degree: `${edu.degree} (Copy)` };
                              setResume((r) => ({ ...r, education: [...r.education, dupe] }));
                              showToast("Education entry duplicated.");
                            }}
                            onDelete={() => {
                              setResume((r) => ({
                                ...r,
                                education: r.education.filter((e) => e.id !== edu.id),
                              }));
                              showToast("Education entry removed.");
                            }}
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="text-xs font-bold text-[#252525] block mb-1">School / University</label>
                                <input
                                  type="text"
                                  value={edu.institution}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setResume((r) => ({
                                      ...r,
                                      education: r.education.map((item) =>
                                        item.id === edu.id ? { ...item, institution: val } : item
                                      ),
                                    }));
                                  }}
                                  placeholder="e.g. IIT Madras / BITS Pilani"
                                  className="w-full px-3 py-2 bg-[#FAFAFA] border border-[#252525]/15 focus:border-[#FA0C40] rounded-xl text-xs sm:text-sm text-[#252525] focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-bold text-[#252525] block mb-1">Degree / Major</label>
                                <input
                                  type="text"
                                  value={edu.degree}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setResume((r) => ({
                                      ...r,
                                      education: r.education.map((item) =>
                                        item.id === edu.id ? { ...item, degree: val } : item
                                      ),
                                    }));
                                  }}
                                  placeholder="e.g. B.Tech in Computer Science"
                                  className="w-full px-3 py-2 bg-[#FAFAFA] border border-[#252525]/15 focus:border-[#FA0C40] rounded-xl text-xs sm:text-sm text-[#252525] focus:outline-none"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="text-xs font-bold text-[#252525] block mb-1">City / State</label>
                                <input
                                  type="text"
                                  value={edu.city}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setResume((r) => ({
                                      ...r,
                                      education: r.education.map((item) =>
                                        item.id === edu.id ? { ...item, city: val } : item
                                      ),
                                    }));
                                  }}
                                  placeholder="e.g. Chennai, Tamil Nadu"
                                  className="w-full px-3 py-2 bg-[#FAFAFA] border border-[#252525]/15 focus:border-[#FA0C40] rounded-xl text-xs sm:text-sm text-[#252525] focus:outline-none"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="text-[11px] font-bold text-[#6B6B6B] block mb-1">Score Type</label>
                                  <select
                                    value={edu.marksType}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setResume((r) => ({
                                        ...r,
                                        education: r.education.map((item) =>
                                          item.id === edu.id ? { ...item, marksType: val } : item
                                        ),
                                      }));
                                    }}
                                    className="w-full px-2.5 py-2 bg-[#FAFAFA] border border-[#252525]/15 rounded-xl text-xs"
                                  >
                                    <option value="CGPA">CGPA / 10</option>
                                    <option value="Percentage">Percentage %</option>
                                    <option value="GPA">GPA / 4.0</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="text-[11px] font-bold text-[#6B6B6B] block mb-1">Marks / Score</label>
                                  <input
                                    type="text"
                                    value={edu.marks}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setResume((r) => ({
                                        ...r,
                                        education: r.education.map((item) =>
                                          item.id === edu.id ? { ...item, marks: val } : item
                                        ),
                                      }));
                                    }}
                                    placeholder="e.g. 8.9"
                                    className="w-full px-3 py-2 bg-[#FAFAFA] border border-[#252525]/15 rounded-xl text-xs sm:text-sm text-[#252525]"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-1">
                              <div>
                                <label className="text-[11px] font-bold text-[#6B6B6B] block mb-1">Start Year</label>
                                <select
                                  value={edu.startYear}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setResume((r) => ({
                                      ...r,
                                      education: r.education.map((item) =>
                                        item.id === edu.id ? { ...item, startYear: val } : item
                                      ),
                                    }));
                                  }}
                                  className="w-full px-2.5 py-1.5 bg-[#FAFAFA] border border-[#252525]/15 rounded-lg text-xs"
                                >
                                  {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                                </select>
                              </div>
                              <div>
                                <label className="text-[11px] font-bold text-[#6B6B6B] block mb-1">Graduation Year</label>
                                <select
                                  value={edu.endYear}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setResume((r) => ({
                                      ...r,
                                      education: r.education.map((item) =>
                                        item.id === edu.id ? { ...item, endYear: val } : item
                                      ),
                                    }));
                                  }}
                                  className="w-full px-2.5 py-1.5 bg-[#FAFAFA] border border-[#252525]/15 rounded-lg text-xs"
                                >
                                  {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                                </select>
                              </div>
                            </div>

                            <div className="pt-2">
                              <label className="text-xs font-bold text-[#252525] block mb-1">
                                Honors, Activities & Coursework
                              </label>
                              <RichTextField
                                value={edu.description}
                                onChange={(val) => {
                                  setResume((r) => ({
                                    ...r,
                                    education: r.education.map((item) =>
                                      item.id === edu.id ? { ...item, description: val } : item
                                    ),
                                  }));
                                }}
                                placeholder="e.g. Dean's Honor Roll, Published research paper…"
                                rows={2}
                                onAskAi={() => handleAiSuggest("education", edu.id)}
                                isAiThinking={isAiThinking}
                                aiLabel="Add Honors with AI"
                              />
                            </div>
                          </RepeatableEntryCard>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 5: SKILLS */}
                  {activeStep === 5 && (
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h2 className="text-xl font-extrabold text-[#252525] tracking-tight flex items-center gap-2">
                            <span>Skills & Competencies</span>
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#FA0C400D] text-[#FA0C40] border border-[#FA0C40]/20">
                              +10%
                            </span>
                          </h2>
                          <p className="text-xs text-[#6B6B6B] mt-1">
                            Pick 5 to 10 relevant skills matching your target job descriptions.
                          </p>
                        </div>

                        <label className="flex items-center gap-2 bg-slate-50 border border-[#252525]/10 rounded-full px-3 py-1.5 cursor-pointer shrink-0">
                          <span className="text-[11px] font-bold text-[#252525]">Hide Level in Resume</span>
                          <input
                            type="checkbox"
                            checked={resume.hideSkillLevel}
                            onChange={(e) => setResume((r) => ({ ...r, hideSkillLevel: e.target.checked }))}
                            className="sr-only peer"
                          />
                          <div className="w-8 h-4 bg-[#252525]/15 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#252525]/20 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#FA0C40] relative" />
                        </label>
                      </div>

                      <div className="space-y-2.5 my-4">
                        {resume.skills.map((skill) => (
                          <div
                            key={skill.id}
                            className="bg-white border border-[#252525]/10 rounded-2xl p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                          >
                            <div className="flex-1">
                              <input
                                type="text"
                                value={skill.name}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setResume((r) => ({
                                    ...r,
                                    skills: r.skills.map((s) => (s.id === skill.id ? { ...s, name: val } : s)),
                                  }));
                                }}
                                placeholder="Skill name (e.g. React, Python)"
                                className="w-full font-bold text-xs sm:text-sm text-[#252525] bg-transparent focus:outline-none"
                              />
                            </div>

                            {!resume.hideSkillLevel && (
                              <div className="flex items-center gap-2.5">
                                <span className="text-[11px] font-extrabold text-[#FA0C40] min-w-[75px] text-right">
                                  {SKILL_LEVEL_NAMES[skill.level] || "Skillful"}
                                </span>
                                <div className="flex gap-1">
                                  {[1, 2, 3, 4, 5].map((lvl) => (
                                    <button
                                      key={lvl}
                                      type="button"
                                      onClick={() => {
                                        setResume((r) => ({
                                          ...r,
                                          skills: r.skills.map((s) => (s.id === skill.id ? { ...s, level: lvl } : s)),
                                        }));
                                      }}
                                      className={`w-4 h-5 rounded-xs transition-all cursor-pointer ${
                                        lvl <= skill.level
                                          ? "bg-[#FA0C40] shadow-xs"
                                          : "bg-slate-200 hover:bg-slate-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => {
                                  const dupe = { ...skill, id: Date.now(), name: `${skill.name} (Copy)` };
                                  setResume((r) => ({ ...r, skills: [...r.skills, dupe] }));
                                }}
                                className="w-7 h-7 rounded-lg hover:bg-[#252525]/5 text-[#6B6B6B] flex items-center justify-center cursor-pointer"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setResume((r) => ({
                                    ...r,
                                    skills: r.skills.filter((s) => s.id !== skill.id),
                                  }));
                                }}
                                className="w-7 h-7 rounded-lg hover:bg-rose-50 text-[#6B6B6B] hover:text-rose-600 flex items-center justify-center cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const newSkill = { id: Date.now(), name: "", level: 3 };
                          setResume((r) => ({ ...r, skills: [...r.skills, newSkill] }));
                        }}
                        className="px-4 py-2 rounded-full border border-[#252525]/15 hover:border-[#FA0C40] text-xs font-bold text-[#252525] hover:text-[#FA0C40] flex items-center gap-1.5 transition-colors cursor-pointer mb-5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Custom Skill</span>
                      </button>

                      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mb-4">
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <p className="text-xs font-extrabold text-[#252525]">Based on your role & experience</p>
                          <button
                            type="button"
                            onClick={() => showToast("Loaded fresh skill suggestions.")}
                            className="text-[11px] font-bold text-[#FA0C40] hover:underline cursor-pointer"
                          >
                            + Suggest more
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {SUGGESTED_SKILLS_POOL.map((skillName) => {
                            const isAlreadyAdded = resume.skills.some((s) => s.name.toLowerCase() === skillName.toLowerCase());
                            return (
                              <button
                                key={skillName}
                                type="button"
                                disabled={isAlreadyAdded}
                                onClick={() => {
                                  setResume((r) => ({
                                    ...r,
                                    skills: [...r.skills, { id: Date.now(), name: skillName, level: 4 }],
                                  }));
                                  showToast(`Added "${skillName}" to skills.`);
                                }}
                                className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                                  isAlreadyAdded
                                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                                    : "bg-white border border-slate-200 text-[#252525] hover:border-[#FA0C40] hover:text-[#FA0C40]"
                                }`}
                              >
                                <Plus className="w-3 h-3" />
                                <span>{skillName}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 6: LINKS */}
                  {activeStep === 6 && (
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-4">
                        <div>
                          <h2 className="text-xl font-extrabold text-[#252525] tracking-tight flex items-center gap-2">
                            <span>Website & Social Links</span>
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#FA0C400D] text-[#FA0C40] border border-[#FA0C40]/20">
                              +6%
                            </span>
                          </h2>
                          <p className="text-xs text-[#6B6B6B] mt-1">
                            Add your GitHub, LinkedIn, portfolio website, or design profile URLs.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const newLink = { id: Date.now(), label: `Link ${resume.socialLinks.length + 1}`, url: "" };
                            setResume((r) => ({ ...r, socialLinks: [...r.socialLinks, newLink] }));
                          }}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#252525] hover:bg-[#FA0C40] text-white text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Link</span>
                        </button>
                      </div>

                      <div className="space-y-3 my-4">
                        {resume.socialLinks.map((link) => (
                          <div key={link.id} className="bg-white border border-[#252525]/10 rounded-2xl p-4 shadow-2xs space-y-2.5">
                            <div className="flex items-center justify-between">
                              <input
                                type="text"
                                value={link.label}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setResume((r) => ({
                                    ...r,
                                    socialLinks: r.socialLinks.map((l) => (l.id === link.id ? { ...l, label: val } : l)),
                                  }));
                                }}
                                placeholder="e.g. LinkedIn, GitHub, Portfolio"
                                className="font-extrabold text-xs text-[#252525] bg-transparent focus:outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setResume((r) => ({
                                    ...r,
                                    socialLinks: r.socialLinks.filter((l) => l.id !== link.id),
                                  }));
                                }}
                                className="w-7 h-7 rounded-lg hover:bg-rose-50 text-[#6B6B6B] hover:text-rose-600 flex items-center justify-center cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="relative">
                              <Globe className="w-4 h-4 text-[#6B6B6B] absolute left-3.5 top-3" />
                              <input
                                type="url"
                                value={link.url}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setResume((r) => ({
                                    ...r,
                                    socialLinks: r.socialLinks.map((l) => (l.id === link.id ? { ...l, url: val } : l)),
                                  }));
                                }}
                                placeholder="https://linkedin.com/in/yourprofile"
                                className="w-full pl-10 pr-3.5 py-2 bg-[#FAFAFA] border border-[#252525]/15 focus:border-[#FA0C40] rounded-xl text-xs sm:text-sm text-[#252525] focus:outline-none"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 7: HOBBIES */}
                  {activeStep === 7 && (
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div>
                          <h2 className="text-xl font-extrabold text-[#252525] tracking-tight flex items-center gap-2">
                            <span>Hobbies & Personal Interests</span>
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#FA0C400D] text-[#FA0C40] border border-[#FA0C40]/20">
                              +4%
                            </span>
                          </h2>
                          <p className="text-xs text-[#6B6B6B] mt-1 leading-relaxed">
                            List non-work passions that show curiosity, discipline, and personality.
                          </p>
                        </div>
                      </div>

                      <div className="my-5">
                        <RichTextField
                          value={resume.hobbies}
                          onChange={(v) => setResume((r) => ({ ...r, hobbies: v }))}
                          placeholder="e.g. Marathon running, Open-source tool building, Chess tournaments, Sci-fi literature…"
                          rows={3}
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 8: JOB PREFERENCE */}
                  {activeStep === 8 && (
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h2 className="text-xl font-extrabold text-[#252525] tracking-tight flex items-center gap-2">
                            <span>Job Search & Work Preferences</span>
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#FA0C400D] text-[#FA0C40] border border-[#FA0C40]/20">
                              +6%
                            </span>
                          </h2>
                          <p className="text-xs text-[#6B6B6B] mt-1">
                            Configure your compensation, notice period, and preferred work models.
                          </p>
                        </div>
                      </div>

                      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 my-4 flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-extrabold text-[#252525]">Share my resume with verified tech recruiters</p>
                            <p className="text-[11px] text-[#6B6B6B] mt-0.5 leading-relaxed">
                              Allows vetted tech companies to discover your profile. Contact info is shielded until you accept.
                            </p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                          <input
                            type="checkbox"
                            checked={resume.jobPreference.shareWithRecruiters}
                            onChange={(e) =>
                              setResume((r) => ({
                                ...r,
                                jobPreference: { ...r.jobPreference, shareWithRecruiters: e.target.checked },
                              }))
                            }
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-[#252525]/15 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#252525]/20 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600" />
                        </label>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div>
                            <label className="text-xs font-bold text-[#252525] block mb-1">Current Annual CTC</label>
                            <input
                              type="text"
                              value={resume.jobPreference.currentSalary}
                              onChange={(e) =>
                                setResume((r) => ({
                                  ...r,
                                  jobPreference: { ...r.jobPreference, currentSalary: e.target.value },
                                }))
                              }
                              placeholder="e.g. 24 (Lakhs/yr)"
                              className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-[#252525]/15 rounded-xl text-xs sm:text-sm text-[#252525]"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-[#252525] block mb-1">Expected Annual CTC</label>
                            <input
                              type="text"
                              value={resume.jobPreference.desiredSalary}
                              onChange={(e) =>
                                setResume((r) => ({
                                  ...r,
                                  jobPreference: { ...r.jobPreference, desiredSalary: e.target.value },
                                }))
                              }
                              placeholder="e.g. 35 (Lakhs/yr)"
                              className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-[#252525]/15 rounded-xl text-xs sm:text-sm text-[#252525]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div>
                            <label className="text-xs font-bold text-[#252525] block mb-1">Notice Period</label>
                            <select
                              value={resume.jobPreference.noticePeriod}
                              onChange={(e) =>
                                setResume((r) => ({
                                  ...r,
                                  jobPreference: { ...r.jobPreference, noticePeriod: e.target.value },
                                }))
                              }
                              className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-[#252525]/15 rounded-xl text-xs sm:text-sm"
                            >
                              <option value="Immediate">Immediate / Available Now</option>
                              <option value="15 days">15 Days</option>
                              <option value="30 days">30 Days (1 Month)</option>
                              <option value="60 days">60 Days (2 Months)</option>
                              <option value="90 days">90 Days (3 Months)</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs font-bold text-[#252525] block mb-1">Work Mode</label>
                            <select
                              value={resume.jobPreference.workMode}
                              onChange={(e) =>
                                setResume((r) => ({
                                  ...r,
                                  jobPreference: { ...r.jobPreference, workMode: e.target.value },
                                }))
                              }
                              className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-[#252525]/15 rounded-xl text-xs sm:text-sm"
                            >
                              <option value="Remote">Remote</option>
                              <option value="Hybrid">Hybrid</option>
                              <option value="On-site">On-site Office</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 9: ADDITIONAL SECTIONS */}
                  {activeStep === 9 && (
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-4">
                        <div>
                          <h2 className="text-xl font-extrabold text-[#252525] tracking-tight flex items-center gap-2">
                            <span>Additional Sections</span>
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#FA0C400D] text-[#FA0C40] border border-[#FA0C40]/20">
                              +4%
                            </span>
                          </h2>
                          <p className="text-xs text-[#6B6B6B] mt-1">
                            Enrich your profile with standout Projects, Languages, or Custom sections.
                          </p>
                        </div>
                      </div>

                      {/* Projects */}
                      <div className="bg-slate-50/70 border border-[#252525]/10 rounded-2xl p-4 sm:p-5 mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <FolderGit2 className="w-4 h-4 text-[#FA0C40]" />
                            <h3 className="font-extrabold text-sm text-[#252525]">Key Projects</h3>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const newProj = {
                                id: Date.now(),
                                title: "",
                                techStack: "",
                                link: "",
                                description: "",
                              };
                              setResume((r) => ({
                                ...r,
                                additionalSections: {
                                  ...r.additionalSections,
                                  projects: [...r.additionalSections.projects, newProj],
                                },
                              }));
                            }}
                            className="px-3 py-1.5 rounded-full bg-white border border-[#252525]/15 hover:border-[#FA0C40] text-xs font-bold text-[#252525] flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add Project</span>
                          </button>
                        </div>

                        <div className="space-y-3">
                          {resume.additionalSections.projects.map((proj) => (
                            <RepeatableEntryCard
                              key={proj.id}
                              title={proj.title || "Untitled Project"}
                              subtitle={proj.techStack || "Tech stack"}
                              onDelete={() => {
                                setResume((r) => ({
                                  ...r,
                                  additionalSections: {
                                    ...r.additionalSections,
                                    projects: r.additionalSections.projects.filter((p) => p.id !== proj.id),
                                  },
                                }));
                              }}
                            >
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="text-xs font-bold text-[#252525] block mb-1">Project Title</label>
                                  <input
                                    type="text"
                                    value={proj.title}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setResume((r) => ({
                                        ...r,
                                        additionalSections: {
                                          ...r.additionalSections,
                                          projects: r.additionalSections.projects.map((p) =>
                                            p.id === proj.id ? { ...p, title: val } : p
                                          ),
                                        },
                                      }));
                                    }}
                                    placeholder="e.g. Distributed Cache Engine"
                                    className="w-full px-3 py-2 bg-[#FAFAFA] border border-[#252525]/15 rounded-xl text-xs sm:text-sm text-[#252525]"
                                  />
                                </div>
                                <div>
                                  <label className="text-xs font-bold text-[#252525] block mb-1">Tech Stack</label>
                                  <input
                                    type="text"
                                    value={proj.techStack}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setResume((r) => ({
                                        ...r,
                                        additionalSections: {
                                          ...r.additionalSections,
                                          projects: r.additionalSections.projects.map((p) =>
                                            p.id === proj.id ? { ...p, techStack: val } : p
                                          ),
                                        },
                                      }));
                                    }}
                                    placeholder="e.g. Go, Redis, Docker"
                                    className="w-full px-3 py-2 bg-[#FAFAFA] border border-[#252525]/15 rounded-xl text-xs sm:text-sm text-[#252525]"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="text-xs font-bold text-[#252525] block mb-1">Project Link</label>
                                <input
                                  type="url"
                                  value={proj.link}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setResume((r) => ({
                                      ...r,
                                      additionalSections: {
                                        ...r.additionalSections,
                                        projects: r.additionalSections.projects.map((p) =>
                                          p.id === proj.id ? { ...p, link: val } : p
                                        ),
                                      },
                                    }));
                                  }}
                                  placeholder="https://github.com/yourname/project"
                                  className="w-full px-3 py-2 bg-[#FAFAFA] border border-[#252525]/15 rounded-xl text-xs sm:text-sm text-[#252525]"
                                />
                              </div>

                              <div className="pt-1">
                                <label className="text-xs font-bold text-[#252525] block mb-1">Project Description</label>
                                <RichTextField
                                  value={proj.description}
                                  onChange={(val) => {
                                    setResume((r) => ({
                                      ...r,
                                      additionalSections: {
                                        ...r.additionalSections,
                                        projects: r.additionalSections.projects.map((p) =>
                                          p.id === proj.id ? { ...p, description: val } : p
                                        ),
                                      },
                                    }));
                                  }}
                                  placeholder="Highlight metrics & architecture…"
                                  rows={2}
                                  onAskAi={() => handleAiSuggest("project", proj.id)}
                                  isAiThinking={isAiThinking}
                                  aiLabel="Add AI Metrics"
                                />
                              </div>
                            </RepeatableEntryCard>
                          ))}
                        </div>
                      </div>

                      {/* Languages */}
                      <div className="bg-slate-50/70 border border-[#252525]/10 rounded-2xl p-4 sm:p-5 mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <LangIcon className="w-4 h-4 text-[#FA0C40]" />
                            <h3 className="font-extrabold text-sm text-[#252525]">Languages</h3>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const newLang = { id: Date.now(), name: "", proficiency: "Professional Working" };
                              setResume((r) => ({
                                ...r,
                                additionalSections: {
                                  ...r.additionalSections,
                                  languages: [...r.additionalSections.languages, newLang],
                                },
                              }));
                            }}
                            className="px-3 py-1.5 rounded-full bg-white border border-[#252525]/15 hover:border-[#FA0C40] text-xs font-bold text-[#252525] flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add Language</span>
                          </button>
                        </div>

                        <div className="space-y-2.5">
                          {resume.additionalSections.languages.map((lang) => (
                            <div key={lang.id} className="bg-white border border-[#252525]/10 rounded-xl p-3 flex items-center gap-3">
                              <input
                                type="text"
                                value={lang.name}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setResume((r) => ({
                                    ...r,
                                    additionalSections: {
                                      ...r.additionalSections,
                                      languages: r.additionalSections.languages.map((l) =>
                                        l.id === lang.id ? { ...l, name: val } : l
                                      ),
                                    },
                                  }));
                                }}
                                placeholder="e.g. English, Hindi, German"
                                className="flex-1 font-bold text-xs text-[#252525] bg-transparent focus:outline-none"
                              />
                              <select
                                value={lang.proficiency}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setResume((r) => ({
                                    ...r,
                                    additionalSections: {
                                      ...r.additionalSections,
                                      languages: r.additionalSections.languages.map((l) =>
                                        l.id === lang.id ? { ...l, proficiency: val } : l
                                      ),
                                    },
                                  }));
                                }}
                                className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                              >
                                <option value="Native / Bilingual">Native / Bilingual</option>
                                <option value="Full Professional">Full Professional</option>
                                <option value="Professional Working">Professional Working</option>
                                <option value="Elementary">Elementary</option>
                              </select>
                              <button
                                type="button"
                                onClick={() => {
                                  setResume((r) => ({
                                    ...r,
                                    additionalSections: {
                                      ...r.additionalSections,
                                      languages: r.additionalSections.languages.filter((l) => l.id !== lang.id),
                                    },
                                  }));
                                }}
                                className="w-6 h-6 rounded hover:bg-rose-50 text-[#6B6B6B] hover:text-rose-600 flex items-center justify-center cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* BOTTOM MULTI-STEP NAVIGATION BAR */}
                  <div className="shrink-0 mt-6 pt-4 border-t border-[#252525]/10 flex flex-row items-center justify-between gap-2 sm:gap-4 sticky bottom-0 bg-white/95 backdrop-blur-md -mx-5 -mb-5 sm:-mx-7 sm:-mb-7 p-3.5 sm:p-5 rounded-b-3xl shadow-sm z-10">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      disabled={activeStep === 1}
                      className="px-3.5 sm:px-5 py-2.5 rounded-full border border-[#252525]/15 hover:border-[#252525] disabled:opacity-30 disabled:hover:border-[#252525]/15 text-xs font-bold text-[#252525] transition-colors flex items-center justify-center gap-1 cursor-pointer disabled:cursor-not-allowed min-h-[44px] shrink-0"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>

                    <div className="flex items-center justify-center gap-1 sm:gap-1.5 overflow-x-auto py-1 max-w-[140px] sm:max-w-none">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((s) => (
                        <div
                          key={s}
                          onClick={() => setActiveStep(s)}
                          className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-all flex items-center justify-center text-[7px] sm:text-[8px] font-bold shrink-0 ${
                            activeStep === s
                              ? "bg-[#FA0C40] text-white scale-125 shadow-xs"
                              : s < activeStep
                              ? "bg-emerald-500 text-white"
                              : "bg-[#252525]/15 hover:bg-[#252525]/30 text-transparent"
                          }`}
                          title={`Step ${s}: ${STEP_TITLES[s - 1]}`}
                        >
                          {s < activeStep ? "✓" : s}
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-4 sm:px-7 py-2.5 rounded-full bg-[#FA0C40] hover:bg-[#D40936] text-white text-xs font-extrabold shadow-md shadow-[#FA0C40]/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px] shrink-0"
                    >
                      <span className="truncate max-w-[100px] sm:max-w-none">
                        {activeStep === 9
                          ? "Complete"
                          : `Next (${activeStep}/9)`}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CUSTOMIZE CONTROLS (MATCHED HEIGHT) */}
            {activeTab === "customize" && (
              <div className="bg-white rounded-3xl border border-[#252525]/10 shadow-[0_4px_20px_rgba(37,37,37,0.03)] p-5 sm:p-6 h-full flex flex-col overflow-y-auto space-y-5 animate-scale-in">
                {/* Section 1: Color Swatches Palette (Fixed Overflow Grid) */}
                <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4 sm:p-5 shrink-0">
                  <h2 className="text-base font-extrabold text-[#252525] tracking-tight mb-1">
                    Accent Color Palette
                  </h2>
                  <p className="text-xs text-[#6B6B6B] mb-3.5">
                    Choose a color theme for borders, section headers, badges, and timeline markers.
                  </p>

                  {/* Responsive Grid for all 10 swatches + custom picker - NO CLIPPING */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2.5 w-full">
                    {COLOR_SWATCHES.map((swatch) => {
                      const isSelected = (resume.accentColor || selectedTemplate.accentColor) === swatch.color;
                      return (
                        <button
                          key={swatch.color}
                          type="button"
                          onClick={() => {
                            setResume((r) => ({ ...r, accentColor: swatch.color }));
                            showToast(`Accent color set to ${swatch.name}.`);
                          }}
                          className={`group flex items-center gap-2 px-3 py-2 rounded-xl border transition-all cursor-pointer text-left w-full ${
                            isSelected
                              ? "border-[#252525] bg-white shadow-xs ring-2 ring-[#252525]/20 font-extrabold"
                              : "border-slate-200 hover:border-slate-400 bg-white"
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full shadow-2xs border border-white shrink-0"
                            style={{ backgroundColor: swatch.color }}
                          />
                          <span className="text-xs text-[#252525] font-semibold truncate">{swatch.name}</span>
                        </button>
                      );
                    })}

                    {/* Custom Hex Color Picker */}
                    <label className="flex items-center gap-2 px-3 py-2 rounded-xl border border-dashed border-slate-300 hover:border-[#FA0C40] bg-white cursor-pointer transition-all w-full">
                      <input
                        type="color"
                        value={resume.accentColor}
                        onChange={(e) => setResume((r) => ({ ...r, accentColor: e.target.value }))}
                        className="w-3.5 h-3.5 rounded-full border-0 p-0 cursor-pointer shrink-0"
                      />
                      <span className="text-xs font-bold text-[#6B6B6B] truncate">Custom Hex</span>
                    </label>
                  </div>
                </div>

                {/* Section 2: Switch Layout Template Grid */}
                <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex-1 flex flex-col min-h-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5 shrink-0">
                    <div>
                      <h2 className="text-base font-extrabold text-[#252525] tracking-tight">
                        Switch Layout Template
                      </h2>
                      <p className="text-xs text-[#6B6B6B] mt-0.5">
                        Click any card to re-render the live document preview.
                      </p>
                    </div>

                    {/* ATS-Only Toggle */}
                    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3 py-1 self-start sm:self-auto shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#FA0C40]" />
                      <span className="text-[11px] font-bold text-[#252525]">ATS Only</span>
                      <input
                        type="checkbox"
                        checked={customizeAtsOnly}
                        onChange={(e) => setCustomizeAtsOnly(e.target.checked)}
                        className="rounded text-[#FA0C40]"
                      />
                    </div>
                  </div>

                  {/* Category Pills */}
                  <div className="flex gap-1.5 overflow-x-auto pb-2.5 mb-3.5 border-b border-slate-200/80 no-scrollbar shrink-0">
                    {TEMPLATE_CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCustomizeCategory(cat)}
                        className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                          customizeCategory === cat
                            ? "bg-[#FA0C40] text-white shadow-xs font-extrabold"
                            : "bg-white text-[#252525] border border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* 2-Column Template Mini Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 flex-1 overflow-y-auto pr-1">
                    {filteredCustomizeTemplates.map((tmpl) => {
                      const isSelected = (resume.templateId || "puffin") === tmpl.id;
                      return (
                        <div
                          key={tmpl.id}
                          onClick={() => {
                            setResume((r) => ({
                              ...r,
                              templateId: tmpl.id,
                              accentColor: tmpl.accentColor || r.accentColor,
                            }));
                            showToast(`Applied "${tmpl.name}" layout (${tmpl.layoutStyle}).`);
                          }}
                          className={`p-3 rounded-2xl border bg-white cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 ${
                            isSelected
                              ? "border-[#FA0C40] ring-2 ring-[#FA0C40]/30 shadow-sm"
                              : "border-slate-200 hover:border-slate-400"
                          }`}
                        >
                          <div className="relative mb-2 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 p-0.5">
                            {isSelected && (
                              <div className="absolute top-2 right-2 z-10 w-5 h-5 rounded-full bg-[#FA0C40] text-white flex items-center justify-center shadow-xs">
                                <Check className="w-3 h-3" />
                              </div>
                            )}
                            <TemplatePreviewMockup template={tmpl} />
                          </div>
                          <div className="flex items-center justify-between">
                            <h4 className="font-extrabold text-xs text-[#252525]">{tmpl.name}</h4>
                            <span className="text-[10px] font-bold text-[#6B6B6B] bg-slate-100 px-1.5 py-0.2 rounded">
                              {tmpl.category}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: TAILOR CONTROLS (MATCHED HEIGHT) */}
            {activeTab === "tailor" && (
              <div className="bg-white rounded-3xl border border-[#252525]/10 p-6 sm:p-8 shadow-[0_4px_20px_rgba(37,37,37,0.03)] h-full flex flex-col overflow-y-auto space-y-4 animate-scale-in">
                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-[#FA0C400D] border border-[#FA0C40]/20 text-[#FA0C40] flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold text-[#252525] tracking-tight">AI Job Description Tailoring</h2>
                    <p className="text-xs text-[#6B6B6B]">Match keywords & score ATS pass rate against a target job.</p>
                  </div>
                </div>

                <div className="bg-[#FAFAFA] border border-[#252525]/15 rounded-2xl p-4 space-y-3 flex-1 flex flex-col">
                  <label className="text-xs font-bold text-[#252525] block">Target Job Description</label>
                  <textarea
                    rows={8}
                    placeholder="Paste requirements from LinkedIn, Naukri, or Instahyre…"
                    className="w-full flex-1 px-3 py-2.5 bg-white border border-[#252525]/15 rounded-xl text-xs sm:text-sm text-[#252525] focus:outline-none focus:ring-2 focus:ring-[#FA0C40]/20 resize-none min-h-[160px]"
                  />
                  <button
                    type="button"
                    onClick={() => showToast("AI Tailoring engine connecting — analysis enabled in next release.")}
                    className="w-full py-2.5 rounded-full bg-[#FA0C40] hover:bg-[#D40936] text-white text-xs font-extrabold transition-all shadow-xs cursor-pointer shrink-0"
                  >
                    Analyze Match Score & Optimize Bullets
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* RIGHT COLUMN: LIVE RESUME DOCUMENT CANVAS PREVIEW (MATCHED HEIGHT) */}
          {/* ----------------------------------------------------------------- */}
          <div className={`w-full min-w-0 flex flex-col h-full overflow-hidden ${activeTab === "customize" ? "flex" : "hidden lg:flex"}`}>
            {/* Mobile-Only Quick Theme Customizer */}
            <div className="lg:hidden mb-3 bg-white rounded-2xl border border-slate-200 p-3 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#252525]">Quick Accent Swatch</span>
                <span className="text-[10px] font-bold text-[#FA0C40]">{resume.accentColor || selectedTemplate.accentColor}</span>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {COLOR_SWATCHES.map((swatch) => {
                  const isSelected = (resume.accentColor || selectedTemplate.accentColor) === swatch.color;
                  return (
                    <button
                      key={swatch.color}
                      type="button"
                      onClick={() => setResume((r) => ({ ...r, accentColor: swatch.color }))}
                      className={`w-7 h-7 rounded-full shrink-0 border-2 transition-transform cursor-pointer ${
                        isSelected ? "border-[#252525] scale-110 shadow-xs" : "border-white shadow-2xs"
                      }`}
                      style={{ backgroundColor: swatch.color }}
                      title={swatch.name}
                    />
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-1 sm:px-2 shrink-0">
              <div className="flex items-center gap-2 text-xs font-bold text-[#6B6B6B]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>
                  Real-Time Preview · <strong className="text-[#252525]">{selectedTemplate?.name || "Modern Minimal"}</strong>
                  <span className="text-[10px] text-[#FA0C40] ml-1.5 font-extrabold uppercase bg-[#FA0C400D] px-2 py-0.5 rounded-full border border-[#FA0C40]/20">
                    {selectedTemplate?.layoutStyle || "single-column"}
                  </span>
                  <span className="text-[10px] text-slate-500 ml-1.5 font-bold bg-slate-100 px-2 py-0.5 rounded-full">
                    {previewPageCount} {previewPageCount === 1 ? "Page" : "Pages"}
                  </span>
                </span>
              </div>
              <div>
                {activeTab !== "customize" ? (
                  <button
                    type="button"
                    onClick={() => setActiveTab("customize")}
                    className="text-xs font-extrabold text-[#FA0C40] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Customize Style</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveTab("editor")}
                    className="text-xs font-extrabold text-[#252525] hover:text-[#FA0C40] transition-colors flex items-center gap-1.5 cursor-pointer bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs hover:border-[#FA0C40]"
                  >
                    <span>← Back to Editor</span>
                  </button>
                )}
              </div>
            </div>

            {/* Dynamic Multi-Page Document Workbench Canvas */}
            <div className="flex-1 w-full bg-[#F4F5F7] rounded-3xl p-3 sm:p-5 lg:p-6 border border-[#252525]/10 shadow-[0_4px_24px_rgba(37,37,37,0.04)] overflow-y-auto overflow-x-auto relative flex flex-col items-center select-none">
              <div className="w-full max-w-[820px] flex flex-col items-center">
                <LiveResumeDocument
                  resume={resume}
                  template={selectedTemplate}
                  customAccent={currentAccent}
                  onPageCountChange={setPreviewPageCount}
                />
              </div>

              {/* Floating Multi-Page Status Badge */}
              <div className="sticky bottom-2 right-4 self-end mt-2 z-10 shrink-0">
                <span className="text-[10px] font-bold bg-[#252525]/90 text-white px-3 py-1 rounded-full backdrop-blur-sm shadow-md inline-block">
                  {previewPageCount} {previewPageCount === 1 ? "Page" : "Pages"} · A4 Multi-Page Live View
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* MODALS                                                                    */}
      {/* ========================================================================= */}
      {/* Build Method Selector Modal */}
      <BuildMethodModal
        isOpen={isMethodModalOpen}
        onClose={() => setIsMethodModalOpen(false)}
        onSelectMethod={(m) => {
          setBuildPath(m);
          setIsMethodModalOpen(false);
          setActiveTab("editor");
          showToast(`Switched build method to ${m}.`);
        }}
        selectedTemplateName={selectedTemplate?.name}
      />

      {/* Processing Document Overlay Modal */}
      <ProcessingDocumentModal
        isOpen={isProcessingUpload}
        templateName={selectedTemplate?.name}
      />

      {/* Completion Modal */}
      <CompletionModal
        isOpen={isCompletionModalOpen}
        onClose={() => setIsCompletionModalOpen(false)}
        filename={resume.title}
        onSetupProfile={() => {
          setIsCompletionModalOpen(false);
          showToast("Public profile directory coming in next release.");
          navigate("/dashboard");
        }}
      />
    </div>
  );
}
