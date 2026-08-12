import { describe, expect, it } from "vitest";
import { calculateVat } from "./vat";

describe("calculateVat", () => {
  it("부가세 별도(공급가액) 모드에서 10%를 더해 합계금액을 계산한다", () => {
    const result = calculateVat(1_000_000, "exclusive");
    expect(result.supplyAmount).toBe(1_000_000);
    expect(result.vatAmount).toBe(100_000);
    expect(result.totalAmount).toBe(1_100_000);
  });

  it("부가세 포함(합계금액) 모드에서 공급가액과 부가세를 역산한다", () => {
    const result = calculateVat(1_100_000, "inclusive");
    expect(result.supplyAmount).toBe(1_000_000);
    expect(result.vatAmount).toBe(100_000);
    expect(result.totalAmount).toBe(1_100_000);
  });

  it("나눠떨어지지 않아도 부동소수점 오차 없이 원단위로 딱 맞는다", () => {
    const result = calculateVat(1_000, "inclusive");
    expect(result.supplyAmount + result.vatAmount).toBe(result.totalAmount);
    expect(Number.isInteger(result.supplyAmount)).toBe(true);
    expect(Number.isInteger(result.vatAmount)).toBe(true);
  });
});
