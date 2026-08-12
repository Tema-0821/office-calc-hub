import type { CalculatorAdjustments } from "@/lib/ledger/calculations";
import type { CalculatorLinkToggles, CalculatorLinksData } from "./types";

// 체크박스(toggles)와 계산기에서 읽어온 값(linkData)을 조합해서, 잔고 시뮬레이터
// 계산 로직이 바로 쓸 수 있는 형태로 변환한다.
export function buildAdjustments(
  toggles: CalculatorLinkToggles,
  linkData: CalculatorLinksData
): CalculatorAdjustments {
  let recurringFixedExtra = 0;
  let recurringIncomeExtra = 0;
  const oneTimeIncomes: CalculatorAdjustments["oneTimeIncomes"] = [];

  if (toggles.fourInsurance && linkData.fourInsurance) {
    recurringFixedExtra += linkData.fourInsurance.monthlyDeduction;
  }

  if (toggles.weeklyHolidayPay && linkData.weeklyHolidayPay) {
    recurringIncomeExtra += linkData.weeklyHolidayPay.monthlyIncome;
  }

  if (toggles.severancePay && linkData.severancePay) {
    oneTimeIncomes.push({
      year: linkData.severancePay.year,
      month: linkData.severancePay.month,
      amount: linkData.severancePay.amount,
    });
  }

  if (toggles.annualLeavePay && linkData.annualLeavePay) {
    const today = new Date();
    oneTimeIncomes.push({
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      amount: linkData.annualLeavePay.amount,
    });
  }

  if (toggles.unemploymentBenefit && linkData.unemploymentBenefit) {
    oneTimeIncomes.push({
      year: linkData.unemploymentBenefit.year,
      month: linkData.unemploymentBenefit.month,
      amount: linkData.unemploymentBenefit.amount,
    });
  }

  if (toggles.overtimePay && linkData.overtimePay) {
    recurringIncomeExtra += linkData.overtimePay.monthlyIncome;
  }

  if (toggles.suspensionPay && linkData.suspensionPay) {
    const today = new Date();
    oneTimeIncomes.push({
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      amount: linkData.suspensionPay.amount,
    });
  }

  if (toggles.dismissalNoticePay && linkData.dismissalNoticePay) {
    const today = new Date();
    oneTimeIncomes.push({
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      amount: linkData.dismissalNoticePay.amount,
    });
  }

  return { recurringFixedExtra, recurringIncomeExtra, oneTimeIncomes };
}
