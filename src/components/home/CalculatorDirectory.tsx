import Link from "next/link";
import { CALCULATOR_CATEGORIES, CALCULATORS, CATEGORY_ACCENT, CATEGORY_ORDER } from "@/lib/calculators";
import { ACCENT_CLASSES } from "@/lib/theme";

export function CalculatorDirectory() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {CATEGORY_ORDER.map((category) => {
        const items = CALCULATORS.filter((calc) => calc.category === category);
        if (items.length === 0) return null;
        const colors = ACCENT_CLASSES[CATEGORY_ACCENT[category]];

        return (
          <div
            key={category}
            className={`overflow-hidden rounded-2xl border bg-white dark:bg-zinc-900 ${colors.cardBorder}`}
          >
            <div className={`px-4 py-2.5 text-sm font-semibold text-white ${colors.topBar}`}>
              {CALCULATOR_CATEGORIES[category]}
            </div>
            <ul className="flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800">
              {items.map((calc) => (
                <li key={calc.slug}>
                  <Link
                    href={calc.href}
                    className="flex items-center gap-2 px-4 py-3 text-sm text-zinc-700 transition-colors hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800/50"
                  >
                    <span>{calc.icon}</span>
                    <span>{calc.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
