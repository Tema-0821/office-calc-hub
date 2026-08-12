import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { buildMetadata } from "@/lib/seo";
import { AnnualLeavePayCalculator } from "./AnnualLeavePayCalculator";

export const metadata = buildMetadata({
  title: "연차수당 계산기",
  description: "월급과 미사용 연차일수를 입력하면 통상임금 기준 연차수당을 계산해줍니다.",
  path: "/annual-leave-pay",
});

export default function Page() {
  return (
    <CalculatorLayout
      title="연차수당 계산기"
      description="월급(통상임금)과 미사용 연차일수로 연차수당을 계산합니다."
      accent="emerald"
      guide={
        <>
          <p>
            연차수당은 <strong>1일 통상임금 × 미사용 연차일수</strong>로 계산됩니다. 1일 통상임금은
            월급을 월 소정근로시간(209시간)으로 나눈 시급에 8시간을 곱해서 구합니다.
          </p>
          <p>
            연차는 1년간 80% 이상 출근한 근로자에게 발생하며, 입사 1년 미만인 경우에도 매월 개근 시
            1일씩 연차가 발생합니다. 발생한 연차를 사용하지 못하고 퇴사하거나 회사가 사용을
            촉진하지 않으면 미사용 연차는 수당으로 지급되어야 합니다.
          </p>
        </>
      }
      faq={[
        {
          question: "입사한 지 1년이 안 됐는데도 연차가 생기나요?",
          answer:
            "네, 입사 1년 미만이어도 매월 개근하면 그다음 달에 1일씩 연차가 발생합니다. 최대 11일까지 발생할 수 있습니다.",
        },
        {
          question: "회사가 연차 사용을 촉진했는데도 수당을 받을 수 있나요?",
          answer:
            "회사가 근로기준법에 정해진 절차대로 연차 사용을 적법하게 촉진했는데도 근로자가 사용하지 않았다면, 회사는 미사용 연차수당 지급 의무를 면제받을 수 있습니다. 촉진 절차를 제대로 밟았는지가 쟁점이 됩니다.",
        },
        {
          question: "통상임금과 평균임금은 뭐가 다른가요?",
          answer:
            "통상임금은 소정근로시간에 대해 정기적·일률적으로 지급하기로 정해진 시급성 임금이고, 연차수당은 이 통상임금을 기준으로 계산합니다. 반면 퇴직금은 최근 3개월 실제 지급액 기준의 평균임금을 사용해 계산 방식이 다릅니다.",
        },
        {
          question: "퇴사할 때 남은 연차도 수당으로 받을 수 있나요?",
          answer:
            "네, 퇴사 시점까지 발생했지만 사용하지 못한 연차는 미사용 연차수당으로 정산해서 지급받아야 합니다.",
        },
      ]}
    >
      <AnnualLeavePayCalculator />
    </CalculatorLayout>
  );
}
