"use client";

import { useEffect, useState } from "react";
import { calculateAnnualLeavePay } from "@/lib/calculators/annualLeavePay";
import { calculateDismissalNoticePay } from "@/lib/calculators/dismissalNoticePay";
import { calculateFourInsurance } from "@/lib/calculators/fourInsurance";
import { calculateOvertimePay, type OvertimePayInput } from "@/lib/calculators/overtimePay";
import { calculateSeverancePay, type SeverancePayInput } from "@/lib/calculators/severancePay";
import { calculateSuspensionPay } from "@/lib/calculators/suspensionPay";
import { CALCULATOR_INPUT_KEYS } from "@/lib/calculators/storageKeys";
import {
  calculateUnemploymentBenefit,
  type UnemploymentBenefitInput,
} from "@/lib/calculators/unemploymentBenefit";
import { calculateWeeklyHolidayPay } from "@/lib/calculators/weeklyHolidayPay";
import type { CalculatorLinksData } from "./types";

interface SuspensionPayStoredInput {
  averageDailyWage: number;
  ordinaryDailyWage: number;
  suspensionDays: number;
}

const EMPTY_LINKS: CalculatorLinksData = {
  fourInsurance: null,
  severancePay: null,
  weeklyHolidayPay: null,
  annualLeavePay: null,
  unemploymentBenefit: null,
  overtimePay: null,
  suspensionPay: null,
  dismissalNoticePay: null,
};

function readJSON<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw !== null ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

// 8개 계산기가 각자 저장해 둔 입력값을 읽어서, 같은 계산 함수로 다시 계산한 결과를 돌려준다.
// 결과를 따로 저장하지 않고 입력값만 저장해두는 이유는, 요율이 바뀌거나 계산 로직이
// 수정되어도 항상 최신 공식으로 다시 계산되도록 하기 위해서다.
export function useCalculatorLinks() {
  const [data, setData] = useState<CalculatorLinksData>(EMPTY_LINKS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const fourInsuranceSalary = readJSON<number>(CALCULATOR_INPUT_KEYS.fourInsurance);
    const severanceInput = readJSON<SeverancePayInput>(CALCULATOR_INPUT_KEYS.severancePay);
    const weeklyInput = readJSON<{ hourlyWage: number; weeklyContractHours: number }>(
      CALCULATOR_INPUT_KEYS.weeklyHolidayPay
    );
    const annualInput = readJSON<{ monthlySalary: number; unusedLeaveDays: number }>(
      CALCULATOR_INPUT_KEYS.annualLeavePay
    );
    const unemploymentInput = readJSON<UnemploymentBenefitInput>(
      CALCULATOR_INPUT_KEYS.unemploymentBenefit
    );
    const overtimeInput = readJSON<OvertimePayInput>(CALCULATOR_INPUT_KEYS.overtimePay);
    const suspensionInput = readJSON<SuspensionPayStoredInput>(CALCULATOR_INPUT_KEYS.suspensionPay);
    const dismissalSalary = readJSON<number>(CALCULATOR_INPUT_KEYS.dismissalNoticePay);

    const next: CalculatorLinksData = {
      fourInsurance:
        fourInsuranceSalary != null
          ? { monthlyDeduction: calculateFourInsurance(fourInsuranceSalary).total }
          : null,
      severancePay: (() => {
        if (severanceInput == null) return null;
        const result = calculateSeverancePay(severanceInput);
        const [year, month] = severanceInput.endDate.split("-").map(Number);
        return { amount: result.severancePay, year, month };
      })(),
      weeklyHolidayPay:
        weeklyInput != null
          ? {
              monthlyIncome: calculateWeeklyHolidayPay(
                weeklyInput.hourlyWage,
                weeklyInput.weeklyContractHours
              ).monthlyEquivalent,
            }
          : null,
      annualLeavePay:
        annualInput != null
          ? {
              amount: calculateAnnualLeavePay(annualInput.monthlySalary, annualInput.unusedLeaveDays)
                .annualLeavePay,
            }
          : null,
      unemploymentBenefit: (() => {
        if (unemploymentInput == null) return null;
        const result = calculateUnemploymentBenefit(unemploymentInput);
        const [year, month] = unemploymentInput.endDate.split("-").map(Number);
        return { amount: result.totalBenefit, year, month };
      })(),
      overtimePay:
        overtimeInput != null
          ? { monthlyIncome: calculateOvertimePay(overtimeInput).total }
          : null,
      suspensionPay: (() => {
        if (suspensionInput == null) return null;
        const result = calculateSuspensionPay(
          suspensionInput.averageDailyWage,
          suspensionInput.ordinaryDailyWage,
          suspensionInput.suspensionDays
        );
        return { amount: result.totalAllowance };
      })(),
      dismissalNoticePay:
        dismissalSalary != null
          ? { amount: calculateDismissalNoticePay(dismissalSalary).dismissalNoticePay }
          : null,
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData(next);
    setHydrated(true);
  }, []);

  return { data, hydrated };
}
