import {
  createDefaultCalculatorLinkToggles,
  type CalculatorLinkToggles,
} from "@/lib/calculatorLinks/types";

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

// 카드 할부처럼 "총액 ÷ 개월수"만큼 시작월부터 정해진 개월수 동안만 나가는 지출.
// 영구히 반복되는 FixedExpense와 달리 개월수가 지나면 자동으로 지출 목록에서 빠진다.
export interface InstallmentExpense {
  id: string;
  name: string;
  totalAmount: number;
  months: number;
  startDate: string; // yyyy-mm-dd, 첫 결제월 기준
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
  goalAmount: number; // 0이면 미설정. 목표 금액 달성까지 남은 개월 수 계산에 사용
  fixedExpenses: FixedExpense[];
  installmentExpenses: InstallmentExpense[];
  // 4대보험료/퇴직금/주휴수당/연차수당 계산기 결과를 이 잔고 계산에 반영할지 여부.
  calculatorLinks: CalculatorLinkToggles;
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
      goalAmount: 0,
      fixedExpenses: [],
      installmentExpenses: [],
      calculatorLinks: createDefaultCalculatorLinkToggles(),
    },
    transactions: [],
  };
}
