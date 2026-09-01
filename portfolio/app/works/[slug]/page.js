import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { WORKS, bySlug } from "@/content/works";

export function generateStaticParams() {
  return WORKS.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const work = bySlug(slug);
  if (!work) return {};
  return { title: work.name, description: work.summary };
}

const Row = ({ label, children }) => (
  <div className="border-t border-black/10 py-4">
    <dt className="text-[12px] uppercase tracking-[0.16em] opacity-40">
      {label}
    </dt>
    <dd className="mt-1.5 text-[14px] leading-relaxed">{children}</dd>
  </div>
);

export default async function WorkPage({ params }) {
  const { slug } = await params;
  const work = bySlug(slug);
  if (!work) notFound();

  const i = WORKS.findIndex((w) => w.slug === slug);
  // Wraps, like the ring does — there is no end of the list to fall off.
  const prev = WORKS[(i - 1 + WORKS.length) % WORKS.length];
  const next = WORKS[(i + 1) % WORKS.length];

  return (
    <>
      <SiteNav />

      <main className="px-[5.5vw] pt-[16vh]">
        <article className="mx-auto max-w-[1100px]">
          <header>
            <p className="flex items-center gap-3 text-[13px] opacity-45">
              <span
                style={{
                  fontFamily: '"Geist", "Pretendard", ui-monospace, monospace',
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{work.track}</span>
            </p>
            <h1 className="mt-4 max-w-[18ch] text-[clamp(2.4rem,6.5vw,5rem)] font-bold leading-[1.04] tracking-[-0.04em]">
              {work.name}
            </h1>
            <p className="mt-7 max-w-[46ch] text-[clamp(1rem,1.7vw,1.25rem)] leading-[1.65] opacity-70">
              {work.summary}
            </p>
          </header>

          <div className="relative mt-14 aspect-[3/2] w-full overflow-hidden rounded-sm bg-black/5">
            <Image
              src={`/${work.file}`}
              alt=""
              fill
              priority
              sizes="(max-width: 1100px) 100vw, 1100px"
              className="object-cover"
            />
          </div>

          <div className="mt-16 grid gap-x-16 gap-y-12 lg:grid-cols-[1fr_20rem]">
            <div className="order-2 lg:order-1">
              <section>
                <h2 className="text-[12px] uppercase tracking-[0.16em] opacity-40">
                  배경
                </h2>
                <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.85]">
                  {work.brief}
                </p>
              </section>

              <section className="mt-16">
                <h2 className="text-[12px] uppercase tracking-[0.16em] opacity-40">
                  접근
                </h2>
                <ol className="mt-6 max-w-[62ch]">
                  {work.approach.map((step, n) => (
                    <li
                      key={step.title}
                      className="grid grid-cols-[2.5rem_1fr] border-t border-black/10 py-6"
                    >
                      <span
                        className="text-[13px] opacity-35"
                        style={{
                          fontFamily:
                            '"Geist", "Pretendard", ui-monospace, monospace',
                        }}
                      >
                        {String(n + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-[17px] font-semibold tracking-[-0.02em]">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-[15px] leading-[1.8] opacity-70">
                          {step.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="mt-16">
                <h2 className="text-[12px] uppercase tracking-[0.16em] opacity-40">
                  결과
                </h2>
                <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.85]">
                  {work.outcome}
                </p>
              </section>
            </div>

            <aside className="order-1 lg:order-2">
              <dl>
                <Row label="형식">
                  {work.type} · {work.year}
                </Row>
                <Row label="기간">{work.period}</Row>
                <Row label="역할">{work.role.join(", ")}</Row>
                <Row label="사용">{work.tools.join(", ")}</Row>
              </dl>

              <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-black/10 pt-8">
                {work.metrics.map((m) => (
                  <div key={m.label}>
                    <p
                      className="text-[clamp(1.4rem,2.6vw,1.9rem)] font-semibold tracking-[-0.03em]"
                      style={{
                        fontFamily:
                          '"Geist", "Pretendard", ui-monospace, monospace',
                      }}
                    >
                      {m.value}
                    </p>
                    <p className="mt-1 text-[13px] opacity-60">{m.label}</p>
                    {m.note ? (
                      <p className="text-[12px] opacity-35">{m.note}</p>
                    ) : null}
                  </div>
                ))}
              </div>

              <ul className="mt-10 flex flex-wrap gap-2">
                {work.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-black/15 px-3 py-1 text-[12px] opacity-60"
                  >
                    #{t}
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          <nav className="mt-24 flex items-stretch justify-between gap-6 border-t border-black/10 pt-8 text-[14px]">
            <Link href={`/works/${prev.slug}`} className="group max-w-[45%]">
              <span className="block text-[12px] opacity-40">이전</span>
              <span className="mt-1 block font-semibold tracking-[-0.02em] transition-transform duration-300 group-hover:-translate-x-1">
                ← {prev.name}
              </span>
            </Link>
            <Link
              href={`/works/${next.slug}`}
              className="group max-w-[45%] text-right"
            >
              <span className="block text-[12px] opacity-40">다음</span>
              <span className="mt-1 block font-semibold tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-1">
                {next.name} →
              </span>
            </Link>
          </nav>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
