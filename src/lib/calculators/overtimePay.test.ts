import { describe, expect, it } from "vitest";
import { calculateOvertimePay } from "./overtimePay";

describe("calculateOvertimePay", () => {
  it("연장·야간·휴일근로수당을 각각의 가산율로 계산한다", () => {
    const result = calculateOvertimePay({
      hourlyWage: 10_000,
      overtimeHours: 2,
      nightHours: 2,
      holidayHoursWithinEight: 2,
      holidayHoursOverEight: 1,
    });

    expect(result.overtimePay).toBe(30_000); // 10000 * 1.5 * 2
    expect(result.nightPay).toBe(10_000); // 10000 * 0.5 * 2
    expect(result.holidayPayWithinEight).toBe(30_000); // 10000 * 1.5 * 2
    expect(result.holidayPayOverEight).toBe(20_000); // 10000 * 2 * 1
    expect(result.total).toBe(90_000);
  });

  it("모든 시간이 0이면 수당도 0이다", () => {
    const result = calculateOvertimePay({
      hourlyWage: 10_000,
      overtimeHours: 0,
      nightHours: 0,
      holidayHoursWithinEight: 0,
      holidayHoursOverEight: 0,
    });
    expect(result.total).toBe(0);
  });
});
