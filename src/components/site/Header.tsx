"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CALCULATOR_CATEGORIES, CALCULATORS, CATEGORY_ACCENT, CATEGORY_ORDER } from "@/lib/calculators";
import { SITE_NAME } from "@/lib/seo";
import { ACCENT_CLASSES } from "@/lib/theme";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-zinc-200 bg-gradient-to-r from-blue-50 via-violet-50 to-rose-50 dark:border-zinc-800 dark:from-blue-950/30 dark:via-violet-950/20 dark:to-rose-950/30">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {SITE_NAME}
        </Link>
        <div className="flex items-center gap-1">
          <Link
            href="/feedback"
            className="rounded-full px-3 py-1.5 text-xs font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            💬 건의·버그
          </Link>
          <ThemeToggle />
        </div>
      </div>

      {/* 데스크톱: 카테고리 버튼에 마우스를 올리면 해당 카테고리 계산기 목록이 드롭다운으로 펼쳐진다. */}
      <nav className="mx-auto hidden max-w-5xl px-6 pb-3 pt-1 md:block">
        <ul className="flex gap-1">
          {CATEGORY_ORDER.map((category) => {
            const items = CALCULATORS.filter((calc) => calc.category === category);
            if (items.length === 0) return null;
            const accent = ACCENT_CLASSES[CATEGORY_ACCENT[category]];
            const isActiveCategory = items.some((calc) => calc.href === pathname);

            return (
              <li key={category} className="group relative">
                <button
                  type="button"
                  className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActiveCategory
                      ? `${accent.badgeBg} ${accent.badgeText}`
                      : "text-zinc-600 hover:bg-white/70 dark:text-zinc-300 dark:hover:bg-zinc-800/60"
                  }`}
                >
                  {CALCULATOR_CATEGORIES[category]}
                  <span className="text-[10px] opacity-60">▾</span>
                </button>

                <div className="absolute left-0 top-full z-20 hidden min-w-[190px] rounded-xl border border-zinc-200 bg-white shadow-lg group-hover:block group-focus-within:block dark:border-zinc-800 dark:bg-zinc-900">
                  <ul className="flex flex-col p-1.5">
                    {items.map((calc) => {
                      const isActive = pathname === calc.href;
                      return (
                        <li key={calc.slug}>
                          <Link
                            href={calc.href}
                            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm whitespace-nowrap transition-colors ${
                              isActive
                                ? `${accent.badgeBg} ${accent.badgeText} font-medium`
                                : "text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                            }`}
                          >
                            <span>{calc.icon}</span>
                            <span>{calc.title}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* 모바일: 호버 드롭다운을 쓸 수 없어 기존처럼 가로 스크롤 pill 목록을 그대로 쓴다. */}
      <nav className="mx-auto max-w-5xl overflow-x-auto px-6 pt-1 pb-3 md:hidden">
        <ul className="flex gap-2">
          {CALCULATORS.map((calc) => {
            const accent = ACCENT_CLASSES[calc.accent];
            const isActive = pathname === calc.href;
            return (
              <li key={calc.slug} className="shrink-0">
                <Link
                  href={calc.href}
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap transition-opacity ${accent.badgeBg} ${accent.badgeText} ${
                    isActive ? accent.badgeActiveRing : "opacity-70 hover:opacity-100"
                  }`}
                >
                  {calc.icon} {calc.shortTitle}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
