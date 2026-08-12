import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "개인정보처리방침",
  description: "직장인 계산기 허브의 개인정보처리방침과 광고(쿠키) 안내입니다.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-bold tracking-tight">개인정보처리방침</h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">최종 수정일: 2026년 8월 8일</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <section>
          <h2 className="mb-2 text-lg font-semibold">1. 수집하는 정보</h2>
          <p>
            직장인 계산기 허브(이하 &ldquo;본 사이트&rdquo;)는 회원가입이나 로그인 없이 이용할 수
            있으며, 계산기에 입력하는 급여·근무시간 등의 정보는 브라우저 내에서만 계산에 사용되고
            서버로 전송되거나 저장되지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold">2. 쿠키 및 광고</h2>
          <p>
            본 사이트는 Google AdSense를 통해 광고를 게재하며, Google 및 파트너는 사용자의 관심사에
            기반한 광고를 제공하기 위해 쿠키를 사용할 수 있습니다. 사용자는{" "}
            <a
              href="https://adssettings.google.com/"
              className="underline hover:no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google 광고 설정
            </a>
            에서 맞춤형 광고를 비활성화할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold">3. 문의</h2>
          <p>
            개인정보처리방침 관련 문의는 아래 이메일로 연락해 주세요.
            <br />
            이메일: siolife476@gmail.com
          </p>
        </section>
      </div>
    </div>
  );
}
