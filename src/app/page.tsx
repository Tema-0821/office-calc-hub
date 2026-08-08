import Link from "next/link";
import { CALCULATOR_CATEGORIES, CALCULATORS, type CalculatorCategory } from "@/lib/calculators";
import { ACCENT_CLASSES } from "@/lib/theme";

const CATEGORY_ORDER: CalculatorCategory[] = ["salary", "budget"];

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
        2026년 최신 기준
      </span>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        직장인 계산기 허브
      </h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        급여, 퇴직금, 수당까지 — 직장인이 자주 확인하는 계산을 한곳에서 빠르게 해보세요.
      </p>

      {CATEGORY_ORDER.map((category) => {
        const items = CALCULATORS.filter((calc) => calc.category === category);
        if (items.length === 0) return null;

        return (
          <section key={category} className="mt-10 first:mt-8">
            <h2 className="text-sm font-semibold tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
              {CALCULATOR_CATEGORIES[category]}
            </h2>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {items.map((calc) => {
                const accent = ACCENT_CLASSES[calc.accent];
                return (
                  <Link
                    key={calc.slug}
                    href={`/${calc.slug}`}
                    className={`group flex flex-col gap-3 rounded-2xl border bg-white p-5 transition-colors dark:bg-zinc-900 ${accent.cardBorder} ${accent.cardHoverBorder}`}
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl ${accent.iconBg}`}
                    >
                      {calc.icon}
                    </span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-50">{calc.title}</span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">{calc.description}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
