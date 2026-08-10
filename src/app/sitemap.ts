import type { MetadataRoute } from "next";
import { CALCULATORS } from "@/lib/calculators";
import { SITE_URL } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/feedback`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const calculatorRoutes: MetadataRoute.Sitemap = CALCULATORS.map((calc) => ({
    url: `${SITE_URL}${calc.href === "/" ? "" : calc.href}`,
    changeFrequency: "monthly",
    priority: calc.href === "/" ? 1 : 0.8,
  }));

  return [...staticRoutes, ...calculatorRoutes];
}
