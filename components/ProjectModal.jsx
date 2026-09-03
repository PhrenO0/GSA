"use client";

import { useState } from "react";

export default function ProjectModal({ project, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const handleCopyTip = () => {
    if (project.tip) {
      navigator.clipboard.writeText(project.tip);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md transition-all animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white/95 rounded-2xl shadow-2xl border border-white/40 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative w-full aspect-[16/9] bg-neutral-100 overflow-hidden rounded-t-2xl">
          <img
            src={`/${project.file}`}
            alt={project.koreanTitle || project.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm transition-all focus:outline-none"
            aria-label="닫기"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/30">
                {project.categoryName || project.type}
              </span>
              <span className="text-xs text-white/80 font-mono">{project.year}</span>
              <span className="text-xs text-amber-300 font-medium">{project.tag}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {project.koreanTitle || project.name}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Subtitle & Summary */}
          <div>
            <h3 className="text-base font-semibold text-neutral-800 leading-snug">
              {project.subtitle}
            </h3>
            <p className="mt-2 text-sm text-neutral-600 leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>

          {/* Key Metrics */}
          {project.metrics && (
            <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/80 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">주요 성과 & 지표</p>
                <p className="text-sm font-semibold text-neutral-800">{project.metrics}</p>
              </div>
            </div>
          )}

          {/* Senior Cheat Key Tip (Highlight Box) */}
          {project.tip && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  ✨ 02년생 선배 김젬니의 실전 치트키
                </span>
                <button
                  onClick={handleCopyTip}
                  className="px-2.5 py-1 text-xs font-medium rounded-md bg-white border border-amber-200 text-amber-800 hover:bg-amber-100/50 transition-colors shadow-2xs flex items-center gap-1"
                >
                  {copied ? "복사완료! ✓" : "치트키 복사"}
                </button>
              </div>
              <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                {project.tip}
              </p>
            </div>
          )}

          {/* Tools Used */}
          {project.tools && (
            <div>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">활용 AI & 테크 스택</p>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-neutral-100 text-neutral-700 border border-neutral-200/70"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-3">
            <span className="text-xs text-neutral-400 font-mono">#TeamGemini_Project_{project.year}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                닫기
              </button>
              <button
                onClick={handleCopyTip}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>{project.linkText || "치트키 담아가기"}</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
