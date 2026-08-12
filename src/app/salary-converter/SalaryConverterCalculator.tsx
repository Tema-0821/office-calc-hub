"use client";

import { useMemo } from "react";
import { NumberField } from "@/components/calculators/NumberField";
import { ResultRow } from "@/components/calculators/ResultRow";
import { convertSalary, type SalaryConverterMode } from "@/lib/calculators/salaryConverter";
import { CALCULATOR_INPUT_KEYS } from "@/lib/calculators/storageKeys";
import { formatWonKorean } from "@/lib/format";
import { usePersistedState } from "@/lib/storage/usePersistedState";

interface SalaryConverterInput {
  amount: number;
  mode: SalaryConverterMode;
}

const DEFAULT_INPUT: SalaryConverterInput = {
  amount: 36_000_000,
  mode: "annual",
};

const MODE_LABELS: Record<SalaryConverterMode, string> = {
  annual: "연봉 입력",
  monthly: "월급 입력",
};

export function SalaryConverterCalculator() {
  const [input, setInput] = usePersistedState<SalaryConverterInput>(
    CALCULATOR_INPUT_KEYS.salaryConverter,
    DEFAULT_INPUT
  );
  const { amount, mode } = input;

  const result = useMemo(() => convertSalary(amount, mode), [amount, mode]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        {(Object.keys(MODE_LABELS) as SalaryConverterMode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setInput((prev) => ({ ...prev, mode: m }))}
            className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
              mode === m
                ? "border-indigo-500 bg-indigo-500 text-white dark:border-indigo-400 dark:bg-indigo-500"
                : "border-zinc-300 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
            }`}
          >
            {MODE_LABELS[m]}
          </button>
        ))}
      </div>

      <NumberField
        label={mode === "annual" ? "연봉 (세전)" : "월급 (세전)"}
        value={amount}
        onChange={(v) => setInput((prev) => ({ ...prev, amount: v }))}
        suffix="원"
      />

      <div className="flex flex-col gap-2 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
        <ResultRow label="연봉" value={formatWonKorean(result.annualSalary)} />
        <ResultRow label="월급 (12개월 기준)" value={formatWonKorean(result.monthlySalary)} emphasis />
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ 세금·4대보험료 공제 전 금액을 12개월로 단순 환산한 값입니다. 실제 월급은 상여금 지급
        방식(월할 지급, 짝수월 지급 등)이나 회사 규정에 따라 다를 수 있습니다.
      </p>
    </div>
  );
}
