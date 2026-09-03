"use client";

export default function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md transition-all animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white/95 rounded-2xl shadow-2xl border border-white/40 p-6 sm:p-8 flex flex-col space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors focus:outline-none"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Profile Card Header */}
        <div className="flex items-center gap-4 border-b border-neutral-100 pb-6">
          <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 via-rose-500 to-indigo-600 shadow-md shrink-0">
            <div className="w-full h-full rounded-full overflow-hidden bg-white border-2 border-white">
              <img
                src="/gemini/avatar.jpg"
                alt="김젬니 프로필"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-neutral-900 tracking-tight">김젬니</h2>
              <span className="text-xs font-mono text-neutral-500">@gemini.kim.02</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-100 text-sky-700">
                인스타 크리에이터
              </span>
            </div>
            <p className="text-xs text-neutral-600 mt-1 font-medium">
              ▫️ 02년생 선배가 캠퍼스 미션 대신 깨주는 AI 단축키 💻
            </p>
            <p className="text-xs text-neutral-500 mt-0.5">
              ▫️ 구글 스튜던트 앰버서더(GSA) 1기 대표 리드 | #TeamGemini
            </p>
          </div>
        </div>

        {/* Persona Story */}
        <div className="space-y-4 text-sm text-neutral-700 leading-relaxed">
          <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
            <span>👋</span>
            <span>"대학 생활 4년, AI 하나 제대로 쓰면 인생이 편해집니다"</span>
          </h3>
          <p>
            반가워요! 02년생 대학생이자 AI 크리에이터로 활동하고 있는 <strong>김젬니</strong>입니다.
          </p>
          <p>
            과제 마감 3시간 전 패닉에 빠지고, 150페이지 전공 PDF 앞에서 멍때리고, 
            자소서 빈 화면에 깜빡이는 커서를 보며 한숨 쉬던 시절이 저에게도 있었습니다. 
            하지만 Google Gemini와 최신 생성형 AI 파이프라인을 일상에 접목한 이후,
            <strong>전공 학점 4.3 달성, 대외활동 100% 서류 합격, 그리고 전국 대학생 2.5만 명이 구독하는 #TeamGemini 채널</strong>을 만들어냈습니다.
          </p>

          {/* Core Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80">
              <span className="text-lg">⚡</span>
              <h4 className="text-xs font-bold text-neutral-900 mt-1">과제·시험 벼락치기</h4>
              <p className="text-xs text-neutral-600 mt-0.5 leading-normal">
                학술 논문 교차 검증 파이프라인, 족보 3줄 요약, 교수님 출제 예상 문제 봇
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80">
              <span className="text-lg">💼</span>
              <h4 className="text-xs font-bold text-neutral-900 mt-1">자소서·취준·자격증</h4>
              <p className="text-xs text-neutral-600 mt-0.5 leading-normal">
                STAR 역량 매칭 자소서 분석기, SQLD/ADsP 3주 완성 맞춤형 오답노트 튜터
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80">
              <span className="text-lg">🌐</span>
              <h4 className="text-xs font-bold text-neutral-900 mt-1">구글 스튜던트 앰버서더</h4>
              <p className="text-xs text-neutral-600 mt-0.5 leading-normal">
                GSA 1기 대표 리드, 전국 12개 대학 워크숍 총괄, Google DevFest 최연소 연사
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80">
              <span className="text-lg">📦</span>
              <h4 className="text-xs font-bold text-neutral-900 mt-1">#TeamGemini 크리에이터</h4>
              <p className="text-xs text-neutral-600 mt-0.5 leading-normal">
                매주 실전 치트키 업데이트, 누적 릴스 조회수 420만 뷰, 캠퍼스 가이드북 4.5만 배포
              </p>
            </div>
          </div>

          {/* Philosophy */}
          <div className="p-4 rounded-xl bg-neutral-900 text-white space-y-1.5">
            <p className="text-xs font-bold text-amber-300">💡 김젬니의 AI 철학</p>
            <p className="text-xs text-neutral-200 leading-relaxed">
              "AI는 나를 대체하는 기계가 아니라, 밤샘 과제를 대신해 주고 내게 캠퍼스의 봄날을 돌려주는 든든한 단축키입니다. 복잡한 이론 대신, 오늘 당장 학점을 올리는 실전 기술만 나눕니다."
            </p>
          </div>
        </div>

        {/* Contact & Links */}
        <div className="pt-2 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-neutral-500 font-mono">
            Contact: gemini.kim.02@campus.google
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors"
            >
              닫기
            </button>
            <a
              href="mailto:gemini.kim.02@campus.google"
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 transition-all text-center"
            >
              협업 / 강연 문의하기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
