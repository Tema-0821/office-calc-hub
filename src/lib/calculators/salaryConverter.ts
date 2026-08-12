export type SalaryConverterMode = "annual" | "monthly";

export interface SalaryConverterResult {
  annualSalary: number;
  monthlySalary: number;
}

// 세금·4대보험 공제 없이 연봉과 세전 월급을 12개월 기준으로 단순 환산한다.
export function convertSalary(amount: number, mode: SalaryConverterMode): SalaryConverterResult {
  if (mode === "annual") {
    return { annualSalary: amount, monthlySalary: Math.round(amount / 12) };
  }
  return { annualSalary: amount * 12, monthlySalary: amount };
}
