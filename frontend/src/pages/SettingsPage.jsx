import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Camera,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import { useAuth } from "../contexts/AuthContext";
import { updateProfile, changePassword } from "../api";

export default function SettingsPage() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  // Profile Form State
  const [username, setUsername] = useState(user?.username || "");
  const [firstName, setFirstName] = useState(user?.first_name || "");
  const [lastName, setLastName] = useState(user?.last_name || "");
  const [avatarPreview, setAvatarPreview] = useState(user?.picture || "");
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState("");
  const [profileError, setProfileError] = useState("");

  // Password Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      if (user.picture) setAvatarPreview(user.picture);
    }
  }, [user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        setProfileError("Avatar image must be under 3MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result);
        updateUser({ picture: reader.result });
        setProfileSuccess("Avatar updated for your session.");
        setTimeout(() => setProfileSuccess(""), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileError("");
    setProfileSuccess("");
    setIsSavingProfile(true);

    try {
      const updated = await updateProfile({
        username: username.trim(),
        first_name: firstName.trim(),
        last_name: lastName.trim(),
      });
      updateUser({
        username: updated.username,
        first_name: updated.first_name,
        last_name: updated.last_name,
        name: `${updated.first_name} ${updated.last_name}`.trim() || updated.username,
      });
      setProfileSuccess("Profile details saved successfully!");
      setTimeout(() => setProfileSuccess(""), 3500);
    } catch (err) {
      setProfileError(err.message || "Failed to update profile.");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (!newPassword) {
      setPasswordError("Please enter a new password.");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    setIsSavingPassword(true);
    try {
      await changePassword(currentPassword, newPassword);
      setPasswordSuccess("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPasswordSuccess(""), 4000);
    } catch (err) {
      setPasswordError(err.message || "Failed to update password.");
    } finally {
      setIsSavingPassword(false);
    }
  };

  const getInitials = () => {
    if (firstName || lastName) {
      return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
    }
    if (username) return username.slice(0, 2).toUpperCase();
    if (user?.email) return user.email.slice(0, 2).toUpperCase();
    return "U";
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#252525] font-['Plus_Jakarta_Sans'] flex flex-col justify-between">
      {/* Header */}
      <Header openBuilder={(tab) => navigate(`/builder?tab=${tab}`)} />

      <main className="max-w-4xl w-full mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 flex-1">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-[#6B6B6B] mb-2 font-medium">
            <Link to="/dashboard" className="hover:text-[#FA0C40] transition-colors">
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-[#252525] font-bold">Account Settings</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
            Account & Preferences
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1">
            Manage your personal profile, credentials, and authentication settings.
          </p>
        </div>

        <div className="space-y-6">
          {/* ========================================================================= */}
          {/* Card 1: User Profile */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-3xl border border-[#252525]/10 shadow-[0_10px_30px_rgba(37,37,37,0.04)] p-6 sm:p-8 text-left">
            <h2 className="text-lg font-extrabold text-[#252525] mb-1">
              User Profile
            </h2>
            <p className="text-xs text-[#6B6B6B] mb-6">
              Your public identity and display name used across generated documents.
            </p>

            {/* Profile Success / Error Banners */}
            {profileSuccess && (
              <div className="mb-5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{profileSuccess}</span>
              </div>
            )}
            {profileError && (
              <div className="mb-5 p-3.5 rounded-2xl bg-[#FA0C40]/10 border border-[#FA0C40]/25 text-[#FA0C40] text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{profileError}</span>
              </div>
            )}

            {/* Avatar Section */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pb-6 mb-6 border-b border-[#252525]/10">
              <div className="relative">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Profile Avatar"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    className="w-20 h-20 rounded-full object-cover border-2 border-[#FA0C40]/30 shadow-sm"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#FA0C40] to-[#D40936] text-white flex items-center justify-center font-extrabold text-xl shadow-md">
                    {getInitials()}
                  </div>
                )}
                <label
                  htmlFor="avatar-input"
                  className="absolute bottom-0 right-0 w-7 h-7 bg-[#252525] hover:bg-[#FA0C40] text-white rounded-full flex items-center justify-center cursor-pointer shadow-md transition-colors"
                  title="Upload profile photo"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <input
                    id="avatar-input"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              </div>
              <div className="text-center sm:text-left">
                <label
                  htmlFor="avatar-input"
                  className="text-xs font-bold text-[#FA0C40] hover:text-[#D40936] cursor-pointer"
                >
                  Upload New Photo
                </label>
                <p className="text-[11px] text-[#6B6B6B] mt-0.5">
                  JPG, PNG or GIF. Max file size 3MB.
                </p>
              </div>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#252525] mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Alex"
                    className="w-full text-xs sm:text-sm bg-[#252525]/[0.02] border border-[#252525]/15 focus:border-[#FA0C40] rounded-xl px-3.5 py-2.5 text-[#252525] focus:outline-none focus:ring-2 focus:ring-[#FA0C40]/30 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#252525] mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Morgan"
                    className="w-full text-xs sm:text-sm bg-[#252525]/[0.02] border border-[#252525]/15 focus:border-[#FA0C40] rounded-xl px-3.5 py-2.5 text-[#252525] focus:outline-none focus:ring-2 focus:ring-[#FA0C40]/30 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#252525] mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. alex_morgan"
                  className="w-full text-xs sm:text-sm bg-[#252525]/[0.02] border border-[#252525]/15 focus:border-[#FA0C40] rounded-xl px-3.5 py-2.5 text-[#252525] focus:outline-none focus:ring-2 focus:ring-[#FA0C40]/30 transition-all"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSavingProfile}
                  className="px-6 py-2.5 rounded-full bg-[#FA0C40] hover:bg-[#D40936] text-white text-xs font-extrabold shadow-sm transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSavingProfile ? "Saving…" : "Save Profile Details"}
                </button>
              </div>
            </form>
          </div>

          {/* ========================================================================= */}
          {/* Card 2: Email Addresses */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-3xl border border-[#252525]/10 shadow-[0_10px_30px_rgba(37,37,37,0.04)] p-6 sm:p-8 text-left">
            <h2 className="text-lg font-extrabold text-[#252525] mb-1">
              Your Email Addresses
            </h2>
            <p className="text-xs text-[#6B6B6B] mb-5">
              Used for account sign-in, alerts, and resume export notifications.
            </p>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#252525]/[0.02] border border-[#252525]/10 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#FA0C400D] text-[#FA0C40] flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-[#252525]">
                    {user?.email || "user@example.com"}
                  </p>
                  <p className="text-[10px] text-[#6B6B6B]">Primary sign-in email</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-0.5 rounded-full">
                  Primary
                </span>
                <span className="text-[10px] font-extrabold uppercase bg-[#FA0C400D] text-[#FA0C40] border border-[#FA0C40]/20 px-2 py-0.5 rounded-full">
                  Verified
                </span>
              </div>
            </div>

            <button
              type="button"
              disabled
              className="px-4 py-2 rounded-full border border-[#252525]/15 text-[#6B6B6B] text-xs font-semibold bg-[#252525]/5 cursor-not-allowed opacity-60 flex items-center gap-1.5"
              title="Multi-email support coming soon"
            >
              <span>+ Add Another Email</span>
              <span className="text-[9px] font-bold text-[#6B6B6B] uppercase">(Soon)</span>
            </button>
          </div>

          {/* ========================================================================= */}
          {/* Card 3: Reset Password */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-3xl border border-[#252525]/10 shadow-[0_10px_30px_rgba(37,37,37,0.04)] p-6 sm:p-8 text-left">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-lg font-extrabold text-[#252525]">
                Reset Password
              </h2>
              <a
                href="#forgot"
                onClick={(e) => {
                  e.preventDefault();
                  setPasswordSuccess("Password reset instructions can be dispatched to your email.");
                }}
                className="text-[11px] font-bold text-[#FA0C40] hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <p className="text-xs text-[#6B6B6B] mb-5">
              Ensure your account is using a long, random password to stay secure.
            </p>

            {/* Password Success / Error Banners */}
            {passwordSuccess && (
              <div className="mb-5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{passwordSuccess}</span>
              </div>
            )}
            {passwordError && (
              <div className="mb-5 p-3.5 rounded-2xl bg-[#FA0C40]/10 border border-[#FA0C40]/25 text-[#FA0C40] text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#252525] mb-1.5">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full text-xs sm:text-sm bg-[#252525]/[0.02] border border-[#252525]/15 focus:border-[#FA0C40] rounded-xl px-3.5 pr-10 py-2.5 text-[#252525] focus:outline-none focus:ring-2 focus:ring-[#FA0C40]/30 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B6B6B] hover:text-[#252525] cursor-pointer"
                  >
                    {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#252525] mb-1.5">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNew ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimum 8 characters"
                      className="w-full text-xs sm:text-sm bg-[#252525]/[0.02] border border-[#252525]/15 focus:border-[#FA0C40] rounded-xl px-3.5 pr-10 py-2.5 text-[#252525] focus:outline-none focus:ring-2 focus:ring-[#FA0C40]/30 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B6B6B] hover:text-[#252525] cursor-pointer"
                    >
                      {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#252525] mb-1.5">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full text-xs sm:text-sm bg-[#252525]/[0.02] border border-[#252525]/15 focus:border-[#FA0C40] rounded-xl px-3.5 pr-10 py-2.5 text-[#252525] focus:outline-none focus:ring-2 focus:ring-[#FA0C40]/30 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B6B6B] hover:text-[#252525] cursor-pointer"
                    >
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSavingPassword}
                  className="px-6 py-2.5 rounded-full bg-[#252525] hover:bg-[#FA0C40] text-white text-xs font-extrabold transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSavingPassword ? "Updating…" : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer openBuilder={(tab) => navigate(`/builder?tab=${tab}`)} />
    </div>
  );
}

