import { describe, expect, it } from "vitest";
import { calculateSeverancePay } from "./severancePay";

describe("calculateSeverancePay", () => {
  it("근속 1년 미만이면 퇴직금이 지급되지 않는다", () => {
    const result = calculateSeverancePay({
      startDate: "2023-06-01",
      endDate: "2023-12-01",
      last3MonthsWage: 9_000_000,
      annualBonus: 0,
      unusedLeavePay: 0,
    });

    expect(result.eligible).toBe(false);
    expect(result.severancePay).toBe(0);
  });

  it("근속 1년 이상이면 평균임금 기준으로 퇴직금을 계산한다", () => {
    const result = calculateSeverancePay({
      startDate: "2023-01-01",
      endDate: "2024-01-01",
      last3MonthsWage: 9_000_000,
      annualBonus: 0,
      unusedLeavePay: 0,
    });

    expect(result.eligible).toBe(true);
    expect(result.tenureDays).toBe(365);
    expect(result.periodDays).toBe(92); // 2023-10-01 ~ 2024-01-01
    expect(result.dailyAverageWage).toBeCloseTo(9_000_000 / 92);
    expect(result.severancePay).toBeCloseTo((9_000_000 / 92) * 30);
  });

  it("상여금과 연차수당의 3/12만큼을 평균임금 산정에 포함한다", () => {
    const base = calculateSeverancePay({
      startDate: "2023-01-01",
      endDate: "2024-01-01",
      last3MonthsWage: 9_000_000,
      annualBonus: 0,
      unusedLeavePay: 0,
    });
    const withBonus = calculateSeverancePay({
      startDate: "2023-01-01",
      endDate: "2024-01-01",
      last3MonthsWage: 9_000_000,
      annualBonus: 1_200_000,
      unusedLeavePay: 0,
    });

    expect(withBonus.dailyAverageWage).toBeCloseTo(base.dailyAverageWage + (1_200_000 * (3 / 12)) / 92);
  });
});
