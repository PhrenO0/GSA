import Link from "next/link";

import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import {
  AWARDS,
  CONTACT,
  FAQ,
  PROFILE,
  SERVICES,
  STATS,
  TIMELINE,
  TRACKS,
} from "@/content/profile";
import { WORKS } from "@/content/works";

export const metadata = {
  title: "소개",
  description: `${PROFILE.tagline} — ${PROFILE.handle} 운영자 소개와 활동 이력.`,
};

const ACCENT = {
  blue: "#4285F4",
  violet: "#A142F4",
  amber: "#F9AB00",
  green: "#34A853",
};

function Section({ label, title, children }) {
  return (
    <section className="mt-28 border-t border-black/10 pt-10">
      <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="text-[12px] uppercase tracking-[0.16em] opacity-40">
            {label}
          </p>
          {title ? (
            <h2 className="mt-3 text-[clamp(1.3rem,2.4vw,1.75rem)] font-bold tracking-[-0.03em]">
              {title}
            </h2>
          ) : null}
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <SiteNav />

      <main className="px-[5.5vw] pt-[16vh]">
        <div className="mx-auto max-w-[1100px]">
          <header>
            <p className="text-[13px] uppercase tracking-[0.18em] opacity-45">
              {PROFILE.latin} · {PROFILE.born}
            </p>
            <h1 className="mt-4 max-w-[20ch] text-[clamp(2.2rem,5.4vw,4.2rem)] font-bold leading-[1.1] tracking-[-0.04em]">
              {PROFILE.tagline}
            </h1>
            <p className="mt-6 text-[15px] opacity-55">{PROFILE.role}</p>

            <div className="mt-14 max-w-[58ch] space-y-6 text-[15px] leading-[1.9]">
              {PROFILE.bio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </header>

          {/* The channel bio, verbatim — it is the shortest accurate
              description of what this account is for. */}
          <div className="mt-16 max-w-[58ch] rounded-sm border border-black/10 p-7 text-[14px] leading-[1.9]">
            <p className="text-[12px] uppercase tracking-[0.16em] opacity-40">
              {PROFILE.handle}
            </p>
            <div className="mt-3 space-y-1">
              {PROFILE.channelLines.map((line) => (
                <p key={line}>▫️ {line}</p>
              ))}
            </div>
          </div>

          <Section label="Numbers" title="지금까지">
            <dl className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <p
                      className="text-[clamp(1.7rem,3.4vw,2.6rem)] font-semibold tracking-[-0.04em]"
                      style={{
                        fontFamily:
                          '"Geist", "Pretendard", ui-monospace, monospace',
                      }}
                    >
                      {s.value}
                    </p>
                    <p className="mt-1.5 text-[13px] opacity-65">{s.label}</p>
                    <p className="text-[12px] opacity-35">{s.note}</p>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 text-[12px] opacity-35">
              모든 수치는 이 포트폴리오를 위해 구성한 예시 데이터입니다.
            </p>
          </Section>

          <Section label="Tracks" title="네 개의 칸">
            <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {TRACKS.map((t) => (
                <li key={t.name}>
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ background: ACCENT[t.accent] }}
                    aria-hidden="true"
                  />
                  <h3 className="mt-3 text-[17px] font-semibold tracking-[-0.02em]">
                    {t.name}
                    <span className="ml-2 text-[13px] font-normal opacity-40">
                      {WORKS.filter((w) => w.track === t.name).length}건
                    </span>
                  </h3>
                  <p className="mt-2 max-w-[36ch] text-[14px] leading-[1.8] opacity-70">
                    {t.blurb}
                  </p>
                </li>
              ))}
            </ul>
          </Section>

          <Section label="Timeline" title="활동">
            <ol>
              {TIMELINE.map((row) => (
                <li
                  key={row.period + row.title}
                  className="grid gap-x-8 gap-y-2 border-t border-black/10 py-7 sm:grid-cols-[11rem_1fr]"
                >
                  <p
                    className="text-[13px] opacity-45"
                    style={{
                      fontFamily:
                        '"Geist", "Pretendard", ui-monospace, monospace',
                    }}
                  >
                    {row.period}
                    {row.now ? (
                      <span className="ml-2 rounded-full bg-[#0a0a0a] px-2 py-0.5 text-[11px] text-[#fafafa]">
                        진행 중
                      </span>
                    ) : null}
                  </p>
                  <div>
                    <h3 className="text-[17px] font-semibold tracking-[-0.02em]">
                      {row.title}
                    </h3>
                    <p className="mt-1 text-[13px] opacity-45">{row.org}</p>
                    <p className="mt-2.5 max-w-[52ch] text-[14px] leading-[1.8] opacity-70">
                      {row.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          <Section label="Awards" title="수상">
            <ul>
              {AWARDS.map((a) => (
                <li
                  key={a.title}
                  className="flex items-baseline justify-between gap-6 border-t border-black/10 py-5"
                >
                  <span className="text-[15px] font-medium">{a.title}</span>
                  <span className="shrink-0 text-[13px] opacity-45">
                    {a.org} · {a.year}
                  </span>
                </li>
              ))}
            </ul>
          </Section>

          <Section label="Work with me" title="이런 일을 합니다">
            <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-3">
              {SERVICES.map((s) => (
                <li key={s.title}>
                  <h3 className="text-[16px] font-semibold tracking-[-0.02em]">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-[1.8] opacity-70">
                    {s.body}
                  </p>
                </li>
              ))}
            </ul>
          </Section>

          <Section label="FAQ" title="자주 받는 질문">
            <dl>
              {FAQ.map((f) => (
                <div key={f.q} className="border-t border-black/10 py-7">
                  <dt className="text-[16px] font-semibold tracking-[-0.02em]">
                    {f.q}
                  </dt>
                  <dd className="mt-2.5 max-w-[58ch] text-[14px] leading-[1.85] opacity-70">
                    {f.a}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section label="Contact">
            <p className="max-w-[42ch] text-[clamp(1.3rem,3vw,2rem)] font-bold leading-[1.35] tracking-[-0.03em]">
              {CONTACT.note}
            </p>
            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4 text-[15px]">
              <span>{CONTACT.instagram}</span>
              <span className="opacity-60">{CONTACT.email}</span>
              <Link href="/works" className="underline underline-offset-4">
                작업 보기
              </Link>
            </div>
          </Section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
