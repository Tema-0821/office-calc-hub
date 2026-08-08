"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/calculators/NumberField";
import { ResultRow } from "@/components/calculators/ResultRow";
import { calculateAnnualLeavePay } from "@/lib/calculators/annualLeavePay";
import { formatWon } from "@/lib/format";

export function AnnualLeavePayCalculator() {
  const [monthlySalary, setMonthlySalary] = useState(3_000_000);
  const [unusedLeaveDays, setUnusedLeaveDays] = useState(5);

  const result = useMemo(
    () => calculateAnnualLeavePay(monthlySalary, unusedLeaveDays),
    [monthlySalary, unusedLeaveDays]
  );

  return (
    <div className="flex flex-col gap-6">
      <NumberField
        label="월급 (통상임금 기준)"
        value={monthlySalary}
        onChange={setMonthlySalary}
        suffix="원"
      />
      <NumberField
        label="미사용 연차일수"
        value={unusedLeaveDays}
        onChange={setUnusedLeaveDays}
        suffix="일"
      />

      <div className="flex flex-col gap-2 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
        <ResultRow label="1일 통상임금" value={formatWon(result.dailyWage)} />
        <ResultRow label="예상 연차수당" value={formatWon(result.annualLeavePay)} emphasis />
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ 월 소정근로시간 209시간(주 40시간 근무 기준)을 적용한 값입니다. 회사마다 통상임금에 포함되는
        수당 범위가 다를 수 있어 실제 금액과 차이가 있을 수 있습니다.
      </p>
    </div>
  );
}
