import "./globals.css";
import { PROFILE } from "@/content/profile";

export const metadata = {
  title: {
    default: `${PROFILE.name} — ${PROFILE.tagline}`,
    template: `%s — ${PROFILE.name}`,
  },
  description:
    "과제·시험 벼락치기, 자소서·취준, 자격증, 캠퍼스 라이프. 매주 실전 치트키를 올리는 인스타그램 채널 @kim.gemni의 작업 아카이브.",
  openGraph: {
    title: `${PROFILE.name} — ${PROFILE.tagline}`,
    description: "매주 실전 치트키 업데이트. #TeamGemini",
    type: "profile",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
