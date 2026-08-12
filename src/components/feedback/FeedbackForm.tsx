"use client";

import { useState, type FormEvent } from "react";
import { WEB3FORMS_ACCESS_KEY } from "@/lib/feedback";
import { SITE_NAME } from "@/lib/seo";

type FeedbackType = "suggestion" | "bug";
type Status = "idle" | "submitting" | "success" | "error";

const TYPE_LABELS: Record<FeedbackType, string> = {
  suggestion: "건의사항",
  bug: "버그 제보",
};

export function FeedbackForm() {
  const [type, setType] = useState<FeedbackType>("suggestion");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [page, setPage] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus("submitting");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `[${TYPE_LABELS[type]}] ${SITE_NAME}`,
          from_name: `${SITE_NAME} 건의함`,
          유형: TYPE_LABELS[type],
          이름: name || "(입력 안 함)",
          답장받을_이메일: email || "(입력 안 함)",
          관련_페이지: page || "(입력 안 함)",
          내용: message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setPage("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-300">
        ✅ 잘 전달됐습니다. 읽어보고 반영할게요, 감사합니다!
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex gap-2">
        {(Object.keys(TYPE_LABELS) as FeedbackType[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
              type === t
                ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                : "border-zinc-300 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
            }`}
          >
            {t === "bug" ? "🐛" : "💡"} {TYPE_LABELS[t]}
          </button>
        ))}
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {type === "bug" ? "어떤 문제가 있었나요?" : "어떤 아이디어인가요?"}
        </span>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            type === "bug"
              ? "예: 4대보험료 계산기에서 월급 0원 입력하니 화면이 이상해요"
              : "예: 연말정산 환급액 계산기도 있으면 좋겠어요"
          }
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
        />
      </label>

      {type === "bug" && (
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            어느 계산기/페이지였나요? (선택)
          </span>
          <input
            type="text"
            value={page}
            onChange={(e) => setPage(e.target.value)}
            placeholder="예: 4대보험료 계산기"
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
          />
        </label>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">이름 (선택)</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            답장받을 이메일 (선택)
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="답장이 필요할 때만 입력하세요"
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
          />
        </label>
      </div>

      {status === "error" && (
        <p className="text-sm text-red-500">전송에 실패했어요. 잠시 후 다시 시도해주세요.</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {status === "submitting" ? "보내는 중..." : "보내기"}
      </button>
    </form>
  );
}
