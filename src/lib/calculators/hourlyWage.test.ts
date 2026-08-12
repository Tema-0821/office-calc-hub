import { describe, expect, it } from "vitest";
import { calculateHourlyWage } from "./hourlyWage";
import { STANDARD_MONTHLY_HOURS } from "./annualLeavePay";

describe("calculateHourlyWage", () => {
  it("월급 입력 시 시급/일급을 209시간 기준으로 환산한다", () => {
    const monthlySalary = STANDARD_MONTHLY_HOURS * 10_000;
    const result = calculateHourlyWage(monthlySalary, "monthly");

    expect(result.hourlyWage).toBeCloseTo(10_000);
    expect(result.dailyWage).toBeCloseTo(80_000);
    expect(result.monthlyWage).toBe(monthlySalary);
  });

  it("시급 입력 시 월급/일급을 역산한다", () => {
    const result = calculateHourlyWage(10_000, "hourly");

    expect(result.hourlyWage).toBe(10_000);
    expect(result.dailyWage).toBe(80_000);
    expect(result.monthlyWage).toBeCloseTo(STANDARD_MONTHLY_HOURS * 10_000);
  });
});
