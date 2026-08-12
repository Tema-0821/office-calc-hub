import Link from "next/link";
import { CALCULATORS } from "@/lib/calculators";
import { ACCENT_CLASSES } from "@/lib/theme";

interface RelatedCalculatorsProps {
  slugs: string[];
}

export function RelatedCalculators({ slugs }: RelatedCalculatorsProps) {
  const items = slugs
    .map((slug) => CALCULATORS.find((c) => c.slug === slug))
    .filter((c): c is (typeof CALCULATORS)[number] => c !== undefined);

  if (items.length === 0) return null;

  return (
    <section className="mt-10 border-t border-zinc-200 pt-8 dark:border-zinc-800">
      <h2 className="text-lg font-semibold">관련 계산기</h2>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((item) => {
          const colors = ACCENT_CLASSES[item.accent];
          return (
            <Link
              key={item.slug}
              href={item.href}
              className={`rounded-xl border p-4 text-sm transition-colors ${colors.cardBorder} ${colors.cardHoverBorder}`}
            >
              <span className="font-medium text-zinc-900 dark:text-zinc-50">
                {item.icon} {item.title}
              </span>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{item.description}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
