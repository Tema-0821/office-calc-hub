"use client";

import { useMemo } from "react";
import { NumberField } from "@/components/calculators/NumberField";
import { ResultRow } from "@/components/calculators/ResultRow";
import { calculateSuspensionPay } from "@/lib/calculators/suspensionPay";
import { CALCULATOR_INPUT_KEYS } from "@/lib/calculators/storageKeys";
import { formatWonKorean } from "@/lib/format";
import { usePersistedState } from "@/lib/storage/usePersistedState";

interface SuspensionPayInput {
  averageDailyWage: number;
  ordinaryDailyWage: number;
  suspensionDays: number;
}

const DEFAULT_INPUT: SuspensionPayInput = {
  averageDailyWage: 100_000,
  ordinaryDailyWage: 100_000,
  suspensionDays: 10,
};

export function SuspensionPayCalculator() {
  const [input, setInput] = usePersistedState<SuspensionPayInput>(
    CALCULATOR_INPUT_KEYS.suspensionPay,
    DEFAULT_INPUT
  );

  const result = useMemo(
    () => calculateSuspensionPay(input.averageDailyWage, input.ordinaryDailyWage, input.suspensionDays),
    [input.averageDailyWage, input.ordinaryDailyWage, input.suspensionDays]
  );

  return (
    <div className="flex flex-col gap-6">
      <NumberField
        label="1일 평균임금"
        value={input.averageDailyWage}
        onChange={(v) => setInput((prev) => ({ ...prev, averageDailyWage: v }))}
        suffix="원"
        helpText="퇴직 전 3개월 임금 총액 ÷ 그 기간 총 일수"
      />
      <NumberField
        label="1일 통상임금"
        value={input.ordinaryDailyWage}
        onChange={(v) => setInput((prev) => ({ ...prev, ordinaryDailyWage: v }))}
        suffix="원"
      />
      <NumberField
        label="휴업일수"
        value={input.suspensionDays}
        onChange={(v) => setInput((prev) => ({ ...prev, suspensionDays: v }))}
        suffix="일"
      />

      <div className="flex flex-col gap-2 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
        <ResultRow
          label="1일 휴업수당"
          value={`${formatWonKorean(result.dailyAllowance)}${result.capApplied ? " (통상임금 적용)" : " (평균임금 70%)"}`}
        />
        <ResultRow label="총 휴업수당" value={formatWonKorean(result.totalAllowance)} emphasis />
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ 사용자 귀책사유로 휴업하는 경우, 평균임금의 70%와 통상임금 중 더 낮은 금액을 휴업수당
        기준으로 사용합니다.
      </p>
    </div>
  );
}
