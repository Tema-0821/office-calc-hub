import Link from "next/link";
import type { ReactNode } from "react";
import { RelatedCalculators } from "@/components/calculators/RelatedCalculators";

interface GuideLayoutProps {
  title: string;
  date: string;
  children: ReactNode;
  relatedCalculators?: string[];
}

export function GuideLayout({ title, date, children, relatedCalculators }: GuideLayoutProps) {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-12">
      <Link href="/guides" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
        ← 가이드 목록
      </Link>
      <h1 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        {title}
      </h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">발행일: {date}</p>

      <div className="prose-sm mt-8 space-y-5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        {children}
      </div>

      {relatedCalculators && relatedCalculators.length > 0 && (
        <RelatedCalculators slugs={relatedCalculators} />
      )}
    </div>
  );
}
