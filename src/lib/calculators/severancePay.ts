export interface SeverancePayInput {
  startDate: string; // ISO yyyy-mm-dd, 입사일
  endDate: string; // ISO yyyy-mm-dd, 퇴사일
  last3MonthsWage: number; // 퇴사 직전 3개월간 지급받은 임금 총액 (기본급+제수당)
  annualBonus: number; // 최근 1년간 받은 상여금 총액 (없으면 0)
  unusedLeavePay: number; // 최근 1년간 발생한 연차수당 총액 (없으면 0)
}

export interface SeverancePayResult {
  tenureDays: number;
  tenureYears: number;
  periodDays: number;
  dailyAverageWage: number;
  severancePay: number;
  eligible: boolean;
}

const DAY_MS = 1000 * 60 * 60 * 24;

export function calculateSeverancePay(input: SeverancePayInput): SeverancePayResult {
  const start = new Date(input.startDate);
  const end = new Date(input.endDate);

  const tenureDays = Math.round((end.getTime() - start.getTime()) / DAY_MS);
  const eligible = tenureDays >= 365;

  const threeMonthsAgo = new Date(end);
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  const periodDays = Math.max(
    1,
    Math.round((end.getTime() - threeMonthsAgo.getTime()) / DAY_MS)
  );

  // 상여금·연차수당은 연간 총액의 3/12을 평균임금 산정 기간에 포함 (근로기준법 시행령 기준)
  const bonusPortion = input.annualBonus * (3 / 12);
  const leavePayPortion = input.unusedLeavePay * (3 / 12);
  const totalWage = input.last3MonthsWage + bonusPortion + leavePayPortion;

  const dailyAverageWage = totalWage / periodDays;
  const severancePay = eligible ? dailyAverageWage * 30 * (tenureDays / 365) : 0;

  return {
    tenureDays,
    tenureYears: tenureDays / 365,
    periodDays,
    dailyAverageWage,
    severancePay,
    eligible,
  };
}
