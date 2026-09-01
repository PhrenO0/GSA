/**
 * Renders the eighteen card faces in public/ from content/works.js.
 *
 * The art is generated rather than photographed so the ring can be re-dealt
 * from the content model alone: change a work's name or track and its card
 * follows. Each face is laid out as HTML, screenshotted in headless Chromium
 * and written as webp at 2x the atlas cell (768x512, the plane's 1.5:1).
 *
 * Not part of `npm run build` — the webp files are committed. Re-run it after
 * editing content/works.js:
 *
 *     npm i -D playwright sharp && npx playwright install chromium
 *     node tools/make-cards.mjs
 *
 * On a machine that already has Chromium (CI images usually do), point
 * CHROMIUM at it instead of installing another copy.
 */

import { chromium } from "playwright";
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { WORKS } from "../content/works.js";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(HERE, "..", "public");
const FONTS = path.join(PUBLIC, "fonts");

const W = 768;
const H = 512; // 1.5 : 1, the atlas cell's aspect

// One accent per lane, so the ring reads as four families rather than
// eighteen unrelated cards.
const ACCENTS = {
  "과제·시험 벼락치기": { a: "#4285F4", b: "#8AB4F8", ink: "#0B1220" },
  "자소서·취준": { a: "#A142F4", b: "#D7AEFB", ink: "#150B1F" },
  자격증: { a: "#F9AB00", b: "#FDD663", ink: "#1F1503" },
  "캠퍼스 라이프": { a: "#34A853", b: "#81C995", ink: "#06170D" },
};

const dataUrl = async (file) => {
  const buf = await fs.readFile(path.join(FONTS, file));
  return `data:font/woff2;base64,${buf.toString("base64")}`;
};

// A title breaks better at a phrase boundary than wherever the box runs out.
const titleHtml = (name) => name.split(" ").join("<br />");

function face(work, i, fonts) {
  const accent = ACCENTS[work.track] ?? ACCENTS["캠퍼스 라이프"];
  const dark = i % 2 === 0;
  const bg = dark ? accent.ink : "#F4F4F6";
  const fg = dark ? "#FFFFFF" : "#0B0B0F";
  const dim = dark ? "rgba(255,255,255,0.58)" : "rgba(11,11,15,0.55)";
  const hair = dark ? "rgba(255,255,255,0.22)" : "rgba(11,11,15,0.18)";
  const num = String(i + 1).padStart(2, "0");

  return `<!doctype html><html><head><meta charset="utf-8" /><style>
  @font-face { font-family: "P"; src: url("${fonts.medium}") format("woff2"); font-weight: 500 }
  @font-face { font-family: "P"; src: url("${fonts.bold}") format("woff2"); font-weight: 700 }
  * { margin: 0; padding: 0; box-sizing: border-box }
  body { width: ${W}px; height: ${H}px; overflow: hidden;
         font-family: "P", sans-serif; background: ${bg}; color: ${fg} }
  .card { position: relative; width: 100%; height: 100%; padding: 54px 56px;
          display: flex; flex-direction: column; justify-content: space-between }
  /* The glow is what keeps a flat colour field from reading as a swatch once
     the shader melts two cards together. */
  .glow { position: absolute; inset: 0; overflow: hidden }
  .glow::before { content: ""; position: absolute; right: -18%; top: -42%;
    width: 78%; height: 128%; border-radius: 50%; filter: blur(58px);
    background: radial-gradient(circle at 50% 50%, ${accent.a} 0%, ${accent.a}00 68%);
    opacity: ${dark ? 0.62 : 0.55} }
  .glow::after { content: ""; position: absolute; left: -22%; bottom: -58%;
    width: 66%; height: 108%; border-radius: 50%; filter: blur(64px);
    background: radial-gradient(circle at 50% 50%, ${accent.b} 0%, ${accent.b}00 70%);
    opacity: ${dark ? 0.38 : 0.62} }
  .rule-grid { position: absolute; inset: 0; opacity: ${dark ? 0.07 : 0.05};
    background: repeating-linear-gradient(90deg, ${fg} 0 1px, transparent 1px 64px) }
  .row { position: relative; display: flex; align-items: flex-start;
         justify-content: space-between }
  .num { font-weight: 700; font-size: 21px; letter-spacing: 0.14em; color: ${dim} }
  .pill { font-weight: 500; font-size: 19px; letter-spacing: -0.01em;
    padding: 9px 18px; border-radius: 999px; border: 1.5px solid ${hair};
    color: ${fg}; backdrop-filter: blur(2px) }
  .title { position: relative; font-weight: 700; font-size: 74px;
    line-height: 1.05; letter-spacing: -0.035em; max-width: 88% }
  .foot { position: relative; display: flex; align-items: flex-end;
          justify-content: space-between }
  .meta { font-weight: 500; font-size: 21px; letter-spacing: -0.01em; color: ${dim} }
  .bar { width: 56px; height: 3px; background: ${accent.a}; margin-bottom: 16px }
  .mark { font-weight: 700; font-size: 19px; letter-spacing: -0.02em; color: ${dim} }
</style></head><body>
  <div class="card">
    <div class="glow"></div><div class="rule-grid"></div>
    <div class="row"><span class="num">${num}</span><span class="pill">${work.track}</span></div>
    <div>
      <div class="title">${titleHtml(work.name)}</div>
    </div>
    <div class="foot">
      <div><div class="bar"></div><div class="meta">${work.type} · ${work.year}</div></div>
      <span class="mark">#TeamGemini</span>
    </div>
  </div>
</body></html>`;
}

async function main() {
  const fonts = {
    medium: await dataUrl("Pretendard-Medium.subset.woff2"),
    bold: await dataUrl("Pretendard-Bold.subset.woff2"),
  };

  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM || undefined,
  });
  const page = await browser.newPage({ viewport: { width: W, height: H } });

  for (const [i, work] of WORKS.entries()) {
    await page.setContent(face(work, i, fonts), { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    const png = await page.screenshot({ type: "png" });
    const out = path.join(PUBLIC, work.file);
    await sharp(png).webp({ quality: 88 }).toFile(out);
    const { size } = await fs.stat(out);
    console.log(`${work.file.padEnd(34)} ${(size / 1024).toFixed(0)} KB`);
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
