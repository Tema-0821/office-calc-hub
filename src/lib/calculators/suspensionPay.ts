export interface SuspensionPayResult {
  dailyAllowance: number;
  capApplied: boolean;
  totalAllowance: number;
}

// 근로기준법 제46조 - 사용자 귀책사유로 휴업하면 평균임금의 70% 이상을 휴업수당으로
// 지급해야 하며, 평균임금의 70%가 통상임금을 초과하면 통상임금을 휴업수당으로 지급할 수 있다.
export function calculateSuspensionPay(
  averageDailyWage: number,
  ordinaryDailyWage: number,
  suspensionDays: number
): SuspensionPayResult {
  const seventyPercent = averageDailyWage * 0.7;
  const capApplied = seventyPercent > ordinaryDailyWage;
  const dailyAllowance = capApplied ? ordinaryDailyWage : seventyPercent;

  return {
    dailyAllowance,
    capApplied,
    totalAllowance: dailyAllowance * suspensionDays,
  };
}
