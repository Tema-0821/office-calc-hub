import { describe, expect, it } from "vitest";
import { calculateAnnualLeavePay, STANDARD_MONTHLY_HOURS } from "./annualLeavePay";

describe("calculateAnnualLeavePay", () => {
  it("통상임금 기준 1일 임금 x 미사용 연차일수로 계산한다", () => {
    const monthlySalary = STANDARD_MONTHLY_HOURS * 10_000; // 시급 1만원이 되도록 역산
    const result = calculateAnnualLeavePay(monthlySalary, 5);

    expect(result.hourlyWage).toBeCloseTo(10_000);
    expect(result.dailyWage).toBeCloseTo(80_000);
    expect(result.annualLeavePay).toBeCloseTo(400_000);
  });

  it("미사용 연차일수가 0이면 수당도 0이다", () => {
    const result = calculateAnnualLeavePay(3_000_000, 0);
    expect(result.annualLeavePay).toBe(0);
  });
});
