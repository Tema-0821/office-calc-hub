export interface OvertimePayInput {
  hourlyWage: number; // 통상시급
  overtimeHours: number; // 연장근로시간 (1일 8시간·1주 40시간 초과분)
  nightHours: number; // 야간근로시간 (22시~06시)
  holidayHoursWithinEight: number; // 휴일근로시간 중 8시간 이내분
  holidayHoursOverEight: number; // 휴일근로시간 중 8시간 초과분
}

export interface OvertimePayResult {
  overtimePay: number;
  nightPay: number;
  holidayPayWithinEight: number;
  holidayPayOverEight: number;
  total: number;
}

// 근로기준법 제56조 - 연장·휴일(8시간 이내)근로는 통상임금의 50% 가산,
// 휴일근로 중 8시간 초과분과 야간근로(22시~06시)는 각각 별도로 계산한다.
// 실제로는 연장근로이면서 동시에 야간근로인 경우처럼 가산 사유가 겹치면 중복 가산되지만,
// 이 계산기는 각 유형별 근로시간을 입력받아 해당 가산율만 단순 적용한다.
export function calculateOvertimePay(input: OvertimePayInput): OvertimePayResult {
  const overtimePay = input.hourlyWage * 1.5 * input.overtimeHours;
  const nightPay = input.hourlyWage * 0.5 * input.nightHours;
  const holidayPayWithinEight = input.hourlyWage * 1.5 * input.holidayHoursWithinEight;
  const holidayPayOverEight = input.hourlyWage * 2 * input.holidayHoursOverEight;

  return {
    overtimePay,
    nightPay,
    holidayPayWithinEight,
    holidayPayOverEight,
    total: overtimePay + nightPay + holidayPayWithinEight + holidayPayOverEight,
  };
}
