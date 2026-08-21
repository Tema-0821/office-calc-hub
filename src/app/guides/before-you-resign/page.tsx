import { GuideLayout } from "@/components/guides/GuideLayout";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "퇴사 전 꼭 확인해야 할 5가지",
  description: "퇴직금, 실업급여, 연차수당 정산부터 4대보험 처리까지 퇴사 전 체크리스트입니다.",
  path: "/guides/before-you-resign",
});

export default function Page() {
  return (
    <GuideLayout
      title="퇴사 전 꼭 확인해야 할 5가지"
      date="2026-08-12"
      relatedCalculators={["severance-pay", "unemployment-benefit", "annual-leave-pay"]}
    >
      <p>
        퇴사를 앞두고 있다면 마지막 근무일까지 정리해야 할 일이 많아 놓치는 부분이 생기기
        쉽습니다. 돈과 직접 관련된 5가지를 미리 체크해두면 나중에 손해 보는 일을 줄일 수
        있습니다.
      </p>

      <section>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          1. 퇴직금 지급 조건과 예상 금액
        </h2>
        <p className="mt-2">
          퇴직금은 <strong>계속근로기간 1년 이상</strong>인 근로자에게만 지급됩니다. 1년을 며칠
          앞두고 퇴사하면 퇴직금을 받지 못할 수 있으니, 근속기간이 애매하다면 퇴사일을 며칠 늦출
          수 있는지부터 확인해보세요. 퇴직금은 퇴사 직전 3개월 평균임금을 기준으로 계산되고,
          법적으로 <strong>퇴직일로부터 14일 이내</strong>에 지급하는 것이 원칙입니다.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          2. 미사용 연차 정산
        </h2>
        <p className="mt-2">
          퇴사 시점까지 발생했지만 쓰지 못한 연차는 수당으로 정산받아야 합니다. 회사가 연차
          사용을 적법한 절차로 촉진하지 않았다면, 남은 연차일수만큼 통상임금 기준으로 수당을
          청구할 수 있습니다. 정산받을 금액을 미리 가늠해보고 싶다면 연차 발생일수부터 계산해본
          뒤 연차수당 계산기로 금액을 확인해보세요.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          3. 실업급여 수급 자격
        </h2>
        <p className="mt-2">
          실업급여(구직급여)는 원칙적으로 <strong>비자발적 이직</strong>인 경우에만 받을 수
          있습니다. 회사 사정으로 인한 권고사직, 계약 만료, 임금체불 등은 수급 자격이 인정되지만
          단순 개인 사정으로 인한 자진 퇴사는 원칙적으로 제외됩니다. 다만 육아, 통근 곤란,
          근로조건 악화처럼 법에서 정한 정당한 사유가 있다면 자진 퇴사여도 예외적으로 인정받을 수
          있습니다. 퇴사 사유를 회사와 어떻게 정리할지가 실업급여 수급 여부에 큰 영향을 미치니
          미리 확인해두는 게 좋습니다.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          4. 4대보험 상실신고와 건강보험 처리
        </h2>
        <p className="mt-2">
          퇴사하면 회사가 4대보험 상실신고를 하게 되는데, 이후 건강보험은 지역가입자로 자동
          전환되거나 <strong>임의계속가입</strong> 제도를 통해 일정 기간 직장가입자 자격을 유지할
          수 있습니다. 지역가입자로 전환되면 소득뿐 아니라 재산까지 반영되어 보험료가 오히려
          늘어나는 경우가 있어, 소득이 없는 공백기에는 임의계속가입 신청을 검토해볼 만합니다.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          5. 원천징수영수증과 퇴직소득세
        </h2>
        <p className="mt-2">
          퇴직금은 퇴직소득세 과세 대상이라 세전 금액 전부를 그대로 받는 건 아닙니다. 이직할
          회사에 제출할 <strong>근로소득 원천징수영수증</strong>도 함께 챙겨두면 연말정산이나 다음
          직장에서의 소득 합산 처리가 수월해집니다.
        </p>
      </section>

      <p>
        해고예고 없이 갑작스럽게 퇴사를 통보받은 경우라면 별도로 해고예고수당을 받을 수 있는지도
        함께 확인해보세요.
      </p>
    </GuideLayout>
  );
}
