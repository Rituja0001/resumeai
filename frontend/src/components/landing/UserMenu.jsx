import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Settings,
  HelpCircle,
  CreditCard,
  MessageSquare,
  LogOut,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import FeedbackModal from "../feedback/FeedbackModal";

export default function UserMenu() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Reset img error if user picture URL changes
  useEffect(() => {
    setImgError(false);
  }, [user?.picture]);

  // Close on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  const getInitials = () => {
    if (!user) return "U";
    if (user.name && user.name.trim()) {
      const parts = user.name.trim().split(/\s+/);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return parts[0].slice(0, 2).toUpperCase();
    }
    if (user.first_name || user.last_name) {
      const fn = user.first_name?.[0] || "";
      const ln = user.last_name?.[0] || "";
      return (fn + ln).toUpperCase() || "U";
    }
    if (user.username && user.username.trim()) {
      return user.username.trim().slice(0, 2).toUpperCase();
    }
    if (user.email && user.email.trim()) {
      return user.email.trim().slice(0, 2).toUpperCase();
    }
    return "U";
  };

  const displayName = user?.name || user?.first_name || user?.username || user?.email?.split("@")[0] || "My Account";
  const displayEmail = user?.email || "";
  const hasValidPicture = Boolean(user?.picture && typeof user.picture === "string" && user.picture.trim().length > 0 && !imgError);

  return (
    <>
      <div className="relative inline-block text-left font-['Plus_Jakarta_Sans']" ref={menuRef}>
        {/* Trigger Button: User Avatar */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-full border border-[#252525]/10 hover:border-[#FA0C40]/30 bg-white hover:bg-[#252525]/5 transition-all shadow-sm cursor-pointer select-none"
          aria-expanded={isOpen}
          aria-label="User Account Menu"
        >
          {hasValidPicture ? (
            <img
              src={user.picture}
              alt={displayName}
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              onError={() => setImgError(true)}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-[#FA0C40]/20"
            />
          ) : (
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-[#FA0C40] to-[#D40936] text-white flex items-center justify-center font-extrabold text-xs shadow-sm">
              {getInitials()}
            </div>
          )}
          <span className="hidden sm:inline text-xs font-bold text-[#252525] max-w-[120px] truncate">
            {displayName}
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-[#6B6B6B] transition-transform duration-200 ${
              isOpen ? "rotate-180 text-[#FA0C40]" : ""
            }`}
          />
        </button>

        {/* Dropdown Panel (Responsive Width & Positioning) */}
        {isOpen && (
          <div className="absolute right-0 mt-2.5 w-72 max-w-[calc(100vw-32px)] rounded-2xl bg-white/95 backdrop-blur-2xl border border-[#252525]/10 shadow-[0_20px_45px_rgba(37,37,37,0.14)] p-2.5 z-50 transform origin-top-right transition-all animate-dropdown motion-reduce:animate-none text-left">
            {/* User Profile Header */}
            <div className="px-3.5 py-3 border-b border-[#252525]/10 mb-1.5 flex items-center gap-3">
              {hasValidPicture ? (
                <img
                  src={user.picture}
                  alt={displayName}
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  onError={() => setImgError(true)}
                  className="w-10 h-10 rounded-full object-cover border border-[#FA0C40]/25"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FA0C40] to-[#D40936] text-white flex items-center justify-center font-extrabold text-sm shadow-sm">
                  {getInitials()}
                </div>
              )}
              <div className="overflow-hidden">
                <p className="text-sm font-extrabold text-[#252525] truncate">
                  {displayName}
                </p>
                <p className="text-[11px] text-[#6B6B6B] font-medium truncate">
                  {displayEmail}
                </p>
              </div>
            </div>

            {/* Promotional Coach Card */}
            <div className="rounded-xl bg-gradient-to-tr from-[#FA0C40]/10 via-rose-50 to-[#FA0C40]/10 border border-[#FA0C40]/20 p-3 mb-2">
              <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-[#FA0C40] mb-0.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Career Coach</span>
              </div>
              <p className="text-[10px] text-[#252525] leading-snug font-normal mb-2">
                Get recruiter-level feedback and ATS score optimization.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/dashboard");
                }}
                className="w-full text-[11px] font-extrabold bg-[#FA0C40] hover:bg-[#D40936] text-white py-1.5 px-2.5 rounded-lg shadow-sm transition-all text-center cursor-pointer"
              >
                Get Coach Free
              </button>
            </div>

            {/* Menu Items */}
            <div className="space-y-0.5 text-xs font-semibold text-[#252525]">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/dashboard");
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#252525]/5 hover:text-[#FA0C40] transition-colors text-left cursor-pointer"
              >
                <LayoutDashboard className="w-4 h-4 text-[#6B6B6B]" />
                <span>My Dashboard</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/settings");
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#252525]/5 hover:text-[#FA0C40] transition-colors text-left cursor-pointer"
              >
                <Settings className="w-4 h-4 text-[#6B6B6B]" />
                <span>Account Settings</span>
              </button>

              <div className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#252525]/5 transition-colors">
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-4 h-4 text-[#6B6B6B]" />
                  <span>My Plan</span>
                </div>
                <span className="text-[10px] font-extrabold bg-[#252525]/10 text-[#252525] px-2 py-0.5 rounded-full uppercase">
                  Free
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/faq");
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#252525]/5 hover:text-[#FA0C40] transition-colors text-left cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-[#6B6B6B]" />
                <span>FAQs & Help</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setFeedbackOpen(true);
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#252525]/5 hover:text-[#FA0C40] transition-colors text-left cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-[#6B6B6B]" />
                  <span>Give Feedback</span>
                </div>
                <span className="text-[9px] font-extrabold bg-[#FA0C40] text-white px-1.5 py-0.5 rounded-full uppercase">
                  New
                </span>
              </button>
            </div>

            {/* Divider & Log out */}
            <div className="border-t border-[#252525]/10 mt-1.5 pt-1">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#FA0C40] hover:bg-[#FA0C400D] transition-colors text-left cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Give Feedback Modal */}
      <FeedbackModal
        isOpen={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
      />
    </>
  );
}
