import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useSearchParams, useLocation, Navigate } from "react-router-dom";
import BuilderPage from "./pages/BuilderPage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import SettingsPage from "./pages/SettingsPage";
import FaqPage from "./pages/FaqPage";
import TemplatesPage from "./pages/TemplatesPage";
import ContactPage from "./pages/ContactPage";
import PlansPage from "./pages/PlansPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { FONT_IMPORT } from "./components/landing/constants";
import Header from "./components/landing/Header";
import Hero from "./components/landing/Hero";
import BuildPathsSection from "./components/landing/BuildPathsSection";
import StatsSection from "./components/landing/StatsSection";
import TailoringSection from "./components/landing/TailoringSection";
import FaqSection from "./components/landing/FaqSection";
import CtaSection from "./components/landing/CtaSection";
import Footer from "./components/landing/Footer";

function BuilderWrapper() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tab = searchParams.get("path") || searchParams.get("tab") || "upload";
  const resumeId = searchParams.get("resume") || null;
  return <BuilderPage initialTab={tab} initialResumeId={resumeId} onBack={() => navigate("/dashboard")} />;
}

function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }
  }, [location.hash]);

  const openBuilder = (tab = "upload") => {
    navigate(`/builder?path=${tab}`);
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans antialiased text-[#252525]">
      {/* Modular Landing Page Sections */}
      <Header openBuilder={openBuilder} onLogoClick={handleLogoClick} />
      <Hero openBuilder={openBuilder} />
      <BuildPathsSection openBuilder={openBuilder} />
      <StatsSection openBuilder={openBuilder} />
      <TailoringSection openBuilder={openBuilder} />
      <FaqSection openBuilder={openBuilder} />
      <CtaSection openBuilder={openBuilder} />
      <Footer openBuilder={openBuilder} onLogoClick={handleLogoClick} />
    </div>
  );
}

/**
 * ResumeCraft — AI Resume Builder Application Routes
 */
export default function App() {
  return (
    <>
      <style>{`
        ${FONT_IMPORT}
        @keyframes floatSmooth {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes floatSmoothDelayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(8px); }
        }
        @keyframes scanLaser {
          0% { top: 0%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 98%; opacity: 0; }
        }
        @keyframes dropdownSlide {
          from { opacity: 0; transform: scale(0.95) translateY(-6px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(100%); }
          to { opacity: 1; transform: translateY(0); }
        }
        .float-card { animation: floatSmooth 4.5s ease-in-out infinite; }
        .float-card-delayed { animation: floatSmoothDelayed 5.2s ease-in-out infinite; }
        .scan-laser { animation: scanLaser 3.6s cubic-bezier(.45,0,.55,1) infinite; }
        .animate-dropdown { animation: dropdownSlide 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-up { animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @media (prefers-reduced-motion: reduce) {
          *, ::before, ::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage initialMode="login" />} />
        <Route path="/signup" element={<AuthPage initialMode="signup" />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Protected Authenticated Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/templates"
          element={
            <ProtectedRoute>
              <TemplatesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/plans"
          element={
            <ProtectedRoute>
              <PlansPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/builder"
          element={
            <ProtectedRoute>
              <BuilderWrapper />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
