"use client";

import { useMemo } from "react";
import { NumberField } from "@/components/calculators/NumberField";
import { ResultRow } from "@/components/calculators/ResultRow";
import { calculateDismissalNoticePay } from "@/lib/calculators/dismissalNoticePay";
import { CALCULATOR_INPUT_KEYS } from "@/lib/calculators/storageKeys";
import { formatWonKorean } from "@/lib/format";
import { usePersistedState } from "@/lib/storage/usePersistedState";

export function DismissalNoticePayCalculator() {
  const [monthlySalary, setMonthlySalary] = usePersistedState<number>(
    CALCULATOR_INPUT_KEYS.dismissalNoticePay,
    3_000_000
  );

  const result = useMemo(() => calculateDismissalNoticePay(monthlySalary), [monthlySalary]);

  return (
    <div className="flex flex-col gap-6">
      <NumberField
        label="월급 (통상임금 기준)"
        value={monthlySalary}
        onChange={setMonthlySalary}
        suffix="원"
      />

      <div className="flex flex-col gap-2 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
        <ResultRow label="1일 통상임금" value={formatWonKorean(result.dailyOrdinaryWage)} />
        <ResultRow label="해고예고수당 (30일분)" value={formatWonKorean(result.dismissalNoticePay)} emphasis />
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ 계속 근로한 기간이 3개월 미만인 근로자는 근로기준법상 해고예고 의무 예외 대상이라
        해고예고수당 지급 대상이 아닙니다.
      </p>
    </div>
  );
}
