import { describe, expect, it } from "vitest";
import { calculateWeeklyHolidayPay } from "./weeklyHolidayPay";

describe("calculateWeeklyHolidayPay", () => {
  it("주 소정근로시간이 15시간 미만이면 지급 대상이 아니다", () => {
    const result = calculateWeeklyHolidayPay(10_000, 10);
    expect(result.eligible).toBe(false);
    expect(result.weeklyHolidayPay).toBe(0);
  });

  it("주 40시간 근무 시 시급 x 8시간을 지급한다", () => {
    const result = calculateWeeklyHolidayPay(10_000, 40);
    expect(result.eligible).toBe(true);
    expect(result.weeklyHolidayPay).toBe(80_000);
    expect(result.monthlyEquivalent).toBeCloseTo(80_000 * 4.345);
  });

  it("주 40시간을 초과해도 주휴수당은 8시간분으로 상한이 걸린다", () => {
    const at40 = calculateWeeklyHolidayPay(10_000, 40);
    const at50 = calculateWeeklyHolidayPay(10_000, 50);
    expect(at50.weeklyHolidayPay).toBe(at40.weeklyHolidayPay);
  });
});
