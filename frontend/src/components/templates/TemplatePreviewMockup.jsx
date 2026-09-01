import React from "react";
import TemplateLayoutSingleColumn from "./layouts/TemplateLayoutSingleColumn";
import TemplateLayoutSidebarLeft from "./layouts/TemplateLayoutSidebarLeft";
import TemplateLayoutSidebarRight from "./layouts/TemplateLayoutSidebarRight";
import TemplateLayoutPhotoHeader from "./layouts/TemplateLayoutPhotoHeader";
import TemplateLayoutTimeline from "./layouts/TemplateLayoutTimeline";
import TemplateLayoutMinimalist from "./layouts/TemplateLayoutMinimalist";
import TemplateLayoutColorBand from "./layouts/TemplateLayoutColorBand";
import TemplateLayoutCompactTable from "./layouts/TemplateLayoutCompactTable";
import TemplateLayoutCreativeAccent from "./layouts/TemplateLayoutCreativeAccent";
import TemplateLayoutDarkSidebar from "./layouts/TemplateLayoutDarkSidebar";

/**
 * Master Template Preview Renderer
 * Dispatches to one of the 10 distinct layout engines.
 */
export default function TemplatePreviewMockup({ template }) {
  if (!template) return null;

  const { layoutStyle } = template;

  const renderLayout = () => {
    switch (layoutStyle) {
      case "sidebar-left":
        return <TemplateLayoutSidebarLeft template={template} />;
      case "sidebar-right":
        return <TemplateLayoutSidebarRight template={template} />;
      case "photo-header":
      case "header-banner":
        return <TemplateLayoutPhotoHeader template={template} />;
      case "timeline":
        return <TemplateLayoutTimeline template={template} />;
      case "minimalist":
      case "classic-serif":
        return <TemplateLayoutMinimalist template={template} />;
      case "color-band":
        return <TemplateLayoutColorBand template={template} />;
      case "compact-table":
      case "dense-grid":
        return <TemplateLayoutCompactTable template={template} />;
      case "creative-accent":
      case "single-column-code":
        return <TemplateLayoutCreativeAccent template={template} />;
      case "dark-sidebar":
        return <TemplateLayoutDarkSidebar template={template} />;
      case "single-column":
      default:
        return <TemplateLayoutSingleColumn template={template} />;
    }
  };

  return (
    <div className="w-full aspect-[1/1.38] bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-[#252525]/10 overflow-hidden select-none transition-transform duration-300">
      {renderLayout()}
    </div>
  );
}

export { TemplatePreviewMockup };
