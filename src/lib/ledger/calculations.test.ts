import { describe, expect, it } from "vitest";
import { getMonthSummary } from "./calculations";
import { createDefaultLedgerData, type LedgerData } from "./types";

function withInstallment(totalAmount: number, months: number, startDate: string): LedgerData {
  const data = createDefaultLedgerData();
  data.settings.monthlyIncome = 3_000_000;
  data.settings.installmentExpenses = [
    { id: "1", name: "테스트 할부", totalAmount, months, startDate },
  ];
  return data;
}

describe("getMonthSummary - 할부 지출", () => {
  it("시작월부터 개월수만큼 균등하게 반영된다", () => {
    const data = withInstallment(1_200_000, 6, "2026-08-12");

    const august = getMonthSummary(data, 2026, 8);
    expect(august.installmentTotal).toBe(200_000);
    expect(august.netChange).toBe(3_000_000 - 200_000);
  });

  it("마지막 회차까지는 반영되고, 그다음 달부터는 빠진다", () => {
    const data = withInstallment(1_200_000, 6, "2026-08-12");

    const lastMonth = getMonthSummary(data, 2027, 1); // 6번째 달(offset 5)
    const afterEnd = getMonthSummary(data, 2027, 2); // offset 6, 범위 밖

    expect(lastMonth.installmentTotal).toBe(200_000);
    expect(afterEnd.installmentTotal).toBe(0);
  });

  it("시작 이전 달에는 반영되지 않는다", () => {
    const data = withInstallment(1_200_000, 6, "2026-08-12");
    const before = getMonthSummary(data, 2026, 7);
    expect(before.installmentTotal).toBe(0);
  });

  it("나눠떨어지지 않는 총액은 마지막 회차가 나머지를 흡수해 합이 정확히 맞는다", () => {
    const data = withInstallment(100_000, 3, "2026-01-01");

    const month1 = getMonthSummary(data, 2026, 1).installmentTotal;
    const month2 = getMonthSummary(data, 2026, 2).installmentTotal;
    const month3 = getMonthSummary(data, 2026, 3).installmentTotal;

    expect(month1 + month2 + month3).toBe(100_000);
    expect(month1).toBe(month2);
  });
});
