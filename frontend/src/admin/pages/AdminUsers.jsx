import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import { adminApi } from "../services/adminApi";
import {
  Search,
  Users,
  ChevronLeft,
  ChevronRight,
  X,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
  FileText,
  AlertTriangle,
  Save,
  Check,
  RefreshCw,
  Shield,
  Phone,
  Mail,
  Calendar,
  Clock,
  KeyRound,
  ExternalLink,
} from "lucide-react";

export default function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Drawer state
  const [selectedUser, setSelectedUser] = useState(null);
  const [drawerLoading, setDrawerLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    is_active: true,
  });
  const [saveLoading, setSaveLoading] = useState(false);
  const [drawerError, setDrawerError] = useState("");
  const [drawerSuccess, setDrawerSuccess] = useState("");

  // Delete modal state
  const [deleteModalUser, setDeleteModalUser] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Toast Notification state
  const [toast, setToast] = useState(null);

  // Lock background body scroll when delete modal is open
  useEffect(() => {
    if (deleteModalUser) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [deleteModalUser]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((cur) => (cur?.message === message ? null : cur));
    }, 4000);
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getUsers({ search, page, page_size: 10 });
      setUsers(res.results || []);
      setTotalPages(res.total_pages || 1);
      setTotalCount(res.count || 0);
    } catch (err) {
      showToast(err.message || "Failed to load users.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 250);
    return () => clearTimeout(timer);
  }, [search, page]);

  const handleRowClick = async (user) => {
    setSelectedUser(user);
    setDrawerLoading(true);
    setEditMode(false);
    setDrawerError("");
    setDrawerSuccess("");
    try {
      const full = await adminApi.getUser(user.id);
      setSelectedUser(full);
      setEditForm({
        first_name: full.first_name || "",
        last_name: full.last_name || "",
        email: full.email || "",
        phone: full.phone || "",
        is_active: full.is_active,
      });
    } catch (err) {
      setDrawerError(err.message || "Failed to load user details.");
    } finally {
      setDrawerLoading(false);
    }
  };

  const handleToggleStatus = async (user, e) => {
    e.stopPropagation();
    try {
      const updated = await adminApi.updateUser(user.id, { is_active: !user.is_active });
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, is_active: updated.is_active } : u))
      );
      if (selectedUser?.id === user.id) {
        setSelectedUser((prev) => ({ ...prev, is_active: updated.is_active }));
        setEditForm((prev) => ({ ...prev, is_active: updated.is_active }));
      }
      showToast(
        `User ${user.name} is now ${updated.is_active ? "active" : "deactivated"}.`,
        "success"
      );
    } catch (err) {
      showToast(err.message || "Failed to toggle user status.", "error");
    }
  };

  const handleSaveEdit = async (e) => {
    if (e) e.preventDefault();
    if (!selectedUser) return;

    setDrawerError("");
    setDrawerSuccess("");

    if (!editForm.email.trim()) {
      setDrawerError("Email address cannot be empty.");
      return;
    }
    if (!editForm.email.includes("@") || !editForm.email.includes(".")) {
      setDrawerError("Please enter a valid email address.");
      return;
    }

    setSaveLoading(true);
    try {
      const res = await adminApi.updateUser(selectedUser.id, editForm);
      setSelectedUser((prev) => ({ ...prev, ...res }));
      setUsers((prev) =>
        prev.map((u) => (u.id === selectedUser.id ? { ...u, ...res } : u))
      );
      setEditMode(false);
      setDrawerSuccess("User profile updated and saved to database!");
      showToast("User details saved successfully!", "success");
    } catch (err) {
      setDrawerError(err.message || "Failed to update user.");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!deleteModalUser) return;
    setDeleting(true);
    try {
      await adminApi.deleteUser(deleteModalUser.id);
      if (selectedUser?.id === deleteModalUser.id) {
        setSelectedUser(null);
      }
      setUsers((prev) => prev.filter((u) => u.id !== deleteModalUser.id));
      setTotalCount((prev) => Math.max(0, prev - 1));
      showToast(`User ${deleteModalUser.name} and all associated data were deleted.`, "success");
      setDeleteModalUser(null);
    } catch (err) {
      showToast(err.message || "Failed to delete user.", "error");
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

        {/* Header with Search & Count */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
              <Users className="w-6 h-6 text-[rgb(250,12,64)]" /> User Management
            </h1>
            <p className="text-xs text-gray-500 mt-1 font-medium">
              View, edit, inspect user profiles and manage access ({totalCount} total registered users).
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by name, email, phone..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[rgb(250,12,64)] focus:ring-1 focus:ring-[rgb(250,12,64)] transition-all"
              />
            </div>
            <button
              onClick={fetchUsers}
              title="Refresh User List"
              className="p-2 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-[rgb(250,12,64)] hover:border-red-200 shadow-2xs transition-all cursor-pointer shrink-0"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[rgb(250,12,64)]" : ""}`} />
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-gray-50/75 border-b border-gray-200 text-gray-400 uppercase font-bold text-[10px] tracking-wider">
                  <th className="py-3.5 px-5">User</th>
                  <th className="py-3.5 px-5">Email & Phone</th>
                  <th className="py-3.5 px-5">Signup Source</th>
                  <th className="py-3.5 px-5">Resumes</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5">Joined</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {loading && users.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-400">
                      <div className="inline-block w-6 h-6 border-2 border-gray-300 border-t-[rgb(250,12,64)] rounded-full animate-spin mb-2" />
                      <div>Loading users...</div>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-400">
                      No matching users found.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr
                      key={u.id}
                      onClick={() => handleRowClick(u)}
                      className="hover:bg-red-50/20 cursor-pointer transition-colors group"
                    >
                      <td className="py-3.5 px-5 font-bold text-gray-900">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 font-bold text-xs flex items-center justify-center border border-gray-200 shrink-0">
                            {(u.name || u.email).charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span>{u.name}</span>
                              {u.is_superuser && (
                                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-red-100 text-red-700 flex items-center gap-0.5">
                                  <Shield className="w-2.5 h-2.5" /> Admin
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-gray-400 font-normal">@{u.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-5">
                        <div className="text-gray-900 font-mono text-[11px]">{u.email}</div>
                        <div className="text-gray-400 text-[10px] flex items-center gap-1 mt-0.5">
                          <Phone className="w-2.5 h-2.5" />
                          <span>{u.phone || "No phone"}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-5">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            u.signup_source === "google"
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : "bg-gray-100 text-gray-700 border border-gray-200"
                          }`}
                        >
                          <KeyRound className="w-2.5 h-2.5" />
                          {u.signup_source_display || (u.signup_source === "google" ? "Google OAuth" : "Email/Password")}
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className="inline-flex items-center gap-1 font-bold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-lg">
                          <FileText className="w-3.5 h-3.5 text-[rgb(250,12,64)]" />
                          {u.resumes_count ?? 0}
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        <button
                          onClick={(e) => handleToggleStatus(u, e)}
                          title={u.is_active ? "Click to deactivate" : "Click to activate"}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                            u.is_active
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                              : "bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200"
                          }`}
                        >
                          {u.is_active ? <CheckCircle className="w-3 h-3 text-emerald-600" /> : <XCircle className="w-3 h-3 text-gray-400" />}
                          {u.is_active ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="py-3.5 px-5 text-gray-400 text-[11px]">{u.date_joined}</td>
                      <td className="py-3.5 px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRowClick(u);
                            }}
                            className="text-[11px] font-bold text-[rgb(250,12,64)] hover:bg-red-50 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                          >
                            Inspect →
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteModalUser(u);
                            }}
                            title="Delete User"
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

      {/* ================= Slide-over User Detail Drawer ================= */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            onClick={() => setSelectedUser(null)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Body */}
          <div className="relative w-full max-w-lg bg-white h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto animate-slide-left">
            <div>
              {/* Drawer Top Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/75">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[rgb(250,12,64)] to-red-800 text-white font-black flex items-center justify-center text-base shadow-md shadow-red-900/20">
                    {(selectedUser.name || selectedUser.email).charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold text-gray-900 leading-tight">
                      {selectedUser.name}
                    </h2>
                    <div className="flex items-center gap-2 text-xs text-gray-400 font-medium mt-0.5">
                      <span>ID: #{selectedUser.id}</span>
                      <span>·</span>
                      <span className="font-mono">@{selectedUser.username}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200/50 rounded-xl transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="p-6 space-y-6">
                {/* Alert Messages inside Drawer */}
                {drawerError && (
                  <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center justify-between font-semibold">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>{drawerError}</span>
                    </div>
                    <button onClick={() => setDrawerError("")} className="text-red-500 hover:text-red-700">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {drawerSuccess && (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center justify-between font-semibold">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{drawerSuccess}</span>
                    </div>
                    <button onClick={() => setDrawerSuccess("")} className="text-emerald-500 hover:text-emerald-700">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {drawerLoading ? (
                  <div className="py-16 text-center text-gray-400 text-xs">
                    <div className="inline-block w-6 h-6 border-2 border-gray-300 border-t-[rgb(250,12,64)] rounded-full animate-spin mb-2" />
                    <div>Loading user profile...</div>
                  </div>
                ) : (
                  <>
                    {/* User Profile Information */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-[rgb(250,12,64)]" /> User Profile Information
                        </span>
                        {!editMode ? (
                          <button
                            onClick={() => {
                              setEditMode(true);
                              setDrawerError("");
                              setDrawerSuccess("");
                              setEditForm({
                                first_name: selectedUser.first_name || "",
                                last_name: selectedUser.last_name || "",
                                email: selectedUser.email || "",
                                phone: selectedUser.phone || "",
                                is_active: selectedUser.is_active ?? true,
                              });
                            }}
                            className="text-xs font-bold text-[rgb(250,12,64)] hover:underline flex items-center gap-1 cursor-pointer bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-3 h-3" /> Edit Profile
                          </button>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setEditMode(false);
                                setDrawerError("");
                              }}
                              className="text-xs font-bold text-gray-500 hover:bg-gray-100 px-2.5 py-1 rounded-lg cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleSaveEdit}
                              disabled={saveLoading}
                              className="text-xs font-bold text-white bg-[rgb(250,12,64)] hover:bg-red-700 px-3 py-1 rounded-lg shadow-sm flex items-center gap-1 cursor-pointer disabled:opacity-50"
                            >
                              <Save className="w-3 h-3" /> {saveLoading ? "Saving..." : "Save Changes"}
                            </button>
                          </div>
                        )}
                      </div>

                      {editMode ? (
                        <form onSubmit={handleSaveEdit} className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-200">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-gray-600 mb-1">First Name</label>
                              <input
                                type="text"
                                value={editForm.first_name}
                                onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })}
                                placeholder="First Name"
                                className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[rgb(250,12,64)]"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-gray-600 mb-1">Last Name</label>
                              <input
                                type="text"
                                value={editForm.last_name}
                                onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })}
                                placeholder="Last Name"
                                className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[rgb(250,12,64)]"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-gray-600 mb-1">
                              Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              required
                              value={editForm.email}
                              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                              placeholder="user@example.com"
                              className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[rgb(250,12,64)]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-gray-600 mb-1">
                              Phone Number
                            </label>
                            <input
                              type="text"
                              value={editForm.phone}
                              onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                              placeholder="+91 98765 43210"
                              className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[rgb(250,12,64)]"
                            />
                          </div>

                          <div className="pt-2 border-t border-gray-200/70 flex items-center justify-between">
                            <label htmlFor="drawerActiveToggle" className="text-xs font-bold text-gray-700 cursor-pointer">
                              Active Account Status
                            </label>
                            <input
                              type="checkbox"
                              id="drawerActiveToggle"
                              checked={editForm.is_active}
                              onChange={(e) => setEditForm({ ...editForm, is_active: e.target.checked })}
                              className="w-4 h-4 accent-[rgb(250,12,64)] rounded cursor-pointer"
                            />
                          </div>

                          <div className="pt-2">
                            <button
                              type="submit"
                              disabled={saveLoading}
                              className="w-full py-2 bg-[rgb(250,12,64)] hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                            >
                              <Check className="w-3.5 h-3.5" />
                              {saveLoading ? "Saving to Database..." : "Save Profile Changes"}
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-3.5">
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div>
                              <span className="text-gray-400 font-medium text-[11px] block flex items-center gap-1">
                                <Users className="w-3 h-3" /> Full Name:
                              </span>
                              <div className="font-bold text-gray-900 mt-0.5">{selectedUser.name}</div>
                            </div>
                            <div>
                              <span className="text-gray-400 font-medium text-[11px] block flex items-center gap-1">
                                <Mail className="w-3 h-3" /> Email:
                              </span>
                              <div className="font-bold text-gray-900 mt-0.5 break-all font-mono text-[11px]">
                                {selectedUser.email}
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-400 font-medium text-[11px] block flex items-center gap-1">
                                <Phone className="w-3 h-3" /> Phone:
                              </span>
                              <div className="font-bold text-gray-800 mt-0.5">
                                {selectedUser.phone || <span className="text-gray-400 italic">Not provided</span>}
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-400 font-medium text-[11px] block flex items-center gap-1">
                                <KeyRound className="w-3 h-3" /> Signup Method:
                              </span>
                              <div className="mt-0.5">
                                <span
                                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                    selectedUser.signup_source === "google"
                                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                                      : "bg-gray-200 text-gray-700"
                                  }`}
                                >
                                  {selectedUser.signup_source_display ||
                                    (selectedUser.signup_source === "google" ? "Google OAuth" : "Email/Password")}
                                </span>
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-400 font-medium text-[11px] block">Account Status:</span>
                              <div className="mt-0.5">
                                <span
                                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${
                                    selectedUser.is_active
                                      ? "bg-emerald-100 text-emerald-800"
                                      : "bg-gray-200 text-gray-700"
                                  }`}
                                >
                                  {selectedUser.is_active ? "Active" : "Inactive"}
                                </span>
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-400 font-medium text-[11px] block">Role:</span>
                              <div className="font-bold text-gray-900 mt-0.5">
                                {selectedUser.is_superuser ? "Super Admin" : selectedUser.is_staff ? "Staff Member" : "Standard User"}
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-400 font-medium text-[11px] block flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> Joined Date:
                              </span>
                              <div className="font-bold text-gray-700 mt-0.5">{selectedUser.date_joined}</div>
                            </div>
                            <div>
                              <span className="text-gray-400 font-medium text-[11px] block flex items-center gap-1">
                                <Clock className="w-3 h-3" /> Last Login:
                              </span>
                              <div className="font-bold text-gray-700 mt-0.5">{selectedUser.last_login || "Never"}</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Resumes Summary Card */}
                    <div className="p-4 bg-gradient-to-br from-red-50/50 to-white border border-red-100 rounded-2xl flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[rgb(250,12,64)] text-white flex items-center justify-center shadow-md shadow-red-900/20 shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-extrabold text-gray-900">
                            {selectedUser.resumes_count ?? 0} {(selectedUser.resumes_count === 1) ? "Resume" : "Resumes"} Created
                          </div>
                          <p className="text-[11px] text-gray-400">
                            Resumes and template previews are centrally managed in the Resumes tab.
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          const userEmail = selectedUser.email;
                          setSelectedUser(null);
                          navigate(`/admin/resumes?search=${encodeURIComponent(userEmail)}`);
                        }}
                        className="py-1.5 px-3 bg-white hover:bg-[rgb(250,12,64)] text-gray-700 hover:text-white border border-gray-200 hover:border-[rgb(250,12,64)] rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs shrink-0"
                        title="View user's resumes in Resumes management tab"
                      >
                        <span>View Resumes</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 border-t border-gray-100 bg-gray-50/75 flex items-center justify-between">
              <button
                onClick={() => setDeleteModalUser(selectedUser)}
                className="py-2 px-4 rounded-xl border border-red-200 bg-red-50 text-[rgb(250,12,64)] font-bold text-xs hover:bg-red-100 hover:border-red-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Trash2 className="w-4 h-4" /> Delete User Account
              </button>
              <button
                onClick={() => setSelectedUser(null)}
                className="py-2 px-4 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= Delete Confirmation Modal (Rendered via React Portal at body level) ================= */}
      {deleteModalUser &&
        createPortal(
          <div className="fixed inset-0 z-[99998] flex items-center justify-center p-4">
            <div
              onClick={() => setDeleteModalUser(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs w-screen h-screen"
            />
            <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl z-10 text-center animate-scale-up border border-red-100">
              <div className="w-14 h-14 rounded-2xl bg-red-100 text-[rgb(250,12,64)] mx-auto flex items-center justify-center mb-4 shadow-inner">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-extrabold text-gray-900">Permanently Delete User?</h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Are you sure you want to delete <strong className="text-gray-900">{deleteModalUser.name}</strong> (
                <span className="font-mono text-gray-700">{deleteModalUser.email}</span>)?
              </p>

              <div className="mt-4 p-3 bg-red-50 rounded-2xl border border-red-100 text-left text-[11px] text-red-800 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-red-900">
                  <AlertTriangle className="w-3.5 h-3.5" /> Irreversible Cascade Action
                </div>
                <p className="text-red-700">
                  This will delete the user account from the database and <strong>cascade delete all associated resumes</strong>, work experiences, education records, skills, projects, and feedback.
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={() => setDeleteModalUser(null)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteUser}
                  disabled={deleting}
                  className="flex-1 py-2.5 rounded-xl bg-[rgb(250,12,64)] text-white font-bold text-xs hover:bg-red-700 shadow-md shadow-red-900/20 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  {deleting ? "Deleting from Database..." : "Yes, Permanently Delete"}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </AdminLayout>
  );
}
