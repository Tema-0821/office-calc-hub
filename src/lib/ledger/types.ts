export type ExpenseCategory = "food" | "transport" | "housing" | "shopping" | "etc";

export interface CategoryOption {
  value: ExpenseCategory;
  label: string;
}

export const EXPENSE_CATEGORIES: CategoryOption[] = [
  { value: "food", label: "식비" },
  { value: "transport", label: "교통" },
  { value: "housing", label: "주거/공과금" },
  { value: "shopping", label: "쇼핑" },
  { value: "etc", label: "기타" },
];

export interface FixedExpense {
  id: string;
  name: string;
  amount: number;
}

export interface Transaction {
  id: string;
  date: string; // yyyy-mm-dd
  amount: number;
  category: ExpenseCategory;
  memo: string;
}

export interface LedgerSettings {
  startDate: string; // yyyy-mm-dd, 누적 잔고 계산을 시작할 기준월
  startingBalance: number;
  monthlyIncome: number;
  monthlyBudget: number; // 0이면 미설정
  fixedExpenses: FixedExpense[];
}

export interface LedgerData {
  settings: LedgerSettings;
  transactions: Transaction[];
}

export function createDefaultLedgerData(): LedgerData {
  return {
    settings: {
      startDate: new Date().toISOString().slice(0, 10),
      startingBalance: 0,
      monthlyIncome: 3_000_000,
      monthlyBudget: 0,
      fixedExpenses: [],
    },
    transactions: [],
  };
}
