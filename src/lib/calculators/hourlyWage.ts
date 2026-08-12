import { STANDARD_MONTHLY_HOURS } from "./annualLeavePay";

export type HourlyWageMode = "monthly" | "hourly";

export interface HourlyWageResult {
  hourlyWage: number;
  dailyWage: number;
  monthlyWage: number;
}

// 월 소정근로시간(209시간) 기준으로 월급과 시급/일급을 서로 환산한다.
export function calculateHourlyWage(amount: number, mode: HourlyWageMode): HourlyWageResult {
  if (mode === "monthly") {
    const hourlyWage = amount / STANDARD_MONTHLY_HOURS;
    return { hourlyWage, dailyWage: hourlyWage * 8, monthlyWage: amount };
  }

  const hourlyWage = amount;
  return { hourlyWage, dailyWage: hourlyWage * 8, monthlyWage: hourlyWage * STANDARD_MONTHLY_HOURS };
}
