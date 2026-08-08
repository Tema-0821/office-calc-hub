"use client";

import { useRef, type ChangeEvent } from "react";
import { parseCsvToTransactions, transactionsToCsv } from "@/lib/ledger/csv";
import type { Transaction } from "@/lib/ledger/types";

interface CsvControlsProps {
  transactions: Transaction[];
  onImport: (txs: Omit<Transaction, "id">[]) => void;
}

export function CsvControls({ transactions, onImport }: CsvControlsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleExport() {
    const csv = transactionsToCsv(transactions);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `가계부-지출내역-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result ?? "");
      const parsed = parseCsvToTransactions(text);
      if (parsed.length > 0) onImport(parsed);
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-lg font-semibold">백업</h2>
      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
        지출 기록은 이 브라우저에만 저장됩니다. 다른 기기로 옮기거나 데이터를 지키려면 CSV로
        내보내 두고, 필요할 때 다시 가져오세요.
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={handleExport}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          CSV 내보내기
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          CSV 가져오기
        </button>
        <input ref={fileInputRef} type="file" accept=".csv" onChange={handleFileChange} className="hidden" />
      </div>
    </div>
  );
}
