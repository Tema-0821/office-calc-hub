import Link from "next/link";
import { CALCULATORS } from "@/lib/calculators";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">직장인 계산기 허브</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        급여, 퇴직금, 수당까지 — 직장인이 자주 확인하는 계산을 한곳에서 빠르게 해보세요.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {CALCULATORS.map((calc) => (
          <Link
            key={calc.slug}
            href={`/${calc.slug}`}
            className="flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
          >
            <span className="text-2xl">{calc.icon}</span>
            <span className="font-semibold">{calc.title}</span>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">{calc.description}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
