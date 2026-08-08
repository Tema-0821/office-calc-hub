import Link from "next/link";
import type { ReactNode } from "react";
import { ACCENT_CLASSES, type AccentColor } from "@/lib/theme";

interface CalculatorLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  guide: ReactNode;
  accent: AccentColor;
  // 자체적으로 카드 여러 개를 이미 그리는 화면(예: 잔고 시뮬레이터)에서
  // 카드 안에 카드가 겹치지 않도록 바깥 카드 래퍼를 생략할 때 사용.
  bare?: boolean;
  // 홈(잔고 시뮬레이터)처럼 자기 자신으로 돌아가는 링크가 의미 없는 화면에서 숨김.
  hideBackLink?: boolean;
}

export function CalculatorLayout({
  title,
  description,
  children,
  guide,
  accent,
  bare = false,
  hideBackLink = false,
}: CalculatorLayoutProps) {
  const colors = ACCENT_CLASSES[accent];

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      {!hideBackLink && (
        <Link href="/" className={`text-sm font-medium ${colors.link}`}>
          ← 홈
        </Link>
      )}
      <h1 className={`text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 ${hideBackLink ? "" : "mt-3"}`}>
        {title}
      </h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>

      {bare ? (
        <div className="mt-6">{children}</div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className={`h-1.5 w-full ${colors.topBar}`} />
          <div className="p-6">{children}</div>
        </div>
      )}

      <section className="mt-10 border-t border-zinc-200 pt-8 dark:border-zinc-800">
        <h2 className="text-lg font-semibold">이용 가이드</h2>
        <div className="prose-sm mt-3 space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {guide}
        </div>
      </section>
    </div>
  );
}
