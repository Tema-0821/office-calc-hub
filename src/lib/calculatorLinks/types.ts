export interface CalculatorLinkToggles {
  fourInsurance: boolean;
  severancePay: boolean;
  weeklyHolidayPay: boolean;
  annualLeavePay: boolean;
  unemploymentBenefit: boolean;
  overtimePay: boolean;
  suspensionPay: boolean;
  dismissalNoticePay: boolean;
}

export function createDefaultCalculatorLinkToggles(): CalculatorLinkToggles {
  return {
    fourInsurance: false,
    severancePay: false,
    weeklyHolidayPay: false,
    annualLeavePay: false,
    unemploymentBenefit: false,
    overtimePay: false,
    suspensionPay: false,
    dismissalNoticePay: false,
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

export interface UnemploymentBenefitLinkData {
  amount: number;
  year: number;
  month: number;
}

export interface OvertimePayLinkData {
  monthlyIncome: number;
}

export interface SuspensionPayLinkData {
  amount: number;
}

export interface DismissalNoticePayLinkData {
  amount: number;
}

export interface CalculatorLinksData {
  fourInsurance: FourInsuranceLinkData | null;
  severancePay: SeverancePayLinkData | null;
  weeklyHolidayPay: WeeklyHolidayPayLinkData | null;
  annualLeavePay: AnnualLeavePayLinkData | null;
  unemploymentBenefit: UnemploymentBenefitLinkData | null;
  overtimePay: OvertimePayLinkData | null;
  suspensionPay: SuspensionPayLinkData | null;
  dismissalNoticePay: DismissalNoticePayLinkData | null;
}
