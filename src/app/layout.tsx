import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { InlineScript } from "@/components/site/InlineScript";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "직장인 계산기 허브",
    template: "%s",
  },
  description: "급여, 퇴직금, 주휴수당, 연차수당까지 직장인 필수 계산기를 한곳에서.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      data-theme="light"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        {/* 기본은 라이트 모드. 저장된 선호가 dark일 때만, 화면이 그려지기 전에
            data-theme를 바꿔서 다크 화면이 잠깐 하얗게 보이는 깜빡임을 막는다. */}
        <InlineScript
          html={`(function(){try{if(localStorage.getItem("theme")==="dark"){document.documentElement.setAttribute("data-theme","dark")}}catch(e){}})()`}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
