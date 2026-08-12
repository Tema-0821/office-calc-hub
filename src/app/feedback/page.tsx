import Link from "next/link";
import { FeedbackForm } from "@/components/feedback/FeedbackForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "건의사항·버그 제보",
  description: "직장인 계산기 허브에 건의사항이나 버그를 남겨주세요. 바로 이메일로 전달됩니다.",
  path: "/feedback",
});

export default function FeedbackPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-10">
      <Link href="/" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
        ← 홈
      </Link>
      <h1 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        건의사항·버그 제보
      </h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        계산 결과가 이상하거나, 있으면 좋겠는 기능이 있다면 편하게 남겨주세요. 별도 로그인 없이
        바로 전달됩니다.
      </p>

      <div className="mt-6">
        <FeedbackForm />
      </div>

      <p className="mt-4 text-xs text-zinc-400">
        입력하신 내용은 답장을 위해서만 사용되며, 다른 목적으로 저장되거나 공유되지 않습니다.
      </p>
    </div>
  );
}
