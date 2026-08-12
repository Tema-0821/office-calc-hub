import { describe, expect, it } from "vitest";
import { calculateSuspensionPay } from "./suspensionPay";

describe("calculateSuspensionPay", () => {
  it("평균임금의 70%가 통상임금 이하이면 70%를 그대로 적용한다", () => {
    const result = calculateSuspensionPay(100_000, 100_000, 10);
    expect(result.capApplied).toBe(false);
    expect(result.dailyAllowance).toBe(70_000);
    expect(result.totalAllowance).toBe(700_000);
  });

  it("평균임금의 70%가 통상임금을 초과하면 통상임금으로 상한을 건다", () => {
    const result = calculateSuspensionPay(200_000, 100_000, 10);
    expect(result.capApplied).toBe(true);
    expect(result.dailyAllowance).toBe(100_000);
    expect(result.totalAllowance).toBe(1_000_000);
  });
});
