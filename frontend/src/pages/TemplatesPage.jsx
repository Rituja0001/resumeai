import React, { useState, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Search,
  Check,
  CheckCircle2,
  Users,
  Flame,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  SlidersHorizontal,
  X,
} from "lucide-react";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import { TEMPLATES, TEMPLATE_CATEGORIES } from "../data/templatesData";
import TemplatePreviewMockup from "../components/templates/TemplatePreviewMockup";
import BuildMethodModal from "../components/builder/BuildMethodModal";

export default function TemplatesPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [atsOnly, setAtsOnly] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState("puffin");
  const [isBuildModalOpen, setIsBuildModalOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // Filter templates based on search, category, and ATS-only toggle
  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter((tmpl) => {
      const isAll =
        !activeCategory ||
        activeCategory === "All" ||
        activeCategory.toLowerCase() === "all";

      const matchCategory =
        isAll ||
        tmpl.category?.toLowerCase() === activeCategory.toLowerCase() ||
        tmpl.tags?.some((t) => t.toLowerCase() === activeCategory.toLowerCase());

      const matchAts = !atsOnly || Boolean(tmpl.isAtsOnly);

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        q === "" ||
        tmpl.name.toLowerCase().includes(q) ||
        tmpl.description.toLowerCase().includes(q) ||
        (tmpl.sampleRole && tmpl.sampleRole.toLowerCase().includes(q)) ||
        (tmpl.sampleName && tmpl.sampleName.toLowerCase().includes(q)) ||
        (tmpl.category && tmpl.category.toLowerCase().includes(q)) ||
        tmpl.tags?.some((tag) => tag.toLowerCase().includes(q));

      return matchCategory && matchAts && matchSearch;
    });
  }, [activeCategory, atsOnly, searchQuery]);

  const selectedTemplate = useMemo(() => {
    return TEMPLATES.find((t) => t.id === selectedTemplateId) || null;
  }, [selectedTemplateId]);

  const handleCardClick = (id) => {
    setSelectedTemplateId((prev) => (prev === id ? null : id));
  };

  const handleProceed = () => {
    if (!selectedTemplateId) return;
    setIsBuildModalOpen(true);
  };

  const handleSelectBuildMethod = (method) => {
    setIsBuildModalOpen(false);
    navigate(`/builder?template=${selectedTemplateId || "puffin"}&path=${method}`);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#252525] font-['Plus_Jakarta_Sans'] flex flex-col justify-between">
      {/* Header */}
      <Header openBuilder={(tab) => navigate(`/builder?path=${tab}`)} />

      <main className="max-w-7xl w-full mx-auto px-3 sm:px-6 md:px-8 py-6 sm:py-10 flex-1 pb-28 sm:pb-36">
        {/* ========================================================================= */}
        {/* Breadcrumb & Header Row                                                   */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#6B6B6B] mb-1.5 font-medium">
              <Link to="/dashboard" className="hover:text-[#FA0C40] transition-colors flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </Link>
              <span>/</span>
              <span className="text-[#252525] font-bold">Template Gallery</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-[#252525] tracking-tight">
                Choose a Template
              </h1>
              {/* Mobile Search Toggle Icon */}
              <button
                type="button"
                onClick={() => setIsSearchExpanded((prev) => !prev)}
                className="md:hidden w-8 h-8 rounded-full bg-white border border-[#252525]/10 flex items-center justify-center text-[#6B6B6B] active:text-[#FA0C40] shadow-xs cursor-pointer"
                aria-label="Toggle search input"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1 leading-relaxed">
              Select an ATS-optimized layout crafted for recruiters and automated screening software.
            </p>
          </div>

          {/* Desktop ATS-Only Toggle Switch Pill */}
          <div className="hidden md:flex items-center gap-3 bg-white border border-[#252525]/10 rounded-full px-4 py-2 shadow-xs self-start md:self-auto">
            <ShieldCheck className="w-4 h-4 text-[#FA0C40]" />
            <span className="text-xs font-bold text-[#252525]">ATS Scanner Verified Only</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={atsOnly}
                onChange={(e) => setAtsOnly(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-[#252525]/15 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#252525]/20 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#FA0C40]" />
            </label>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Search + Filter Chips Bar                                                 */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#252525]/10 shadow-[0_4px_20px_rgba(37,37,37,0.03)] p-3.5 sm:p-5 mb-6 sm:mb-8">
          <div className={`flex flex-col md:flex-row md:items-center justify-between gap-3 ${!isSearchExpanded ? "hidden md:flex" : "flex"}`}>
            {/* Search Input Box */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B6B6B]">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a role or style (e.g. Minimal, Engineer, Product)…"
                className="w-full pl-10 pr-8 py-2 sm:py-2.5 bg-[#252525]/[0.02] border border-[#252525]/15 focus:border-[#FA0C40] rounded-full text-xs sm:text-sm text-[#252525] focus:outline-none focus:ring-2 focus:ring-[#FA0C40]/30 transition-all placeholder:text-[#6B6B6B]/60"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-[#6B6B6B] hover:text-[#252525]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Template Count */}
            <div className="flex items-center gap-2 text-xs font-bold text-[#6B6B6B]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#FA0C40]" />
              <span>
                {filteredTemplates.length} {filteredTemplates.length === 1 ? "Template" : "Templates"} Available
              </span>
            </div>
          </div>

          {/* Horizontally Scrollable Category Filter Chips */}
          <div className={`flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth ${isSearchExpanded ? "mt-3 pt-3 border-t border-[#252525]/5" : "md:mt-3 md:pt-3 md:border-t md:border-[#252525]/5"}`}>
            {/* Mobile-Friendly ATS Toggle Chip */}
            <button
              type="button"
              onClick={() => setAtsOnly((prev) => !prev)}
              className={`md:hidden px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 shrink-0 ${
                atsOnly
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-emerald-50 text-emerald-800 border border-emerald-200"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ATS Only</span>
            </button>

            {TEMPLATE_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                    isActive
                      ? "bg-[#FA0C40] text-white shadow-sm shadow-[#FA0C40]/25 font-extrabold"
                      : "bg-[#252525]/[0.03] text-[#252525] hover:bg-[#252525]/10 border border-[#252525]/10"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Template Cards Grid (2-Columns on Mobile, 3 on Tablet, 4 on Desktop)      */}
        {/* ========================================================================= */}
        <div>
          {filteredTemplates.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#252525]/10 p-8 sm:p-12 text-center max-w-md mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-[#FA0C400D] border border-[#FA0C40]/20 text-[#FA0C40] flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-[#252525] mb-1">
                No templates found
              </h3>
              <p className="text-xs text-[#6B6B6B] mb-5 leading-relaxed">
                Try searching for a different keyword or turn off the ATS scanner filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                  setAtsOnly(false);
                }}
                className="px-5 py-2 rounded-full bg-[#252525] text-white text-xs font-bold hover:bg-[#FA0C40] transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {filteredTemplates.map((template) => {
                const isSelected = selectedTemplateId === template.id;

                return (
                  <div
                    key={template.id}
                    onClick={() => handleCardClick(template.id)}
                    className={`group relative bg-white rounded-2xl sm:rounded-3xl border p-2.5 sm:p-4 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-[0_15px_35px_rgba(37,37,37,0.08)] hover:-translate-y-1 text-left select-none ${
                      isSelected
                        ? "border-[#FA0C40] ring-2 ring-[#FA0C40]/30 shadow-[0_12px_30px_rgba(250,12,64,0.1)]"
                        : "border-[#252525]/10 hover:border-[#FA0C40]/50"
                    }`}
                  >
                    {/* Visual Preview Box */}
                    <div className="relative mb-2.5 sm:mb-3.5 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-50 border border-[#252525]/10 p-1 sm:p-2 group-hover:border-[#FA0C40]/30 transition-colors">
                      {/* Selection Indicator Badge */}
                      <div className="absolute top-2 sm:top-3.5 right-2 sm:right-3.5 z-10">
                        <div
                          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                            isSelected
                              ? "bg-[#FA0C40] text-white shadow-md scale-110"
                              : "bg-white/90 backdrop-blur-sm border border-[#252525]/20 text-transparent"
                          }`}
                        >
                          <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </div>
                      </div>

                      {/* ATS Scanner Pill Badge */}
                      {template.isAtsOnly && (
                        <div className="absolute top-2 sm:top-3.5 left-2 sm:left-3.5 z-10">
                          <span className="text-[8px] sm:text-[9px] font-extrabold uppercase bg-white/95 backdrop-blur-sm text-emerald-600 border border-emerald-200 px-1.5 sm:px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                            <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            <span>ATS 98%</span>
                          </span>
                        </div>
                      )}

                      {/* Scaled CSS Mockup */}
                      <div className="transition-transform duration-300 group-hover:scale-[1.02]">
                        <TemplatePreviewMockup template={template} />
                      </div>
                    </div>

                    {/* Metadata */}
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <h3
                          className={`font-extrabold text-xs sm:text-base leading-snug truncate transition-colors ${
                            isSelected
                              ? "text-[#FA0C40]"
                              : "text-[#252525] group-hover:text-[#FA0C40]"
                          }`}
                        >
                          {template.name}
                        </h3>
                        <span className="hidden sm:inline text-[10px] font-bold text-[#6B6B6B] bg-[#252525]/5 px-2 py-0.2 rounded-full shrink-0">
                          {template.category}
                        </span>
                      </div>

                      <p className="text-[11px] sm:text-xs text-[#6B6B6B] leading-relaxed mb-2 sm:mb-3 line-clamp-1 sm:line-clamp-2">
                        {template.description}
                      </p>
                    </div>

                    {/* Social Proof & Use Action Row */}
                    <div className="pt-2 sm:pt-2.5 border-t border-[#252525]/5 flex items-center justify-between text-[10px] sm:text-[11px] text-[#6B6B6B]">
                      <div className="flex items-center gap-1 font-medium truncate">
                        <Users className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#FA0C40] shrink-0" />
                        <span className="truncate">{template.chosenCount.toLocaleString()}+</span>
                      </div>
                      <span
                        className={`font-extrabold transition-colors shrink-0 ${
                          isSelected ? "text-[#FA0C40]" : "text-[#252525] group-hover:text-[#FA0C40]"
                        }`}
                      >
                        {isSelected ? "Selected" : "Select →"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* ========================================================================= */}
      {/* Sticky Bottom Action Bar (Fixed upon selection)                          */}
      {/* ========================================================================= */}
      {selectedTemplate && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#252525]/10 shadow-[0_-10px_35px_rgba(0,0,0,0.1)] py-3 px-3.5 sm:px-8 animate-slide-up">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-2.5">
            {/* Selected Info */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#FA0C400D] border border-[#FA0C40]/20 text-[#FA0C40] flex items-center justify-center font-extrabold text-xs shrink-0">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#FA0C40]" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-[#6B6B6B] font-medium leading-none truncate">Template Selected</p>
                <p className="text-xs sm:text-sm font-extrabold text-[#252525] truncate">
                  {selectedTemplate.name}{" "}
                  <span className="hidden sm:inline text-xs text-[#FA0C40] font-bold">
                    ({selectedTemplate.category})
                  </span>
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setSelectedTemplateId(null)}
                className="hidden sm:inline-block px-3.5 py-2 rounded-full text-xs font-bold text-[#6B6B6B] hover:text-[#252525] transition-colors cursor-pointer"
              >
                Deselect
              </button>
              <button
                type="button"
                onClick={handleProceed}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-5 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#FA0C40] hover:bg-[#D40936] text-white text-xs sm:text-sm font-extrabold shadow-md shadow-[#FA0C40]/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Confirm & Proceed</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer openBuilder={(tab) => navigate(`/builder?path=${tab}`)} />

      {/* "How would you like to build your resume?" Modal */}
      <BuildMethodModal
        isOpen={isBuildModalOpen}
        onClose={() => setIsBuildModalOpen(false)}
        onSelectMethod={handleSelectBuildMethod}
        selectedTemplateName={selectedTemplate?.name}
      />
    </div>
  );
}
