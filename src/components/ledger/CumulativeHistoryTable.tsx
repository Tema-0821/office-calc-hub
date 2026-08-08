import { formatWon } from "@/lib/format";
import type { MonthHistoryEntry } from "@/lib/ledger/calculations";

interface CumulativeHistoryTableProps {
  history: MonthHistoryEntry[];
}

export function CumulativeHistoryTable({ history }: CumulativeHistoryTableProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-lg font-semibold">월별 누적 잔고 추이</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="border-b border-zinc-200 text-left text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
              <th className="py-2">월</th>
              <th className="py-2 text-right">순증감</th>
              <th className="py-2 text-right">누적 잔고</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry) => (
              <tr
                key={`${entry.year}-${entry.month}`}
                className="border-b border-zinc-100 last:border-0 dark:border-zinc-800/50"
              >
                <td className="py-2">
                  {entry.year}.{String(entry.month).padStart(2, "0")}
                </td>
                <td
                  className={`py-2 text-right tabular-nums ${
                    entry.netChange >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"
                  }`}
                >
                  {entry.netChange >= 0 ? "+" : ""}
                  {formatWon(entry.netChange)}
                </td>
                <td className="py-2 text-right font-medium tabular-nums">
                  {formatWon(entry.cumulativeBalance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
