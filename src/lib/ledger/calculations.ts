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

export interface MonthSummary {
  year: number;
  month: number;
  income: number;
  fixedTotal: number;
  variableTotal: number;
  netChange: number;
  categoryTotals: Record<ExpenseCategory, number>;
}

export function getMonthSummary(data: LedgerData, year: number, month: number): MonthSummary {
  const fixedTotal = sumAmount(data.settings.fixedExpenses);
  const monthTransactions = getMonthTransactions(data.transactions, year, month);
  const variableTotal = sumAmount(monthTransactions);

  return {
    year,
    month,
    income: data.settings.monthlyIncome,
    fixedTotal,
    variableTotal,
    netChange: data.settings.monthlyIncome - fixedTotal - variableTotal,
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
  uptoMonth: number
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
    const summary = getMonthSummary(data, year, month);
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
  month: number
): NextMonthProjection {
  const summary = getMonthSummary(data, year, month);
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

  const projectedVariable = dailyAvgVariable * daysInMonth(nextYear, nextMonth);
  const projectedNetChange = data.settings.monthlyIncome - summary.fixedTotal - projectedVariable;

  return { dailyAvgVariable, projectedVariable, projectedNetChange, nextYear, nextMonth };
}
