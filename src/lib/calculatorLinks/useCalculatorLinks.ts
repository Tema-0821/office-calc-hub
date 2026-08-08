"use client";

import { useEffect, useState } from "react";
import { calculateAnnualLeavePay } from "@/lib/calculators/annualLeavePay";
import { calculateFourInsurance } from "@/lib/calculators/fourInsurance";
import { calculateSeverancePay, type SeverancePayInput } from "@/lib/calculators/severancePay";
import { calculateWeeklyHolidayPay } from "@/lib/calculators/weeklyHolidayPay";
import { CALCULATOR_INPUT_KEYS } from "@/lib/calculators/storageKeys";
import type { CalculatorLinksData } from "./types";

const EMPTY_LINKS: CalculatorLinksData = {
  fourInsurance: null,
  severancePay: null,
  weeklyHolidayPay: null,
  annualLeavePay: null,
};

function readJSON<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw !== null ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

// 4개 계산기가 각자 저장해 둔 입력값을 읽어서, 같은 계산 함수로 다시 계산한 결과를 돌려준다.
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
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData(next);
    setHydrated(true);
  }, []);

  return { data, hydrated };
}
