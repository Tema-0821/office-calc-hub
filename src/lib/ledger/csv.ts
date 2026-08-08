import { EXPENSE_CATEGORIES, type ExpenseCategory, type Transaction } from "./types";

const VALID_CATEGORIES = new Set(EXPENSE_CATEGORIES.map((c) => c.value));

export function transactionsToCsv(transactions: Transaction[]): string {
  const header = "date,amount,category,memo";
  const rows = transactions.map((tx) =>
    [tx.date, String(tx.amount), tx.category, csvEscape(tx.memo)].join(",")
  );
  return [header, ...rows].join("\n");
}

export function parseCsvToTransactions(csvText: string): Omit<Transaction, "id">[] {
  const lines = csvText.trim().split(/\r?\n/);
  const [, ...rows] = lines; // 첫 줄(헤더) 제외

  return rows
    .filter((line) => line.trim().length > 0)
    .map((line) => {
      const [date, amountStr, category, memo] = splitCsvLine(line);
      const amount = Number(amountStr);
      const safeCategory: ExpenseCategory = VALID_CATEGORIES.has(category as ExpenseCategory)
        ? (category as ExpenseCategory)
        : "etc";

      return {
        date: (date ?? "").trim(),
        amount: Number.isFinite(amount) ? amount : 0,
        category: safeCategory,
        memo: memo ?? "",
      };
    })
    .filter((tx) => tx.date.length > 0);
}

function csvEscape(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function splitCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}
