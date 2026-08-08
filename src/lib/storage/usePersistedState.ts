"use client";

import { useEffect, useState } from "react";

// localStorage에 값을 저장하고, 마운트 후 복원하는 범용 훅.
// SSR 시엔 defaultValue로 렌더링하고, 클라이언트에서 마운트된 후에만 실제 저장값을
// 불러와야 hydration mismatch가 나지 않는다.
export function usePersistedState<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setValue(JSON.parse(raw) as T);
      }
    } catch {
      // 저장된 값이 손상됐으면 기본값을 유지한다.
    }
    setHydrated(true);
    // key는 이 훅의 수명 동안 바뀌지 않는다고 가정한다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value, hydrated]);

  return [value, setValue, hydrated] as const;
}
