import Link from "next/link";
import type { ReactNode } from "react";
import { CategorySidebar } from "./CategorySidebar";
import { FaqSection, type FaqItem } from "./FaqSection";
import { RelatedCalculators } from "./RelatedCalculators";
import { ACCENT_CLASSES, type AccentColor } from "@/lib/theme";

interface CalculatorLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  guide: ReactNode;
  accent: AccentColor;
  // 검색결과 리치 스니펫(FAQPage)용 자주 묻는 질문. 없으면 섹션 자체를 생략한다.
  faq?: FaqItem[];
  // 내부 링크 강화용 관련 계산기 slug 목록. 없으면 섹션 자체를 생략한다.
  related?: string[];
  // 자체적으로 카드 여러 개를 이미 그리는 화면(예: 잔고 시뮬레이터)에서
  // 카드 안에 카드가 겹치지 않도록 바깥 카드 래퍼를 생략할 때 사용.
  // 이런 화면은 넓어진 전체 폭을 그대로 활용한다(2단 배치 등).
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
  faq,
  related,
  bare = false,
  hideBackLink = false,
}: CalculatorLayoutProps) {
  const colors = ACCENT_CLASSES[accent];
  // 단순 입력폼 계산기는 전체 폭까지 늘리면 입력칸만 휑하게 넓어져 어색해서,
  // 가운데 정렬한 좁은 폭으로 유지한다. bare 화면(잔고 시뮬레이터)만 전체 폭을 쓴다.
  const contentWidth = bare ? "" : "mx-auto max-w-2xl";

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="flex gap-8">
        <aside className="hidden w-44 shrink-0 md:block">
          <div className="sticky top-6">
            <CategorySidebar />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className={contentWidth}>
            {!hideBackLink && (
              <Link href="/" className={`text-sm font-medium ${colors.link}`}>
                ← 홈
              </Link>
            )}
            <h1
              className={`text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 ${hideBackLink ? "" : "mt-3"}`}
            >
              {title}
            </h1>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
          </div>

          {bare ? (
            <div className="mt-6">{children}</div>
          ) : (
            <div
              className={`mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 ${contentWidth}`}
            >
              <div className={`h-1.5 w-full ${colors.topBar}`} />
              <div className="p-6">{children}</div>
            </div>
          )}

          <section className={`mt-10 border-t border-zinc-200 pt-8 dark:border-zinc-800 ${contentWidth}`}>
            <h2 className="text-lg font-semibold">이용 가이드</h2>
            <div className="prose-sm mt-3 space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {guide}
            </div>
          </section>

          {related && related.length > 0 && (
            <div className={contentWidth}>
              <RelatedCalculators slugs={related} />
            </div>
          )}

          {faq && faq.length > 0 && (
            <div className={contentWidth}>
              <FaqSection items={faq} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
