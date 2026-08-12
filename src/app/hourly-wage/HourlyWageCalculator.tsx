"use client";

import { useMemo } from "react";
import { NumberField } from "@/components/calculators/NumberField";
import { ResultRow } from "@/components/calculators/ResultRow";
import { calculateHourlyWage, type HourlyWageMode } from "@/lib/calculators/hourlyWage";
import { STANDARD_MONTHLY_HOURS } from "@/lib/calculators/annualLeavePay";
import { CALCULATOR_INPUT_KEYS } from "@/lib/calculators/storageKeys";
import { formatWonKorean } from "@/lib/format";
import { usePersistedState } from "@/lib/storage/usePersistedState";

interface HourlyWageInput {
  amount: number;
  mode: HourlyWageMode;
}

const DEFAULT_INPUT: HourlyWageInput = {
  amount: 3_000_000,
  mode: "monthly",
};

const MODE_LABELS: Record<HourlyWageMode, string> = {
  monthly: "월급 입력",
  hourly: "시급 입력",
};

export function HourlyWageCalculator() {
  const [input, setInput] = usePersistedState<HourlyWageInput>(
    CALCULATOR_INPUT_KEYS.hourlyWage,
    DEFAULT_INPUT
  );
  const { amount, mode } = input;

  const result = useMemo(() => calculateHourlyWage(amount, mode), [amount, mode]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        {(Object.keys(MODE_LABELS) as HourlyWageMode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setInput((prev) => ({ ...prev, mode: m }))}
            className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
              mode === m
                ? "border-lime-500 bg-lime-500 text-white dark:border-lime-400 dark:bg-lime-500"
                : "border-zinc-300 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
            }`}
          >
            {MODE_LABELS[m]}
          </button>
        ))}
      </div>

      <NumberField
        label={mode === "monthly" ? "월급 (세전)" : "시급"}
        value={amount}
        onChange={(v) => setInput((prev) => ({ ...prev, amount: v }))}
        suffix="원"
      />

      <div className="flex flex-col gap-2 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
        <ResultRow label="시급" value={formatWonKorean(result.hourlyWage)} emphasis={mode === "monthly"} />
        <ResultRow label="일급 (8시간 기준)" value={formatWonKorean(result.dailyWage)} />
        <ResultRow label="월급 (209시간 기준)" value={formatWonKorean(result.monthlyWage)} emphasis={mode === "hourly"} />
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ 월 소정근로시간 {STANDARD_MONTHLY_HOURS}시간(주 40시간 + 유급 주휴시간 기준)으로
        환산합니다. 세금·4대보험료는 포함하지 않은 세전 금액입니다.
      </p>
    </div>
  );
}
