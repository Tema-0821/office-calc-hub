"use client";

import { useCallback, useEffect, useState } from "react";
import { loadLedgerData, saveLedgerData } from "./storage";
import {
  createDefaultLedgerData,
  type FixedExpense,
  type InstallmentExpense,
  type LedgerData,
  type LedgerSettings,
  type Transaction,
} from "./types";

// localStorage 기반 저장소. 나중에 로그인+클라우드 동기화로 바꿀 때는
// loadLedgerData/saveLedgerData만 서버 호출로 교체하면 되고, 이 훅을 쓰는
// 화면 컴포넌트들은 수정할 필요가 없도록 설계했다.
export function useLedger() {
  const [data, setData] = useState<LedgerData>(createDefaultLedgerData);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // localStorage는 서버 렌더링 시 접근할 수 없어, 마운트 후에만 실제 값을 불러와야
    // SSR 결과와 클라이언트 초기 렌더가 어긋나는 hydration mismatch를 피할 수 있다.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData(loadLedgerData());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveLedgerData(data);
  }, [data, hydrated]);

  const updateSettings = useCallback((patch: Partial<LedgerSettings>) => {
    setData((prev) => ({ ...prev, settings: { ...prev.settings, ...patch } }));
  }, []);

  const addFixedExpense = useCallback((expense: Omit<FixedExpense, "id">) => {
    setData((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        fixedExpenses: [...prev.settings.fixedExpenses, { ...expense, id: crypto.randomUUID() }],
      },
    }));
  }, []);

  const removeFixedExpense = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        fixedExpenses: prev.settings.fixedExpenses.filter((expense) => expense.id !== id),
      },
    }));
  }, []);

  const addInstallmentExpense = useCallback((installment: Omit<InstallmentExpense, "id">) => {
    setData((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        installmentExpenses: [
          ...prev.settings.installmentExpenses,
          { ...installment, id: crypto.randomUUID() },
        ],
      },
    }));
  }, []);

  const removeInstallmentExpense = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        installmentExpenses: prev.settings.installmentExpenses.filter(
          (installment) => installment.id !== id
        ),
      },
    }));
  }, []);

  const addTransaction = useCallback((tx: Omit<Transaction, "id">) => {
    setData((prev) => ({
      ...prev,
      transactions: [...prev.transactions, { ...tx, id: crypto.randomUUID() }],
    }));
  }, []);

  const removeTransaction = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      transactions: prev.transactions.filter((tx) => tx.id !== id),
    }));
  }, []);

  const importTransactions = useCallback((txs: Omit<Transaction, "id">[]) => {
    setData((prev) => ({
      ...prev,
      transactions: [...prev.transactions, ...txs.map((tx) => ({ ...tx, id: crypto.randomUUID() }))],
    }));
  }, []);

  return {
    data,
    hydrated,
    updateSettings,
    addFixedExpense,
    removeFixedExpense,
    addInstallmentExpense,
    removeInstallmentExpense,
    addTransaction,
    removeTransaction,
    importTransactions,
  };
}
