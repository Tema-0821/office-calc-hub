"use client";

import { useMemo } from "react";
import { DateField } from "@/components/calculators/DateField";
import { ResultRow } from "@/components/calculators/ResultRow";
import { calculateKoreanAge } from "@/lib/calculators/koreanAge";
import { CALCULATOR_INPUT_KEYS } from "@/lib/calculators/storageKeys";
import { formatNumber } from "@/lib/format";
import { usePersistedState } from "@/lib/storage/usePersistedState";

interface KoreanAgeInput {
  birthDate: string;
  referenceDate: string;
}

function getDefaultInput(): KoreanAgeInput {
  return {
    birthDate: "2000-01-01",
    referenceDate: new Date().toISOString().slice(0, 10),
  };
}

export function KoreanAgeCalculator() {
  const [input, setInput] = usePersistedState<KoreanAgeInput>(
    CALCULATOR_INPUT_KEYS.koreanAge,
    getDefaultInput()
  );

  const result = useMemo(
    () => calculateKoreanAge(input.birthDate, input.referenceDate),
    [input.birthDate, input.referenceDate]
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DateField
          label="생년월일"
          value={input.birthDate}
          onChange={(v) => setInput((prev) => ({ ...prev, birthDate: v }))}
        />
        <DateField
          label="기준일 (기본값: 오늘)"
          value={input.referenceDate}
          onChange={(v) => setInput((prev) => ({ ...prev, referenceDate: v }))}
        />
      </div>

      <div className="flex flex-col gap-2 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
        <ResultRow label="만 나이" value={`${formatNumber(result.internationalAge)}세`} emphasis />
        <ResultRow label="연 나이" value={`${formatNumber(result.yearAge)}세`} />
        <ResultRow
          label="다음 생일까지"
          value={result.daysUntilNextBirthday === 0 ? "오늘!" : `${formatNumber(result.daysUntilNextBirthday)}일`}
        />
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ 2023년 6월부터 시행된 &ldquo;만 나이 통일법&rdquo;에 따라 대부분의 법적·행정적 상황에서는{" "}
        <strong>만 나이</strong>를 사용합니다. 연 나이는 병역법, 청소년 관련 법령 등 일부에서만
        예외적으로 쓰입니다.
      </p>
    </div>
  );
}
