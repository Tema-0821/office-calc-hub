interface ResultRowProps {
  label: string;
  value: string;
  emphasis?: boolean;
}

export function ResultRow({ label, value, emphasis }: ResultRowProps) {
  return (
    <div
      className={
        emphasis
          ? "flex items-center justify-between border-t border-zinc-200 pt-3 text-base font-bold dark:border-zinc-700"
          : "flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400"
      }
    >
      <span>{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}
