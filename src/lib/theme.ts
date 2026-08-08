export type AccentColor = "blue" | "violet" | "amber" | "emerald" | "rose";

interface AccentClasses {
  iconBg: string;
  iconText: string;
  badgeBg: string;
  badgeText: string;
  cardBorder: string;
  cardHoverBorder: string;
  topBar: string;
  link: string;
  dot: string;
}

// Tailwind는 클래스 이름을 소스 코드에서 문자열 그대로 찾아 CSS를 생성하기 때문에,
// "bg-" + color + "-100" 처럼 동적으로 조립하면 안 되고 이렇게 완전한 문자열로 미리
// 나열해 둬야 한다.
export const ACCENT_CLASSES: Record<AccentColor, AccentClasses> = {
  blue: {
    iconBg: "bg-blue-100 dark:bg-blue-500/15",
    iconText: "text-blue-600 dark:text-blue-400",
    badgeBg: "bg-blue-50 dark:bg-blue-500/10",
    badgeText: "text-blue-700 dark:text-blue-300",
    cardBorder: "border-blue-100 dark:border-blue-900/60",
    cardHoverBorder: "hover:border-blue-300 dark:hover:border-blue-700",
    topBar: "bg-blue-500",
    link: "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300",
    dot: "bg-blue-500",
  },
  violet: {
    iconBg: "bg-violet-100 dark:bg-violet-500/15",
    iconText: "text-violet-600 dark:text-violet-400",
    badgeBg: "bg-violet-50 dark:bg-violet-500/10",
    badgeText: "text-violet-700 dark:text-violet-300",
    cardBorder: "border-violet-100 dark:border-violet-900/60",
    cardHoverBorder: "hover:border-violet-300 dark:hover:border-violet-700",
    topBar: "bg-violet-500",
    link: "text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300",
    dot: "bg-violet-500",
  },
  amber: {
    iconBg: "bg-amber-100 dark:bg-amber-500/15",
    iconText: "text-amber-600 dark:text-amber-400",
    badgeBg: "bg-amber-50 dark:bg-amber-500/10",
    badgeText: "text-amber-700 dark:text-amber-300",
    cardBorder: "border-amber-100 dark:border-amber-900/60",
    cardHoverBorder: "hover:border-amber-300 dark:hover:border-amber-700",
    topBar: "bg-amber-500",
    link: "text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300",
    dot: "bg-amber-500",
  },
  emerald: {
    iconBg: "bg-emerald-100 dark:bg-emerald-500/15",
    iconText: "text-emerald-600 dark:text-emerald-400",
    badgeBg: "bg-emerald-50 dark:bg-emerald-500/10",
    badgeText: "text-emerald-700 dark:text-emerald-300",
    cardBorder: "border-emerald-100 dark:border-emerald-900/60",
    cardHoverBorder: "hover:border-emerald-300 dark:hover:border-emerald-700",
    topBar: "bg-emerald-500",
    link: "text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300",
    dot: "bg-emerald-500",
  },
  rose: {
    iconBg: "bg-rose-100 dark:bg-rose-500/15",
    iconText: "text-rose-600 dark:text-rose-400",
    badgeBg: "bg-rose-50 dark:bg-rose-500/10",
    badgeText: "text-rose-700 dark:text-rose-300",
    cardBorder: "border-rose-100 dark:border-rose-900/60",
    cardHoverBorder: "hover:border-rose-300 dark:hover:border-rose-700",
    topBar: "bg-rose-500",
    link: "text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300",
    dot: "bg-rose-500",
  },
};
