import Link from "next/link";
import { buildMetadata, SITE_NAME } from "@/lib/seo";
import { GUIDES } from "@/lib/guides";

export const metadata = buildMetadata({
  title: "가이드",
  description: `${SITE_NAME}의 급여·근로 관련 가이드 모음입니다.`,
  path: "/guides",
});

export default function GuidesIndexPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">가이드</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        계산기만으로는 다 담기 어려운 급여·근로 관련 실무 정보를 정리했습니다.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        {GUIDES.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="rounded-2xl border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
          >
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
              {guide.title}
            </h2>
            <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">{guide.description}</p>
            <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">{guide.date}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
