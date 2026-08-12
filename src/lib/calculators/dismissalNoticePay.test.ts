import { describe, expect, it } from "vitest";
import { calculateDismissalNoticePay } from "./dismissalNoticePay";
import { STANDARD_MONTHLY_HOURS } from "./annualLeavePay";

describe("calculateDismissalNoticePay", () => {
  it("1일 통상임금의 30일분을 계산한다", () => {
    const monthlySalary = STANDARD_MONTHLY_HOURS * 10_000;
    const result = calculateDismissalNoticePay(monthlySalary);

    expect(result.dailyOrdinaryWage).toBeCloseTo(80_000);
    expect(result.dismissalNoticePay).toBeCloseTo(2_400_000);
  });
});
