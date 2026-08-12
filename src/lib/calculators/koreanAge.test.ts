import { describe, expect, it } from "vitest";
import { calculateKoreanAge } from "./koreanAge";

describe("calculateKoreanAge", () => {
  it("생일이 지난 경우 만 나이와 연 나이가 같다", () => {
    const result = calculateKoreanAge("2000-01-01", "2026-08-12");
    expect(result.internationalAge).toBe(26);
    expect(result.yearAge).toBe(26);
    expect(result.hasHadBirthdayThisYear).toBe(true);
    expect(result.daysUntilNextBirthday).toBe(142);
  });

  it("생일이 아직 안 지난 경우 만 나이가 연 나이보다 1살 적다", () => {
    const result = calculateKoreanAge("1995-12-25", "2026-08-12");
    expect(result.internationalAge).toBe(30);
    expect(result.yearAge).toBe(31);
    expect(result.hasHadBirthdayThisYear).toBe(false);
    expect(result.daysUntilNextBirthday).toBe(135);
  });

  it("기준일이 생일 당일이면 오늘 생일로 처리한다", () => {
    const result = calculateKoreanAge("2000-08-12", "2026-08-12");
    expect(result.hasHadBirthdayThisYear).toBe(true);
    expect(result.daysUntilNextBirthday).toBe(0);
  });
});
