"use client";

import { useMemo } from "react";
import { NumberField } from "@/components/calculators/NumberField";
import { ResultRow } from "@/components/calculators/ResultRow";
import { calculateFourInsurance, FOUR_INSURANCE_RATES_2026 } from "@/lib/calculators/fourInsurance";
import { CALCULATOR_INPUT_KEYS } from "@/lib/calculators/storageKeys";
import { formatWonKorean } from "@/lib/format";
import { usePersistedState } from "@/lib/storage/usePersistedState";

export function FourInsuranceCalculator() {
  const [monthlySalary, setMonthlySalary] = usePersistedState(
    CALCULATOR_INPUT_KEYS.fourInsurance,
    3_000_000
  );

  const result = useMemo(() => calculateFourInsurance(monthlySalary), [monthlySalary]);

  return (
    <div className="flex flex-col gap-6">
      <NumberField
        label="월급 (세전, 비과세 제외)"
        value={monthlySalary}
        onChange={setMonthlySalary}
        suffix="원"
        placeholder="3000000"
      />

      <div className="flex flex-col gap-2 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
        <ResultRow label="국민연금 (4.75%)" value={formatWonKorean(result.nationalPension)} />
        <ResultRow label="건강보험 (3.595%)" value={formatWonKorean(result.healthInsurance)} />
        <ResultRow label="장기요양보험" value={formatWonKorean(result.longTermCare)} />
        <ResultRow label="고용보험 (0.45%)" value={formatWonKorean(result.employmentInsurance)} />
        <ResultRow label="공제액 합계" value={formatWonKorean(result.total)} emphasis />
        <ResultRow label="예상 실수령액 (소득세 제외)" value={formatWonKorean(result.netSalary)} emphasis />
      </div>

      {result.pensionCapped && (
        <p className="text-xs text-amber-600 dark:text-amber-400">
          ※ 국민연금은 기준소득월액 상한액({formatWonKorean(FOUR_INSURANCE_RATES_2026.nationalPensionIncomeCap)}) 또는
          하한액({formatWonKorean(FOUR_INSURANCE_RATES_2026.nationalPensionIncomeFloor)}) 기준으로 계산되었습니다.
        </p>
      )}

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ 이 결과는 4대보험료만 반영한 금액이며, 소득세·지방소득세(근로소득 간이세액표 기준)는 포함되지
        않았습니다. 실제 실수령액은 부양가족 수 등에 따라 달라집니다.
      </p>
    </div>
  );
}
