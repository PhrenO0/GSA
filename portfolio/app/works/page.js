import Link from "next/link";

import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { WORKS } from "@/content/works";
import { TRACKS } from "@/content/profile";

export const metadata = {
  title: "작업",
  description: "2024년부터 만든 18개의 콘텐츠·캠페인·오프라인 프로그램.",
};

// The carousel is the front door but it is also mouse-only and animated. This
// is the same eighteen rows, in the same order, that a keyboard can walk.
export default function WorksPage() {
  return (
    <>
      <SiteNav />

      <main className="px-[5.5vw] pt-[16vh]">
        <div className="mx-auto max-w-[1100px]">
          <p className="text-[13px] uppercase tracking-[0.18em] opacity-45">
            Index
          </p>
          <h1 className="mt-4 max-w-[16ch] text-[clamp(2.4rem,6vw,4.6rem)] font-bold leading-[1.05] tracking-[-0.04em]">
            18개의 치트키
          </h1>
          <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed opacity-60">
            채널에서 실제로 발행했거나 오프라인에서 운영한 작업들입니다. 네 개의
            축으로 나뉘고, 대부분은 하나가 다음 하나의 소재가 됐습니다.
          </p>

          <ul className="mt-10 flex flex-wrap gap-2">
            {TRACKS.map((t) => (
              <li
                key={t.name}
                className="rounded-full border border-black/15 px-4 py-1.5 text-[13px] opacity-70"
              >
                {t.name}
                <span className="ml-2 opacity-50">
                  {WORKS.filter((w) => w.track === t.name).length}
                </span>
              </li>
            ))}
          </ul>

          <ol className="mt-16 border-t border-black/10">
            {WORKS.map((w, i) => (
              <li key={w.slug} className="border-b border-black/10">
                <Link
                  href={`/works/${w.slug}`}
                  className="group grid grid-cols-[3rem_1fr] items-baseline gap-x-5 py-6 transition-opacity hover:opacity-100 sm:grid-cols-[3.5rem_1fr_10rem_5rem] sm:gap-x-8"
                >
                  <span
                    className="text-[13px] opacity-40"
                    style={{ fontFamily: '"Geist", ui-monospace, monospace' }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[clamp(1.15rem,2.4vw,1.7rem)] font-semibold tracking-[-0.03em] transition-transform duration-300 group-hover:translate-x-1">
                    {w.name}
                  </span>
                  <span className="col-start-2 text-[13px] opacity-50 sm:col-start-3">
                    {w.type}
                  </span>
                  <span
                    className="col-start-2 text-[13px] opacity-40 sm:col-start-4 sm:text-right"
                    style={{ fontFamily: '"Geist", ui-monospace, monospace' }}
                  >
                    {w.year}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
