import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, LayoutDashboard, Settings, HelpCircle, LogOut } from "lucide-react";
import { LOGGED_IN_NAV, LOGGED_OUT_NAV } from "./constants";
import UserMenu from "./UserMenu";
import { useAuth } from "../../contexts/AuthContext";

export default function Header({ openBuilder, onLogoClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(true);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = isAuthenticated ? LOGGED_IN_NAV : LOGGED_OUT_NAV;

  // Scroll listener for glassmorphism shrink effect (threshold 12px)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    handleScroll(); // initial check
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Resize listener to auto-close mobile menu on desktop viewport (>= 768px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (e, href, isRoute) => {
    setMobileMenuOpen(false);
    if (!isRoute && (href.startsWith("#") || href.startsWith("/#"))) {
      const hash = href.includes("#") ? href.substring(href.indexOf("#")) : href;
      if (location.pathname === "/") {
        const target = document.querySelector(hash);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
          return;
        }
      } else {
        e.preventDefault();
        navigate(`/${hash}`);
        return;
      }
    }
  };

  const handleBrandClick = (e) => {
    if (onLogoClick) onLogoClick();
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-out font-['Plus_Jakarta_Sans'] ${
          scrolled
            ? "bg-white/92 backdrop-blur-xl border-b border-[#2525251a] shadow-[0_4px_25px_rgba(37,37,37,0.07),0_1px_3px_rgba(37,37,37,0.06)] py-2.5 sm:py-3"
            : "bg-white/80 sm:bg-white/75 backdrop-blur-md border-b border-[#252525]/10 shadow-[0_1px_3px_rgba(37,37,37,0.06),0_1px_2px_rgba(37,37,37,0.04)] py-3.5 sm:py-4"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8">
          {/* Logo: /images/logo-taktal.png with Plus Jakarta Sans wordmark fallback */}
          <Link
            to={isAuthenticated ? "/dashboard" : "/"}
            onClick={handleBrandClick}
            className="flex items-center gap-2.5 group select-none transition-transform duration-200 active:scale-95 cursor-pointer"
          >
            {logoLoaded ? (
              <img
                src="/images/logo-taktal.png"
                alt="ResumeCraft Logo"
                onError={() => setLogoLoaded(false)}
                className={`transition-all duration-300 ease-out object-contain select-none max-w-[190px] ${
                  scrolled ? "h-8 sm:h-9 w-auto" : "h-10 sm:h-11 w-auto"
                }`}
              />
            ) : (
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FA0C40] to-[#D40936] text-white flex items-center justify-center text-base font-extrabold shadow-sm">
                  R
                </span>
                <span className="font-['Plus_Jakarta_Sans'] font-extrabold text-2xl tracking-tight text-[#252525] transition-colors group-hover:text-[#FA0C40]">
                  ResumeCraft
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Navigation Links (md: and up) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((link) => {
              if (link.isRoute) {
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="relative text-sm font-semibold text-[#252525]/80 hover:text-[#252525] transition-colors py-1 group"
                  >
                    <span>{link.label}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FA0C40] rounded-full transition-all duration-300 ease-out group-hover:w-full" />
                  </Link>
                );
              }
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.isRoute)}
                  className="relative text-sm font-semibold text-[#252525]/80 hover:text-[#252525] transition-colors py-1 group"
                >
                  <span>{link.label}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FA0C40] rounded-full transition-all duration-300 ease-out group-hover:w-full" />
                </a>
              );
            })}
          </nav>

          {/* Right Action Area (Avatar / Sign in + Hamburger) */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <div className="hidden md:flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-[#6B6B6B] hover:text-[#252525] transition-colors cursor-pointer"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="font-bold text-sm bg-[#FA0C40] hover:bg-[#D40936] text-white px-5 py-2.5 rounded-full shadow-[0_4px_16px_rgba(250,12,64,0.25)] hover:shadow-[0_6px_22px_rgba(250,12,64,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 focus:outline-none z-50 p-1.5 rounded-xl hover:bg-black/5 active:scale-90 transition-all cursor-pointer"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              <span
                className={`w-5 h-0.5 bg-[#252525] rounded-full transition-all duration-300 ease-out origin-center ${
                  mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-[#252525] rounded-full transition-all duration-200 ease-out ${
                  mobileMenuOpen ? "opacity-0 scale-x-0" : "opacity-100"
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-[#252525] rounded-full transition-all duration-300 ease-out origin-center ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Menu Panel */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            mobileMenuOpen
              ? "max-h-[500px] opacity-100 bg-white/95 backdrop-blur-2xl border-b border-[#2525251a] shadow-2xl"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="px-6 py-6 space-y-4">
            <div className="flex flex-col space-y-3 pb-4 border-b border-[#2525251a]">
              {navItems.map((link) => {
                if (link.isRoute) {
                  return (
                    <Link
                      key={link.label}
                      to={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-base font-semibold text-[#252525]/90 hover:text-[#FA0C40] transition-colors py-1"
                    >
                      {link.label}
                    </Link>
                  );
                }
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href, link.isRoute)}
                    className="text-base font-semibold text-[#252525]/90 hover:text-[#FA0C40] transition-colors py-1"
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            <div className="flex flex-col gap-3 pt-1">
              {isAuthenticated ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/dashboard");
                    }}
                    className="w-full text-sm font-bold bg-[#FA0C40] hover:bg-[#D40936] text-white py-3 rounded-full text-center shadow-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>My Dashboard</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/settings");
                    }}
                    className="w-full text-sm font-semibold text-[#252525] py-2.5 rounded-full border border-[#2525251a] text-center hover:bg-[#252525]/5 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Settings className="w-4 h-4 text-[#6B6B6B]" />
                    <span>Account Settings</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                      navigate("/");
                    }}
                    className="w-full text-sm font-bold text-[#FA0C40] py-2 text-center flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-sm font-semibold text-[#252525] py-3 rounded-full border border-[#2525251a] text-center hover:bg-[#252525]/5 transition-colors cursor-pointer block"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-sm font-bold bg-[#FA0C40] hover:bg-[#D40936] text-white py-3 rounded-full text-center shadow-md flex items-center justify-center gap-2 transition-colors cursor-pointer block"
                  >
                    <span>Get Started Free</span>
                    <ArrowRight className="w-4 h-4 inline" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Spacer element right after fixed header so content is never hidden */}
      <div className="h-20 sm:h-24 pointer-events-none" aria-hidden="true" />
    </>
  );
}
