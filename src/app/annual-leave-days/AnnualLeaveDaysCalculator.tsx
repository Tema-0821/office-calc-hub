"use client";

import { useMemo } from "react";
import { DateField } from "@/components/calculators/DateField";
import { ResultRow } from "@/components/calculators/ResultRow";
import { calculateAnnualLeaveDays } from "@/lib/calculators/annualLeaveDays";
import { CALCULATOR_INPUT_KEYS } from "@/lib/calculators/storageKeys";
import { formatNumber } from "@/lib/format";
import { usePersistedState } from "@/lib/storage/usePersistedState";

interface AnnualLeaveDaysInput {
  startDate: string;
  referenceDate: string;
}

function getDefaultInput(): AnnualLeaveDaysInput {
  return {
    startDate: "2024-01-01",
    referenceDate: new Date().toISOString().slice(0, 10),
  };
}

export function AnnualLeaveDaysCalculator() {
  const [input, setInput] = usePersistedState<AnnualLeaveDaysInput>(
    CALCULATOR_INPUT_KEYS.annualLeaveDays,
    getDefaultInput()
  );

  const result = useMemo(
    () => calculateAnnualLeaveDays(input.startDate, input.referenceDate),
    [input.startDate, input.referenceDate]
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DateField
          label="입사일"
          value={input.startDate}
          onChange={(v) => setInput((prev) => ({ ...prev, startDate: v }))}
        />
        <DateField
          label="기준일 (기본값: 오늘)"
          value={input.referenceDate}
          onChange={(v) => setInput((prev) => ({ ...prev, referenceDate: v }))}
        />
      </div>

      <div className="flex flex-col gap-2 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
        <ResultRow
          label="근속기간"
          value={
            result.tenureYears < 1
              ? `${formatNumber(result.tenureMonths)}개월`
              : `${formatNumber(result.tenureYears)}년`
          }
        />
        <ResultRow label="발생 연차일수" value={`${formatNumber(result.leaveDays)}일`} emphasis />
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ 매월 개근했다고 가정한 값입니다. 결근이 있었다면 실제 발생일수가 다를 수 있습니다.
        1년 미만 근속 시 발생한 연차는 입사 후 1년이 되는 날 전날까지 사용할 수 있습니다.
      </p>
    </div>
  );
}
