import { STANDARD_MONTHLY_HOURS } from "./annualLeavePay";

export interface DismissalNoticePayResult {
  dailyOrdinaryWage: number;
  dismissalNoticePay: number;
}

// 근로기준법 제26조 - 30일 전에 해고를 예고하지 않으면 30일분 이상의 통상임금을
// 해고예고수당으로 지급해야 한다.
export function calculateDismissalNoticePay(monthlySalary: number): DismissalNoticePayResult {
  const hourlyWage = monthlySalary / STANDARD_MONTHLY_HOURS;
  const dailyOrdinaryWage = hourlyWage * 8;

  return {
    dailyOrdinaryWage,
    dismissalNoticePay: dailyOrdinaryWage * 30,
  };
}
