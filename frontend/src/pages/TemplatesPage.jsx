import React, { useState, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Search,
  Check,
  CheckCircle2,
  Users,
  Flame,
  ArrowRight,
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

      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 flex-1 pb-32">
        {/* ========================================================================= */}
        {/* Breadcrumb & Header Row                                                   */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#6B6B6B] mb-2 font-medium">
              <Link to="/dashboard" className="hover:text-[#FA0C40] transition-colors">
                Dashboard
              </Link>
              <span>/</span>
              <span className="text-[#252525] font-bold">Template Gallery</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#252525] tracking-tight">
              Choose a Template
            </h1>
            <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1">
              Select an ATS-optimized layout crafted for recruiters and automated screening software.
            </p>
          </div>

          {/* ATS-Only Toggle Switch Pill */}
          <div className="flex items-center gap-3 bg-white border border-[#252525]/10 rounded-full px-4 py-2 shadow-sm self-start md:self-auto">
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
        {/* Search + Filter Chips Row                                                 */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl border border-[#252525]/10 shadow-[0_4px_20px_rgba(37,37,37,0.03)] p-4 sm:p-5 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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
                className="w-full pl-10 pr-8 py-2.5 bg-[#252525]/[0.02] border border-[#252525]/15 focus:border-[#FA0C40] rounded-full text-xs sm:text-sm text-[#252525] focus:outline-none focus:ring-2 focus:ring-[#FA0C40]/30 transition-all placeholder:text-[#6B6B6B]/60"
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
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>
                {filteredTemplates.length} {filteredTemplates.length === 1 ? "Template" : "Templates"} Available
              </span>
            </div>
          </div>

          {/* Horizontally Scrollable Category Filter Chips */}
          <div className="mt-4 pt-3.5 border-t border-[#252525]/5 flex gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
            {TEMPLATE_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
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
        {/* Template Cards Grid                                                       */}
        {/* ========================================================================= */}
        <div>
          {filteredTemplates.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#252525]/10 p-12 text-center max-w-md mx-auto">
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
                className="px-5 py-2 rounded-full bg-[#252525] text-white text-xs font-bold hover:bg-[#FA0C40] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredTemplates.map((template, idx) => {
                const isSelected = selectedTemplateId === template.id;

                return (
                  <div
                    key={template.id}
                    onClick={() => handleCardClick(template.id)}
                    className={`group relative bg-white rounded-3xl border p-4 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-[0_15px_35px_rgba(37,37,37,0.08)] hover:-translate-y-1 text-left ${
                      isSelected
                        ? "border-[#FA0C40] ring-2 ring-[#FA0C40]/30 shadow-[0_12px_30px_rgba(250,12,64,0.1)]"
                        : "border-[#252525]/10 hover:border-[#FA0C40]/50"
                    }`}
                  >
                    {/* Visual Preview Box */}
                    <div className="relative mb-3.5 rounded-2xl overflow-hidden bg-slate-50 border border-[#252525]/10 p-2 group-hover:border-[#FA0C40]/30 transition-colors">
                      {/* Selection Indicator Badge */}
                      <div className="absolute top-3.5 right-3.5 z-10">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                            isSelected
                              ? "bg-[#FA0C40] text-white shadow-md scale-110"
                              : "bg-white/90 backdrop-blur-sm border border-[#252525]/20 text-transparent"
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* ATS Scanner Pill Badge */}
                      {template.isAtsOnly && (
                        <div className="absolute top-3.5 left-3.5 z-10">
                          <span className="text-[9px] font-extrabold uppercase bg-white/95 backdrop-blur-sm text-emerald-600 border border-emerald-200 px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" />
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
                          className={`font-extrabold text-sm sm:text-base leading-snug transition-colors ${
                            isSelected
                              ? "text-[#FA0C40]"
                              : "text-[#252525] group-hover:text-[#FA0C40]"
                          }`}
                        >
                          {template.name}
                        </h3>
                        <span className="text-[10px] font-bold text-[#6B6B6B] bg-[#252525]/5 px-2 py-0.2 rounded-full shrink-0">
                          {template.category}
                        </span>
                      </div>

                      <p className="text-xs text-[#6B6B6B] leading-relaxed mb-3 line-clamp-2">
                        {template.description}
                      </p>
                    </div>

                    {/* Social Proof Row */}
                    <div className="pt-2.5 border-t border-[#252525]/5 flex items-center justify-between text-[11px] text-[#6B6B6B]">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Users className="w-3 h-3 text-[#FA0C40]" />
                        <span>Chosen by {template.chosenCount.toLocaleString()}+</span>
                      </div>
                      <span
                        className={`text-xs font-bold transition-colors ${
                          isSelected ? "text-[#FA0C40]" : "text-[#252525] group-hover:text-[#FA0C40]"
                        }`}
                      >
                        {isSelected ? "Selected" : "Use Layout →"}
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
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#252525]/10 shadow-[0_-10px_35px_rgba(0,0,0,0.08)] py-4 px-4 sm:px-8 animate-slide-up">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Selected Info */}
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-9 h-9 rounded-xl bg-[#FA0C400D] border border-[#FA0C40]/20 text-[#FA0C40] flex items-center justify-center font-extrabold text-xs shrink-0">
                <CheckCircle2 className="w-5 h-5 text-[#FA0C40]" />
              </div>
              <div>
                <p className="text-xs text-[#6B6B6B] font-medium">Selected Template</p>
                <p className="text-sm font-extrabold text-[#252525]">
                  {selectedTemplate.name}{" "}
                  <span className="text-xs text-[#FA0C40] font-bold">
                    ({selectedTemplate.category})
                  </span>
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setSelectedTemplateId(null)}
                className="px-4 py-2.5 rounded-full text-xs font-bold text-[#6B6B6B] hover:text-[#252525] transition-colors cursor-pointer"
              >
                Deselect
              </button>
              <button
                type="button"
                onClick={handleProceed}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-[#FA0C40] hover:bg-[#D40936] text-white text-xs sm:text-sm font-extrabold shadow-md shadow-[#FA0C40]/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Confirm & Proceed</span>
                <ArrowRight className="w-4 h-4" />
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

