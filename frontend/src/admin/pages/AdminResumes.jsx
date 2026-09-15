import React, { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { useSearchParams, Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import { adminApi } from "../services/adminApi";
import LiveResumeDocument from "../../components/builder/LiveResumeDocument";
import { TEMPLATES } from "../../data/templatesData";
import {
  Search,
  FileText,
  ChevronLeft,
  ChevronRight,
  X,
  Trash2,
  AlertTriangle,
  Layers,
  CheckCircle,
  XCircle,
  RefreshCw,
  Eye,
  User,
  ExternalLink,
  Filter,
} from "lucide-react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function buildResumeForTemplate(fetched) {
  if (!fetched) return null;
  const raw = fetched.raw_ai_extraction || {};
  const pDetails = raw.personalDetails || {};

  let firstName = pDetails.firstName || raw.firstName || "";
  let lastName = pDetails.lastName || raw.lastName || "";
  if (!firstName && !lastName && fetched.owner?.name) {
    const parts = fetched.owner.name.trim().split(" ");
    firstName = parts[0] || "";
    lastName = parts.slice(1).join(" ") || "";
  }

  const rawExp = (raw.experiences && raw.experiences.length > 0) ? raw.experiences : (fetched.experiences || []);
  const experiences = rawExp.map((exp, idx) => {
    let sm = exp.startMonth || "";
    let sy = exp.startYear || "";
    let em = exp.endMonth || "";
    let ey = exp.endYear || "";
    let isCurr = exp.isCurrent !== undefined ? Boolean(exp.isCurrent) : Boolean(exp.is_current);

    if (!sm && exp.start_date) {
      const parts = exp.start_date.split("-");
      sy = parts[0] || "";
      const mNum = parseInt(parts[1], 10);
      sm = !isNaN(mNum) && mNum >= 1 && mNum <= 12 ? MONTHS[mNum - 1] : "Jan";
    }
    if (!em && exp.end_date) {
      const parts = exp.end_date.split("-");
      ey = parts[0] || "";
      const mNum = parseInt(parts[1], 10);
      em = !isNaN(mNum) && mNum >= 1 && mNum <= 12 ? MONTHS[mNum - 1] : "Dec";
    }

    let description = exp.description || "";
    if (!description && Array.isArray(exp.bullet_points) && exp.bullet_points.length > 0) {
      description = exp.bullet_points.map((b) => (b.startsWith("•") ? b : `• ${b}`)).join("\n");
    }

    return {
      id: exp.id || idx + 1,
      role: exp.role || exp.title || "",
      company: exp.company || "",
      city: exp.city || exp.location || "",
      startMonth: sm || "Jan",
      startYear: sy || "2022",
      endMonth: em || (isCurr ? "Present" : "Dec"),
      endYear: ey || "2024",
      isCurrent: isCurr,
      description,
    };
  });

  const rawEdu = (raw.education && raw.education.length > 0) ? raw.education : (fetched.education || []);
  const education = rawEdu.map((edu, idx) => {
    let sy = edu.startYear || (edu.start_date ? edu.start_date.split("-")[0] : "");
    let ey = edu.endYear || (edu.end_date ? edu.end_date.split("-")[0] : "");

    return {
      id: edu.id || idx + 1,
      institution: edu.institution || "",
      degree: edu.degree || "",
      city: edu.city || edu.location || "",
      marksType: edu.marksType || "CGPA",
      marks: edu.marks || edu.grade || "",
      startYear: sy || "2018",
      endYear: ey || "2022",
      isCurrent: Boolean(edu.isCurrent),
      description: edu.description || (edu.field_of_study ? `Specialization in ${edu.field_of_study}` : ""),
    };
  });

  const rawSkills = (raw.skills && raw.skills.length > 0) ? raw.skills : (fetched.skills || []);
  const skills = rawSkills.map((s, idx) => ({
    id: s.id || idx + 1,
    name: typeof s === "string" ? s : s.name || "",
    level: s.level || (s.proficiency ? (typeof s.proficiency === "number" ? s.proficiency : 4) : 4),
  }));

  const rawProjects = raw.additionalSections?.projects || raw.projects || fetched.projects || [];
  const projects = rawProjects.map((p, idx) => ({
    id: p.id || idx + 1,
    title: p.title || p.name || `Project ${idx + 1}`,
    techStack: p.techStack || (Array.isArray(p.tech_stack) ? p.tech_stack.join(", ") : p.tech_stack || ""),
    link: p.link || "",
    description: p.description || "",
  }));

  const rawLanguages = raw.additionalSections?.languages || raw.languages || [];
  const languages = rawLanguages.map((l, idx) => ({
    id: l.id || idx + 1,
    name: typeof l === "string" ? l : l.name || "",
    proficiency: typeof l === "object" && l.proficiency ? l.proficiency : "Fluent",
  }));

  return {
    title: fetched.title || "Untitled Resume",
    templateId: fetched.template_key || raw.templateId || "puffin",
    accentColor: raw.accentColor || "#FA0C40",
    professional_summary: fetched.professional_summary || raw.professional_summary || raw.summary || "",
    personalDetails: {
      firstName,
      lastName,
      jobTitle: pDetails.jobTitle || raw.jobTitle || (experiences[0]?.role || "Professional"),
      email: pDetails.email || raw.email || (fetched.owner?.email || ""),
      phone: pDetails.phone || raw.phone || "+91 98765 43210",
      city: pDetails.city || raw.city || (experiences[0]?.city || "Bengaluru"),
      country: pDetails.country || raw.country || "India",
      photo: pDetails.photo || raw.photo || null,
    },
    experiences,
    education,
    skills,
    socialLinks: raw.socialLinks || raw.social_links || [],
    hobbies: raw.hobbies || "",
    additionalSections: {
      projects,
      languages,
      customSections: raw.additionalSections?.customSections || [],
    },
  };
}

export default function AdminResumes() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || searchParams.get("owner") || "";

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialSearch);
  const [templateFilter, setTemplateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Drawer / Full preview state
  const [selectedResume, setSelectedResume] = useState(null);
  const [drawerLoading, setDrawerLoading] = useState(false);
  const [previewPageCount, setPreviewPageCount] = useState(1);

  // Delete modal state
  const [deleteResumeTarget, setDeleteResumeTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Toast Notification state
  const [toast, setToast] = useState(null);

  // Sync with searchParams if url changes
  useEffect(() => {
    const q = searchParams.get("search") || searchParams.get("owner") || "";
    if (q && q !== search) {
      setSearch(q);
      setPage(1);
    }
  }, [searchParams]);

  // Lock body scroll when preview modal or delete modal is open
  useEffect(() => {
    if (selectedResume || deleteResumeTarget) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [selectedResume, deleteResumeTarget]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((cur) => (cur?.message === message ? null : cur));
    }, 4000);
  };

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getResumes({
        search,
        template: templateFilter,
        status: statusFilter,
        page,
        page_size: 10,
      });
      setResumes(res.results || []);
      setTotalPages(res.total_pages || 1);
      setTotalCount(res.count || 0);
    } catch (err) {
      showToast(err.message || "Failed to load resumes.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchResumes();
    }, 250);
    return () => clearTimeout(timer);
  }, [search, templateFilter, statusFilter, page]);

  const handleInspectResume = async (resume) => {
    setSelectedResume(resume);
    setDrawerLoading(true);
    try {
      const full = await adminApi.getResume(resume.id);
      setSelectedResume(full);
    } catch (err) {
      showToast(err.message || "Failed to load full resume.", "error");
    } finally {
      setDrawerLoading(false);
    }
  };

  const handleDeleteResume = async () => {
    if (!deleteResumeTarget) return;
    setDeleting(true);
    try {
      await adminApi.deleteResume(deleteResumeTarget.id);
      const targetTitle = deleteResumeTarget.title;
      if (selectedResume?.id === deleteResumeTarget.id) {
        setSelectedResume(null);
      }
      setResumes((prev) => prev.filter((r) => r.id !== deleteResumeTarget.id));
      setTotalCount((prev) => Math.max(0, prev - 1));
      showToast(`Resume "${targetTitle}" deleted successfully.`, "success");
      setDeleteResumeTarget(null);
    } catch (err) {
      showToast(err.message || "Failed to delete resume.", "error");
    } finally {
      setDeleting(false);
    }
  };

  const clearAllFilters = () => {
    setSearch("");
    setTemplateFilter("");
    setStatusFilter("");
    setPage(1);
    setSearchParams({});
  };

  const hasActiveFilters = Boolean(search || templateFilter || statusFilter);

  const { matchedTemplate, normalizedResumeData } = useMemo(() => {
    if (!selectedResume) {
      return { matchedTemplate: TEMPLATES[0], normalizedResumeData: null };
    }

    const tKey = (selectedResume.template_key || selectedResume.raw_ai_extraction?.templateId || "puffin").toLowerCase();
    const legacyMap = {
      "minimal-01": "puffin",
      "modern-02": "caddisfly",
      "executive-03": "stonefly",
      "creative-04": "drongo",
    };

    const resolvedKey = legacyMap[tKey] || tKey;

    const found =
      TEMPLATES.find((t) => t.id.toLowerCase() === resolvedKey) ||
      TEMPLATES.find((t) => t.id.toLowerCase() === tKey) ||
      TEMPLATES.find((t) => t.name.toLowerCase() === tKey) ||
      TEMPLATES[0];

    const normalized = buildResumeForTemplate(selectedResume);
    return { matchedTemplate: found, normalizedResumeData: normalized };
  }, [selectedResume]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Floating Toast Notification */}
        {toast && (
          <div className="fixed bottom-6 right-6 z-70 animate-scale-up">
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border text-xs font-bold text-white ${
                toast.type === "error"
                  ? "bg-red-600 border-red-500 shadow-red-900/30"
                  : "bg-emerald-600 border-emerald-500 shadow-emerald-900/30"
              }`}
            >
              {toast.type === "error" ? (
                <XCircle className="w-4 h-4 text-white shrink-0" />
              ) : (
                <CheckCircle className="w-4 h-4 text-white shrink-0" />
              )}
              <span>{toast.message}</span>
              <button
                onClick={() => setToast(null)}
                className="ml-2 hover:opacity-75 cursor-pointer text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Header with Search & Filter Controls */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
              <FileText className="w-6 h-6 text-[rgb(250,12,64)]" /> Resume Management
            </h1>
            <p className="text-xs text-gray-500 mt-1 font-medium">
              Centralized repository for all user resumes and live template previews ({totalCount} total resumes).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search title, owner, email..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[rgb(250,12,64)] focus:ring-1 focus:ring-[rgb(250,12,64)] transition-all"
              />
            </div>

            {/* Template Filter */}
            <div className="w-full sm:w-44">
              <select
                value={templateFilter}
                onChange={(e) => {
                  setTemplateFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:border-[rgb(250,12,64)]"
              >
                <option value="">All Templates</option>
                <option value="puffin">Puffin (Single Column)</option>
                <option value="caddisfly">Caddisfly (Sidebar Left)</option>
                <option value="stonefly">Stonefly (Sidebar Right)</option>
                <option value="drongo">Drongo (Creative Accent)</option>
                <option value="albatross">Albatross (Dark Sidebar)</option>
                <option value="kingfisher">Kingfisher (Timeline)</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="w-full sm:w-32">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:border-[rgb(250,12,64)]"
              >
                <option value="">All Statuses</option>
                <option value="ready">Ready</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="px-3 py-2 text-xs font-bold text-gray-500 hover:text-[rgb(250,12,64)] bg-gray-100 hover:bg-red-50 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                title="Clear all search filters"
              >
                <X className="w-3.5 h-3.5" /> Clear
              </button>
            )}

            <button
              onClick={fetchResumes}
              title="Refresh Resumes List"
              className="p-2 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-[rgb(250,12,64)] hover:border-red-200 shadow-2xs transition-all cursor-pointer shrink-0"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[rgb(250,12,64)]" : ""}`} />
            </button>
          </div>
        </div>

        {/* Resumes Table */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-gray-50/75 border-b border-gray-200 text-gray-400 uppercase font-bold text-[10px] tracking-wider">
                  <th className="py-3.5 px-5">Resume Title</th>
                  <th className="py-3.5 px-5">Owner</th>
                  <th className="py-3.5 px-5">Template</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5">Last Updated</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {loading && resumes.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-400">
                      <div className="inline-block w-6 h-6 border-2 border-gray-300 border-t-[rgb(250,12,64)] rounded-full animate-spin mb-2" />
                      <div>Loading resumes...</div>
                    </td>
                  </tr>
                ) : resumes.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-400">
                      <div className="space-y-2">
                        <div>No matching resumes found.</div>
                        {hasActiveFilters && (
                          <button
                            onClick={clearAllFilters}
                            className="text-xs font-bold text-[rgb(250,12,64)] hover:underline cursor-pointer"
                          >
                            Reset filters
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  resumes.map((r) => (
                    <tr
                      key={r.id}
                      onClick={() => handleInspectResume(r)}
                      className="hover:bg-red-50/20 cursor-pointer transition-colors group"
                    >
                      <td className="py-3.5 px-5 font-bold text-gray-900">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-red-50 text-[rgb(250,12,64)] flex items-center justify-center shrink-0 border border-red-100">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="truncate max-w-[220px]">
                            <div className="truncate text-gray-900 font-bold">{r.title}</div>
                            <div className="text-[10px] text-gray-400 font-mono">ID: {r.id.slice(0, 8)}...</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-5">
                        <div className="text-gray-900 font-semibold">{r.owner?.name}</div>
                        <div className="text-[11px] text-gray-400 font-mono">{r.owner?.email}</div>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 font-mono text-[10px] font-bold">
                          <Layers className="w-3.5 h-3.5 text-gray-400" />
                          {r.template_key}
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                            r.status === "ready"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-gray-400 text-[11px]">{r.updated_at}</td>
                      <td className="py-3.5 px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleInspectResume(r);
                            }}
                            className="text-[11px] font-bold text-[rgb(250,12,64)] hover:bg-red-50 px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Preview</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteResumeTarget(r);
                            }}
                            title="Delete Resume"
                            className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Bar */}
          <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <div>
              Showing page <span className="font-bold text-gray-900">{page}</span> of{" "}
              <span className="font-bold text-gray-900">{totalPages}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= Template-Accurate Resume Inspection Modal (Rendered via React Portal at body level) ================= */}
      {selectedResume &&
        createPortal(
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-hidden">
            {/* Full-Viewport Dark Backdrop */}
            <div
              onClick={() => setSelectedResume(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity w-screen h-screen"
            />

            {/* Centered Modal Card */}
            <div className="relative w-full max-w-[880px] h-[92vh] max-h-[960px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl z-10 flex flex-col overflow-hidden animate-scale-up border border-gray-200 mx-auto">
              {/* Modal Header */}
              <div className="px-5 py-3 border-b border-gray-200 bg-white flex flex-wrap items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-red-50 text-[rgb(250,12,64)] flex items-center justify-center shrink-0 border border-red-100 shadow-2xs">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-extrabold text-gray-900 leading-tight truncate">
                        {selectedResume.title}
                      </h3>
                      <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                        {selectedResume.status || "Ready"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-0.5 truncate">
                      <span>Owner: <strong className="text-gray-700">{selectedResume.owner?.name}</strong></span>
                      <span>·</span>
                      <span className="font-mono">{selectedResume.owner?.email}</span>
                    </div>
                  </div>
                </div>

                {/* Template Badge & Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {matchedTemplate && (
                    <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 border border-gray-200 text-xs font-bold text-gray-800">
                      <Layers className="w-3.5 h-3.5 text-[rgb(250,12,64)]" />
                      <span>Template: {matchedTemplate.name}</span>
                      <span className="text-[10px] font-medium text-gray-500 uppercase">({matchedTemplate.layoutStyle})</span>
                    </div>
                  )}

                  <button
                    onClick={() => setDeleteResumeTarget(selectedResume)}
                    className="py-1 px-3 rounded-lg border border-red-200 bg-red-50 text-[rgb(250,12,64)] font-bold text-xs hover:bg-red-100 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>

                  <button
                    onClick={() => setSelectedResume(null)}
                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Document Render Workbench Area */}
              <div className="flex-1 w-full bg-[#F4F5F7] overflow-y-auto p-3 sm:p-4 md:p-5 flex flex-col items-center custom-scrollbar">
                {drawerLoading || !normalizedResumeData ? (
                  <div className="py-28 text-center text-gray-400 text-xs">
                    <div className="inline-block w-8 h-8 border-2 border-gray-300 border-t-[rgb(250,12,64)] rounded-full animate-spin mb-3" />
                    <div>Loading and rendering live resume template...</div>
                  </div>
                ) : (
                  <div className="w-full max-w-[800px] flex flex-col items-center">
                    <LiveResumeDocument
                      resume={normalizedResumeData}
                      template={matchedTemplate}
                      customAccent={normalizedResumeData.accentColor}
                      onPageCountChange={setPreviewPageCount}
                    />
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-5 py-2.5 border-t border-gray-200 bg-white flex items-center justify-between text-xs text-gray-500 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[11px]">Rendered with <strong>{matchedTemplate?.name || "Standard"}</strong> layout engine ({matchedTemplate?.layoutStyle || "Single Column"})</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-gray-400">
                    {previewPageCount} {previewPageCount === 1 ? "Page" : "Pages"} (A4 Document Format)
                  </span>
                  <button
                    onClick={() => setSelectedResume(null)}
                    className="py-1 px-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* ================= Delete Confirmation Modal (Rendered via React Portal at body level) ================= */}
      {deleteResumeTarget &&
        createPortal(
          <div className="fixed inset-0 z-[99998] flex items-center justify-center p-4">
            <div
              onClick={() => setDeleteResumeTarget(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs w-screen h-screen"
            />
            <div className="relative w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl z-10 text-center animate-scale-up border border-red-100">
              <div className="w-12 h-12 rounded-full bg-red-100 text-[rgb(250,12,64)] mx-auto flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-gray-900">Delete Resume?</h3>
              <p className="text-xs text-gray-500 mt-2 font-medium">
                Are you sure you want to permanently delete{" "}
                <strong className="text-gray-800">{deleteResumeTarget.title}</strong>? This action cannot be undone.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={() => setDeleteResumeTarget(null)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteResume}
                  disabled={deleting}
                  className="flex-1 py-2.5 rounded-xl bg-[rgb(250,12,64)] text-white font-bold text-xs hover:bg-red-700 shadow-md shadow-red-900/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  {deleting ? "Deleting..." : "Yes, Delete"}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </AdminLayout>
  );
}
