"use client";

import { useMemo } from "react";
import { NumberField } from "@/components/calculators/NumberField";
import { ResultRow } from "@/components/calculators/ResultRow";
import { calculateOvertimePay, type OvertimePayInput } from "@/lib/calculators/overtimePay";
import { MINIMUM_WAGE_2026 } from "@/lib/calculators/weeklyHolidayPay";
import { CALCULATOR_INPUT_KEYS } from "@/lib/calculators/storageKeys";
import { formatWonKorean } from "@/lib/format";
import { usePersistedState } from "@/lib/storage/usePersistedState";

const DEFAULT_INPUT: OvertimePayInput = {
  hourlyWage: MINIMUM_WAGE_2026,
  overtimeHours: 0,
  nightHours: 0,
  holidayHoursWithinEight: 0,
  holidayHoursOverEight: 0,
};

export function OvertimePayCalculator() {
  const [input, setInput] = usePersistedState<OvertimePayInput>(
    CALCULATOR_INPUT_KEYS.overtimePay,
    DEFAULT_INPUT
  );

  const result = useMemo(() => calculateOvertimePay(input), [input]);

  function setField(key: keyof OvertimePayInput, value: number) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="flex flex-col gap-6">
      <NumberField
        label="통상시급"
        value={input.hourlyWage}
        onChange={(v) => setField("hourlyWage", v)}
        suffix="원"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NumberField
          label="연장근로시간"
          value={input.overtimeHours}
          onChange={(v) => setField("overtimeHours", v)}
          suffix="시간"
          helpText="1일 8시간·1주 40시간 초과분"
        />
        <NumberField
          label="야간근로시간"
          value={input.nightHours}
          onChange={(v) => setField("nightHours", v)}
          suffix="시간"
          helpText="22시~06시 사이 근로"
        />
        <NumberField
          label="휴일근로시간 (8시간 이내)"
          value={input.holidayHoursWithinEight}
          onChange={(v) => setField("holidayHoursWithinEight", v)}
          suffix="시간"
        />
        <NumberField
          label="휴일근로시간 (8시간 초과)"
          value={input.holidayHoursOverEight}
          onChange={(v) => setField("holidayHoursOverEight", v)}
          suffix="시간"
        />
      </div>

      <div className="flex flex-col gap-2 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
        <ResultRow label="연장근로수당 (150%)" value={formatWonKorean(result.overtimePay)} />
        <ResultRow label="야간근로수당 (+50%)" value={formatWonKorean(result.nightPay)} />
        <ResultRow label="휴일근로수당 8시간 이내 (150%)" value={formatWonKorean(result.holidayPayWithinEight)} />
        <ResultRow label="휴일근로수당 8시간 초과 (200%)" value={formatWonKorean(result.holidayPayOverEight)} />
        <ResultRow label="합계" value={formatWonKorean(result.total)} emphasis />
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ※ 연장·휴일근로이면서 동시에 야간근로인 시간이 있다면 두 가산율이 중복 적용됩니다. 이
        계산기는 입력한 시간 구간이 서로 겹치지 않는다고 가정하고 각 유형별로 따로 계산하니,
        중복되는 시간이 있다면 야간근로시간에 그만큼을 별도로 더해 입력하세요.
      </p>
    </div>
  );
}
