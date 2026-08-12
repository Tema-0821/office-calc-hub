import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { buildMetadata } from "@/lib/seo";
import { SeverancePayCalculator } from "./SeverancePayCalculator";

export const metadata = buildMetadata({
  title: "퇴직금 계산기 (2026년 기준)",
  description:
    "입사일, 퇴사일, 최근 3개월 급여를 입력하면 근로기준법 평균임금 기준 예상 퇴직금을 계산해줍니다.",
  path: "/severance-pay",
});

export default function Page() {
  return (
    <CalculatorLayout
      title="퇴직금 계산기"
      description="입사일·퇴사일과 최근 3개월 급여로 평균임금 기준 예상 퇴직금을 계산합니다."
      accent="violet"
      guide={
        <>
          <p>
            퇴직금은 <strong>1일 평균임금 × 30일 × (재직일수 ÷ 365)</strong> 공식으로 계산됩니다. 1일
            평균임금은 퇴사 직전 3개월간 받은 임금 총액을 그 기간의 총 일수로 나눈 값입니다.
          </p>
          <p>
            상여금이나 연차수당이 있다면, 연간 총액의 3/12만큼을 평균임금 계산에 포함하는 것이
            일반적입니다. 이 계산기도 같은 방식을 사용합니다.
          </p>
          <p>
            <strong>지급 대상</strong>: 근로기준법상 퇴직금은 계속근로기간 1년 이상인 근로자에게만
            지급됩니다.
          </p>
        </>
      }
      faq={[
        {
          question: "근속기간이 1년이 안 되면 퇴직금을 못 받나요?",
          answer:
            "네, 근로기준법상 퇴직금은 계속근로기간이 1년 이상인 근로자에게만 지급됩니다. 1년 미만 재직 후 퇴사하면 퇴직금 지급 의무가 발생하지 않습니다.",
        },
        {
          question: "아르바이트나 계약직도 퇴직금을 받을 수 있나요?",
          answer:
            "네, 고용 형태와 관계없이 주 15시간 이상 근무하며 계속근로기간이 1년 이상이면 정규직·계약직·아르바이트 모두 동일하게 퇴직금 지급 대상입니다.",
        },
        {
          question: "퇴직금은 언제까지 지급되나요?",
          answer:
            "근로기준법 제36조에 따라 퇴직일로부터 14일 이내에 지급하는 것이 원칙입니다. 다만 당사자 간 합의로 지급 기일을 연장할 수 있습니다.",
        },
        {
          question: "퇴직금에서도 세금을 떼나요?",
          answer:
            "네, 퇴직금은 퇴직소득세 과세 대상입니다. 이 계산기는 세전 예상 퇴직금만 계산하며, 실제 수령액은 근속연수·공제 항목에 따른 퇴직소득세를 제외한 금액입니다.",
        },
      ]}
      related={["unemployment-benefit", "annual-leave-pay", "salary-converter"]}
    >
      <SeverancePayCalculator />
    </CalculatorLayout>
  );
}
