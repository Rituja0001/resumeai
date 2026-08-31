import React, { useState, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  HelpCircle,
  Sparkles,
  Mail,
  UserCheck,
  CreditCard,
  FileText,
  Sliders,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import { FAQS } from "../components/landing/constants";

const CATEGORIES = [
  {
    id: "all",
    label: "All Topics",
    icon: HelpCircle,
    desc: "Browse every help topic and question",
  },
  {
    id: "builder",
    label: "Resume Builder",
    icon: FileText,
    desc: "Uploads, LinkedIn sync, voice AI & canvas",
  },
  {
    id: "tailoring",
    label: "Job Tailoring & ATS",
    icon: Sliders,
    desc: "Keyword match scores & bullet enhancer",
  },
  {
    id: "account",
    label: "Account & Privacy",
    icon: UserCheck,
    desc: "Profile, passwords & data encryption",
  },
  {
    id: "plans",
    label: "Plans & Billing",
    icon: CreditCard,
    desc: "Free features, pro tiers & subscriptions",
  },
];

export default function FaqPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedId, setExpandedId] = useState(null);
  const [popularExpanded, setPopularExpanded] = useState(null);
  const carouselRef = useRef(null);

  // Filter FAQs based on category and search query
  const filteredFaqs = useMemo(() => {
    return FAQS.filter((faq) => {
      const matchCat = selectedCategory === "all" || faq.category === selectedCategory;
      const matchQuery =
        searchQuery.trim() === "" ||
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  const popularFaqs = useMemo(() => {
    return FAQS.filter((f) => f.popular);
  }, []);

  const handleScrollCarousel = (direction) => {
    if (carouselRef.current) {
      const offset = direction === "left" ? -300 : 300;
      carouselRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const toggleAccordion = (index) => {
    setExpandedId(expandedId === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#252525] font-['Plus_Jakarta_Sans'] flex flex-col justify-between">
      {/* Header */}
      <Header openBuilder={(tab) => navigate(`/builder?tab=${tab}`)} />

      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 flex-1">
        {/* ========================================================================= */}
        {/* Breadcrumb & Hero Search Heading */}
        {/* ========================================================================= */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs text-[#6B6B6B] mb-3 font-medium">
            <Link to="/" className="hover:text-[#FA0C40] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#252525] font-bold">Help Center & FAQ</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#252525] tracking-tight mb-2">
            Hi, how can we help?
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed mb-6 font-normal">
            Search answers about building resumes, tailoring bullet points, ATS scoring, and account options.
          </p>

          {/* Search Input Box */}
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#6B6B6B]">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What are you looking for? (e.g., ATS scoring, upload, free)"
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#252525]/15 focus:border-[#FA0C40] rounded-full text-xs sm:text-sm text-[#252525] placeholder:text-[#6B6B6B]/60 shadow-[0_4px_20px_rgba(37,37,37,0.04)] focus:outline-none focus:ring-2 focus:ring-[#FA0C40]/30 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-4 text-xs font-bold text-[#6B6B6B] hover:text-[#252525]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Popular Questions Horizontal Carousel (Show when no active search) */}
        {/* ========================================================================= */}
        {!searchQuery && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FA0C40]" />
                <h2 className="text-base sm:text-lg font-extrabold text-[#252525]">
                  Popular Questions
                </h2>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleScrollCarousel("left")}
                  className="w-8 h-8 rounded-full bg-white border border-[#252525]/10 hover:border-[#FA0C40]/40 flex items-center justify-center text-[#252525] shadow-sm transition-all active:scale-95 cursor-pointer"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleScrollCarousel("right")}
                  className="w-8 h-8 rounded-full bg-white border border-[#252525]/10 hover:border-[#FA0C40]/40 flex items-center justify-center text-[#252525] shadow-sm transition-all active:scale-95 cursor-pointer"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto pb-4 snap-x no-scrollbar scroll-smooth"
              style={{ scrollbarWidth: "none" }}
            >
              {popularFaqs.map((faq, i) => (
                <div
                  key={i}
                  className="min-w-[280px] sm:min-w-[320px] max-w-[340px] bg-white rounded-3xl border border-[#252525]/10 shadow-[0_4px_20px_rgba(37,37,37,0.03)] p-5 flex flex-col justify-between snap-start text-left hover:border-[#FA0C40]/30 transition-all"
                >
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-[#FA0C40] bg-[#FA0C400D] px-2 py-0.5 rounded-full border border-[#FA0C40]/15 mb-2.5 inline-block">
                      {faq.category}
                    </span>
                    <h3 className="font-extrabold text-xs sm:text-sm text-[#252525] mb-2 leading-snug">
                      {faq.q}
                    </h3>
                    <p className={`text-xs text-[#6B6B6B] leading-relaxed font-normal ${popularExpanded === i ? "" : "line-clamp-3"}`}>
                      {faq.a}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPopularExpanded(popularExpanded === i ? null : i)}
                    className="mt-3 text-[11px] font-bold text-[#FA0C40] hover:text-[#D40936] text-left cursor-pointer flex items-center gap-1"
                  >
                    <span>{popularExpanded === i ? "Show less" : "Read full answer"}</span>
                    <ChevronRight className={`w-3 h-3 transition-transform ${popularExpanded === i ? "-rotate-90" : ""}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* Main Content Layout: Categories & Accordion + Floating Support Card */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">
          {/* Left Column: Category Pills & FAQ Accordions */}
          <div>
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      active
                        ? "bg-[#FA0C40] text-white shadow-sm shadow-[#FA0C40]/25"
                        : "bg-white border border-[#252525]/10 text-[#6B6B6B] hover:text-[#252525] hover:bg-[#252525]/5"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Accordion Questions List */}
            <div className="space-y-3">
              {filteredFaqs.length === 0 ? (
                <div className="bg-white rounded-3xl border border-[#252525]/10 p-8 text-center">
                  <p className="text-sm font-bold text-[#252525] mb-1">
                    No matching questions found
                  </p>
                  <p className="text-xs text-[#6B6B6B] mb-4">
                    Try searching with different keywords or browse all topics.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                    }}
                    className="px-5 py-2 rounded-full bg-[#252525] text-white text-xs font-bold"
                  >
                    Reset Filter
                  </button>
                </div>
              ) : (
                filteredFaqs.map((faq, index) => {
                  const isOpen = expandedId === index;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl border border-[#252525]/10 overflow-hidden transition-all shadow-[0_2px_10px_rgba(37,37,37,0.02)] hover:border-[#FA0C40]/30 text-left"
                    >
                      <button
                        type="button"
                        onClick={() => toggleAccordion(index)}
                        className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <span className="font-extrabold text-xs sm:text-sm text-[#252525]">
                          {faq.q}
                        </span>
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                            isOpen
                              ? "bg-[#FA0C40] text-white rotate-180"
                              : "bg-[#252525]/5 text-[#6B6B6B]"
                          }`}
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-[#6B6B6B] leading-relaxed border-t border-[#252525]/5">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column: Support / Contact Card */}
          <div className="sticky top-28 bg-white rounded-3xl border border-[#252525]/10 shadow-[0_10px_30px_rgba(37,37,37,0.04)] p-6 text-left">
            <div className="w-10 h-10 rounded-2xl bg-[#FA0C400D] border border-[#FA0C40]/20 text-[#FA0C40] flex items-center justify-center mb-4">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-[#252525] mb-1.5">
              Need help from our team?
            </h3>
            <p className="text-xs text-[#6B6B6B] leading-relaxed mb-5">
              Can't find what you're looking for? Reach out directly to our engineering and career advisory team.
            </p>
            <a
              href="mailto:support@resumecraft.ai"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#FA0C40] hover:bg-[#D40936] text-white text-xs font-extrabold shadow-sm transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Connect with Team</span>
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer openBuilder={(tab) => navigate(`/builder?tab=${tab}`)} />
    </div>
  );
}

