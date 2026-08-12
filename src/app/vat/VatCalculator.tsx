"use client";

import { useMemo } from "react";
import { NumberField } from "@/components/calculators/NumberField";
import { ResultRow } from "@/components/calculators/ResultRow";
import { calculateVat, type VatInputMode } from "@/lib/calculators/vat";
import { CALCULATOR_INPUT_KEYS } from "@/lib/calculators/storageKeys";
import { formatWonKorean } from "@/lib/format";
import { usePersistedState } from "@/lib/storage/usePersistedState";

interface VatInput {
  amount: number;
  mode: VatInputMode;
}

const DEFAULT_INPUT: VatInput = {
  amount: 1_100_000,
  mode: "exclusive",
};

const MODE_LABELS: Record<VatInputMode, string> = {
  exclusive: "부가세 별도 (공급가액)",
  inclusive: "부가세 포함 (합계금액)",
};

export function VatCalculator() {
  const [input, setInput] = usePersistedState<VatInput>(CALCULATOR_INPUT_KEYS.vat, DEFAULT_INPUT);
  const { amount, mode } = input;

  const result = useMemo(() => calculateVat(amount, mode), [amount, mode]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        {(Object.keys(MODE_LABELS) as VatInputMode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setInput((prev) => ({ ...prev, mode: m }))}
            className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
              mode === m
                ? "border-cyan-500 bg-cyan-500 text-white dark:border-cyan-400 dark:bg-cyan-500"
                : "border-zinc-300 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
            }`}
          >
            {MODE_LABELS[m]}
          </button>
        ))}
      </div>

      <NumberField
        label={mode === "exclusive" ? "공급가액" : "합계금액 (부가세 포함)"}
        value={amount}
        onChange={(v) => setInput((prev) => ({ ...prev, amount: v }))}
        suffix="원"
      />

      <div className="flex flex-col gap-2 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
        <ResultRow label="공급가액" value={formatWonKorean(result.supplyAmount)} />
        <ResultRow label="부가세 (10%)" value={formatWonKorean(result.vatAmount)} />
        <ResultRow label="합계금액" value={formatWonKorean(result.totalAmount)} emphasis />
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ 일반과세자 기준 부가가치세율 10%로 계산합니다. 간이과세자는 업종별 부가가치율이 달라 이
        계산기와 금액이 다를 수 있습니다.
      </p>
    </div>
  );
}
