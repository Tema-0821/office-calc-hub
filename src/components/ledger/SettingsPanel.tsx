"use client";

import { useState } from "react";
import { DateField } from "@/components/calculators/DateField";
import { NumberField } from "@/components/calculators/NumberField";
import { formatWonKorean } from "@/lib/format";
import type { FixedExpense, LedgerSettings } from "@/lib/ledger/types";

interface SettingsPanelProps {
  settings: LedgerSettings;
  onUpdateSettings: (patch: Partial<LedgerSettings>) => void;
  onAddFixedExpense: (expense: Omit<FixedExpense, "id">) => void;
  onRemoveFixedExpense: (id: string) => void;
}

export function SettingsPanel({
  settings,
  onUpdateSettings,
  onAddFixedExpense,
  onRemoveFixedExpense,
}: SettingsPanelProps) {
  const [newExpenseName, setNewExpenseName] = useState("");
  const [newExpenseAmount, setNewExpenseAmount] = useState(0);

  const fixedTotal = settings.fixedExpenses.reduce((acc, e) => acc + e.amount, 0);

  function handleAddExpense() {
    if (!newExpenseName.trim() || newExpenseAmount <= 0) return;
    onAddFixedExpense({ name: newExpenseName.trim(), amount: newExpenseAmount });
    setNewExpenseName("");
    setNewExpenseAmount(0);
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-lg font-semibold">기본 설정</h2>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DateField
          label="기록 시작일"
          value={settings.startDate}
          onChange={(v) => onUpdateSettings({ startDate: v })}
        />
        <NumberField
          label="시작 잔고"
          value={settings.startingBalance}
          onChange={(v) => onUpdateSettings({ startingBalance: v })}
          suffix="원"
        />
        <NumberField
          label="월급 (실수령액 기준)"
          value={settings.monthlyIncome}
          onChange={(v) => onUpdateSettings({ monthlyIncome: v })}
          suffix="원"
        />
        <NumberField
          label="이번 달 지출 예산 (0=미설정)"
          value={settings.monthlyBudget}
          onChange={(v) => onUpdateSettings({ monthlyBudget: v })}
          suffix="원"
        />
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">고정지출</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          매달 반복해서 나가는 지출(월세, 구독료, 보험료 등)을 등록하세요.
        </p>

        <div className="mt-3 flex flex-col gap-2">
          {settings.fixedExpenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between rounded-lg bg-zinc-50 px-3 py-2 text-sm dark:bg-zinc-800/50"
            >
              <span>{expense.name}</span>
              <div className="flex items-center gap-3">
                <span className="tabular-nums">{formatWonKorean(expense.amount)}</span>
                <button
                  type="button"
                  onClick={() => onRemoveFixedExpense(expense.id)}
                  className="text-xs text-red-500 hover:underline"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
          {settings.fixedExpenses.length === 0 && (
            <p className="text-xs text-zinc-400">등록된 고정지출이 없습니다.</p>
          )}
        </div>

        <div className="mt-3 flex flex-col items-start gap-2 sm:flex-row">
          <input
            type="text"
            placeholder="예: 월세"
            value={newExpenseName}
            onChange={(e) => setNewExpenseName(e.target.value)}
            className="w-full flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
          />
          <div className="flex w-full flex-col gap-1 sm:w-32">
            <input
              type="number"
              placeholder="금액"
              value={newExpenseAmount || ""}
              onChange={(e) => setNewExpenseAmount(Number(e.target.value))}
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-right text-sm tabular-nums focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
            />
            {newExpenseAmount !== 0 && (
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                {formatWonKorean(newExpenseAmount)}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleAddExpense}
            className="shrink-0 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            추가
          </button>
        </div>

        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          고정지출 합계: {formatWonKorean(fixedTotal)}
        </p>
      </div>
    </div>
  );
}
