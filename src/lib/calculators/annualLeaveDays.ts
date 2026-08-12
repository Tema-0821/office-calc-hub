export interface AnnualLeaveDaysResult {
  tenureYears: number;
  tenureMonths: number; // 만 개월수 (1년 미만일 때 참고용)
  leaveDays: number;
}

function parseDateParts(dateStr: string): { year: number; month: number; day: number } {
  const [year, month, day] = dateStr.split("-").map(Number);
  return { year, month, day };
}

// 만 개월수: 날짜까지 꽉 채운 개월 수 (예: 1/15 입사, 3/10 기준이면 아직 3월분은 안 채워져 1개월)
function fullMonthsBetween(startDateStr: string, referenceDateStr: string): number {
  const start = parseDateParts(startDateStr);
  const reference = parseDateParts(referenceDateStr);

  let months = (reference.year - start.year) * 12 + (reference.month - start.month);
  if (reference.day < start.day) months -= 1;
  return Math.max(0, months);
}

// 근로기준법 제60조 - 계속근로기간 1년 미만은 1개월 개근 시 1일씩(최대 11일),
// 1년 이상은 15일 발생 후 매 2년마다 1일씩 가산(최대 25일).
// 개근을 전제로 한 계산이며, 실제 발생일수는 결근 여부에 따라 달라질 수 있다.
export function calculateAnnualLeaveDays(
  startDateStr: string,
  referenceDateStr: string
): AnnualLeaveDaysResult {
  const tenureMonths = fullMonthsBetween(startDateStr, referenceDateStr);
  const tenureYears = Math.floor(tenureMonths / 12);

  const leaveDays =
    tenureYears < 1
      ? Math.min(11, tenureMonths)
      : Math.min(25, 15 + Math.floor((tenureYears - 1) / 2));

  return { tenureYears, tenureMonths, leaveDays };
}
