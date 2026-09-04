import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FileText,
  Clock,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Download,
  Sparkles,
  Briefcase,
  UserCheck,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  UploadCloud,
  Share2,
  Mic,
  PenTool,
  LayoutTemplate,
} from "lucide-react";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import { useAuth } from "../contexts/AuthContext";
import { getResumes, deleteResume, downloadResumePdf } from "../api";
import useScrollReveal from "../components/landing/useScrollReveal";

const CREATE_OPTIONS = [
  {
    key: "upload",
    title: "Upload Resume",
    description: "Extract positions, skills, and summary from your existing PDF or DOCX file.",
    icon: UploadCloud,
    actionText: "Upload file",
    path: "upload",
    badge: null,
  },
  {
    key: "linkedin",
    title: "Import LinkedIn",
    description: "Sync your complete profile history, roles, and certifications with 1 click.",
    icon: Share2,
    actionText: "Sync profile",
    path: "linkedin",
    badge: null,
  },
  {
    key: "voice",
    title: "Talk to Voice AI",
    description: "Speak naturally about your career; AI turns speech into quantified ATS bullets.",
    icon: Mic,
    actionText: "Start voice",
    path: "voice",
    badge: "AI Powered",
  },
  {
    key: "scratch",
    title: "Build from Scratch",
    description: "Interactive blank canvas with real-time Claude AI bullet suggestions.",
    icon: PenTool,
    actionText: "Start blank",
    path: "scratch",
    badge: null,
  },
  {
    key: "template",
    title: "Choose a Template",
    description: "Start from a professionally designed layout and customize your details.",
    icon: LayoutTemplate,
    actionText: "Browse layouts",
    path: "scratch",
    badge: "New",
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("resumes"); // "resumes" | "studio"
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const { ref: contentRef, isVisible } = useScrollReveal(0.1);

  const fetchUserResumes = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getResumes();
      setResumes(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      setError(err.message || "Failed to load resumes.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserResumes();
  }, []);

  // Close context menu on document click
  useEffect(() => {
    const handleDocClick = () => setActiveMenuId(null);
    window.addEventListener("click", handleDocClick);
    return () => window.removeEventListener("click", handleDocClick);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const calculateCompleteness = (resume) => {
    let score = 0;
    const raw = resume.raw_ai_extraction || {};
    const personal = raw.personalDetails || raw;
    const summary = resume.professional_summary || raw.professional_summary || "";
    const exps = resume.experiences || raw.experiences || [];
    const edus = resume.education || raw.education || [];
    const skills = resume.skills || raw.skills || [];
    const links = resume.socialLinks || raw.socialLinks || raw.social_links || [];
    const jobPref = resume.jobPreference || raw.jobPreference || {};
    const additional = resume.additionalSections || raw.additionalSections || {};

    // Step 1: Personal (26%)
    if ((personal.firstName && personal.lastName) || (raw.first_name && raw.last_name) || (resume.title && resume.title !== "Untitled Resume")) {
      score += 8;
    }
    if (personal.jobTitle || raw.job_title || raw.jobTitle) score += 6;
    if (personal.email || raw.email) score += 4;
    if (personal.phone || raw.phone) score += 4;
    if (personal.city || raw.city) score += 4;

    // Step 2: Summary (14%)
    if (summary && summary.trim().length > 20) score += 14;

    // Step 3: Experience (20%)
    if (exps && exps.length > 0 && (exps[0].role || exps[0].title || exps[0].company)) score += 20;

    // Step 4: Education (12%)
    if (edus && edus.length > 0 && (edus[0].institution || edus[0].degree)) score += 12;

    // Step 5: Skills (10%)
    if (skills && skills.length >= 3) score += 10;
    else if (skills && skills.length > 0) score += 5;

    // Step 6: Links (6%)
    if (links && links.length > 0 && (links[0].url || links[0].link)) score += 6;

    // Step 8: Job Prefs (6%)
    if (jobPref && (jobPref.desiredSalary || jobPref.noticePeriod || jobPref.currentSalary)) score += 6;

    // Step 9: Extra (6%)
    if (additional?.projects?.length > 0 || additional?.languages?.length > 0 || (resume.projects && resume.projects.length > 0)) {
      score += 6;
    }

    return Math.min(100, Math.max(score, 10));
  };

  const formatDate = (isoString) => {
    if (!isoString) return "Recently";
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Recently";
    }
  };

  const handleDeleteClick = (e, resume) => {
    e.stopPropagation();
    setActiveMenuId(null);
    setResumeToDelete(resume);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!resumeToDelete) return;
    setIsDeleting(true);
    try {
      await deleteResume(resumeToDelete.id);
      setResumes((prev) => prev.filter((r) => r.id !== resumeToDelete.id));
      showToast("Resume deleted successfully.");
      setDeleteModalOpen(false);
    } catch (err) {
      showToast(err.message || "Failed to delete resume.");
    } finally {
      setIsDeleting(false);
      setResumeToDelete(null);
    }
  };

  const handleOptionClick = (option) => {
    if (option.key === "template") {
      navigate("/templates");
    } else {
      navigate(`/builder?path=${option.path}`);
    }
  };

  const displayName = user?.first_name || user?.name || user?.username || "Creator";

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#252525] font-['Plus_Jakarta_Sans'] flex flex-col justify-between">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#252525] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header openBuilder={(tab) => navigate(`/builder?path=${tab}`)} />

      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 flex-1">
        {/* ========================================================================= */}
        {/* Welcome Greeting & Squiggle */}
        {/* ========================================================================= */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#252525] tracking-tight">
            Welcome back, <span className="text-[#FA0C40]">{displayName}</span>
          </h1>
          {/* Crimson Accent Squiggle / Line */}
          <div className="mt-2 w-28 h-1 bg-gradient-to-r from-[#FA0C40] to-[#FA0C40]/20 rounded-full" />
          <p className="text-xs sm:text-sm text-[#6B6B6B] mt-2 font-normal">
            Select a creation method below to start a new ATS-optimized resume, or edit your saved documents.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* Tabs: Resumes vs AI Studio */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-3 border-b border-[#252525]/10 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab("resumes")}
            className={`pb-3.5 text-xs sm:text-sm font-extrabold relative transition-colors cursor-pointer ${
              activeTab === "resumes" ? "text-[#FA0C40]" : "text-[#6B6B6B] hover:text-[#252525]"
            }`}
          >
            <span>My Resumes</span>
            {activeTab === "resumes" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FA0C40] rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("studio")}
            className={`pb-3.5 text-xs sm:text-sm font-extrabold relative transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === "studio" ? "text-[#FA0C40]" : "text-[#6B6B6B] hover:text-[#252525]"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Studio</span>
            <span className="text-[9px] font-extrabold uppercase bg-[#FA0C40] text-white px-1.5 py-0.2 rounded-full shadow-sm">
              New
            </span>
            {activeTab === "studio" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FA0C40] rounded-full" />
            )}
          </button>
        </div>

        {/* ========================================================================= */}
        {/* Tab 1: Resumes Tab (Always-Visible Creation Grid + Saved Resumes) */}
        {/* ========================================================================= */}
        {activeTab === "resumes" && (
          <div ref={contentRef}>
            {/* Section Heading: Start New Resume */}
            <div className="mb-4">
              <h2 className="text-base sm:text-lg font-extrabold text-[#252525] tracking-tight">
                Create a New Resume
              </h2>
              <p className="text-xs text-[#6B6B6B]">
                Choose how you'd like to begin building your ATS document.
              </p>
            </div>

            {/* 5-Card Creation Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 mb-12">
              {CREATE_OPTIONS.map((opt, idx) => {
                const Icon = opt.icon;
                return (
                  <div
                    key={opt.key}
                    onClick={() => handleOptionClick(opt)}
                    style={{
                      transitionDelay: isVisible ? `${idx * 60}ms` : "0ms",
                    }}
                    className={`group bg-white rounded-3xl border border-[#252525]/10 hover:border-[#FA0C40]/50 p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-[0_12px_30px_rgba(250,12,64,0.08)] hover:-translate-y-1 relative text-left ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        <div className="w-11 h-11 rounded-2xl bg-[#FA0C400D] border border-[#FA0C40]/20 text-[#FA0C40] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#FA0C40] group-hover:text-white transition-all duration-300 shadow-sm">
                          <Icon className="w-5 h-5" />
                        </div>
                        {opt.badge && (
                          <span className="text-[9px] font-extrabold uppercase bg-[#FA0C400D] text-[#FA0C40] border border-[#FA0C40]/20 px-2 py-0.5 rounded-full">
                            {opt.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="font-extrabold text-sm sm:text-base text-[#252525] mb-1 group-hover:text-[#FA0C40] transition-colors leading-snug">
                        {opt.title}
                      </h3>
                      <p className="text-xs text-[#6B6B6B] leading-relaxed font-normal">
                        {opt.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#252525]/5 flex items-center justify-between text-xs font-bold text-[#FA0C40]">
                      <span className="text-[11px] group-hover:underline">
                        {opt.actionText}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Saved Resumes Heading */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#FA0C40]" />
                <h2 className="text-base sm:text-lg font-extrabold text-[#252525] tracking-tight">
                  Your Saved Resumes
                </h2>
                {resumes.length > 0 && (
                  <span className="text-xs font-extrabold bg-[#252525]/5 text-[#6B6B6B] px-2.5 py-0.5 rounded-full">
                    {resumes.length}
                  </span>
                )}
              </div>
            </div>

            {/* Existing Resumes Grid */}
            {isLoading ? (
              /* Loading Skeletons */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-3xl border border-[#252525]/10 p-6 animate-pulse h-64 flex flex-col justify-between"
                  >
                    <div className="h-32 bg-[#252525]/5 rounded-2xl mb-4" />
                    <div className="h-4 bg-[#252525]/10 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-[#252525]/5 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : error ? (
              /* Error Banner with Retry */
              <div className="p-6 rounded-3xl bg-white border border-[#FA0C40]/25 shadow-sm text-center mb-12">
                <AlertCircle className="w-8 h-8 text-[#FA0C40] mx-auto mb-2" />
                <p className="text-sm font-bold text-[#252525] mb-2">{error}</p>
                <button
                  onClick={fetchUserResumes}
                  className="px-5 py-2 rounded-full bg-[#FA0C40] text-white text-xs font-bold hover:bg-[#D40936] transition-colors"
                >
                  Retry Loading
                </button>
              </div>
            ) : resumes.length === 0 ? (
              /* Zero-Resumes Friendly State */
              <div className="bg-white rounded-3xl border border-[#252525]/10 p-8 sm:p-12 text-center shadow-sm mb-12">
                <div className="w-12 h-12 rounded-2xl bg-[#FA0C400D] border border-[#FA0C40]/20 text-[#FA0C40] flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold text-[#252525] mb-1">
                  No Resumes Created Yet
                </h3>
                <p className="text-xs text-[#6B6B6B] max-w-sm mx-auto leading-relaxed mb-5">
                  Get started by selecting one of the 5 creation options above to build your first tailored resume.
                </p>
              </div>
            ) : (
              /* Real Resume Cards */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {resumes.map((resume, idx) => {
                  const completeness = calculateCompleteness(resume);
                  const isMenuOpen = activeMenuId === resume.id;

                  return (
                    <div
                      key={resume.id}
                      style={{
                        transitionDelay: isVisible ? `${idx * 80}ms` : "0ms",
                      }}
                      className={`relative bg-white rounded-3xl border border-[#252525]/10 shadow-[0_10px_30px_rgba(37,37,37,0.04)] hover:shadow-[0_15px_40px_rgba(37,37,37,0.08)] hover:border-[#FA0C40]/30 transition-all duration-300 p-5 flex flex-col justify-between overflow-visible group text-left ${
                        isVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-6"
                      }`}
                    >
                      {/* Document Preview Mockup Box */}
                      <div
                        onClick={() => navigate(`/builder?resume=${resume.id}`)}
                        className="w-full h-32 rounded-2xl bg-gradient-to-b from-[#252525]/[0.02] to-[#252525]/[0.05] border border-[#252525]/10 p-3 mb-4 flex flex-col justify-between cursor-pointer group-hover:border-[#FA0C40]/40 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-[#FA0C40]" />
                            <span className="text-[10px] font-extrabold uppercase text-[#6B6B6B] tracking-wider">
                              {resume.source || "ATS Template"}
                            </span>
                          </div>
                          <span
                            className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                              resume.status === "ready"
                                ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                                : "bg-amber-50 text-amber-600 border border-amber-200"
                            }`}
                          >
                            {resume.status || "Draft"}
                          </span>
                        </div>

                        {/* Abstract visual content bars */}
                        <div className="space-y-1.5 my-auto">
                          <div className="h-2 bg-[#252525]/20 rounded w-1/3" />
                          <div className="h-1.5 bg-[#252525]/10 rounded w-full" />
                          <div className="h-1.5 bg-[#252525]/10 rounded w-5/6" />
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-[#6B6B6B] font-medium">
                          <span>Completeness: {completeness}%</span>
                          <div className="w-16 h-1.5 bg-[#252525]/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#FA0C40] rounded-full"
                              style={{ width: `${completeness}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Title & Metadata */}
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3
                            onClick={() => navigate(`/builder?resume=${resume.id}`)}
                            className="font-extrabold text-sm sm:text-base text-[#252525] hover:text-[#FA0C40] cursor-pointer truncate flex-1"
                            title={resume.title}
                          >
                            {resume.title || "Untitled Resume"}
                          </h3>

                          {/* Context Action Menu ("...") */}
                          <div className="relative">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenuId(isMenuOpen ? null : resume.id);
                              }}
                              className="p-1 rounded-lg hover:bg-[#252525]/5 text-[#6B6B6B] hover:text-[#252525] transition-colors cursor-pointer"
                              aria-label="Resume Options"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>

                            {/* Dropdown Menu */}
                            {isMenuOpen && (
                              <div
                                onClick={(e) => e.stopPropagation()}
                                className="absolute right-0 top-full mt-1 w-44 rounded-2xl bg-white border border-[#252525]/15 shadow-xl p-1.5 z-40 text-left font-['Plus_Jakarta_Sans']"
                              >
                                <button
                                  type="button"
                                  onClick={() => navigate(`/builder?resume=${resume.id}`)}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#252525] hover:bg-[#252525]/5 rounded-xl transition-colors cursor-pointer"
                                >
                                  <Edit className="w-3.5 h-3.5 text-[#6B6B6B]" />
                                  <span>Edit Resume</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={async () => {
                                    setActiveMenuId(null);
                                    showToast("Generating PDF download...");
                                    try {
                                      await downloadResumePdf(resume, resume.id);
                                      showToast("PDF downloaded successfully!");
                                    } catch (err) {
                                      showToast(err.message || "Failed to download PDF.");
                                    }
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#252525] hover:bg-[#252525]/5 rounded-xl transition-colors cursor-pointer"
                                >
                                  <Download className="w-3.5 h-3.5 text-[#FA0C40]" />
                                  <span>Download PDF</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => showToast("Duplicate feature coming soon.")}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#6B6B6B] hover:bg-[#252525]/5 rounded-xl transition-colors cursor-pointer"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Duplicate (Soon)</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => handleDeleteClick(e, resume)}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#FA0C40] hover:bg-[#FA0C400D] rounded-xl transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Delete</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-[#6B6B6B] mb-4">
                          <Clock className="w-3 h-3" />
                          <span>Last edited {formatDate(resume.updated_at)}</span>
                        </div>
                      </div>

                      {/* Card Bottom Actions */}
                      <div className="flex items-center gap-2 pt-3 border-t border-[#252525]/10">
                        <button
                          onClick={() => navigate(`/builder?resume=${resume.id}`)}
                          className="flex-1 py-2 px-3 rounded-xl bg-[#252525]/5 hover:bg-[#FA0C40] text-[#252525] hover:text-white font-bold text-xs transition-all duration-200 text-center cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => showToast("PDF export coming soon.")}
                          className="py-2 px-3 rounded-xl bg-[#252525]/5 text-[#6B6B6B] hover:text-[#252525] font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                          title="PDF export coming soon"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">PDF</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* Tab 2: AI Studio Placeholder */}
        {/* ========================================================================= */}
        {activeTab === "studio" && (
          <div className="bg-white rounded-3xl border border-[#252525]/10 p-8 sm:p-12 text-center shadow-sm mb-12 max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#FA0C40] to-[#D40936] text-white flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#FA0C40]/25">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#252525] mb-2">
              AI Resume Studio — Coming Soon
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed mb-6">
              We are building advanced AI voice interview simulations, multi-role cover letter generators, and direct LinkedIn profile synchronization.
            </p>
            <button
              onClick={() => setActiveTab("resumes")}
              className="px-6 py-3 rounded-full bg-[#252525] text-white font-extrabold text-xs hover:bg-[#FA0C40] transition-colors cursor-pointer"
            >
              Back to My Resumes
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* Promotional Side-by-Side Cards (Coach & Jobs) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* Card 1: Resume Coaching */}
          <div className="relative rounded-3xl bg-gradient-to-tr from-[#FA0C40]/10 via-rose-50 to-[#FA0C40]/10 border border-[#FA0C40]/20 p-6 sm:p-7 flex flex-col justify-between text-left shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#FA0C40] text-white flex items-center justify-center mb-4 shadow-md shadow-[#FA0C40]/20">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-[#252525] mb-1.5">
                1-on-1 AI Resume Coaching
              </h3>
              <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed mb-5">
                Have our specialized Claude-powered advisor review bullet points, measure ATS keyword density, and refine your executive summary.
              </p>
            </div>
            <div>
              <button
                type="button"
                onClick={() => showToast("AI Coach feature is launching next week!")}
                className="inline-flex items-center gap-2 text-xs font-extrabold text-white bg-[#FA0C40] hover:bg-[#D40936] py-2.5 px-5 rounded-full shadow-sm transition-all cursor-pointer"
              >
                <span>Get Coach Review</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Curated Job Opportunities */}
          <div className="relative rounded-3xl bg-gradient-to-tr from-purple-50 via-slate-50 to-rose-50 border border-[#252525]/10 p-6 sm:p-7 flex flex-col justify-between text-left shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#252525] text-white flex items-center justify-center mb-4 shadow-md">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-[#252525] mb-1.5">
                Tailor Against Live Jobs
              </h3>
              <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed mb-5">
                Paste any active job posting to calibrate your resume and boost your interview callback rate by up to 8x.
              </p>
            </div>
            <div>
              <button
                type="button"
                onClick={() => navigate("/builder?path=scratch")}
                className="inline-flex items-center gap-2 text-xs font-extrabold text-[#252525] hover:text-white bg-white hover:bg-[#252525] border border-[#252525]/15 py-2.5 px-5 rounded-full shadow-sm transition-all cursor-pointer"
              >
                <span>Launch Matcher</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && resumeToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl border border-[#252525]/10 p-6 max-w-md w-full shadow-2xl text-left">
            <h3 className="text-lg font-extrabold text-[#252525] mb-2">
              Delete Resume?
            </h3>
            <p className="text-xs sm:text-sm text-[#6B6B6B] mb-6 leading-relaxed">
              Are you sure you want to delete <strong className="text-[#252525]">"{resumeToDelete.title}"</strong>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-bold text-[#6B6B6B] hover:text-[#252525] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-5 py-2 rounded-full bg-[#FA0C40] hover:bg-[#D40936] text-white text-xs font-extrabold transition-colors cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? "Deleting…" : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer openBuilder={(tab) => navigate(`/builder?path=${tab}`)} />
    </div>
  );
}
