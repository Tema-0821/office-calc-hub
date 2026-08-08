"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CALCULATORS } from "@/lib/calculators";
import { ACCENT_CLASSES } from "@/lib/theme";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          직장인 계산기 허브
        </Link>
        <ThemeToggle />
      </div>
      <nav className="mx-auto max-w-3xl overflow-x-auto px-6 pb-3">
        <ul className="flex gap-2">
          {CALCULATORS.map((calc) => {
            const accent = ACCENT_CLASSES[calc.accent];
            const isActive = pathname === calc.href;
            return (
              <li key={calc.slug} className="shrink-0">
                <Link
                  href={calc.href}
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap transition-opacity ${accent.badgeBg} ${accent.badgeText} ${
                    isActive
                      ? `${accent.badgeActiveRing} ring-offset-1 ring-offset-white dark:ring-offset-zinc-950`
                      : "opacity-70 hover:opacity-100"
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
