import { GuideLayout } from "@/components/guides/GuideLayout";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "최저임금과 주휴수당, 제대로 받고 있나요?",
  description: "2026년 최저임금 기준과 주휴수당 지급 조건, 흔한 위반 사례를 정리했습니다.",
  path: "/guides/minimum-wage-and-weekly-holiday-pay",
});

export default function Page() {
  return (
    <GuideLayout
      title="최저임금과 주휴수당, 제대로 받고 있나요?"
      date="2026-08-12"
      relatedCalculators={["minimum-wage", "weekly-holiday-pay", "hourly-wage"]}
    >
      <p>
        아르바이트나 시간제로 일한다면 &ldquo;최저임금은 넘겼으니 괜찮겠지&rdquo;라고 넘기기
        쉽지만, 실제로는 최저임금과 주휴수당을 함께 따져봐야 제대로 받고 있는지 알 수 있습니다.
      </p>

      <section>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          2026년 최저임금은 얼마인가요
        </h2>
        <p className="mt-2">
          2026년 최저시급은 <strong>10,320원</strong>입니다. 최저임금위원회가 매년 심의해서
          고용노동부 장관이 고시하며, 매년 1월 1일부터 새 금액이 적용됩니다. 시급뿐 아니라
          월급으로 급여를 받는 경우에도 월급을 시급으로 환산했을 때 최저시급 이상이어야 합니다.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          최저임금 계산에서 흔히 착각하는 부분
        </h2>
        <p className="mt-2">
          월급 총액이 최저 월급(2026년 기준 약 215만원, 209시간 기준)보다 많다고 해서 무조건
          최저임금을 준수한 건 아닙니다. 연장·야간·휴일근로수당처럼 소정근로시간 외 근로에 대한
          대가나, 매달 정기적으로 지급되지 않는 상여금·복리후생비 일부는 최저임금 산입범위에서
          제외됩니다. 이런 항목이 월급에 많이 섞여 있다면 겉보기 총액과 달리 실제로는 최저임금에
          미달할 수 있습니다.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          주휴수당, 조건을 다시 확인해보세요
        </h2>
        <p className="mt-2">
          주휴수당은 <strong>1주 소정근로시간이 15시간 이상</strong>이고, 그 주에 결근 없이
          <strong>개근</strong>했을 때 발생합니다. 시급 10,320원에 주 40시간을 일했다면
          주휴수당은 82,560원, 한 달로 환산하면 약 35만 8천원이 추가됩니다. 문제는 시급제·일급제로
          급여를 받는 경우 주휴수당이 급여명세서에 별도 항목으로 표시되지 않아, 실제로 받고
          있는지조차 모르고 넘어가는 경우가 많다는 점입니다.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          흔한 위반 사례
        </h2>
        <p className="mt-2">
          현장에서 자주 보이는 위반 사례로는, 주휴수당을 아예 지급하지 않으면서 시급만 최저임금에
          맞추는 경우, 수습기간이라는 이유로 근로계약 기간이나 감액 조건을 확인하지 않고 최저임금의
          90% 미만을 지급하는 경우, 그리고 근로계약서를 아예 작성하지 않아 소정근로시간이나
          시급이 명확하지 않은 경우가 있습니다.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          위반이 의심된다면
        </h2>
        <p className="mt-2">
          최저임금법을 위반하면 사용자는 3년 이하의 징역 또는 2천만원 이하의 벌금에 처해질 수
          있습니다. 고용노동부 고객센터(국번없이 1350)나 관할 지방고용노동관서에 신고할 수 있고,
          임금체불 진정도 함께 검토해볼 수 있습니다.
        </p>
      </section>

      <p>
        내가 받는 시급이나 월급이 최저임금 기준을 충족하는지, 주휴수당을 포함하면 얼마를 더 받아야
        하는지는 최저임금 계산기와 주휴수당 계산기에 숫자만 입력하면 바로 확인할 수 있습니다.
      </p>
    </GuideLayout>
  );
}
