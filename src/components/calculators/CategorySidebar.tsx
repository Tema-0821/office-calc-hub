"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CALCULATOR_CATEGORIES, CALCULATORS, CATEGORY_ACCENT, CATEGORY_ORDER } from "@/lib/calculators";
import { ACCENT_CLASSES } from "@/lib/theme";

export function CategorySidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-5">
      {CATEGORY_ORDER.map((category) => {
        const items = CALCULATORS.filter((calc) => calc.category === category);
        if (items.length === 0) return null;
        const colors = ACCENT_CLASSES[CATEGORY_ACCENT[category]];

        return (
          <div key={category}>
            <p className={`px-2 text-xs font-semibold ${colors.iconText}`}>
              {CALCULATOR_CATEGORIES[category]}
            </p>
            <ul className="mt-1 flex flex-col gap-0.5">
              {items.map((calc) => {
                const isActive = pathname === calc.href;
                return (
                  <li key={calc.slug}>
                    <Link
                      href={calc.href}
                      className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors ${
                        isActive
                          ? `${colors.badgeBg} ${colors.badgeText} font-medium`
                          : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                      }`}
                    >
                      <span>{calc.icon}</span>
                      <span>{calc.shortTitle}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}
