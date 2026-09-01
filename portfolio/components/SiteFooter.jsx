import Link from "next/link";

import { CONTACT, PROFILE } from "@/content/profile";

export default function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-black/10 px-[5.5vw] pb-16 pt-12 text-[13px] leading-relaxed">
      <div className="mx-auto flex max-w-[1100px] flex-col gap-10 sm:flex-row sm:justify-between">
        <div>
          <p
            className="text-[15px] font-semibold"
            style={{ fontFamily: '"Satoshi", ui-sans-serif, sans-serif' }}
          >
            {PROFILE.latin}
          </p>
          <p className="mt-1 opacity-55">{PROFILE.tagline}</p>
        </div>

        <div className="flex gap-10">
          <div>
            <p className="opacity-45">채널</p>
            <p className="mt-1">{CONTACT.instagram}</p>
            <p className="opacity-55">{CONTACT.newsletter}</p>
          </div>
          <div>
            <p className="opacity-45">문의</p>
            <p className="mt-1">{CONTACT.email}</p>
            <Link href="/about" className="opacity-55 hover:opacity-100">
              소개 보기 →
            </Link>
          </div>
        </div>
      </div>

      {/* Not small print for its own sake: the figures on these pages are
          invented, and a portfolio that does not say so is a portfolio making
          claims it cannot back. */}
      <p className="mx-auto mt-12 max-w-[1100px] text-[12px] opacity-40">
        이 사이트는 가상의 페르소나 ‘김젬니’로 구성한 포트폴리오 예시입니다.
        게재된 활동·수치·후기는 모두 예시 데이터이며 실제 기록이 아닙니다.
        캐러셀은 Yousuf Soomro의 오픈소스 Viscose(MIT)를 바탕으로 합니다.
      </p>
    </footer>
  );
}
