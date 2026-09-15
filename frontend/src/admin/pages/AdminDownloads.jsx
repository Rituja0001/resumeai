import React, { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import AdminLayout from "../components/AdminLayout";
import { adminApi } from "../services/adminApi";
import LiveResumeDocument from "../../components/builder/LiveResumeDocument";
import { TEMPLATES } from "../../data/templatesData";
import {
  Search,
  Download,
  FileText,
  User,
  ChevronLeft,
  ChevronRight,
  Trash2,
  AlertTriangle,
  Calendar,
  Eye,
  X,
  CheckCircle,
  XCircle,
  RefreshCw,
  Layers,
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

export default function AdminDownloads() {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Resume Preview modal state
  const [previewResume, setPreviewResume] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewPageCount, setPreviewPageCount] = useState(1);

  // Delete modal state
  const [selectedDownload, setSelectedDownload] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Toast state
  const [toast, setToast] = useState(null);

  // Lock body scroll when preview or delete modal is open
  useEffect(() => {
    if (previewResume || deleteModalOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [previewResume, deleteModalOpen]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((cur) => (cur?.message === message ? null : cur));
    }, 4000);
  };

  const fetchDownloads = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getDownloads({
        search,
        page,
        page_size: 10,
      });
      setDownloads(res.results || []);
      setTotalPages(res.total_pages || 1);
      setTotalCount(res.count || 0);
    } catch (err) {
      showToast(err.message || "Failed to load download logs.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDownloads();
    }, 250);
    return () => clearTimeout(timer);
  }, [search, page]);

  const handleViewResume = async (resumeId, fallbackTitle = "Resume") => {
    if (!resumeId) {
      showToast("This resume record was removed or is no longer available.", "error");
      return;
    }
    setPreviewLoading(true);
    setPreviewResume({ id: resumeId, title: fallbackTitle, loading: true });
    try {
      const full = await adminApi.getResume(resumeId);
      setPreviewResume(full);
    } catch (err) {
      showToast(err.message || "Failed to load resume details.", "error");
      setPreviewResume(null);
    } finally {
      setPreviewLoading(false);
    }
  };

  const handleDeleteDownload = async () => {
    if (!selectedDownload) return;
    setDeleting(true);
    try {
      await adminApi.deleteDownload(selectedDownload.id);
      setDeleteModalOpen(false);
      setSelectedDownload(null);
      setDownloads((prev) => prev.filter((d) => d.id !== selectedDownload.id));
      setTotalCount((prev) => Math.max(0, prev - 1));
      showToast("Download log record deleted successfully.", "success");
    } catch (err) {
      showToast(err.message || "Failed to delete download log.", "error");
    } finally {
      setDeleting(false);
    }
  };

  const { matchedTemplate, normalizedResumeData } = useMemo(() => {
    if (!previewResume || previewResume.loading) {
      return { matchedTemplate: TEMPLATES[0], normalizedResumeData: null };
    }

    const tKey = (previewResume.template_key || previewResume.raw_ai_extraction?.templateId || "puffin").toLowerCase();
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

    const normalized = buildResumeForTemplate(previewResume);
    return { matchedTemplate: found, normalizedResumeData: normalized };
  }, [previewResume]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Toast Notification */}
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

        {/* Header with Search */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
              <Download className="w-6 h-6 text-purple-600" /> Resume Downloads
            </h1>
            <p className="text-xs text-gray-500 mt-1 font-medium">
              Track user resume download events, timestamps, and inspect downloaded resumes ({totalCount} total downloads logged).
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by resume title, user name or email..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-all"
              />
            </div>

            <button
              onClick={fetchDownloads}
              title="Refresh Download Logs"
              className="p-2 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-purple-600 hover:border-purple-200 shadow-2xs transition-all cursor-pointer shrink-0"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-purple-600" : ""}`} />
            </button>
          </div>
        </div>

        {/* Downloads Table */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-gray-50/75 border-b border-gray-200 text-gray-400 uppercase font-bold text-[10px] tracking-wider">
                  <th className="py-3.5 px-5">Resume</th>
                  <th className="py-3.5 px-5">Downloaded By</th>
                  <th className="py-3.5 px-5">Download Date & Time</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {loading && downloads.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-gray-400">
                      <div className="inline-block w-6 h-6 border-2 border-gray-300 border-t-purple-600 rounded-full animate-spin mb-2" />
                      <div>Loading download logs...</div>
                    </td>
                  </tr>
                ) : downloads.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-gray-400">
                      No resume downloads recorded yet.
                    </td>
                  </tr>
                ) : (
                  downloads.map((dl) => (
                    <tr key={dl.id} className="hover:bg-purple-50/20 transition-colors group">
                      {/* Resume title */}
                      <td className="py-3.5 px-5 font-bold text-gray-900">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100 shadow-2xs">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="truncate max-w-[240px] block font-bold text-gray-900">
                              {dl.resume?.title || "Untitled Resume"}
                            </span>
                            {dl.resume?.template_key && (
                              <span className="text-[10px] text-gray-400 font-mono">
                                Template: {dl.resume.template_key}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Downloaded by: Name AND Email */}
                      <td className="py-3.5 px-5">
                        <div className="text-gray-900 font-semibold flex items-center gap-1.5">
                          <span>{dl.user?.name || "Anonymous / Guest"}</span>
                          <span className="text-gray-400">·</span>
                          <span className="text-gray-500 font-mono text-[11px]">
                            {dl.user?.email || "N/A"}
                          </span>
                        </div>
                      </td>

                      {/* Download Date & Time */}
                      <td className="py-3.5 px-5 text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span>{dl.created_at}</span>
                        </div>
                      </td>

                      {/* Actions: View & Delete */}
                      <td className="py-3.5 px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleViewResume(dl.resume?.id, dl.resume?.title)}
                            disabled={!dl.resume?.id}
                            className="px-2.5 py-1 text-purple-700 bg-purple-50 hover:bg-purple-600 hover:text-white border border-purple-200 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
                            title="Preview Resume Template"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>
                          <button
                            onClick={() => {
                              setSelectedDownload(dl);
                              setDeleteModalOpen(true);
                            }}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete Download Log Entry"
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

      {/* ================= Template-Accurate Resume Preview Modal (Rendered via React Portal at body level) ================= */}
      {previewResume &&
        createPortal(
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-hidden">
            {/* Dark Full-Viewport Backdrop */}
            <div
              onClick={() => setPreviewResume(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity w-screen h-screen"
            />

            {/* Centered Modal Card */}
            <div className="relative w-full max-w-[880px] h-[92vh] max-h-[960px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl z-10 flex flex-col overflow-hidden animate-scale-up border border-gray-200 mx-auto">
              {/* Modal Top Bar */}
              <div className="px-5 py-3 border-b border-gray-200 bg-white flex flex-wrap items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100 shadow-2xs">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-extrabold text-gray-900 leading-tight truncate">
                        {previewResume.title || "Resume Preview"}
                      </h3>
                      <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                        {previewResume.status || "Ready"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-0.5 truncate">
                      <span>Owner: <strong className="text-gray-700">{previewResume.owner?.name || "User"}</strong></span>
                      <span>·</span>
                      <span className="font-mono">{previewResume.owner?.email || ""}</span>
                    </div>
                  </div>
                </div>

                {/* Template Badge & Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {matchedTemplate && (
                    <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 border border-gray-200 text-xs font-bold text-gray-800">
                      <Layers className="w-3.5 h-3.5 text-purple-600" />
                      <span>Template: {matchedTemplate.name}</span>
                      <span className="text-[10px] font-medium text-gray-500 uppercase">({matchedTemplate.layoutStyle})</span>
                    </div>
                  )}

                  <button
                    onClick={() => setPreviewResume(null)}
                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Document Render Area */}
              <div className="flex-1 w-full bg-[#F4F5F7] overflow-y-auto p-3 sm:p-4 md:p-5 flex flex-col items-center custom-scrollbar">
                {previewLoading || !normalizedResumeData ? (
                  <div className="py-28 text-center text-gray-400 text-xs">
                    <div className="inline-block w-8 h-8 border-2 border-gray-300 border-t-purple-600 rounded-full animate-spin mb-3" />
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
                  <span className="text-[11px]">Rendered with <strong>{matchedTemplate?.name || "Standard"}</strong> layout engine ({matchedTemplate?.layoutStyle})</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-gray-400">
                    {previewPageCount} {previewPageCount === 1 ? "Page" : "Pages"} (A4 Document Format)
                  </span>
                  <button
                    onClick={() => setPreviewResume(null)}
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
      {deleteModalOpen &&
        createPortal(
          <div className="fixed inset-0 z-[99998] flex items-center justify-center p-4">
            <div
              onClick={() => setDeleteModalOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs w-screen h-screen"
            />
            <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl z-10 text-center animate-scale-up border border-red-100">
              <div className="w-14 h-14 rounded-2xl bg-red-100 text-[rgb(250,12,64)] mx-auto flex items-center justify-center mb-4 shadow-inner">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-extrabold text-gray-900">Delete Download Log Entry?</h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Are you sure you want to remove the download log entry for{" "}
                <strong className="text-gray-900">{selectedDownload?.resume?.title || "this resume"}</strong>?
              </p>

              <div className="mt-4 p-3 bg-gray-50 rounded-2xl border border-gray-200 text-left text-[11px] text-gray-600">
                <p>
                  <strong>Note:</strong> This only removes the activity log record from the download history. The user's account and actual resume will <strong>not</strong> be deleted.
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteDownload}
                  disabled={deleting}
                  className="flex-1 py-2.5 rounded-xl bg-[rgb(250,12,64)] text-white font-bold text-xs hover:bg-red-700 shadow-md shadow-red-900/20 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  {deleting ? "Deleting..." : "Yes, Delete Log"}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </AdminLayout>
  );
}
