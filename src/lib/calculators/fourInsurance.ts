// 2026년 기준 4대보험료율. 매년 국민연금공단/국민건강보험공단/고용노동부 고시로 변경되므로
// 연초에 반드시 최신 요율로 갱신할 것.
export const FOUR_INSURANCE_RATES_2026 = {
  year: 2026,
  nationalPensionTotal: 0.095, // 국민연금 전체 요율 (근로자+사업주)
  healthInsuranceTotal: 0.0719, // 건강보험 전체 요율
  longTermCareTotal: 0.009448, // 장기요양보험 전체 요율 (보수월액 기준 환산율)
  employmentInsuranceTotal: 0.009, // 고용보험(실업급여) 전체 요율
  nationalPensionIncomeFloor: 400_000, // 국민연금 기준소득월액 하한액
  nationalPensionIncomeCap: 6_370_000, // 국민연금 기준소득월액 상한액
} as const;

export interface FourInsuranceResult {
  nationalPension: number;
  healthInsurance: number;
  longTermCare: number;
  employmentInsurance: number;
  total: number;
  netSalary: number;
  pensionBase: number;
  pensionCapped: boolean;
}

export function calculateFourInsurance(monthlySalary: number): FourInsuranceResult {
  const rates = FOUR_INSURANCE_RATES_2026;

  const pensionBase = Math.min(
    Math.max(monthlySalary, rates.nationalPensionIncomeFloor),
    rates.nationalPensionIncomeCap
  );
  const pensionCapped = monthlySalary !== pensionBase;

  const nationalPension = (pensionBase * rates.nationalPensionTotal) / 2;
  const healthInsurance = (monthlySalary * rates.healthInsuranceTotal) / 2;
  const longTermCare = (monthlySalary * rates.longTermCareTotal) / 2;
  const employmentInsurance = (monthlySalary * rates.employmentInsuranceTotal) / 2;
  const total = nationalPension + healthInsurance + longTermCare + employmentInsurance;

  return {
    nationalPension,
    healthInsurance,
    longTermCare,
    employmentInsurance,
    total,
    netSalary: monthlySalary - total,
    pensionBase,
    pensionCapped,
  };
}
