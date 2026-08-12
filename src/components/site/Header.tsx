"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CALCULATORS } from "@/lib/calculators";
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
      <nav className="mx-auto max-w-5xl overflow-x-auto px-6 pt-1 pb-3">
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
