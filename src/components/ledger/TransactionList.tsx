import { formatWonKorean } from "@/lib/format";
import { EXPENSE_CATEGORIES, type Transaction } from "@/lib/ledger/types";

interface TransactionListProps {
  transactions: Transaction[];
  onRemove: (id: string) => void;
}

const CATEGORY_LABELS = Object.fromEntries(EXPENSE_CATEGORIES.map((c) => [c.value, c.label]));

export function TransactionList({ transactions, onRemove }: TransactionListProps) {
  const sorted = [...transactions].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-lg font-semibold">이번 달 지출 내역</h2>
      <div className="mt-4 flex flex-col gap-2">
        {sorted.length === 0 && <p className="text-xs text-zinc-400">기록된 지출이 없습니다.</p>}
        {sorted.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between rounded-lg bg-zinc-50 px-3 py-2 text-sm dark:bg-zinc-800/50"
          >
            <div className="flex flex-col">
              <span>
                {tx.date} · {CATEGORY_LABELS[tx.category]}
              </span>
              {tx.memo && <span className="text-xs text-zinc-500 dark:text-zinc-400">{tx.memo}</span>}
            </div>
            <div className="flex items-center gap-3">
              <span className="tabular-nums">{formatWonKorean(tx.amount)}</span>
              <button
                type="button"
                onClick={() => onRemove(tx.id)}
                className="text-xs text-red-500 hover:underline"
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
