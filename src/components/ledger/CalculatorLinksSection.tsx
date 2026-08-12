import Link from "next/link";
import { formatWonKorean } from "@/lib/format";
import type { CalculatorLinkToggles, CalculatorLinksData } from "@/lib/calculatorLinks/types";

interface CalculatorLinksSectionProps {
  toggles: CalculatorLinkToggles;
  linkData: CalculatorLinksData;
  onToggle: (key: keyof CalculatorLinkToggles, value: boolean) => void;
}

interface RowConfig {
  key: keyof CalculatorLinkToggles;
  label: string;
  href: string;
  describe: (linkData: CalculatorLinksData) => string | null;
}

const ROWS: RowConfig[] = [
  {
    key: "fourInsurance",
    label: "4대보험료",
    href: "/four-insurance",
    describe: (d) =>
      d.fourInsurance ? `매달 고정지출에 ${formatWonKorean(d.fourInsurance.monthlyDeduction)} 추가` : null,
  },
  {
    key: "weeklyHolidayPay",
    label: "주휴수당",
    href: "/weekly-holiday-pay",
    describe: (d) =>
      d.weeklyHolidayPay ? `매달 수입에 ${formatWonKorean(d.weeklyHolidayPay.monthlyIncome)} 추가` : null,
  },
  {
    key: "overtimePay",
    label: "연장·야간·휴일수당",
    href: "/overtime-pay",
    describe: (d) =>
      d.overtimePay ? `매달 수입에 ${formatWonKorean(d.overtimePay.monthlyIncome)} 추가` : null,
  },
  {
    key: "severancePay",
    label: "퇴직금",
    href: "/severance-pay",
    describe: (d) =>
      d.severancePay
        ? `${d.severancePay.year}년 ${d.severancePay.month}월에 ${formatWonKorean(d.severancePay.amount)} 1회 추가`
        : null,
  },
  {
    key: "unemploymentBenefit",
    label: "실업급여",
    href: "/unemployment-benefit",
    describe: (d) =>
      d.unemploymentBenefit
        ? `${d.unemploymentBenefit.year}년 ${d.unemploymentBenefit.month}월에 ${formatWonKorean(d.unemploymentBenefit.amount)} 1회 추가`
        : null,
  },
  {
    key: "annualLeavePay",
    label: "연차수당",
    href: "/annual-leave-pay",
    describe: (d) => (d.annualLeavePay ? `이번 달에 ${formatWonKorean(d.annualLeavePay.amount)} 1회 추가` : null),
  },
  {
    key: "suspensionPay",
    label: "휴업수당",
    href: "/suspension-pay",
    describe: (d) => (d.suspensionPay ? `이번 달에 ${formatWonKorean(d.suspensionPay.amount)} 1회 추가` : null),
  },
  {
    key: "dismissalNoticePay",
    label: "해고예고수당",
    href: "/dismissal-notice-pay",
    describe: (d) =>
      d.dismissalNoticePay ? `이번 달에 ${formatWonKorean(d.dismissalNoticePay.amount)} 1회 추가` : null,
  },
];

export function CalculatorLinksSection({ toggles, linkData, onToggle }: CalculatorLinksSectionProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-lg font-semibold">계산기 연동</h2>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        다른 계산기에서 계산한 값을 체크하면 이 잔고 계산에 자동으로 반영됩니다.
      </p>

      <div className="mt-3 flex flex-col gap-2">
        {ROWS.map((row) => {
          const description = row.describe(linkData);
          const hasData = description !== null;

          return (
            <div
              key={row.key}
              className="flex flex-col gap-2 rounded-lg bg-zinc-50 px-3 py-2 dark:bg-zinc-800/50"
            >
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={toggles[row.key]}
                  disabled={!hasData}
                  onChange={(e) => onToggle(row.key, e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-zinc-900 dark:accent-zinc-100"
                />
                <div className="flex flex-col">
                  <span className="text-sm">{row.label}</span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {hasData ? description : "아직 계산 기록이 없습니다."}
                  </span>
                </div>
              </label>
              <Link
                href={row.href}
                className="self-end rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium hover:bg-white dark:border-zinc-700 dark:hover:bg-zinc-900"
              >
                계산기로 이동
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
