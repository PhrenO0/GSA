"use client";

import Image from "next/image";

export default function Header({ onOpenAbout, onOpenProject, activeProject }) {
  return (
    <header className="pointer-events-auto fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-md border-b border-black/5 transition-all">
      {/* Profile & Bio */}
      <div className="flex items-center gap-3.5">
        <button
          onClick={onOpenAbout}
          className="relative group focus:outline-none"
          title="김젬니 프로필 보기"
        >
          <div className="w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 via-rose-500 to-indigo-600 shadow-sm transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full rounded-full overflow-hidden bg-white border border-white">
              <img
                src="/gemini/avatar.jpg"
                alt="김젬니 프로필"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenAbout}
              className="text-sm font-bold text-neutral-900 tracking-tight hover:underline flex items-center gap-1"
            >
              김젬니
              <svg className="w-4 h-4 text-sky-500 fill-current inline-block" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </button>
            <span className="text-xs text-neutral-500 font-mono">@gemini.kim.02</span>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-neutral-100 text-neutral-700 border border-neutral-200/60">
              #TeamGemini
            </span>
          </div>
          <p className="text-xs text-neutral-600 hidden md:block mt-0.5">
            ▫️ 02년생 선배가 캠퍼스 미션 대신 깨주는 AI 단축키 💻 | GSA 1기 대표
          </p>
        </div>
      </div>

      {/* Action Buttons & Links */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenAbout}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          선배 소개 (About)
        </button>

        {activeProject && (
          <button
            onClick={() => onOpenProject(activeProject)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 shadow-sm transition-all"
          >
            <span>치트키 상세</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* External Link */}
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="p-2 text-neutral-600 hover:text-rose-600 transition-colors rounded-full hover:bg-neutral-100"
          title="인스타그램 방문"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </a>
      </div>
    </header>
  );
}
