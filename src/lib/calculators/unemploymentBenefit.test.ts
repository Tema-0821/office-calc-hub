import { describe, expect, it } from "vitest";
import {
  calculateUnemploymentBenefit,
  DAILY_LOWER_CAP_2026,
  DAILY_UPPER_CAP_2026,
} from "./unemploymentBenefit";
import { MINIMUM_WAGE_2026 } from "./weeklyHolidayPay";

describe("DAILY_LOWER_CAP_2026", () => {
  it("최저시급 x 80% x 8시간과 정확히 일치한다", () => {
    expect(DAILY_LOWER_CAP_2026).toBe(Math.round(MINIMUM_WAGE_2026 * 0.8 * 8));
  });
});

describe("calculateUnemploymentBenefit", () => {
  it("평균임금이 낮으면 1일 하한액이 적용된다", () => {
    const result = calculateUnemploymentBenefit({
      endDate: "2026-08-12",
      last3MonthsWage: 9_000_000,
      age: 35,
      insuredYears: 3,
    });

    expect(result.periodDays).toBe(92);
    expect(result.capApplied).toBe("lower");
    expect(result.dailyBenefit).toBe(DAILY_LOWER_CAP_2026);
    expect(result.benefitDays).toBe(180);
    expect(result.totalBenefit).toBe(DAILY_LOWER_CAP_2026 * 180);
  });

  it("평균임금이 높으면 1일 상한액이 적용된다", () => {
    const result = calculateUnemploymentBenefit({
      endDate: "2026-08-12",
      last3MonthsWage: 100_000_000,
      age: 35,
      insuredYears: 3,
    });

    expect(result.capApplied).toBe("upper");
    expect(result.dailyBenefit).toBe(DAILY_UPPER_CAP_2026);
    expect(result.totalBenefit).toBe(DAILY_UPPER_CAP_2026 * 180);
  });

  it.each([
    [49, 0.5, 120],
    [49, 2, 150],
    [49, 4, 180],
    [49, 9, 210],
    [49, 10, 240],
    [50, 0.5, 120],
    [50, 2, 180],
    [50, 4, 210],
    [50, 9, 240],
    [50, 10, 270],
  ])("나이 %i세, 가입기간 %i년 -> 소정급여일수 %i일", (age, insuredYears, expectedDays) => {
    const result = calculateUnemploymentBenefit({
      endDate: "2026-08-12",
      last3MonthsWage: 9_000_000,
      age,
      insuredYears,
    });
    expect(result.benefitDays).toBe(expectedDays);
  });
});
