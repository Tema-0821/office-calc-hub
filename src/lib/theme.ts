export type AccentColor =
  | "blue"
  | "violet"
  | "amber"
  | "emerald"
  | "rose"
  | "teal"
  | "cyan"
  | "indigo"
  | "sky"
  | "lime"
  | "fuchsia"
  | "orange"
  | "pink"
  | "purple"
  | "yellow";

interface AccentClasses {
  iconBg: string;
  iconText: string;
  badgeBg: string;
  badgeText: string;
  badgeActiveRing: string;
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
    badgeActiveRing: "ring-2 ring-blue-500 dark:ring-blue-400",
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
    badgeActiveRing: "ring-2 ring-violet-500 dark:ring-violet-400",
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
    badgeActiveRing: "ring-2 ring-amber-500 dark:ring-amber-400",
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
    badgeActiveRing: "ring-2 ring-emerald-500 dark:ring-emerald-400",
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
    badgeActiveRing: "ring-2 ring-rose-500 dark:ring-rose-400",
    cardBorder: "border-rose-100 dark:border-rose-900/60",
    cardHoverBorder: "hover:border-rose-300 dark:hover:border-rose-700",
    topBar: "bg-rose-500",
    link: "text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300",
    dot: "bg-rose-500",
  },
  teal: {
    iconBg: "bg-teal-100 dark:bg-teal-500/15",
    iconText: "text-teal-600 dark:text-teal-400",
    badgeBg: "bg-teal-50 dark:bg-teal-500/10",
    badgeText: "text-teal-700 dark:text-teal-300",
    badgeActiveRing: "ring-2 ring-teal-500 dark:ring-teal-400",
    cardBorder: "border-teal-100 dark:border-teal-900/60",
    cardHoverBorder: "hover:border-teal-300 dark:hover:border-teal-700",
    topBar: "bg-teal-500",
    link: "text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300",
    dot: "bg-teal-500",
  },
  cyan: {
    iconBg: "bg-cyan-100 dark:bg-cyan-500/15",
    iconText: "text-cyan-600 dark:text-cyan-400",
    badgeBg: "bg-cyan-50 dark:bg-cyan-500/10",
    badgeText: "text-cyan-700 dark:text-cyan-300",
    badgeActiveRing: "ring-2 ring-cyan-500 dark:ring-cyan-400",
    cardBorder: "border-cyan-100 dark:border-cyan-900/60",
    cardHoverBorder: "hover:border-cyan-300 dark:hover:border-cyan-700",
    topBar: "bg-cyan-500",
    link: "text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300",
    dot: "bg-cyan-500",
  },
  indigo: {
    iconBg: "bg-indigo-100 dark:bg-indigo-500/15",
    iconText: "text-indigo-600 dark:text-indigo-400",
    badgeBg: "bg-indigo-50 dark:bg-indigo-500/10",
    badgeText: "text-indigo-700 dark:text-indigo-300",
    badgeActiveRing: "ring-2 ring-indigo-500 dark:ring-indigo-400",
    cardBorder: "border-indigo-100 dark:border-indigo-900/60",
    cardHoverBorder: "hover:border-indigo-300 dark:hover:border-indigo-700",
    topBar: "bg-indigo-500",
    link: "text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300",
    dot: "bg-indigo-500",
  },
  sky: {
    iconBg: "bg-sky-100 dark:bg-sky-500/15",
    iconText: "text-sky-600 dark:text-sky-400",
    badgeBg: "bg-sky-50 dark:bg-sky-500/10",
    badgeText: "text-sky-700 dark:text-sky-300",
    badgeActiveRing: "ring-2 ring-sky-500 dark:ring-sky-400",
    cardBorder: "border-sky-100 dark:border-sky-900/60",
    cardHoverBorder: "hover:border-sky-300 dark:hover:border-sky-700",
    topBar: "bg-sky-500",
    link: "text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300",
    dot: "bg-sky-500",
  },
  lime: {
    iconBg: "bg-lime-100 dark:bg-lime-500/15",
    iconText: "text-lime-600 dark:text-lime-400",
    badgeBg: "bg-lime-50 dark:bg-lime-500/10",
    badgeText: "text-lime-700 dark:text-lime-300",
    badgeActiveRing: "ring-2 ring-lime-500 dark:ring-lime-400",
    cardBorder: "border-lime-100 dark:border-lime-900/60",
    cardHoverBorder: "hover:border-lime-300 dark:hover:border-lime-700",
    topBar: "bg-lime-500",
    link: "text-lime-600 dark:text-lime-400 hover:text-lime-700 dark:hover:text-lime-300",
    dot: "bg-lime-500",
  },
  fuchsia: {
    iconBg: "bg-fuchsia-100 dark:bg-fuchsia-500/15",
    iconText: "text-fuchsia-600 dark:text-fuchsia-400",
    badgeBg: "bg-fuchsia-50 dark:bg-fuchsia-500/10",
    badgeText: "text-fuchsia-700 dark:text-fuchsia-300",
    badgeActiveRing: "ring-2 ring-fuchsia-500 dark:ring-fuchsia-400",
    cardBorder: "border-fuchsia-100 dark:border-fuchsia-900/60",
    cardHoverBorder: "hover:border-fuchsia-300 dark:hover:border-fuchsia-700",
    topBar: "bg-fuchsia-500",
    link: "text-fuchsia-600 dark:text-fuchsia-400 hover:text-fuchsia-700 dark:hover:text-fuchsia-300",
    dot: "bg-fuchsia-500",
  },
  orange: {
    iconBg: "bg-orange-100 dark:bg-orange-500/15",
    iconText: "text-orange-600 dark:text-orange-400",
    badgeBg: "bg-orange-50 dark:bg-orange-500/10",
    badgeText: "text-orange-700 dark:text-orange-300",
    badgeActiveRing: "ring-2 ring-orange-500 dark:ring-orange-400",
    cardBorder: "border-orange-100 dark:border-orange-900/60",
    cardHoverBorder: "hover:border-orange-300 dark:hover:border-orange-700",
    topBar: "bg-orange-500",
    link: "text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300",
    dot: "bg-orange-500",
  },
  pink: {
    iconBg: "bg-pink-100 dark:bg-pink-500/15",
    iconText: "text-pink-600 dark:text-pink-400",
    badgeBg: "bg-pink-50 dark:bg-pink-500/10",
    badgeText: "text-pink-700 dark:text-pink-300",
    badgeActiveRing: "ring-2 ring-pink-500 dark:ring-pink-400",
    cardBorder: "border-pink-100 dark:border-pink-900/60",
    cardHoverBorder: "hover:border-pink-300 dark:hover:border-pink-700",
    topBar: "bg-pink-500",
    link: "text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300",
    dot: "bg-pink-500",
  },
  purple: {
    iconBg: "bg-purple-100 dark:bg-purple-500/15",
    iconText: "text-purple-600 dark:text-purple-400",
    badgeBg: "bg-purple-50 dark:bg-purple-500/10",
    badgeText: "text-purple-700 dark:text-purple-300",
    badgeActiveRing: "ring-2 ring-purple-500 dark:ring-purple-400",
    cardBorder: "border-purple-100 dark:border-purple-900/60",
    cardHoverBorder: "hover:border-purple-300 dark:hover:border-purple-700",
    topBar: "bg-purple-500",
    link: "text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300",
    dot: "bg-purple-500",
  },
  yellow: {
    iconBg: "bg-yellow-100 dark:bg-yellow-500/15",
    iconText: "text-yellow-600 dark:text-yellow-400",
    badgeBg: "bg-yellow-50 dark:bg-yellow-500/10",
    badgeText: "text-yellow-700 dark:text-yellow-300",
    badgeActiveRing: "ring-2 ring-yellow-500 dark:ring-yellow-400",
    cardBorder: "border-yellow-100 dark:border-yellow-900/60",
    cardHoverBorder: "hover:border-yellow-300 dark:hover:border-yellow-700",
    topBar: "bg-yellow-500",
    link: "text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300",
    dot: "bg-yellow-500",
  },
};
