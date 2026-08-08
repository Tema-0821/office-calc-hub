// 월 소정근로시간 209시간 = 주 40시간 근무 기준 (주휴시간 8시간 포함, 4.345주/월)
export const STANDARD_MONTHLY_HOURS = 209;

export interface AnnualLeavePayResult {
  hourlyWage: number;
  dailyWage: number;
  annualLeavePay: number;
}

// 연차수당 = 통상임금 기준 1일 임금 × 미사용 연차일수
export function calculateAnnualLeavePay(
  monthlySalary: number,
  unusedLeaveDays: number
): AnnualLeavePayResult {
  const hourlyWage = monthlySalary / STANDARD_MONTHLY_HOURS;
  const dailyWage = hourlyWage * 8;
  const annualLeavePay = dailyWage * unusedLeaveDays;

  return { hourlyWage, dailyWage, annualLeavePay };
}
