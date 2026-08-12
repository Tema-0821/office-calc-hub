"use client";

import { useMemo } from "react";
import { NumberField } from "@/components/calculators/NumberField";
import { ResultRow } from "@/components/calculators/ResultRow";
import { calculateMinimumWageCheck } from "@/lib/calculators/minimumWage";
import { MINIMUM_WAGE_2026 } from "@/lib/calculators/weeklyHolidayPay";
import { CALCULATOR_INPUT_KEYS } from "@/lib/calculators/storageKeys";
import { formatWonKorean } from "@/lib/format";
import { usePersistedState } from "@/lib/storage/usePersistedState";

export function MinimumWageCalculator() {
  const [hourlyWage, setHourlyWage] = usePersistedState<number>(
    CALCULATOR_INPUT_KEYS.minimumWage,
    MINIMUM_WAGE_2026
  );

  const result = useMemo(() => calculateMinimumWageCheck(hourlyWage), [hourlyWage]);

  return (
    <div className="flex flex-col gap-6">
      <NumberField
        label="내 시급"
        value={hourlyWage}
        onChange={setHourlyWage}
        suffix="원"
        helpText={`2026년 최저시급은 ${formatWonKorean(MINIMUM_WAGE_2026)}입니다.`}
      />

      <div
        className={`rounded-xl p-4 text-sm font-medium ${
          result.isCompliant
            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
            : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
        }`}
      >
        {result.isCompliant
          ? "✅ 최저임금 이상입니다."
          : `⚠️ 최저임금 위반입니다. 시급이 최소 ${formatWonKorean(result.shortfallPerHour)} 더 높아야 합니다.`}
      </div>

      <div className="flex flex-col gap-2 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
        <ResultRow label="최저 일급 (8시간)" value={formatWonKorean(result.minimumDailyWage)} />
        <ResultRow label="최저 주급 (주휴 포함 48시간)" value={formatWonKorean(result.minimumWeeklyWage)} />
        <ResultRow label="최저 월급 (209시간)" value={formatWonKorean(result.minimumMonthlyWage)} emphasis />
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ 근로계약 기간이 1년 이상이고 수습 시작 후 3개월 이내인 경우에는 최저임금의 90%까지
        감액 지급할 수 있습니다. 단, 고용노동부 고시 단순노무 종사자는 수습 중에도 최저임금
        100%를 지급해야 합니다.
      </p>
    </div>
  );
}
