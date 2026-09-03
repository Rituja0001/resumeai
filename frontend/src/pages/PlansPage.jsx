import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  Check,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Zap,
  Star,
  ArrowRight,
  Info,
  X,
  HelpCircle,
  Clock,
  Layers,
  FileDown,
} from "lucide-react";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import { useAuth } from "../contexts/AuthContext";

export default function PlansPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("resume"); // "resume" | "coach"
  const [comingSoonModal, setComingSoonModal] = useState({ open: false, planName: "" });
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);

  const currentPlan = user?.plan || "Free";

  const handleUpgradeClick = (planName) => {
    setComingSoonModal({ open: true, planName });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#252525] font-['Plus_Jakarta_Sans'] flex flex-col justify-between">
      {/* Global Header */}
      <Header openBuilder={(tab) => navigate(`/builder?path=${tab}`)} />

      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 flex-1">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-xs text-[#6B6B6B] font-medium">
            <Link to="/" className="hover:text-[#FA0C40] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/dashboard" className="hover:text-[#FA0C40] transition-colors">
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-[#252525] font-bold">Billing and Plans</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-[#6B6B6B]">
            <span>Current Plan:</span>
            <span className="text-[#252525] font-extrabold uppercase">{currentPlan}</span>
          </div>
        </div>

        {/* Page Title & Intro */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FA0C400D] border border-[#FA0C40]/20 text-[#FA0C40] text-xs font-extrabold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Plans & Subscriptions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#252525] tracking-tight leading-tight">
            Plans & Billing
          </h1>
          <p className="text-sm sm:text-base text-[#6B6B6B] mt-2 leading-relaxed font-normal">
            Choose the right plan to unlock unlimited executive resumes, real-time AI job tailoring, and high-resolution PDF exports.
          </p>
        </div>

        {/* Plan Switcher Tabs */}
        <div className="flex items-center gap-2 mb-8 border-b border-[#252525]/10 pb-4 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab("resume")}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "resume"
                ? "bg-[#FA0C40] text-white shadow-md shadow-[#FA0C40]/25 scale-100"
                : "bg-white text-[#252525] border border-slate-200 hover:border-slate-300"
            }`}
          >
            Resume Plan
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("coach")}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === "coach"
                ? "bg-[#FA0C40] text-white shadow-md shadow-[#FA0C40]/25 scale-100"
                : "bg-white text-[#252525] border border-slate-200 hover:border-slate-300"
            }`}
          >
            <span>Coach Plan</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
              activeTab === "coach" ? "bg-white/20 text-white" : "bg-amber-100 text-amber-700"
            }`}>
              Coming Soon
            </span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: RESUME PLAN CONTENT                                                */}
        {/* ========================================================================= */}
        {activeTab === "resume" && (
          <div className="space-y-8 animate-scale-in">
            {/* Current Plan Status Banner */}
            <div className="bg-white rounded-3xl border border-[#252525]/10 p-5 sm:p-6 shadow-[0_4px_20px_rgba(37,37,37,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#FA0C400D] border border-[#FA0C40]/20 text-[#FA0C40] flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-extrabold text-[#252525]">
                      You are on the Free Plan
                    </h3>
                    <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-[#6B6B6B] mt-0.5 leading-relaxed">
                    Includes 1 active resume draft and basic ATS keyword checks. Upgrade below to unlock unlimited resumes, all 10 layout templates, and PDF exports.
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="px-5 py-2.5 rounded-full border border-slate-200 hover:border-[#252525] bg-white text-xs font-bold text-[#252525] transition-colors cursor-pointer"
                >
                  View My Resumes
                </button>
              </div>
            </div>

            {/* Transparent Pricing Info Banner */}
            <div className="bg-[#FA0C400D] border border-[#FA0C40]/20 rounded-2xl p-4 flex items-center gap-3 text-xs text-[#252525] font-semibold">
              <ShieldCheck className="w-5 h-5 text-[#FA0C40] shrink-0" />
              <span>
                <strong>Transparent Pricing:</strong> All upgrades include full access to ATS calibration, auto cloud drafts, and zero recurring surprise charges.
              </span>
            </div>

            {/* 3 Pricing Tier Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {/* Card 1: Starter / Free */}
              <div className="bg-white rounded-3xl border border-[#252525]/10 p-6 sm:p-7 shadow-[0_4px_20px_rgba(37,37,37,0.03)] flex flex-col justify-between text-left relative">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#6B6B6B]">
                      Starter Tier
                    </span>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full">
                      Free Forever
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-[#252525] mb-1">
                    Free Plan
                  </h3>
                  <p className="text-xs text-[#6B6B6B] mb-5">
                    Essential tools for building and editing your first professional resume.
                  </p>

                  <div className="flex items-baseline gap-1.5 mb-6">
                    <span className="text-3xl font-extrabold text-[#252525]">₹0</span>
                    <span className="text-xs text-[#6B6B6B] font-medium">/ lifetime</span>
                  </div>

                  <div className="space-y-3 border-t border-slate-100 pt-5">
                    <p className="text-xs font-bold text-[#252525]">What's included:</p>
                    <ul className="space-y-2.5 text-xs text-[#6B6B6B]">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>1 Active resume version</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>2 Modern layout templates</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Standard ATS keyword screening</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Real-time on-screen preview</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    type="button"
                    disabled
                    className="w-full py-3 rounded-full bg-slate-100 text-[#6B6B6B] text-xs font-extrabold cursor-not-allowed text-center"
                  >
                    Current Plan
                  </button>
                </div>
              </div>

              {/* Card 2: Pro Builder (Most Popular) */}
              <div className="bg-white rounded-3xl border-2 border-[#FA0C40] p-6 sm:p-7 shadow-[0_12px_35px_rgba(250,12,64,0.12)] flex flex-col justify-between text-left relative">
                {/* Popular Badge */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FA0C40] text-white text-[11px] font-extrabold uppercase px-4 py-1 rounded-full shadow-sm tracking-wider">
                  Most Popular
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#FA0C40]">
                      Pro Builder
                    </span>
                    <span className="text-[10px] font-extrabold bg-[#FA0C400D] text-[#FA0C40] px-2.5 py-0.5 rounded-full border border-[#FA0C40]/20">
                      Save 50%
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-[#252525] mb-1">
                    Pro Plan
                  </h3>
                  <p className="text-xs text-[#6B6B6B] mb-5">
                    For active job seekers targeting recruiter callbacks & high ATS pass rates.
                  </p>

                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-3xl font-extrabold text-[#252525]">₹499</span>
                    <span className="text-xs text-slate-400 line-through font-medium">₹999</span>
                    <span className="text-xs text-[#6B6B6B] font-medium">/ 6 months</span>
                  </div>

                  <div className="space-y-3 border-t border-slate-100 pt-5">
                    <p className="text-xs font-bold text-[#252525]">Everything in Free, plus:</p>
                    <ul className="space-y-2.5 text-xs text-[#252525] font-medium">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#FA0C40] shrink-0" />
                        <span><strong>Unlimited</strong> resume versions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#FA0C40] shrink-0" />
                        <span>All <strong>10 Modern & Executive</strong> templates</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#FA0C40] shrink-0" />
                        <span>Unlimited high-resolution <strong>PDF downloads</strong></span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#FA0C40] shrink-0" />
                        <span>AI bullet point quantification & verbs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#FA0C40] shrink-0" />
                        <span>Unlimited Job Description tailoring</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    type="button"
                    onClick={() => handleUpgradeClick("Pro Plan (₹499)")}
                    className="w-full py-3.5 rounded-full bg-[#FA0C40] hover:bg-[#D40936] text-white text-xs font-extrabold shadow-md shadow-[#FA0C40]/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-center"
                  >
                    Upgrade to Pro
                  </button>
                </div>
              </div>

              {/* Card 3: Executive / Lifetime */}
              <div className="bg-white rounded-3xl border border-[#252525]/10 p-6 sm:p-7 shadow-[0_4px_20px_rgba(37,37,37,0.03)] flex flex-col justify-between text-left relative">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#6B6B6B]">
                      Executive Tier
                    </span>
                    <span className="text-[10px] font-bold bg-[#252525] text-white px-2.5 py-0.5 rounded-full">
                      Lifetime Access
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-[#252525] mb-1">
                    Lifetime VIP
                  </h3>
                  <p className="text-xs text-[#6B6B6B] mb-5">
                    Complete career suite with priority AI generation and lifetime updates.
                  </p>

                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-3xl font-extrabold text-[#252525]">₹1,499</span>
                    <span className="text-xs text-slate-400 line-through font-medium">₹2,999</span>
                    <span className="text-xs text-[#6B6B6B] font-medium">/ one-time</span>
                  </div>

                  <div className="space-y-3 border-t border-slate-100 pt-5">
                    <p className="text-xs font-bold text-[#252525]">Everything in Pro, plus:</p>
                    <ul className="space-y-2.5 text-xs text-[#252525] font-medium">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#FA0C40] shrink-0" />
                        <span><strong>Lifetime access</strong> with zero recurring fees</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#FA0C40] shrink-0" />
                        <span>All future templates & design drops</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#FA0C40] shrink-0" />
                        <span>Priority Claude AI generation queue</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#FA0C40] shrink-0" />
                        <span>Cover letter tailoring assistant</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#FA0C40] shrink-0" />
                        <span>Comprehensive ATS scanner audit report</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    type="button"
                    onClick={() => handleUpgradeClick("Lifetime VIP (₹1,499)")}
                    className="w-full py-3.5 rounded-full bg-[#252525] hover:bg-[#FA0C40] text-white text-xs font-extrabold transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-center"
                  >
                    Upgrade to Lifetime
                  </button>
                </div>
              </div>
            </div>

            {/* Feature Comparison Checklist */}
            <div className="bg-white rounded-3xl border border-[#252525]/10 p-6 sm:p-8 shadow-[0_4px_20px_rgba(37,37,37,0.03)] space-y-5">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-extrabold text-[#252525] tracking-tight">
                  What Every Upgraded Plan Unlocks
                </h3>
                <p className="text-xs text-[#6B6B6B] mt-0.5">
                  Engineered specifically to get your resume past enterprise ATS scanners and into human recruiters' hands.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FA0C400D] border border-[#FA0C40]/20 text-[#FA0C40] flex items-center justify-center shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-[#252525]">All 10 Layout Templates</h4>
                    <p className="text-[11px] text-[#6B6B6B] mt-0.5 leading-snug">
                      Switch instantly between single-column, two-column, and modern timeline layouts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FA0C400D] border border-[#FA0C40]/20 text-[#FA0C40] flex items-center justify-center shrink-0">
                    <FileDown className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-[#252525]">Vector PDF Downloads</h4>
                    <p className="text-[11px] text-[#6B6B6B] mt-0.5 leading-snug">
                      High-resolution document exports with standard A4 pagination and selectable text.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FA0C400D] border border-[#FA0C40]/20 text-[#FA0C40] flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-[#252525]">Claude AI Enhancement</h4>
                    <p className="text-[11px] text-[#6B6B6B] mt-0.5 leading-snug">
                      Generates strong action verbs and quantified impact metrics for your work experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: COACH PLAN (COMING SOON)                                           */}
        {/* ========================================================================= */}
        {activeTab === "coach" && (
          <div className="bg-white rounded-3xl border border-[#252525]/10 p-8 sm:p-12 shadow-[0_4px_20px_rgba(37,37,37,0.03)] text-center max-w-2xl mx-auto space-y-5 animate-scale-in">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-sm">
              <Clock className="w-8 h-8" />
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-700 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                In Development
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
                AI Career Coach & Mock Interviewer
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6B6B] mt-2.5 leading-relaxed">
                Practice realistic recruiter screening calls, receive instant feedback on your answers, and learn personalized salary negotiation strategies powered by conversational AI.
              </p>
            </div>

            {waitlistSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>You're on the VIP waitlist! We'll notify you as soon as early access opens.</span>
              </div>
            ) : (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setWaitlistSuccess(true)}
                  className="px-7 py-3 rounded-full bg-[#FA0C40] hover:bg-[#D40936] text-white text-xs font-extrabold shadow-md shadow-[#FA0C40]/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Join Early Access Waitlist
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer openBuilder={(tab) => navigate(`/builder?path=${tab}`)} />

      {/* ========================================================================= */}
      {/* PAYMENTS COMING SOON MODAL                                                */}
      {/* ========================================================================= */}
      {comingSoonModal.open &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-fade-in font-['Plus_Jakarta_Sans'] overflow-y-auto"
            onClick={() => setComingSoonModal({ open: false, planName: "" })}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="relative w-full max-w-md bg-white rounded-3xl border border-[#252525]/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] p-6 sm:p-8 text-center space-y-4 animate-scale-in my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setComingSoonModal({ open: false, planName: "" })}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#252525]/5 hover:bg-[#252525]/10 text-[#6B6B6B] hover:text-[#252525] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-14 h-14 rounded-2xl bg-[#FA0C400D] border border-[#FA0C40]/20 text-[#FA0C40] flex items-center justify-center mx-auto shadow-sm">
                <CreditCard className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FA0C40] bg-[#FA0C400D] px-2.5 py-0.5 rounded-full border border-[#FA0C40]/20">
                  Payment Gateway Integration
                </span>
                <h3 className="text-xl font-extrabold text-[#252525] mt-2">
                  Checkout Coming Soon!
                </h3>
                <p className="text-xs text-[#6B6B6B] mt-2 leading-relaxed">
                  We are currently integrating secure payment processing for <strong>{comingSoonModal.planName}</strong>. All features remain fully previewable in the editor while we finalize gateway verification.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setComingSoonModal({ open: false, planName: "" })}
                  className="w-full py-3 rounded-full bg-[#252525] hover:bg-[#FA0C40] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Got It, Thanks!
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

