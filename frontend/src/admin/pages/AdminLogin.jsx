import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../services/adminApi";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Shield, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in both email/username and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await adminApi.login(email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Invalid administrator credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "rgb(37, 37, 37)",
        backgroundImage:
          "radial-gradient(circle at 50% 20%, rgba(250, 12, 64, 0.08) 0%, rgba(37, 37, 37, 1) 75%)",
      }}
    >
      {/* Background Decorative Circles */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 rounded-full bg-red-600/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 rounded-full bg-red-600/5 blur-3xl pointer-events-none" />

      {/* Main Login Card */}
      <div
        className="w-full max-w-md bg-[#202020] border border-[rgba(250,12,64,0.18)] rounded-2xl p-8 shadow-2xl relative z-10 animate-slide-up"
        style={{
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(250, 12, 64, 0.08)",
        }}
      >
        {/* Logo & Header */}
        <div className="flex flex-col items-center text-center mb-7">
          <div className="mb-5 inline-flex items-center justify-center bg-[#F3F4F6] border border-gray-200/50 rounded-2xl px-6 py-3.5 shadow-md transition-transform duration-300 hover:scale-105">
            <img
              src="https://resumeai-eta-roan.vercel.app/images/logo-taktal.png"
              alt="TatkalKaam Logo"
              className="h-16 w-auto max-w-[220px] object-contain"
            />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            TatkalKaam <span className="text-[rgb(250,12,64)] text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-[rgba(250,12,64,0.15)] border border-[rgba(250,12,64,0.3)]">Admin</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1.5 font-medium tracking-wide">
            Authorized Administrator Console
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-950/40 border border-red-800/50 flex items-start gap-3 text-red-200 text-xs animate-shake">
            <AlertCircle className="w-4 h-4 text-[rgb(250,12,64)] shrink-0 mt-0.5" />
            <span className="leading-relaxed font-medium">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email / Username Field */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Email or Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@tatkalkaam.com"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-[#2A2A2A] border border-gray-700/80 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[rgb(250,12,64)] focus:ring-2 focus:ring-[rgba(250,12,64,0.25)] transition-all duration-200"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full pl-10 pr-11 py-2.5 bg-[#2A2A2A] border border-gray-700/80 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[rgb(250,12,64)] focus:ring-2 focus:ring-[rgba(250,12,64,0.25)] transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-200 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 bg-[rgb(250,12,64)] hover:bg-[rgb(225,10,57)] text-white font-bold text-sm rounded-xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-red-600/50 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In to Admin</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security Notice Footer */}
        <div className="mt-8 pt-5 border-t border-gray-800/80 text-center">
          <div className="flex items-center justify-center gap-1.5 text-gray-400 text-xs font-medium">
            <Shield className="w-3.5 h-3.5 text-green-500" />
            <span>Protected portal · All administrative activities are monitored</span>
          </div>
        </div>
      </div>
    </div>
  );
}

