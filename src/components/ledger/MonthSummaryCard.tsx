import { ResultRow } from "@/components/calculators/ResultRow";
import { formatWonKorean } from "@/lib/format";
import type { MonthSummary, NextMonthProjection } from "@/lib/ledger/calculations";
import { EXPENSE_CATEGORIES } from "@/lib/ledger/types";

interface MonthSummaryCardProps {
  summary: MonthSummary;
  budget: number;
  projection: NextMonthProjection;
}

export function MonthSummaryCard({ summary, budget, projection }: MonthSummaryCardProps) {
  const budgetUsageRatio = budget > 0 ? summary.variableTotal / budget : 0;
  const overBudget = budget > 0 && summary.variableTotal > budget;

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-lg font-semibold">
        {summary.year}년 {summary.month}월 요약
      </h2>

      <div className="mt-4 flex flex-col gap-2">
        <ResultRow label="수입" value={formatWonKorean(summary.income)} />
        <ResultRow label="고정지출" value={formatWonKorean(summary.fixedTotal)} />
        <ResultRow label="변동지출 (달력 기록)" value={formatWonKorean(summary.variableTotal)} />
        <ResultRow label="이번 달 순증감" value={formatWonKorean(summary.netChange)} emphasis />
      </div>

      {budget > 0 && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>예산 사용률</span>
            <span>
              {formatWonKorean(summary.variableTotal)} / {formatWonKorean(budget)}
            </span>
          </div>
          <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div
              className={`h-full ${overBudget ? "bg-red-500" : "bg-emerald-500"}`}
              style={{ width: `${Math.min(budgetUsageRatio * 100, 100)}%` }}
            />
          </div>
          {overBudget && (
            <p className="mt-1 text-xs text-red-500">
              예산을 {formatWonKorean(summary.variableTotal - budget)} 초과했습니다.
            </p>
          )}
        </div>
      )}

      <div className="mt-4">
        <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">카테고리별 지출</h3>
        <div className="mt-2 flex flex-col gap-1.5">
          {EXPENSE_CATEGORIES.map((cat) => (
            <ResultRow key={cat.value} label={cat.label} value={formatWonKorean(summary.categoryTotals[cat.value])} />
          ))}
        </div>
      </div>

      <div className="mt-4 border-t border-zinc-200 pt-4 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        <p>
          현재 지출 추세(하루 평균 {formatWonKorean(projection.dailyAvgVariable)})가 이어진다면,{" "}
          {projection.nextYear}년 {projection.nextMonth}월 예상 순증감은{" "}
          <strong className="text-zinc-700 dark:text-zinc-300">
            {formatWonKorean(projection.projectedNetChange)}
          </strong>{" "}
          입니다.
        </p>
      </div>
    </div>
  );
}
