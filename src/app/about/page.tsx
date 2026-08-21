import Link from "next/link";
import { buildMetadata, SITE_NAME } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "사이트 소개",
  description: `${SITE_NAME}가 어떤 사이트인지, 왜 만들었는지 소개합니다.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        사이트 소개
      </h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            왜 만들었나요
          </h2>
          <p>
            급여명세서의 4대보험 공제액, 퇴직할 때 받을 퇴직금, 아르바이트를 하며 제대로 받고
            있는지 궁금한 주휴수당까지 — 직장인과 근로자가 살면서 한 번쯤은 마주치는 계산들을
            정리하고 싶어서 {SITE_NAME}를 만들었습니다. 검색해도 광고가 너무 많거나, 계산 근거가
            불분명한 사이트가 많아서 직접 근로기준법·최저임금법 등 공식 법령과 요율을 기준으로
            계산 로직을 만들었습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            무엇을 제공하나요
          </h2>
          <p>
            4대보험료, 연봉·월급 환산, 통상임금, 최저임금, 주휴수당, 연차수당·연차 발생일수,
            연장·야간·휴일수당, 퇴직금, 실업급여, 휴업수당, 해고예고수당, 부가가치세, 만 나이
            계산기까지 급여·근로 관련 계산기 15종을 무료로 제공합니다. 회원가입이나 로그인 없이
            바로 사용할 수 있고, 계산 근거가 되는 법 조항이나 요율도 계산기 페이지마다 함께
            설명해뒀습니다. 계산기만으로 다 담기 어려운 실무 정보는{" "}
            <Link href="/guides" className="underline hover:no-underline">
              가이드
            </Link>{" "}
            글로 따로 정리하고 있습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            가계부(잔고 시뮬레이터)는 뭔가요
          </h2>
          <p>
            월급, 고정지출, 그날그날의 지출을 기록하면 매달 잔고가 어떻게 쌓이는지 보여주는
            가계부형 도구입니다. 다른 계산기(4대보험료, 실업급여 등)에서 계산한 결과를 체크
            한 번으로 잔고 계산에 반영할 수 있어, 매달 같은 값을 다시 입력할 필요가 없습니다.
            데이터는 서버가 아니라 사용하는 브라우저에만 저장됩니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            정확성에 대한 약속과 한계
          </h2>
          <p>
            모든 계산기는 공식 법령과 최신 요율을 기준으로 만들었지만, 회사마다 비과세 수당 처리
            방식이 다르고 개인마다 부양가족 수·소득 상황이 달라서 실제 급여명세서와 정확히
            일치하지 않을 수 있습니다. 이 사이트의 계산 결과는 &ldquo;대략 얼마 정도 나올지&rdquo;를
            빠르게 가늠하는 참고용 자료이며, 법적 효력이 있는 공식 수치가 필요하다면 국민연금공단,
            국민건강보험공단, 고용노동부, 국세청 등 관련 기관이나 회사 담당자를 통해 확인하시기
            바랍니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            문의 및 건의
          </h2>
          <p>
            계산 결과가 이상하거나 있으면 좋겠는 기능이 있다면{" "}
            <Link href="/feedback" className="underline hover:no-underline">
              건의·버그 제보
            </Link>{" "}
            페이지에서 편하게 남겨주세요. 개인정보 처리와 관련된 문의는{" "}
            <Link href="/privacy" className="underline hover:no-underline">
              개인정보처리방침
            </Link>{" "}
            페이지의 이메일로 연락해 주세요.
          </p>
        </section>
      </div>
    </div>
  );
}
