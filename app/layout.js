import "./globals.css";

export const metadata = {
  title: "김젬니 (Kim Gemini) | 02년생 캠퍼스 AI 단축키 포트폴리오",
  description:
    "▫️ 02년생 선배가 캠퍼스 미션 대신 깨주는 AI 단축키 💻 ▫️ 과제·시험 벼락치기 / 자소서·취준 / 자격증 / 캠퍼스 라이프 ▫️ #TeamGemini | 구글 스튜던트 앰버서더 1기 대표 리드",
  icons: {
    icon: "/gemini/avatar.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="min-h-full flex flex-col font-sans bg-[#fafafa] text-[#0a0a0a] antialiased select-none">
        {children}
      </body>
    </html>
  );
}
