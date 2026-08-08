import { createDefaultLedgerData, type LedgerData } from "./types";

const STORAGE_KEY = "office-calc-hub:ledger:v1";

export function loadLedgerData(): LedgerData {
  const defaults = createDefaultLedgerData();
  if (typeof window === "undefined") return defaults;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;

    const parsed = JSON.parse(raw) as Partial<LedgerData>;
    return {
      settings: { ...defaults.settings, ...parsed.settings },
      transactions: Array.isArray(parsed.transactions) ? parsed.transactions : [],
    };
  } catch {
    return defaults;
  }
}

export function saveLedgerData(data: LedgerData): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
