import { MINIMUM_WAGE_2026 } from "./weeklyHolidayPay";

// 2026년 구직급여 1일 상한액 (고용노동부 고시)
export const DAILY_UPPER_CAP_2026 = 68_100;
// 2026년 구직급여 1일 하한액 = 최저시급 × 80% × 1일 소정근로시간(8시간), 고용보험법상 산식
export const DAILY_LOWER_CAP_2026 = Math.round(MINIMUM_WAGE_2026 * 0.8 * 8);

export interface UnemploymentBenefitInput {
  endDate: string; // 퇴사일(이직일)
  last3MonthsWage: number; // 퇴사 전 3개월간 지급받은 임금 총액
  age: number; // 이직 당시 만 나이
  insuredYears: number; // 고용보험 피보험기간(년)
}

export interface UnemploymentBenefitResult {
  periodDays: number;
  dailyAverageWage: number;
  dailyBenefitBeforeCap: number;
  dailyBenefit: number;
  capApplied: "upper" | "lower" | "none";
  benefitDays: number;
  totalBenefit: number;
}

const DAY_MS = 1000 * 60 * 60 * 24;

// 고용보험법 시행령 별표1 - 이직일 기준 연령 및 피보험기간별 소정급여일수
function getBenefitDays(age: number, insuredYears: number): number {
  const isOlder = age >= 50;

  if (insuredYears < 1) return 120;
  if (insuredYears < 3) return isOlder ? 180 : 150;
  if (insuredYears < 5) return isOlder ? 210 : 180;
  if (insuredYears < 10) return isOlder ? 240 : 210;
  return isOlder ? 270 : 240;
}

export function calculateUnemploymentBenefit(
  input: UnemploymentBenefitInput
): UnemploymentBenefitResult {
  const end = new Date(input.endDate);
  const threeMonthsAgo = new Date(end);
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  const periodDays = Math.max(1, Math.round((end.getTime() - threeMonthsAgo.getTime()) / DAY_MS));

  const dailyAverageWage = input.last3MonthsWage / periodDays;
  const dailyBenefitBeforeCap = dailyAverageWage * 0.6;

  let dailyBenefit = dailyBenefitBeforeCap;
  let capApplied: UnemploymentBenefitResult["capApplied"] = "none";
  if (dailyBenefitBeforeCap > DAILY_UPPER_CAP_2026) {
    dailyBenefit = DAILY_UPPER_CAP_2026;
    capApplied = "upper";
  } else if (dailyBenefitBeforeCap < DAILY_LOWER_CAP_2026) {
    dailyBenefit = DAILY_LOWER_CAP_2026;
    capApplied = "lower";
  }

  const benefitDays = getBenefitDays(input.age, input.insuredYears);
  const totalBenefit = dailyBenefit * benefitDays;

  return {
    periodDays,
    dailyAverageWage,
    dailyBenefitBeforeCap,
    dailyBenefit,
    capApplied,
    benefitDays,
    totalBenefit,
  };
}
