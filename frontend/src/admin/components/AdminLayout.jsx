import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { getAdminUser, adminApi } from "../services/adminApi";
import {
  LayoutDashboard,
  Users,
  FileText,
  Download,
  MessageSquare,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const adminUser = getAdminUser() || {
    name: "Admin",
    email: "admin@tatkalkaam.com",
    is_superuser: true,
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    adminApi.logout();
    navigate("/admin/login");
  };

  const navItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Users", path: "/admin/users", icon: Users },
    { label: "Resumes", path: "/admin/resumes", icon: FileText },
    { label: "Downloads", path: "/admin/downloads", icon: Download },
    { label: "Feedback", path: "/admin/feedback", icon: MessageSquare },
  ];

  const adminInitial = (adminUser.name || adminUser.email || "A").charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col md:flex-row font-sans text-gray-900">
      {/* Mobile Header */}
      <div className="md:hidden bg-[#161616] text-white px-4 py-3 flex items-center justify-between border-b border-white/10 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="bg-[#F3F4F6] rounded-xl px-2.5 py-1.5 flex items-center justify-center shadow-xs">
            <img
              src="https://resumeai-eta-roan.vercel.app/images/logo-taktal.png"
              alt="TatkalKaam Logo"
              className="h-7 w-auto object-contain"
            />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[rgb(250,12,64)] text-white">
            Admin
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-gray-400 hover:text-white rounded-lg focus:outline-none cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Backdrop for Mobile */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Left Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 bottom-0 z-40 w-64 bg-[#161616] border-r border-white/10 flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ height: "100vh" }}
      >
        {/* Top Branding Section */}
        <div>
          <div className="p-5 border-b border-white/8">
            <div className="bg-[#F3F4F6] rounded-xl p-3 flex items-center justify-center shadow-sm transition-transform duration-200 hover:scale-[1.02]">
              <img
                src="https://resumeai-eta-roan.vercel.app/images/logo-taktal.png"
                alt="TatkalKaam"
                className="h-11 w-auto max-w-[200px] object-contain"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Management
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-[rgba(250,12,64,0.14)] text-white border-l-3 border-[rgb(250,12,64)] shadow-xs shadow-red-900/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5 border-l-3 border-transparent"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? "text-[rgb(250,12,64)]" : "text-gray-400 group-hover:text-gray-200"
                    }`}
                  />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile Mini-Card */}
        <div className="p-4 border-t border-white/8">
          <div className="bg-[#1C1C1C] border border-white/8 rounded-xl p-3 flex items-center justify-between shadow-inner">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[rgb(250,12,64)] to-red-800 text-white font-extrabold text-sm flex items-center justify-center shadow-md shadow-red-900/40">
                  {adminInitial}
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#1C1C1C] shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate leading-snug">
                  {adminUser.name || "Administrator"}
                </div>
                <div className="text-[10px] text-gray-400 truncate leading-snug">
                  {adminUser.email}
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[rgba(250,12,64,0.18)] text-[rgb(250,12,64)] border border-[rgba(250,12,64,0.35)]">
                    {adminUser.is_superuser ? "SUPER ADMIN" : "STAFF"}
                  </span>
                  <span className="text-[9px] text-gray-400 font-medium">v1.0.0</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 text-gray-400 hover:text-[rgb(250,12,64)] hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
