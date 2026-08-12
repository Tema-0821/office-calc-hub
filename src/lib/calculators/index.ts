import type { AccentColor } from "@/lib/theme";

export type CalculatorCategory = "salary" | "allowance" | "retirement" | "tax" | "life" | "budget";

export const CALCULATOR_CATEGORIES: Record<CalculatorCategory, string> = {
  salary: "급여·연봉",
  allowance: "수당",
  retirement: "퇴사·실업",
  tax: "세금",
  life: "생활",
  budget: "가계부",
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
    href: "/balance-simulator",
    title: "가계부 (잔고 시뮬레이터)",
    shortTitle: "가계부",
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
    category: "retirement",
  },
  {
    slug: "weekly-holiday-pay",
    href: "/weekly-holiday-pay",
    title: "주휴수당 계산기",
    shortTitle: "주휴수당",
    description: "시급과 주 근무시간을 입력하면 주휴수당 지급 대상인지, 얼마인지 알려줘요.",
    icon: "📅",
    accent: "amber",
    category: "allowance",
  },
  {
    slug: "annual-leave-pay",
    href: "/annual-leave-pay",
    title: "연차수당 계산기",
    shortTitle: "연차수당",
    description: "월급과 미사용 연차일수로 통상임금 기준 연차수당을 계산해줘요.",
    icon: "🌴",
    accent: "emerald",
    category: "allowance",
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
  {
    slug: "salary-converter",
    href: "/salary-converter",
    title: "연봉·월급 환산기",
    shortTitle: "연봉·월급",
    description: "세금·4대보험 공제 없이 연봉과 세전 월급을 12개월 기준으로 서로 환산해줘요.",
    icon: "🔄",
    accent: "indigo",
    category: "salary",
  },
  {
    slug: "unemployment-benefit",
    href: "/unemployment-benefit",
    title: "실업급여(구직급여) 계산기",
    shortTitle: "실업급여",
    description: "퇴직 전 3개월 평균임금, 나이, 고용보험 가입기간으로 예상 구직급여를 계산해줘요.",
    icon: "🧭",
    accent: "sky",
    category: "retirement",
  },
  {
    slug: "hourly-wage",
    href: "/hourly-wage",
    title: "통상임금(시급) 계산기",
    shortTitle: "통상임금",
    description: "월급 또는 시급을 입력하면 시급·일급·월급을 월 소정근로시간 기준으로 서로 환산해줘요.",
    icon: "⏱️",
    accent: "lime",
    category: "salary",
  },
  {
    slug: "minimum-wage",
    href: "/minimum-wage",
    title: "최저임금 계산기",
    shortTitle: "최저임금",
    description: "2026년 최저시급 기준 일급·주급·월급을 계산하고, 내 시급이 최저임금 위반인지 확인해줘요.",
    icon: "📐",
    accent: "fuchsia",
    category: "salary",
  },
  {
    slug: "overtime-pay",
    href: "/overtime-pay",
    title: "연장·야간·휴일수당 계산기",
    shortTitle: "연장·야간·휴일수당",
    description: "통상시급과 연장·야간·휴일 근로시간을 입력하면 가산수당을 계산해줘요.",
    icon: "🌙",
    accent: "orange",
    category: "allowance",
  },
  {
    slug: "annual-leave-days",
    href: "/annual-leave-days",
    title: "연차 발생일수 계산기",
    shortTitle: "연차 발생일수",
    description: "입사일을 입력하면 근로기준법 기준으로 지금까지 발생한 연차 일수를 계산해줘요.",
    icon: "📆",
    accent: "pink",
    category: "allowance",
  },
  {
    slug: "suspension-pay",
    href: "/suspension-pay",
    title: "휴업수당 계산기",
    shortTitle: "휴업수당",
    description: "평균임금과 통상임금, 휴업일수를 입력하면 휴업수당을 계산해줘요.",
    icon: "🚧",
    accent: "purple",
    category: "retirement",
  },
  {
    slug: "dismissal-notice-pay",
    href: "/dismissal-notice-pay",
    title: "해고예고수당 계산기",
    shortTitle: "해고예고수당",
    description: "월급을 입력하면 해고예고 없이 즉시 해고됐을 때 받을 수 있는 해고예고수당을 계산해줘요.",
    icon: "📋",
    accent: "yellow",
    category: "retirement",
  },
];
