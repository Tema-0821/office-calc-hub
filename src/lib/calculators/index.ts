import type { AccentColor } from "@/lib/theme";

export type CalculatorCategory = "salary" | "budget";

export const CALCULATOR_CATEGORIES: Record<CalculatorCategory, string> = {
  salary: "급여·근로 계산기",
  budget: "가계부 도구",
};

export interface CalculatorMeta {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  accent: AccentColor;
  category: CalculatorCategory;
}

export const CALCULATORS: CalculatorMeta[] = [
  {
    slug: "four-insurance",
    title: "4대보험료 계산기",
    shortTitle: "4대보험료",
    description: "월급을 입력하면 국민연금·건강보험·장기요양보험·고용보험 근로자 부담분을 계산해줘요.",
    icon: "🛡️",
    accent: "blue",
    category: "salary",
  },
  {
    slug: "severance-pay",
    title: "퇴직금 계산기",
    shortTitle: "퇴직금",
    description: "입사일·퇴사일과 최근 3개월 급여로 평균임금 기준 예상 퇴직금을 계산해줘요.",
    icon: "💼",
    accent: "violet",
    category: "salary",
  },
  {
    slug: "weekly-holiday-pay",
    title: "주휴수당 계산기",
    shortTitle: "주휴수당",
    description: "시급과 주 근무시간을 입력하면 주휴수당 지급 대상인지, 얼마인지 알려줘요.",
    icon: "📅",
    accent: "amber",
    category: "salary",
  },
  {
    slug: "annual-leave-pay",
    title: "연차수당 계산기",
    shortTitle: "연차수당",
    description: "월급과 미사용 연차일수로 통상임금 기준 연차수당을 계산해줘요.",
    icon: "🌴",
    accent: "emerald",
    category: "salary",
  },
  {
    slug: "balance-simulator",
    title: "잔고 시뮬레이터 (가계부)",
    shortTitle: "잔고 시뮬레이터",
    description: "월급·고정지출·달력 지출 기록으로 매달 잔고가 어떻게 쌓이는지 보여주는 가계부형 도구예요.",
    icon: "💰",
    accent: "rose",
    category: "budget",
  },
];
