import type { AccentColor } from "@/lib/theme";

export type CalculatorCategory = "salary" | "budget" | "life" | "tax";

export const CALCULATOR_CATEGORIES: Record<CalculatorCategory, string> = {
  salary: "급여·근로 계산기",
  budget: "가계부 도구",
  life: "생활 계산기",
  tax: "세금 계산기",
};

export interface CalculatorMeta {
  slug: string;
  href: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  accent: AccentColor;
  category: CalculatorCategory;
}

export const CALCULATORS: CalculatorMeta[] = [
  {
    slug: "balance-simulator",
    href: "/",
    title: "잔고 시뮬레이터 (가계부)",
    shortTitle: "잔고 시뮬레이터",
    description: "월급·고정지출·달력 지출 기록으로 매달 잔고가 어떻게 쌓이는지 보여주는 가계부형 도구예요.",
    icon: "💰",
    accent: "rose",
    category: "budget",
  },
  {
    slug: "four-insurance",
    href: "/four-insurance",
    title: "4대보험료 계산기",
    shortTitle: "4대보험료",
    description: "월급을 입력하면 국민연금·건강보험·장기요양보험·고용보험 근로자 부담분을 계산해줘요.",
    icon: "🛡️",
    accent: "blue",
    category: "salary",
  },
  {
    slug: "severance-pay",
    href: "/severance-pay",
    title: "퇴직금 계산기",
    shortTitle: "퇴직금",
    description: "입사일·퇴사일과 최근 3개월 급여로 평균임금 기준 예상 퇴직금을 계산해줘요.",
    icon: "💼",
    accent: "violet",
    category: "salary",
  },
  {
    slug: "weekly-holiday-pay",
    href: "/weekly-holiday-pay",
    title: "주휴수당 계산기",
    shortTitle: "주휴수당",
    description: "시급과 주 근무시간을 입력하면 주휴수당 지급 대상인지, 얼마인지 알려줘요.",
    icon: "📅",
    accent: "amber",
    category: "salary",
  },
  {
    slug: "annual-leave-pay",
    href: "/annual-leave-pay",
    title: "연차수당 계산기",
    shortTitle: "연차수당",
    description: "월급과 미사용 연차일수로 통상임금 기준 연차수당을 계산해줘요.",
    icon: "🌴",
    accent: "emerald",
    category: "salary",
  },
  {
    slug: "korean-age",
    href: "/korean-age",
    title: "만 나이 계산기",
    shortTitle: "만 나이",
    description: "생년월일을 입력하면 만 나이와 연 나이, 다음 생일까지 남은 날짜를 계산해줘요.",
    icon: "🎂",
    accent: "teal",
    category: "life",
  },
  {
    slug: "vat",
    href: "/vat",
    title: "부가가치세 계산기",
    shortTitle: "부가가치세",
    description: "금액에 부가세가 포함됐는지 별도인지에 따라 공급가액·부가세·합계금액을 계산해줘요.",
    icon: "🧾",
    accent: "cyan",
    category: "tax",
  },
];
