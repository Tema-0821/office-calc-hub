"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/calculators/NumberField";
import { ResultRow } from "@/components/calculators/ResultRow";
import { calculateWeeklyHolidayPay, MINIMUM_WAGE_2026 } from "@/lib/calculators/weeklyHolidayPay";
import { formatWonKorean } from "@/lib/format";

export function WeeklyHolidayPayCalculator() {
  const [hourlyWage, setHourlyWage] = useState(MINIMUM_WAGE_2026);
  const [weeklyContractHours, setWeeklyContractHours] = useState(40);

  const result = useMemo(
    () => calculateWeeklyHolidayPay(hourlyWage, weeklyContractHours),
    [hourlyWage, weeklyContractHours]
  );

  return (
    <div className="flex flex-col gap-6">
      <NumberField
        label="시급"
        value={hourlyWage}
        onChange={setHourlyWage}
        suffix="원"
        helpText={`2026년 최저시급은 ${formatWonKorean(MINIMUM_WAGE_2026)}입니다.`}
      />
      <NumberField
        label="주 소정근로시간"
        value={weeklyContractHours}
        onChange={setWeeklyContractHours}
        suffix="시간"
        helpText="근로계약서에 정해진 1주일 근무 시간을 입력하세요."
      />

      <div className="flex flex-col gap-2 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
        <ResultRow label="주휴수당 (1주)" value={formatWonKorean(result.weeklyHolidayPay)} />
        <ResultRow label="월 환산 예상액" value={formatWonKorean(result.monthlyEquivalent)} emphasis />
      </div>

      {!result.eligible && (
        <p className="text-xs text-amber-600 dark:text-amber-400">
          ※ 주휴수당은 1주 소정근로시간이 15시간 이상이고 결근 없이 개근했을 때만 발생합니다. 현재
          입력한 근로시간은 15시간 미만이라 지급 대상이 아닙니다.
        </p>
      )}

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ 결근이 있으면 그 주의 주휴수당은 지급되지 않습니다. 이 계산기는 개근을 전제로 한 참고
        금액입니다.
      </p>
    </div>
  );
}
