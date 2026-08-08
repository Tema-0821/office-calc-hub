// 2026년 법정 최저시급. 매년 최저임금위원회 고시로 변경되므로 연초에 갱신할 것.
export const MINIMUM_WAGE_2026 = 10_320;

export interface WeeklyHolidayPayResult {
  eligible: boolean;
  weeklyHolidayPay: number;
  monthlyEquivalent: number;
}

// 주휴수당 = 시급 × (주 소정근로시간 ÷ 40) × 8, 주 15시간 이상 개근 시에만 발생
export function calculateWeeklyHolidayPay(
  hourlyWage: number,
  weeklyContractHours: number
): WeeklyHolidayPayResult {
  const eligible = weeklyContractHours >= 15;
  const cappedHours = Math.min(weeklyContractHours, 40);
  const weeklyHolidayPay = eligible ? hourlyWage * (cappedHours / 40) * 8 : 0;

  // 4.345주 = 1년 평균 한 달의 주 수 (52.14주 ÷ 12개월)
  const monthlyEquivalent = weeklyHolidayPay * 4.345;

  return { eligible, weeklyHolidayPay, monthlyEquivalent };
}
