import { EXPENSE_CATEGORIES, type ExpenseCategory, type LedgerData, type Transaction } from "./types";

const MAX_HISTORY_MONTHS = 240; // 20년, 무한루프 방지용 안전장치

export function daysInMonth(year: number, month: number): number {
  // month: 1~12. new Date(year, month, 0)은 "month월의 0번째 날" = 전월 말일.
  return new Date(year, month, 0).getDate();
}

function parseYearMonth(dateStr: string): { year: number; month: number } {
  const [year, month] = dateStr.split("-").map(Number);
  return { year, month };
}

function isSameMonth(dateStr: string, year: number, month: number): boolean {
  const parsed = parseYearMonth(dateStr);
  return parsed.year === year && parsed.month === month;
}

function sumAmount(items: { amount: number }[]): number {
  return items.reduce((acc, item) => acc + item.amount, 0);
}

export function getMonthTransactions(
  transactions: Transaction[],
  year: number,
  month: number
): Transaction[] {
  return transactions.filter((tx) => isSameMonth(tx.date, year, month));
}

export function getCategoryTotals(transactions: Transaction[]): Record<ExpenseCategory, number> {
  const totals = Object.fromEntries(
    EXPENSE_CATEGORIES.map((c) => [c.value, 0])
  ) as Record<ExpenseCategory, number>;

  for (const tx of transactions) {
    totals[tx.category] += tx.amount;
  }
  return totals;
}

export interface CalculatorAdjustments {
  recurringFixedExtra: number; // 매달 고정지출에 추가 (예: 4대보험료 계산기 연동)
  recurringIncomeExtra: number; // 매달 수입에 추가 (예: 주휴수당 계산기 연동)
  oneTimeIncomes: { year: number; month: number; amount: number }[]; // 특정 달 1회 수입 (퇴직금, 연차수당)
}

export const EMPTY_ADJUSTMENTS: CalculatorAdjustments = {
  recurringFixedExtra: 0,
  recurringIncomeExtra: 0,
  oneTimeIncomes: [],
};

export interface MonthSummary {
  year: number;
  month: number;
  income: number;
  fixedTotal: number;
  variableTotal: number;
  netChange: number;
  categoryTotals: Record<ExpenseCategory, number>;
}

export function getMonthSummary(
  data: LedgerData,
  year: number,
  month: number,
  adjustments: CalculatorAdjustments = EMPTY_ADJUSTMENTS
): MonthSummary {
  const fixedTotal = sumAmount(data.settings.fixedExpenses) + adjustments.recurringFixedExtra;
  const monthTransactions = getMonthTransactions(data.transactions, year, month);
  const variableTotal = sumAmount(monthTransactions);
  const oneTimeIncome = sumAmount(
    adjustments.oneTimeIncomes.filter((entry) => entry.year === year && entry.month === month)
  );
  const income = data.settings.monthlyIncome + adjustments.recurringIncomeExtra + oneTimeIncome;

  return {
    year,
    month,
    income,
    fixedTotal,
    variableTotal,
    netChange: income - fixedTotal - variableTotal,
    categoryTotals: getCategoryTotals(monthTransactions),
  };
}

export interface MonthHistoryEntry extends MonthSummary {
  cumulativeBalance: number;
}

// 기록 시작월부터 지정한 연/월까지, 매달 순증감과 누적 잔고를 계산한다.
export function getCumulativeHistory(
  data: LedgerData,
  uptoYear: number,
  uptoMonth: number,
  adjustments: CalculatorAdjustments = EMPTY_ADJUSTMENTS
): MonthHistoryEntry[] {
  const { year: startYear, month: startMonth } = parseYearMonth(data.settings.startDate);

  let year = startYear;
  let month = startMonth;
  let balance = data.settings.startingBalance;
  const history: MonthHistoryEntry[] = [];

  while (
    (year < uptoYear || (year === uptoYear && month <= uptoMonth)) &&
    history.length < MAX_HISTORY_MONTHS
  ) {
    const summary = getMonthSummary(data, year, month, adjustments);
    balance += summary.netChange;
    history.push({ ...summary, cumulativeBalance: balance });

    month += 1;
    if (month > 12) {
      month = 1;
      year += 1;
    }
  }

  return history;
}

export interface NextMonthProjection {
  dailyAvgVariable: number;
  projectedVariable: number;
  projectedNetChange: number;
  nextYear: number;
  nextMonth: number;
}

// 이번 달까지의 하루 평균 변동지출을 다음 달 전체 일수에 적용한 단순 추정치.
export function getNextMonthProjection(
  data: LedgerData,
  year: number,
  month: number,
  adjustments: CalculatorAdjustments = EMPTY_ADJUSTMENTS
): NextMonthProjection {
  const summary = getMonthSummary(data, year, month, adjustments);
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() + 1 === month;
  const elapsedDays = isCurrentMonth ? today.getDate() : daysInMonth(year, month);
  const dailyAvgVariable = elapsedDays > 0 ? summary.variableTotal / elapsedDays : 0;

  let nextYear = year;
  let nextMonth = month + 1;
  if (nextMonth > 12) {
    nextMonth = 1;
    nextYear += 1;
  }

  const nextMonthSummary = getMonthSummary(data, nextYear, nextMonth, adjustments);
  const projectedVariable = dailyAvgVariable * daysInMonth(nextYear, nextMonth);
  const projectedNetChange = nextMonthSummary.income - nextMonthSummary.fixedTotal - projectedVariable;

  return { dailyAvgVariable, projectedVariable, projectedNetChange, nextYear, nextMonth };
}

export interface GoalProjection {
  reached: boolean;
  achievable: boolean; // false면 현재 추세(monthlyRate <= 0)로는 영원히 도달 못함
  monthsNeeded: number | null;
  targetYear: number | null;
  targetMonth: number | null;
}

// goalAmount가 0(미설정)이면 null을 반환한다.
export function getGoalProjection(
  currentBalance: number,
  goalAmount: number,
  monthlyRate: number,
  fromYear: number,
  fromMonth: number
): GoalProjection | null {
  if (goalAmount <= 0) return null;

  if (currentBalance >= goalAmount) {
    return { reached: true, achievable: true, monthsNeeded: 0, targetYear: fromYear, targetMonth: fromMonth };
  }

  if (monthlyRate <= 0) {
    return { reached: false, achievable: false, monthsNeeded: null, targetYear: null, targetMonth: null };
  }

  const monthsNeeded = Math.ceil((goalAmount - currentBalance) / monthlyRate);
  const totalMonths = fromYear * 12 + (fromMonth - 1) + monthsNeeded;
  const targetYear = Math.floor(totalMonths / 12);
  const targetMonth = (totalMonths % 12) + 1;

  return { reached: false, achievable: true, monthsNeeded, targetYear, targetMonth };
}
