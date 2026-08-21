import { FaqSection } from "@/components/calculators/FaqSection";
import { CalculatorDirectory } from "@/components/home/CalculatorDirectory";
import { buildMetadata, SITE_NAME } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `${SITE_NAME} - 4대보험료·연봉·퇴직금·가계부 등 무료 계산기 모음`,
  description:
    "4대보험료, 연봉·월급, 주휴수당, 연차수당, 퇴직금, 실업급여, 부가가치세, 만 나이 계산기와 가계부까지 로그인 없이 무료로 이용할 수 있는 계산기 모음입니다.",
  path: "",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        {SITE_NAME}
      </h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        회원가입 없이, 무료로 바로 쓰는 직장인·근로자 계산기 모음입니다. 필요한 카테고리에서
        계산기를 골라보세요.
      </p>

      <div className="mt-6">
        <CalculatorDirectory />
      </div>

      <section className="mt-10 border-t border-zinc-200 pt-8 dark:border-zinc-800">
        <h2 className="text-lg font-semibold">이 사이트는요</h2>
        <div className="prose-sm mt-3 space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          <p>
            급여명세서를 볼 때마다 헷갈리는 4대보험료 공제액부터, 퇴직할 때 받을 퇴직금과 실업급여,
            부가가치세 같은 세금 계산까지 — 직장인과 근로자가 자주 필요로 하는 계산을 카테고리별로
            모아뒀습니다.
          </p>
          <p>
            모든 계산기는 <strong>로그인이나 회원가입 없이</strong> 바로 사용할 수 있고, 입력한
            값은 브라우저에만 저장되어 서버로 전송되지 않습니다. 가계부(잔고 시뮬레이터)를 쓰면
            월급·고정지출·할부금까지 반영해 매달 잔고가 어떻게 쌓이는지도 확인할 수 있습니다.
          </p>
          <p>
            <strong>이런 상황이라면 이 계산기를 써보세요</strong>: 입사·이직으로 새 연봉을
            협상할 땐 <strong>연봉·월급 환산기</strong>와 <strong>4대보험료 계산기</strong>를
            함께 써서 실수령액 감을 잡아보세요. 퇴사를 앞두고 있다면 <strong>퇴직금</strong>과{" "}
            <strong>실업급여</strong> 계산기로 받을 금액을 미리 확인할 수 있고, 갑자기 해고
            통보를 받았다면 <strong>해고예고수당</strong> 계산기로 정당한 보상 여부를 가늠해볼 수
            있습니다. 아르바이트나 시간제로 일한다면 <strong>주휴수당</strong>과{" "}
            <strong>최저임금</strong> 계산기로 제대로 받고 있는지 점검해보세요.
          </p>
          <p>
            급여·수당 계산은 근로기준법과 최저임금법에 정해진 공식을 그대로 따르지만, 회사마다
            비과세 수당 처리 방식이나 지급 기준일이 조금씩 달라서 실제 급여명세서와 완전히
            일치하지 않을 수 있습니다. 이 사이트의 계산기들은 &ldquo;대략 얼마 정도 나올지&rdquo;를
            빠르게 가늠하는 참고용 도구로 활용하시고, 정확한 금액은 회사 인사·급여 담당자나
            국민연금공단·근로복지공단 같은 관련 기관을 통해 확인하시길 권합니다.
          </p>
        </div>
      </section>

      <FaqSection
        items={[
          {
            question: "이 사이트는 완전히 무료인가요?",
            answer:
              "네, 모든 계산기를 무료로 제한 없이 사용할 수 있습니다. 광고를 통해 사이트 운영비를 충당하고 있습니다.",
          },
          {
            question: "회원가입이나 로그인이 필요한가요?",
            answer:
              "필요하지 않습니다. 모든 계산기는 로그인 없이 바로 사용할 수 있고, 가계부처럼 입력값을 저장하는 기능도 브라우저 자체에 저장되는 방식이라 별도 계정이 필요 없습니다.",
          },
          {
            question: "입력한 정보는 어디에 저장되나요?",
            answer:
              "서버로 전송되지 않고 사용하는 브라우저에만 저장됩니다(가계부 등 일부 계산기). 단순 계산기는 입력값을 저장하지 않고 그때그때 계산만 수행합니다.",
          },
          {
            question: "계산 결과를 그대로 믿어도 되나요?",
            answer:
              "공식 법령·요율을 기준으로 계산하지만, 참고용 수치입니다. 실제 급여·세금·수당 등은 개인 상황(부양가족, 비과세 항목 등)에 따라 달라질 수 있으니 정확한 금액은 관련 공공기관이나 회사 담당자를 통해 확인하세요.",
          },
        ]}
      />
    </div>
  );
}
