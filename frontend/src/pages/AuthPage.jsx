import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Lock,
  Mail,
  User,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function AuthPage({ initialMode = "login" }) {
  const [mode, setMode] = useState(initialMode); // "login" | "signup"
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(true);

  const { login, signup, loginWithGoogle, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const googleBtnRef = useRef(null);

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
  const from = location.state?.from?.pathname || "/dashboard";

  // If already authenticated, redirect immediately
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Update mode if initialMode prop changes
  useEffect(() => {
    setMode(initialMode);
    setApiError("");
    setErrors({});
  }, [initialMode]);

  // Load & Initialize Google Identity Services
  useEffect(() => {
    if (!googleClientId) return;

    const handleCredentialResponse = async (response) => {
      if (response && response.credential) {
        setIsSubmitting(true);
        setApiError("");
        try {
          await loginWithGoogle(response.credential);
          navigate(from, { replace: true });
        } catch (err) {
          setApiError(err.message || "Google sign-in failed. Please try again.");
        } finally {
          setIsSubmitting(false);
        }
      }
    };

    const scriptId = "google-jssdk";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.google?.accounts?.id) {
          window.google.accounts.id.initialize({
            client_id: googleClientId,
            callback: handleCredentialResponse,
          });
        }
      };
      document.body.appendChild(script);
    } else if (window.google?.accounts?.id) {
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleCredentialResponse,
      });
    }
  }, [googleClientId, loginWithGoogle, navigate, from]);

  // Calculate Password Strength (0 to 100)
  const calculatePasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: "Empty", color: "bg-slate-200" };
    let score = 0;
    if (pass.length >= 8) score += 30;
    if (/[A-Z]/.test(pass)) score += 20;
    if (/[0-9]/.test(pass)) score += 25;
    if (/[^A-Za-z0-9]/.test(pass)) score += 25;

    if (score < 40) return { score: 30, label: "Weak", color: "bg-[#FA0C40]" };
    if (score < 75) return { score: 65, label: "Medium", color: "bg-amber-500" };
    return { score: 100, label: "Strong", color: "bg-emerald-500" };
  };

  const passwordStrength = calculatePasswordStrength(password);

  const validateForm = () => {
    const errs = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      errs.email = "Email address is required.";
    } else if (!emailRegex.test(email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    if (!password) {
      errs.password = "Password is required.";
    } else if (mode === "signup" && password.length < 8) {
      errs.password = "Password must be at least 8 characters.";
    }

    if (mode === "signup") {
      if (!username.trim()) {
        errs.username = "Name or username is required.";
      }
      if (password !== confirmPassword) {
        errs.confirmPassword = "Passwords do not match.";
      }
      if (!agreeTerms) {
        errs.terms = "You must agree to the terms to create an account.";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (mode === "login") {
        await login(email.trim(), password);
      } else {
        await signup(email.trim(), username.trim(), password);
      }
      navigate(from, { replace: true });
    } catch (err) {
      setApiError(err.message || "Authentication failed. Please check your details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleClick = () => {
    if (!googleClientId) {
      setApiError("Google OAuth is not configured yet (VITE_GOOGLE_CLIENT_ID missing). Use email/password for testing.");
      return;
    }
    if (window.google?.accounts?.id) {
      window.google.accounts.id.prompt();
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col justify-center items-center py-10 px-4 sm:px-6 relative overflow-hidden font-['Plus_Jakarta_Sans'] text-[#252525]">
      <style>{`
        @keyframes authEntrance {
          from {
            opacity: 0;
            transform: scale(0.98) translateY(12px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .auth-card-entrance {
          animation: authEntrance 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Decorative Subtle Crimson Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#FA0C400D] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#FA0C40]/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#25252508_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-50" />

      {/* Main Centered Card Container */}
      <div className="auth-card-entrance relative z-10 w-full max-w-[460px] bg-white rounded-3xl border border-[#252525]/10 shadow-[0_20px_50px_rgba(37,37,37,0.08)] p-6 sm:p-9 text-left">
        {/* Brand Logo & Back to Home */}
        <div className="text-center mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 group select-none transition-transform active:scale-95 mb-3"
          >
            {logoLoaded ? (
              <img
                src="/images/logo-taktal.png"
                alt="ResumeCraft"
                onError={() => setLogoLoaded(false)}
                className="h-8 object-contain"
              />
            ) : (
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FA0C40] to-[#D40936] text-white flex items-center justify-center text-sm font-extrabold shadow-sm">
                  R
                </span>
                <span className="font-extrabold text-2xl tracking-tight text-[#252525] group-hover:text-[#FA0C40] transition-colors">
                  ResumeCraft
                </span>
              </div>
            )}
          </Link>
          <p className="text-xs text-[#6B6B6B] font-medium">
            Next-Gen AI Resume & ATS Optimization Platform
          </p>
        </div>

        {/* Sliding Pill Tab Switcher */}
        <div className="relative flex p-1 bg-[#252525]/5 rounded-2xl mb-6 border border-[#252525]/5">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setApiError("");
              setErrors({});
            }}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer ${
              mode === "login"
                ? "bg-white text-[#252525] shadow-sm font-extrabold"
                : "text-[#6B6B6B] hover:text-[#252525]"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setApiError("");
              setErrors({});
            }}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer ${
              mode === "signup"
                ? "bg-white text-[#252525] shadow-sm font-extrabold"
                : "text-[#6B6B6B] hover:text-[#252525]"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Inline Error Alert Banner */}
        {apiError && (
          <div className="mb-5 p-3.5 rounded-2xl bg-[#FA0C40]/10 border border-[#FA0C40]/25 text-[#FA0C40] flex items-start gap-2.5 text-xs font-semibold animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-snug">{apiError}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username / Full Name (Signup Only) */}
          {mode === "signup" && (
            <div>
              <label className="block text-xs font-bold text-[#252525] mb-1.5">
                Full Name / Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B6B6B]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className={`w-full pl-10 pr-3.5 py-3 text-xs sm:text-sm bg-[#252525]/[0.02] border rounded-xl text-[#252525] placeholder:text-[#6B6B6B]/60 focus:outline-none focus:ring-2 focus:ring-[#FA0C40]/30 transition-all ${
                    errors.username
                      ? "border-[#FA0C40] bg-[#FA0C40]/5"
                      : "border-[#252525]/15 focus:border-[#FA0C40]"
                  }`}
                />
              </div>
              {errors.username && (
                <p className="text-[11px] text-[#FA0C40] font-semibold mt-1">
                  {errors.username}
                </p>
              )}
            </div>
          )}

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-[#252525] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B6B6B]">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className={`w-full pl-10 pr-3.5 py-3 text-xs sm:text-sm bg-[#252525]/[0.02] border rounded-xl text-[#252525] placeholder:text-[#6B6B6B]/60 focus:outline-none focus:ring-2 focus:ring-[#FA0C40]/30 transition-all ${
                  errors.email
                    ? "border-[#FA0C40] bg-[#FA0C40]/5"
                    : "border-[#252525]/15 focus:border-[#FA0C40]"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-[11px] text-[#FA0C40] font-semibold mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-[#252525]">
                Password
              </label>
              {mode === "login" && (
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    setApiError("Password reset service will be sent to your email.");
                  }}
                  className="text-[11px] font-bold text-[#FA0C40] hover:underline"
                >
                  Forgot password?
                </a>
              )}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B6B6B]">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === "signup" ? "Create a strong password" : "Enter your password"}
                className={`w-full pl-10 pr-10 py-3 text-xs sm:text-sm bg-[#252525]/[0.02] border rounded-xl text-[#252525] placeholder:text-[#6B6B6B]/60 focus:outline-none focus:ring-2 focus:ring-[#FA0C40]/30 transition-all ${
                  errors.password
                    ? "border-[#FA0C40] bg-[#FA0C40]/5"
                    : "border-[#252525]/15 focus:border-[#FA0C40]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B6B6B] hover:text-[#252525] cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-[11px] text-[#FA0C40] font-semibold mt-1">
                {errors.password}
              </p>
            )}

            {/* Password Strength Meter (Signup Only) */}
            {mode === "signup" && password && (
              <div className="mt-2 space-y-1">
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span className="text-[#6B6B6B]">Strength:</span>
                  <span className={passwordStrength.score >= 75 ? "text-emerald-600" : passwordStrength.score >= 40 ? "text-amber-600" : "text-[#FA0C40]"}>
                    {passwordStrength.label}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-[#252525]/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${passwordStrength.color} rounded-full transition-all duration-300`}
                    style={{ width: `${passwordStrength.score}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password (Signup Only) */}
          {mode === "signup" && (
            <div>
              <label className="block text-xs font-bold text-[#252525] mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B6B6B]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className={`w-full pl-10 pr-10 py-3 text-xs sm:text-sm bg-[#252525]/[0.02] border rounded-xl text-[#252525] placeholder:text-[#6B6B6B]/60 focus:outline-none focus:ring-2 focus:ring-[#FA0C40]/30 transition-all ${
                    errors.confirmPassword
                      ? "border-[#FA0C40] bg-[#FA0C40]/5"
                      : "border-[#252525]/15 focus:border-[#FA0C40]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B6B6B] hover:text-[#252525] cursor-pointer"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-[11px] text-[#FA0C40] font-semibold mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          )}

          {/* Agree Terms Checkbox (Signup Only) */}
          {mode === "signup" && (
            <div>
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-[#252525]/20 text-[#FA0C40] focus:ring-[#FA0C40]/30 cursor-pointer"
                />
                <span className="text-xs text-[#6B6B6B] leading-tight font-normal">
                  I agree to the{" "}
                  <a href="#terms" className="text-[#252525] font-bold underline hover:text-[#FA0C40]">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#privacy" className="text-[#252525] font-bold underline hover:text-[#FA0C40]">
                    Privacy Policy
                  </a>.
                </span>
              </label>
              {errors.terms && (
                <p className="text-[11px] text-[#FA0C40] font-semibold mt-1">
                  {errors.terms}
                </p>
              )}
            </div>
          )}

          {/* Primary Submit Pill Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 bg-[#FA0C40] hover:bg-[#D40936] text-white py-3.5 px-5 rounded-full font-extrabold text-sm shadow-[0_8px_20px_rgba(250,12,64,0.3)] hover:shadow-[0_12px_28px_rgba(250,12,64,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>{mode === "login" ? "Signing In…" : "Creating Account…"}</span>
              </>
            ) : (
              <>
                <span>{mode === "login" ? "Sign In to ResumeCraft" : "Create My Free Account"}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider with "or continue with" */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#252525]/10" />
          </div>
          <span className="relative bg-white px-3 text-[11px] font-bold uppercase tracking-wider text-[#6B6B6B]">
            or continue with
          </span>
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleClick}
          disabled={isSubmitting}
          className="w-full py-3 px-4 rounded-full border border-[#252525]/15 bg-white hover:bg-[#252525]/5 text-[#252525] font-bold text-xs sm:text-sm flex items-center justify-center gap-3 shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer relative"
        >
          {/* Google G Logo SVG */}
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
          {!googleClientId && (
            <span className="absolute right-3 text-[10px] font-semibold text-[#6B6B6B] bg-[#252525]/5 px-2 py-0.5 rounded-md hidden sm:inline">
              Dev Mode
            </span>
          )}
        </button>
      </div>

      {/* Footer reassurance */}
      <div className="relative z-10 text-center mt-6 text-xs text-[#6B6B6B]">
        <span>Protected by enterprise-grade encryption</span>
        <span className="mx-2">•</span>
        <Link to="/" className="font-bold text-[#252525] hover:text-[#FA0C40] transition-colors">
          Return to Home
        </Link>
      </div>
    </div>
  );
}

