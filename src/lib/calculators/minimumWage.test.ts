import { describe, expect, it } from "vitest";
import { calculateMinimumWageCheck } from "./minimumWage";
import { MINIMUM_WAGE_2026 } from "./weeklyHolidayPay";
import { STANDARD_MONTHLY_HOURS } from "./annualLeavePay";

describe("calculateMinimumWageCheck", () => {
  it("최저시급 이상이면 준수로 판정한다", () => {
    const result = calculateMinimumWageCheck(MINIMUM_WAGE_2026);
    expect(result.isCompliant).toBe(true);
    expect(result.shortfallPerHour).toBe(0);
  });

  it("최저시급 미만이면 위반으로 판정하고 부족분을 계산한다", () => {
    const result = calculateMinimumWageCheck(MINIMUM_WAGE_2026 - 1000);
    expect(result.isCompliant).toBe(false);
    expect(result.shortfallPerHour).toBe(1000);
  });

  it("최저 일급/주급/월급을 계산한다", () => {
    const result = calculateMinimumWageCheck(MINIMUM_WAGE_2026);
    expect(result.minimumDailyWage).toBe(MINIMUM_WAGE_2026 * 8);
    expect(result.minimumWeeklyWage).toBe(MINIMUM_WAGE_2026 * 48);
    expect(result.minimumMonthlyWage).toBe(MINIMUM_WAGE_2026 * STANDARD_MONTHLY_HOURS);
  });
});
