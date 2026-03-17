import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI TFT | AI Trend for Tomorrow",
  description: "VC를 위한 AI 기술 트렌드 리포트 — 매월 가장 주목받는 AI 논문을 투자 관점에서 분석합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t&&t!=="system")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
