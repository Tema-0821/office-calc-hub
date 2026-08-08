export interface CalculatorLinkToggles {
  fourInsurance: boolean;
  severancePay: boolean;
  weeklyHolidayPay: boolean;
  annualLeavePay: boolean;
}

export function createDefaultCalculatorLinkToggles(): CalculatorLinkToggles {
  return {
    fourInsurance: false,
    severancePay: false,
    weeklyHolidayPay: false,
    annualLeavePay: false,
  };
}

export interface FourInsuranceLinkData {
  monthlyDeduction: number;
}

export interface SeverancePayLinkData {
  amount: number;
  year: number;
  month: number;
}

export interface WeeklyHolidayPayLinkData {
  monthlyIncome: number;
}

export interface AnnualLeavePayLinkData {
  amount: number;
}

export interface CalculatorLinksData {
  fourInsurance: FourInsuranceLinkData | null;
  severancePay: SeverancePayLinkData | null;
  weeklyHolidayPay: WeeklyHolidayPayLinkData | null;
  annualLeavePay: AnnualLeavePayLinkData | null;
}
