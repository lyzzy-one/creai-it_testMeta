import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 역량 테스트 | CREAI+IT",
  description: "내 AI 역량으로 어디까지 가능할까? 6가지 유형 바로 확인하세요!",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-screen bg-[#0f2744]">
        {/* Mobile-first container */}
        <div className="min-h-screen max-w-md mx-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
