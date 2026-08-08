"use client";

import { useMemo, useState } from "react";
import { DateField } from "@/components/calculators/DateField";
import { NumberField } from "@/components/calculators/NumberField";
import { ResultRow } from "@/components/calculators/ResultRow";
import { calculateSeverancePay } from "@/lib/calculators/severancePay";
import { formatWon } from "@/lib/format";

function isoDateNMonthsAgo(months: number): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() - Math.floor(months / 12));
  return d.toISOString().slice(0, 10);
}

export function SeverancePayCalculator() {
  const [startDate, setStartDate] = useState(isoDateNMonthsAgo(12));
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const [last3MonthsWage, setLast3MonthsWage] = useState(9_000_000);
  const [annualBonus, setAnnualBonus] = useState(0);
  const [unusedLeavePay, setUnusedLeavePay] = useState(0);

  const result = useMemo(
    () =>
      calculateSeverancePay({
        startDate,
        endDate,
        last3MonthsWage,
        annualBonus,
        unusedLeavePay,
      }),
    [startDate, endDate, last3MonthsWage, annualBonus, unusedLeavePay]
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DateField label="입사일" value={startDate} onChange={setStartDate} />
        <DateField label="퇴사일 (예정일 포함)" value={endDate} onChange={setEndDate} />
      </div>

      <NumberField
        label="퇴사 직전 3개월 급여 총액 (기본급+제수당)"
        value={last3MonthsWage}
        onChange={setLast3MonthsWage}
        suffix="원"
      />
      <NumberField
        label="최근 1년간 받은 상여금 총액 (없으면 0)"
        value={annualBonus}
        onChange={setAnnualBonus}
        suffix="원"
      />
      <NumberField
        label="최근 1년간 발생한 연차수당 총액 (없으면 0)"
        value={unusedLeavePay}
        onChange={setUnusedLeavePay}
        suffix="원"
      />

      <div className="flex flex-col gap-2 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
        <ResultRow label="재직일수" value={`${result.tenureDays.toLocaleString("ko-KR")}일`} />
        <ResultRow label="1일 평균임금" value={formatWon(result.dailyAverageWage)} />
        <ResultRow label="예상 퇴직금" value={formatWon(result.severancePay)} emphasis />
      </div>

      {!result.eligible && (
        <p className="text-xs text-amber-600 dark:text-amber-400">
          ※ 근로기준법상 퇴직금은 1년 이상 근무한 근로자에게만 지급됩니다. 현재 입력한 기간은 1년
          미만이라 지급 대상이 아닙니다.
        </p>
      )}

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ 실제 퇴직금은 회사 내부 규정, 상여금·연차수당 반영 방식에 따라 달라질 수 있습니다. 이 결과는
        근로기준법의 기본 평균임금 산정 방식을 참고용으로 단순화한 값입니다.
      </p>
    </div>
  );
}
