"use client";

import { useState } from "react";
import { formatWon } from "@/lib/format";
import { EXPENSE_CATEGORIES, type ExpenseCategory, type Transaction } from "@/lib/ledger/types";

interface LedgerCalendarProps {
  year: number;
  month: number; // 1~12
  transactions: Transaction[];
  onAddTransaction: (tx: Omit<Transaction, "id">) => void;
}

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

export function LedgerCalendar({ year, month, transactions, onAddTransaction }: LedgerCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState<ExpenseCategory>("food");
  const [memo, setMemo] = useState("");

  const firstDay = new Date(year, month - 1, 1);
  const daysCount = new Date(year, month, 0).getDate();
  const startWeekday = firstDay.getDay();

  const totalsByDate = new Map<string, number>();
  for (const tx of transactions) {
    totalsByDate.set(tx.date, (totalsByDate.get(tx.date) ?? 0) + tx.amount);
  }

  const cells: (number | null)[] = [
    ...Array.from({ length: startWeekday }, () => null),
    ...Array.from({ length: daysCount }, (_, i) => i + 1),
  ];

  function dateKey(day: number) {
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  function handleSubmit() {
    if (!selectedDate || amount <= 0) return;
    onAddTransaction({ date: selectedDate, amount, category, memo: memo.trim() });
    setAmount(0);
    setMemo("");
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-lg font-semibold">지출 달력</h2>
      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">날짜를 클릭해서 그날 쓴 돈을 기록하세요.</p>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs text-zinc-500 dark:text-zinc-400">
        {WEEKDAYS.map((w) => (
          <div key={w} className="py-1">
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          if (day === null) return <div key={`empty-${idx}`} />;
          const key = dateKey(day);
          const total = totalsByDate.get(key);
          const isSelected = selectedDate === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedDate(isSelected ? null : key)}
              className={`flex h-16 flex-col items-center justify-start gap-0.5 rounded-lg border p-1 text-xs transition-colors ${
                isSelected
                  ? "border-zinc-900 bg-zinc-100 dark:border-zinc-100 dark:bg-zinc-800"
                  : "border-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              }`}
            >
              <span className="text-zinc-700 dark:text-zinc-300">{day}</span>
              {total ? (
                <span className="text-[10px] tabular-nums text-red-500">-{formatWon(total)}</span>
              ) : null}
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <div className="mt-4 flex flex-col gap-3 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
          <p className="text-sm font-medium">{selectedDate} 지출 추가</p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="number"
              placeholder="금액"
              value={amount || ""}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-right text-sm tabular-nums focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 sm:w-32"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
            >
              {EXPENSE_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="메모 (선택)"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              className="flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
            />
            <button
              type="button"
              onClick={handleSubmit}
              className="shrink-0 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              기록
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
