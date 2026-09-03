import React, { useState, useRef } from "react";
import {
  UploadCloud,
  FileText,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

/**
 * UploadPanel — Drag-and-drop resume upload zone with validation and error states.
 */
export default function UploadPanel({
  onFileUpload,
  onSwitchMethod,
  onStartScratch,
  selectedTemplate,
  uploadError = "",
  onClearError,
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [validationError, setValidationError] = useState("");
  const fileInputRef = useRef(null);

  const ALLOWED_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/png",
    "image/jpeg",
    "image/jpg",
  ];
  const ALLOWED_EXTS = [".pdf", ".docx", ".png", ".jpg", ".jpeg"];
  const MAX_SIZE_MB = 10;

  const validateAndProcessFile = (file) => {
    setValidationError("");
    if (onClearError) onClearError();

    if (!file) return;

    // Check extension / type
    const ext = "." + file.name.split(".").pop().toLowerCase();
    const typeValid = ALLOWED_TYPES.includes(file.type) || ALLOWED_EXTS.includes(ext);

    if (!typeValid) {
      setValidationError("Unsupported file format. Please upload a PDF, DOCX, PNG, or JPG document.");
      return;
    }

    // Check size (10MB)
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setValidationError(`File size exceeds ${MAX_SIZE_MB}MB. Please upload a smaller file.`);
      return;
    }

    onFileUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      validateAndProcessFile(files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      validateAndProcessFile(files[0]);
    }
  };

  const displayError = validationError || uploadError;

  return (
    <div className="bg-white rounded-3xl border border-[#252525]/10 shadow-[0_4px_20px_rgba(37,37,37,0.03)] p-6 sm:p-8 space-y-6 font-['Plus_Jakarta_Sans'] text-[#252525] animate-scale-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#252525]/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#FA0C400D] text-[#FA0C40] px-2.5 py-0.5 rounded-full border border-[#FA0C40]/20">
              Build Method: Upload Resume
            </span>
            {selectedTemplate && (
              <span className="text-[10px] font-bold text-[#6B6B6B] bg-slate-100 px-2 py-0.5 rounded-full">
                Template: {selectedTemplate.name}
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#252525] tracking-tight">
            Upload Existing Resume
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1">
            We'll parse your career history, extract your skills, and structure it directly into the 9-step editor.
          </p>
        </div>

        <button
          type="button"
          onClick={onSwitchMethod}
          className="text-xs font-bold text-[#6B6B6B] hover:text-[#FA0C40] transition-colors self-start sm:self-auto cursor-pointer flex items-center gap-1 hover:underline"
        >
          <span>Switch Method</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Inline Error Alert (if upload or validation failed) */}
      {displayError && (
        <div className="p-4 rounded-2xl bg-[#FA0C40]/10 border border-[#FA0C40]/30 text-[#FA0C40] text-xs font-semibold flex items-start gap-3 animate-shake">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-extrabold mb-0.5">Upload Failed</p>
            <p className="text-[11px] leading-relaxed opacity-90">{displayError}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setValidationError("");
              if (onClearError) onClearError();
              fileInputRef.current?.click();
            }}
            className="px-3 py-1.5 rounded-lg bg-[#FA0C40] text-white text-[11px] font-bold hover:bg-[#D40936] transition-colors cursor-pointer shrink-0"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative rounded-3xl border-2 border-dashed transition-all duration-300 p-8 sm:p-12 text-center cursor-pointer group flex flex-col items-center justify-center ${
          isDragOver
            ? "border-[#FA0C40] bg-[#FA0C400D] scale-[1.01] shadow-lg"
            : "border-[#252525]/20 hover:border-[#FA0C40] bg-[#FAFAFA] hover:bg-[#FA0C400D]/20"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.png,.jpg,.jpeg,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*"
          className="hidden"
          onChange={handleFileInputChange}
        />

        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 shadow-xs ${
            isDragOver ? "bg-[#FA0C40] text-white" : "bg-[#FA0C400D] border border-[#FA0C40]/20 text-[#FA0C40]"
          }`}
        >
          <UploadCloud className="w-8 h-8" />
        </div>

        <h3 className="text-base sm:text-lg font-extrabold text-[#252525] group-hover:text-[#FA0C40] transition-colors">
          Click to upload or drag & drop
        </h3>
        <p className="text-xs text-[#6B6B6B] mt-1.5 max-w-sm">
          PDF, DOCX, PNG or JPG — up to 10MB. Text is securely extracted and calibrated for ATS scanners.
        </p>

        {/* Accepted formats pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
          {["PDF", "DOCX", "PNG", "JPG"].map((fmt) => (
            <span
              key={fmt}
              className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[#252525] shadow-2xs"
            >
              .{fmt.toLowerCase()}
            </span>
          ))}
          <span className="text-[10px] font-semibold text-[#6B6B6B] ml-1">Max 10MB</span>
        </div>
      </div>

      {/* Value Badges & Alternative Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-xs">
        <div className="flex items-center gap-2 text-emerald-700 font-bold text-[11px] bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Auto-fills 9 resume sections with quantified bullets</span>
        </div>

        <button
          type="button"
          onClick={onStartScratch}
          className="text-xs font-bold text-[#6B6B6B] hover:text-[#FA0C40] transition-colors cursor-pointer"
        >
          Prefer typing? <strong className="underline text-[#252525] hover:text-[#FA0C40]">Start from scratch</strong>
        </button>
      </div>
    </div>
  );
}

