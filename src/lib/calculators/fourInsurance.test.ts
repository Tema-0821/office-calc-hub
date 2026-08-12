import { describe, expect, it } from "vitest";
import { calculateFourInsurance, FOUR_INSURANCE_RATES_2026 } from "./fourInsurance";

describe("calculateFourInsurance", () => {
  it("요율표에 맞춰 각 항목과 합계를 계산한다", () => {
    const salary = 3_000_000;
    const result = calculateFourInsurance(salary);
    const rates = FOUR_INSURANCE_RATES_2026;

    expect(result.nationalPension).toBeCloseTo((salary * rates.nationalPensionTotal) / 2);
    expect(result.healthInsurance).toBeCloseTo((salary * rates.healthInsuranceTotal) / 2);
    expect(result.longTermCare).toBeCloseTo((salary * rates.longTermCareTotal) / 2);
    expect(result.employmentInsurance).toBeCloseTo((salary * rates.employmentInsuranceTotal) / 2);
    expect(result.total).toBeCloseTo(
      result.nationalPension + result.healthInsurance + result.longTermCare + result.employmentInsurance
    );
    expect(result.netSalary).toBeCloseTo(salary - result.total);
    expect(result.pensionCapped).toBe(false);
  });

  it("월급이 국민연금 기준소득월액 하한액보다 낮으면 하한액을 기준으로 계산한다", () => {
    const result = calculateFourInsurance(100_000);
    expect(result.pensionCapped).toBe(true);
    expect(result.pensionBase).toBe(FOUR_INSURANCE_RATES_2026.nationalPensionIncomeFloor);
  });

  it("월급이 국민연금 기준소득월액 상한액보다 높으면 상한액을 기준으로 계산한다", () => {
    const result = calculateFourInsurance(10_000_000);
    expect(result.pensionCapped).toBe(true);
    expect(result.pensionBase).toBe(FOUR_INSURANCE_RATES_2026.nationalPensionIncomeCap);
  });
});
