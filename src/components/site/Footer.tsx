import Link from "next/link";
import { SITE_NAME } from "@/lib/seo";

export function Footer() {
  return (
    <footer className="border-t border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-[1536px] flex-col gap-2 px-6 py-8 text-xs text-zinc-500 dark:text-zinc-400">
        <p>
          모든 계산 결과는 참고용이며 법적 효력이 없습니다. 정확한 금액은 관련 공공기관(국민연금공단,
          국민건강보험공단, 고용노동부 등)의 공식 정보를 통해 확인하세요.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/about" className="hover:text-zinc-900 dark:hover:text-zinc-100">
            사이트 소개
          </Link>
          <Link href="/guides" className="hover:text-zinc-900 dark:hover:text-zinc-100">
            가이드
          </Link>
          <Link href="/privacy" className="hover:text-zinc-900 dark:hover:text-zinc-100">
            개인정보처리방침
          </Link>
          <span>&copy; {new Date().getFullYear()} {SITE_NAME}</span>
        </div>
      </div>
    </footer>
  );
}
