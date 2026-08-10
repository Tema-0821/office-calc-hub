"use client";

import { useLayoutEffect, useState } from "react";

export function ThemeToggle() {
  // 서버는 항상 라이트 아이콘을 그린다. 여기서도 초기값을 false로 맞춰야
  // 클라이언트 첫 렌더가 서버와 일치해서 hydration mismatch가 나지 않는다.
  const [isDark, setIsDark] = useState(false);

  // 페인트 전에 실행되므로, 저장된 값이 dark였다면 깜빡임 없이 아이콘만 바로잡는다.
  // <head> 인라인 스크립트가 이미 data-theme 속성 자체는 맞춰 놓은 상태다.
  useLayoutEffect(() => {
    // 외부 시스템(DOM 속성)에서 실제 값을 읽어와 동기화하는 것이라 정당한 예외.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  function toggle() {
    const next = isDark ? "light" : "dark";
    setIsDark(!isDark);
    document.documentElement.setAttribute("data-theme", next);
    window.localStorage.setItem("theme", next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      className="flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
      )}
      <span>{isDark ? "라이트모드" : "다크모드"}</span>
    </button>
  );
}
