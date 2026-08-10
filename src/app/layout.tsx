import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { InlineScript } from "@/components/site/InlineScript";
import { SITE_URL } from "@/lib/config";
import { SITE_NAME } from "@/lib/seo";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: "급여, 퇴직금, 주휴수당, 연차수당까지 직장인 필수 계산기를 한곳에서.",
  robots: { index: true, follow: true },
  verification: {
    google: "rbGqUYUs0cI9vsjtDk2C8nIqEl8M2Hs3513F1B57ivM",
    other: {
      "naver-site-verification": "a28fff8501ef2f01bfa612f78e05fa71515faf42",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: "4대보험료, 퇴직금, 주휴수당, 연차수당 계산기와 잔고 시뮬레이터(가계부)를 무료로 제공하는 사이트",
  inLanguage: "ko-KR",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      data-theme="light"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Google AdSense 사이트 연결 확인용 스니펫. 구글이 정적 HTML에서 그대로
            찾을 수 있도록 next/script 최적화 없이 순수 <script> 태그로 둔다. */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9915051439055619"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex min-h-full flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        {/* 기본은 라이트 모드. 저장된 선호가 dark일 때만, 화면이 그려지기 전에
            data-theme를 바꿔서 다크 화면이 잠깐 하얗게 보이는 깜빡임을 막는다. */}
        <InlineScript
          html={`(function(){try{if(localStorage.getItem("theme")==="dark"){document.documentElement.setAttribute("data-theme","dark")}}catch(e){}})()`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
