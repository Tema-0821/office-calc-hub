import { formatWonKorean } from "@/lib/format";

interface NumberFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  suffix?: string;
  placeholder?: string;
  min?: number;
  helpText?: string;
}

export function NumberField({
  label,
  value,
  onChange,
  suffix,
  placeholder,
  min = 0,
  helpText,
}: NumberFieldProps) {
  const isMoney = suffix === "원";

  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="number"
          inputMode="numeric"
          min={min}
          placeholder={placeholder}
          value={Number.isFinite(value) && value !== 0 ? value : value === 0 ? 0 : ""}
          onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-right text-base tabular-nums focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
        />
        {suffix && (
          <span className="w-12 shrink-0 text-sm text-zinc-500 dark:text-zinc-400">{suffix}</span>
        )}
      </div>
      {isMoney && value !== 0 && (
        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
          {formatWonKorean(value)}
        </span>
      )}
      {helpText && <span className="text-xs text-zinc-500 dark:text-zinc-400">{helpText}</span>}
    </label>
  );
}
