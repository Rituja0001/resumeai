import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import AdminLayout from "../components/AdminLayout";
import { adminApi } from "../services/adminApi";
import {
  Search,
  MessageSquare,
  Star,
  ChevronLeft,
  ChevronRight,
  X,
  Trash2,
  AlertTriangle,
  User,
  Calendar,
  CheckCircle,
  XCircle,
  RefreshCw,
  Eye,
} from "lucide-react";

export default function AdminFeedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // View Details Modal state
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Toast state
  const [toast, setToast] = useState(null);

  // Lock body scroll when view modal or delete modal is open
  useEffect(() => {
    if (selectedFeedback || deleteModalOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [selectedFeedback, deleteModalOpen]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((cur) => (cur?.message === message ? null : cur));
    }, 4000);
  };

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getFeedback({
        search,
        rating: ratingFilter,
        page,
        page_size: 10,
      });
      setFeedbackList(res.results || []);
      setTotalPages(res.total_pages || 1);
      setTotalCount(res.count || 0);
    } catch (err) {
      showToast(err.message || "Failed to load feedback.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchFeedback();
    }, 250);
    return () => clearTimeout(timer);
  }, [search, ratingFilter, page]);

  const handleDeleteFeedback = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminApi.deleteFeedback(deleteTarget.id);
      const targetUser = deleteTarget.user?.name || "User";
      if (selectedFeedback?.id === deleteTarget.id) {
        setSelectedFeedback(null);
      }
      setFeedbackList((prev) => prev.filter((fb) => fb.id !== deleteTarget.id));
      setTotalCount((prev) => Math.max(0, prev - 1));
      setDeleteModalOpen(false);
      setDeleteTarget(null);
      showToast(`Feedback from ${targetUser} deleted successfully.`, "success");
    } catch (err) {
      showToast(err.message || "Failed to delete feedback item.", "error");
    } finally {
      setDeleting(false);
    }
  };

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

        {/* Header with Search & Rating Filter */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-[rgb(250,12,64)]" /> User Feedback
            </h1>
            <p className="text-xs text-gray-500 mt-1 font-medium">
              Review user ratings, comments, customer satisfaction, and manage feedback ({totalCount} total).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
            {/* Rating Filter */}
            <div className="w-full sm:w-36">
              <select
                value={ratingFilter}
                onChange={(e) => {
                  setRatingFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:border-[rgb(250,12,64)]"
              >
                <option value="">All Ratings</option>
                <option value="5">5 Stars ★★★★★</option>
                <option value="4">4 Stars ★★★★</option>
                <option value="3">3 Stars ★★★</option>
                <option value="2">2 Stars ★★</option>
                <option value="1">1 Star ★</option>
              </select>
            </div>

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
                placeholder="Search comment or user..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[rgb(250,12,64)] focus:ring-1 focus:ring-[rgb(250,12,64)] transition-all"
              />
            </div>

            <button
              onClick={fetchFeedback}
              title="Refresh Feedback List"
              className="p-2 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-[rgb(250,12,64)] hover:border-red-200 shadow-2xs transition-all cursor-pointer shrink-0"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[rgb(250,12,64)]" : ""}`} />
            </button>
          </div>
        </div>

        {/* Feedback Table */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-gray-50/75 border-b border-gray-200 text-gray-400 uppercase font-bold text-[10px] tracking-wider">
                  <th className="py-3.5 px-5">User</th>
                  <th className="py-3.5 px-5">Rating</th>
                  <th className="py-3.5 px-5">Comment Preview</th>
                  <th className="py-3.5 px-5">Submitted Date</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {loading && feedbackList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-gray-400">
                      <div className="inline-block w-6 h-6 border-2 border-gray-300 border-t-[rgb(250,12,64)] rounded-full animate-spin mb-2" />
                      <div>Loading feedback...</div>
                    </td>
                  </tr>
                ) : feedbackList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-gray-400">
                      No matching feedback found.
                    </td>
                  </tr>
                ) : (
                  feedbackList.map((fb) => (
                    <tr
                      key={fb.id}
                      onClick={() => setSelectedFeedback(fb)}
                      className="hover:bg-red-50/20 cursor-pointer transition-colors group"
                    >
                      <td className="py-3 px-5">
                        <div className="font-bold text-gray-900">{fb.user?.name}</div>
                        <div className="text-[11px] text-gray-400 font-mono">{fb.user?.email}</div>
                      </td>
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          {Array.from({ length: fb.rating || 5 }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                          <span className="ml-1 text-gray-700 text-[11px]">({fb.rating || 5})</span>
                        </div>
                      </td>
                      <td className="py-3 px-5 text-gray-600">
                        <div className="truncate max-w-[280px]">{fb.message || "No comment provided"}</div>
                      </td>
                      <td className="py-3 px-5 text-gray-400">{fb.created_at}</td>
                      <td className="py-3 px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedFeedback(fb);
                            }}
                            className="text-[11px] font-bold text-[rgb(250,12,64)] hover:bg-red-50 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                          >
                            View →
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteTarget(fb);
                              setDeleteModalOpen(true);
                            }}
                            title="Delete Feedback"
                            className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-semibold"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Delete</span>
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

      {/* ================= View Feedback Detail Modal (Rendered via React Portal at body level) ================= */}
      {selectedFeedback &&
        createPortal(
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            <div
              onClick={() => setSelectedFeedback(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs w-screen h-screen"
            />

            <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl z-10 p-6 space-y-6 animate-scale-up border border-gray-100">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-2xs">
                    <Star className="w-5 h-5 fill-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-gray-900">User Feedback Details</h3>
                    <span className="text-xs text-gray-400 font-medium">{selectedFeedback.created_at}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content Details */}
              <div className="space-y-4">
                {/* User Strip */}
                <div className="p-3.5 bg-gray-50 rounded-2xl flex items-center justify-between border border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <User className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-xs font-bold text-gray-900">{selectedFeedback.user?.name}</div>
                      <div className="text-[11px] text-gray-500 font-mono">{selectedFeedback.user?.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    {Array.from({ length: selectedFeedback.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                    Feedback Message
                  </label>
                  <div className="p-4 bg-gray-50 rounded-2xl text-xs text-gray-800 leading-relaxed border border-gray-100 min-h-[100px] whitespace-pre-wrap font-sans">
                    {selectedFeedback.message || "No written comment provided."}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    setDeleteTarget(selectedFeedback);
                    setDeleteModalOpen(true);
                  }}
                  className="py-2 px-3.5 rounded-xl border border-red-200 bg-red-50 text-[rgb(250,12,64)] font-bold text-xs hover:bg-red-100 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Trash2 className="w-4 h-4" /> Delete Feedback
                </button>
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="py-2 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Close
                </button>
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
              onClick={() => {
                setDeleteModalOpen(false);
                setDeleteTarget(null);
              }}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs w-screen h-screen"
            />
            <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl z-10 text-center animate-scale-up border border-red-100">
              <div className="w-14 h-14 rounded-2xl bg-red-100 text-[rgb(250,12,64)] mx-auto flex items-center justify-center mb-4 shadow-inner">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <h3 className="text-base font-extrabold text-gray-900">Delete Feedback?</h3>
              <p className="text-xs text-gray-500 mt-2 font-medium leading-relaxed">
                Are you sure you want to delete this feedback from{" "}
                <strong className="text-gray-900">{deleteTarget?.user?.name || "this user"}</strong>? This action cannot be undone.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={() => {
                    setDeleteModalOpen(false);
                    setDeleteTarget(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteFeedback}
                  disabled={deleting}
                  className="flex-1 py-2.5 rounded-xl bg-[rgb(250,12,64)] text-white font-bold text-xs hover:bg-red-700 shadow-md shadow-red-900/20 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  {deleting ? "Deleting..." : "Confirm Delete"}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </AdminLayout>
  );
}
