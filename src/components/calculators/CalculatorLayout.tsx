import Link from "next/link";
import type { ReactNode } from "react";

interface CalculatorLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  guide: ReactNode;
  // 자체적으로 카드 여러 개를 이미 그리는 화면(예: 잔고 시뮬레이터)에서
  // 카드 안에 카드가 겹치지 않도록 바깥 카드 래퍼를 생략할 때 사용.
  bare?: boolean;
}

export function CalculatorLayout({ title, description, children, guide, bare = false }: CalculatorLayoutProps) {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
        ← 전체 계산기
      </Link>
      <h1 className="mt-3 text-2xl font-bold tracking-tight">{title}</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>

      {bare ? (
        <div className="mt-6">{children}</div>
      ) : (
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          {children}
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
