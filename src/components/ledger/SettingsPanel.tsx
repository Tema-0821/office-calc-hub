"use client";

import { useState } from "react";
import { DateField } from "@/components/calculators/DateField";
import { NumberField } from "@/components/calculators/NumberField";
import { formatWonKorean } from "@/lib/format";
import type { CalculatorLinkToggles, CalculatorLinksData } from "@/lib/calculatorLinks/types";
import type { FixedExpense, InstallmentExpense, LedgerSettings } from "@/lib/ledger/types";
import { CalculatorLinksSection } from "./CalculatorLinksSection";

interface SettingsPanelProps {
  settings: LedgerSettings;
  onUpdateSettings: (patch: Partial<LedgerSettings>) => void;
  onAddFixedExpense: (expense: Omit<FixedExpense, "id">) => void;
  onRemoveFixedExpense: (id: string) => void;
  onAddInstallmentExpense: (installment: Omit<InstallmentExpense, "id">) => void;
  onRemoveInstallmentExpense: (id: string) => void;
  calculatorLinkData: CalculatorLinksData;
  onToggleCalculatorLink: (key: keyof CalculatorLinkToggles, value: boolean) => void;
}

function getDefaultToday(): string {
  return new Date().toISOString().slice(0, 10);
}

function formatInstallmentPeriod(installment: InstallmentExpense): string {
  const [startYear, startMonth] = installment.startDate.split("-").map(Number);
  const endIndex = startYear * 12 + (startMonth - 1) + (installment.months - 1);
  const endYear = Math.floor(endIndex / 12);
  const endMonth = (endIndex % 12) + 1;
  return `${startYear}.${startMonth} ~ ${endYear}.${endMonth} (${installment.months}개월)`;
}

export function SettingsPanel({
  settings,
  onUpdateSettings,
  onAddFixedExpense,
  onRemoveFixedExpense,
  onAddInstallmentExpense,
  onRemoveInstallmentExpense,
  calculatorLinkData,
  onToggleCalculatorLink,
}: SettingsPanelProps) {
  const [newExpenseName, setNewExpenseName] = useState("");
  const [newExpenseAmount, setNewExpenseAmount] = useState(0);

  const [newInstallmentName, setNewInstallmentName] = useState("");
  const [newInstallmentTotal, setNewInstallmentTotal] = useState(0);
  const [newInstallmentMonths, setNewInstallmentMonths] = useState(6);
  const [newInstallmentStartDate, setNewInstallmentStartDate] = useState(getDefaultToday);

  const fixedTotal = settings.fixedExpenses.reduce((acc, e) => acc + e.amount, 0);

  function handleAddExpense() {
    if (!newExpenseName.trim() || newExpenseAmount <= 0) return;
    onAddFixedExpense({ name: newExpenseName.trim(), amount: newExpenseAmount });
    setNewExpenseName("");
    setNewExpenseAmount(0);
  }

  function handleAddInstallment() {
    if (!newInstallmentName.trim() || newInstallmentTotal <= 0 || newInstallmentMonths <= 0) return;
    onAddInstallmentExpense({
      name: newInstallmentName.trim(),
      totalAmount: newInstallmentTotal,
      months: newInstallmentMonths,
      startDate: newInstallmentStartDate,
    });
    setNewInstallmentName("");
    setNewInstallmentTotal(0);
    setNewInstallmentMonths(6);
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
        <NumberField
          label="목표 금액 (0=미설정)"
          value={settings.goalAmount}
          onChange={(v) => onUpdateSettings({ goalAmount: v })}
          suffix="원"
          helpText="모으고 싶은 금액을 입력하면 지금 추세로 몇 개월 후에 도달하는지 알려줘요."
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

      <div className="mt-6">
        <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">할부 지출</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          카드 할부처럼 총액을 개월수로 나눠, 입력일 기준 그 개월수 동안만 지출에 반영하고
          자동으로 끝납니다. 예: 120만원 · 6개월 → 매달 20만원씩 6개월만 반영.
        </p>

        <div className="mt-3 flex flex-col gap-2">
          {settings.installmentExpenses.map((installment) => (
            <div
              key={installment.id}
              className="flex items-center justify-between rounded-lg bg-zinc-50 px-3 py-2 text-sm dark:bg-zinc-800/50"
            >
              <div className="flex flex-col">
                <span>{installment.name}</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {formatWonKorean(Math.round(installment.totalAmount / installment.months))}/월 ·{" "}
                  {formatInstallmentPeriod(installment)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="tabular-nums">{formatWonKorean(installment.totalAmount)}</span>
                <button
                  type="button"
                  onClick={() => onRemoveInstallmentExpense(installment.id)}
                  className="text-xs text-red-500 hover:underline"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
          {settings.installmentExpenses.length === 0 && (
            <p className="text-xs text-zinc-400">등록된 할부 지출이 없습니다.</p>
          )}
        </div>

        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <input
            type="text"
            placeholder="예: 노트북 할부"
            value={newInstallmentName}
            onChange={(e) => setNewInstallmentName(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 sm:col-span-2"
          />
          <div className="flex flex-col gap-1">
            <input
              type="number"
              placeholder="총 할부금액"
              value={newInstallmentTotal || ""}
              onChange={(e) => setNewInstallmentTotal(Number(e.target.value))}
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-right text-sm tabular-nums focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
            />
            {newInstallmentTotal !== 0 && (
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                {formatWonKorean(newInstallmentTotal)}
              </span>
            )}
          </div>
          <input
            type="number"
            placeholder="개월수"
            min={1}
            value={newInstallmentMonths || ""}
            onChange={(e) => setNewInstallmentMonths(Number(e.target.value))}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-right text-sm tabular-nums focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
          />
          <input
            type="date"
            value={newInstallmentStartDate}
            onChange={(e) => setNewInstallmentStartDate(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
          />
          <button
            type="button"
            onClick={handleAddInstallment}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            추가
          </button>
        </div>

        {newInstallmentTotal > 0 && newInstallmentMonths > 0 && (
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
            매달 {formatWonKorean(Math.round(newInstallmentTotal / newInstallmentMonths))}씩{" "}
            {newInstallmentMonths}개월 반영됩니다.
          </p>
        )}
      </div>

      <CalculatorLinksSection
        toggles={settings.calculatorLinks}
        linkData={calculatorLinkData}
        onToggle={onToggleCalculatorLink}
      />
    </div>
  );
}
