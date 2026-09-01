import Link from "next/link";

import { PROFILE } from "@/content/profile";

/**
 * The one persistent piece of chrome. Over the carousel it has to keep out of
 * the ring's way: the wrapper never takes the pointer, only the links do, so a
 * throw that happens to pass under it is not interrupted.
 *
 * `delay` holds it back until the entry animation has finished drawing the
 * ring — on the standard pages there is no entry, so it is left at 0.
 */
export default function SiteNav({ delay = 0, tone = "dark" }) {
  const ink = tone === "dark" ? "text-[#0a0a0a]" : "text-[#fafafa]";

  return (
    <nav
      aria-label="사이트"
      className={`pointer-events-none fixed inset-x-0 top-0 z-20 flex items-center justify-between px-[5.5vw] py-[2.2vh] text-[13px] tracking-[-0.01em] ${ink}`}
      style={
        delay ? { animation: `nav-in 0.7s ease ${delay}s both` } : undefined
      }
    >
      <Link
        href="/"
        className="pointer-events-auto font-semibold hover:opacity-60"
        style={{ fontFamily: '"Satoshi", ui-sans-serif, sans-serif' }}
      >
        {PROFILE.latin}
      </Link>

      <div className="flex items-center gap-6">
        <Link href="/works" className="pointer-events-auto hover:opacity-60">
          작업
        </Link>
        <Link href="/about" className="pointer-events-auto hover:opacity-60">
          소개
        </Link>
        <span className="opacity-45">{PROFILE.handle}</span>
      </div>

      <style>{`@keyframes nav-in { from { opacity: 0 } to { opacity: 1 } }`}</style>
    </nav>
  );
}
