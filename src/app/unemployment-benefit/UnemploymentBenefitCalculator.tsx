"use client";

import { useMemo } from "react";
import { DateField } from "@/components/calculators/DateField";
import { NumberField } from "@/components/calculators/NumberField";
import { ResultRow } from "@/components/calculators/ResultRow";
import {
  calculateUnemploymentBenefit,
  DAILY_LOWER_CAP_2026,
  DAILY_UPPER_CAP_2026,
} from "@/lib/calculators/unemploymentBenefit";
import { CALCULATOR_INPUT_KEYS } from "@/lib/calculators/storageKeys";
import { formatWon, formatWonKorean } from "@/lib/format";
import { usePersistedState } from "@/lib/storage/usePersistedState";

interface UnemploymentBenefitInputState {
  endDate: string;
  last3MonthsWage: number;
  age: number;
  insuredYears: number;
}

function getDefaultInput(): UnemploymentBenefitInputState {
  return {
    endDate: new Date().toISOString().slice(0, 10),
    last3MonthsWage: 9_000_000,
    age: 35,
    insuredYears: 3,
  };
}

export function UnemploymentBenefitCalculator() {
  const [input, setInput] = usePersistedState<UnemploymentBenefitInputState>(
    CALCULATOR_INPUT_KEYS.unemploymentBenefit,
    getDefaultInput()
  );

  const result = useMemo(() => calculateUnemploymentBenefit(input), [input]);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DateField
          label="퇴사일(이직일)"
          value={input.endDate}
          onChange={(v) => setInput((prev) => ({ ...prev, endDate: v }))}
        />
        <NumberField
          label="퇴사 전 3개월 총 임금"
          value={input.last3MonthsWage}
          onChange={(v) => setInput((prev) => ({ ...prev, last3MonthsWage: v }))}
          suffix="원"
        />
        <NumberField
          label="이직 당시 만 나이"
          value={input.age}
          onChange={(v) => setInput((prev) => ({ ...prev, age: v }))}
          suffix="세"
        />
        <NumberField
          label="고용보험 가입기간"
          value={input.insuredYears}
          onChange={(v) => setInput((prev) => ({ ...prev, insuredYears: v }))}
          suffix="년"
        />
      </div>

      <div className="flex flex-col gap-2 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
        <ResultRow label="1일 평균임금" value={formatWonKorean(result.dailyAverageWage)} />
        <ResultRow
          label="1일 구직급여 (평균임금의 60%)"
          value={`${formatWon(result.dailyBenefit)}${result.capApplied === "upper" ? " (상한 적용)" : result.capApplied === "lower" ? " (하한 적용)" : ""}`}
        />
        <ResultRow label="소정급여일수" value={`${result.benefitDays}일`} />
        <ResultRow label="예상 총 수령액" value={formatWonKorean(result.totalBenefit)} emphasis />
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ 2026년 기준 1일 상한액 {formatWon(DAILY_UPPER_CAP_2026)}, 하한액{" "}
        {formatWon(DAILY_LOWER_CAP_2026)}을 적용했습니다. 실제 지급액은 이직 사유(자발적 퇴사는
        수급 자격 제한), 근로 형태 등에 따라 달라질 수 있으니 정확한 금액은 고용24 또는 거주지
        고용센터에서 확인하세요.
      </p>
    </div>
  );
}
