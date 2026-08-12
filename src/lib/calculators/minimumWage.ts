import { MINIMUM_WAGE_2026 } from "./weeklyHolidayPay";
import { STANDARD_MONTHLY_HOURS } from "./annualLeavePay";

export interface MinimumWageResult {
  isCompliant: boolean;
  shortfallPerHour: number;
  minimumDailyWage: number;
  minimumWeeklyWage: number;
  minimumMonthlyWage: number;
}

// 48시간 = 소정근로 40시간 + 유급 주휴시간 8시간(주 40시간 근무 기준)
const WEEKLY_HOURS_WITH_HOLIDAY = 48;

export function calculateMinimumWageCheck(hourlyWage: number): MinimumWageResult {
  const isCompliant = hourlyWage >= MINIMUM_WAGE_2026;
  const shortfallPerHour = isCompliant ? 0 : MINIMUM_WAGE_2026 - hourlyWage;

  return {
    isCompliant,
    shortfallPerHour,
    minimumDailyWage: MINIMUM_WAGE_2026 * 8,
    minimumWeeklyWage: MINIMUM_WAGE_2026 * WEEKLY_HOURS_WITH_HOLIDAY,
    minimumMonthlyWage: MINIMUM_WAGE_2026 * STANDARD_MONTHLY_HOURS,
  };
}
