"use client";

import { useMemo, useState } from "react";
import { CsvControls } from "@/components/ledger/CsvControls";
import { CumulativeHistoryTable } from "@/components/ledger/CumulativeHistoryTable";
import { LedgerCalendar } from "@/components/ledger/LedgerCalendar";
import { MonthSummaryCard } from "@/components/ledger/MonthSummaryCard";
import { SettingsPanel } from "@/components/ledger/SettingsPanel";
import { TransactionList } from "@/components/ledger/TransactionList";
import { buildAdjustments } from "@/lib/calculatorLinks/buildAdjustments";
import type { CalculatorLinkToggles } from "@/lib/calculatorLinks/types";
import { useCalculatorLinks } from "@/lib/calculatorLinks/useCalculatorLinks";
import {
  getCumulativeHistory,
  getGoalProjection,
  getMonthSummary,
  getNextMonthProjection,
} from "@/lib/ledger/calculations";
import { useLedger } from "@/lib/ledger/useLedger";

export function BalanceSimulator() {
  const ledger = useLedger();
  const calculatorLinks = useCalculatorLinks();
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth() + 1);

  const adjustments = useMemo(
    () => buildAdjustments(ledger.data.settings.calculatorLinks, calculatorLinks.data),
    [ledger.data.settings.calculatorLinks, calculatorLinks.data]
  );

  function handleToggleCalculatorLink(key: keyof CalculatorLinkToggles, value: boolean) {
    ledger.updateSettings({
      calculatorLinks: { ...ledger.data.settings.calculatorLinks, [key]: value },
    });
  }

  const summary = useMemo(
    () => getMonthSummary(ledger.data, viewYear, viewMonth, adjustments),
    [ledger.data, viewYear, viewMonth, adjustments]
  );
  const history = useMemo(
    () => getCumulativeHistory(ledger.data, viewYear, viewMonth, adjustments),
    [ledger.data, viewYear, viewMonth, adjustments]
  );
  const projection = useMemo(
    () => getNextMonthProjection(ledger.data, viewYear, viewMonth, adjustments),
    [ledger.data, viewYear, viewMonth, adjustments]
  );

  const cumulativeBalance = history.length > 0 ? history[history.length - 1].cumulativeBalance : 0;

  const goal = useMemo(
    () =>
      getGoalProjection(
        cumulativeBalance,
        ledger.data.settings.goalAmount,
        projection.projectedNetChange,
        viewYear,
        viewMonth
      ),
    [cumulativeBalance, ledger.data.settings.goalAmount, projection.projectedNetChange, viewYear, viewMonth]
  );

  const monthTransactions = useMemo(
    () =>
      ledger.data.transactions.filter((tx) => {
        const [year, month] = tx.date.split("-").map(Number);
        return year === viewYear && month === viewMonth;
      }),
    [ledger.data.transactions, viewYear, viewMonth]
  );

  function goPrevMonth() {
    setViewMonth((prev) => {
      if (prev === 1) {
        setViewYear((y) => y - 1);
        return 12;
      }
      return prev - 1;
    });
  }

  function goNextMonth() {
    setViewMonth((prev) => {
      if (prev === 12) {
        setViewYear((y) => y + 1);
        return 1;
      }
      return prev + 1;
    });
  }

  if (!ledger.hydrated) {
    return <p className="text-sm text-zinc-500 dark:text-zinc-400">불러오는 중...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <SettingsPanel
        settings={ledger.data.settings}
        onUpdateSettings={ledger.updateSettings}
        onAddFixedExpense={ledger.addFixedExpense}
        onRemoveFixedExpense={ledger.removeFixedExpense}
        calculatorLinkData={calculatorLinks.data}
        onToggleCalculatorLink={handleToggleCalculatorLink}
      />

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={goPrevMonth}
          className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          ← 이전달
        </button>
        <h2 className="text-lg font-bold">
          {viewYear}년 {viewMonth}월
        </h2>
        <button
          type="button"
          onClick={goNextMonth}
          className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          다음달 →
        </button>
      </div>

      <MonthSummaryCard
        summary={summary}
        budget={ledger.data.settings.monthlyBudget}
        projection={projection}
        cumulativeBalance={cumulativeBalance}
        goalAmount={ledger.data.settings.goalAmount}
        goal={goal}
      />

      <LedgerCalendar
        year={viewYear}
        month={viewMonth}
        transactions={monthTransactions}
        onAddTransaction={ledger.addTransaction}
      />

      <TransactionList transactions={monthTransactions} onRemove={ledger.removeTransaction} />

      <CumulativeHistoryTable history={history} />

      <CsvControls transactions={ledger.data.transactions} onImport={ledger.importTransactions} />
    </div>
  );
}
