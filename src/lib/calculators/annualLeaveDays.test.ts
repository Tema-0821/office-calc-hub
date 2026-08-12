import { describe, expect, it } from "vitest";
import { calculateAnnualLeaveDays } from "./annualLeaveDays";

describe("calculateAnnualLeaveDays", () => {
  it("1년 미만 근속은 개근 개월수만큼 발생한다(최대 11일)", () => {
    const result = calculateAnnualLeaveDays("2024-01-01", "2024-06-01");
    expect(result.tenureMonths).toBe(5);
    expect(result.tenureYears).toBe(0);
    expect(result.leaveDays).toBe(5);
  });

  it("1년 미만이어도 11일을 넘지 않는다", () => {
    const result = calculateAnnualLeaveDays("2024-01-01", "2024-12-31");
    expect(result.leaveDays).toBeLessThanOrEqual(11);
  });

  it("1년 근속 시 15일이 발생한다", () => {
    const result = calculateAnnualLeaveDays("2023-01-01", "2024-01-01");
    expect(result.tenureYears).toBe(1);
    expect(result.leaveDays).toBe(15);
  });

  it("4년차는 15+1일(2년마다 1일 가산)이 발생한다", () => {
    const result = calculateAnnualLeaveDays("2020-01-01", "2024-01-01");
    expect(result.tenureYears).toBe(4);
    expect(result.leaveDays).toBe(16);
  });

  it("최대 25일을 넘지 않는다(장기근속자)", () => {
    const result = calculateAnnualLeaveDays("2000-01-01", "2026-01-01");
    expect(result.tenureYears).toBe(26);
    expect(result.leaveDays).toBe(25);
  });
});
