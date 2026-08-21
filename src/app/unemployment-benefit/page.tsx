import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { buildMetadata } from "@/lib/seo";
import { UnemploymentBenefitCalculator } from "./UnemploymentBenefitCalculator";

export const metadata = buildMetadata({
  title: "실업급여(구직급여) 계산기 (2026년 기준)",
  description:
    "퇴직 전 3개월 평균임금, 나이, 고용보험 가입기간을 입력하면 2026년 기준 예상 구직급여를 계산해줍니다.",
  path: "/unemployment-benefit",
});

export default function Page() {
  return (
    <CalculatorLayout
      title="실업급여(구직급여) 계산기"
      description="퇴직 전 3개월 평균임금과 나이, 고용보험 가입기간으로 예상 구직급여를 계산합니다."
      accent="sky"
      guide={
        <>
          <p>
            구직급여는 <strong>1일 평균임금 × 60%</strong>로 계산하되, 2026년 기준 1일 상한액
            68,100원과 하한액 66,048원 사이에서 결정됩니다. 하한액은 최저시급의 80%에 1일
            소정근로시간(8시간)을 곱해 정해집니다.
          </p>
          <p>
            <strong>소정급여일수</strong>(총 지급일수)는 이직 당시 만 나이와 고용보험 가입기간에
            따라 120일에서 270일까지 차등 적용됩니다. 만 50세 이상이거나 장애인이면 같은
            가입기간이라도 더 긴 일수를 받습니다.
          </p>
          <p>
            <strong>주의</strong>: 이 계산기는 지급 대상임을 전제로 한 예상 금액만 보여줍니다.
            실제 수급 자격(비자발적 이직 여부, 구직활동 요건 등)은 고용24 또는 거주지 고용센터를
            통해 별도로 확인해야 합니다.
          </p>
          <p>
            <strong>계산 예시</strong>: 퇴직 전 3개월간 받은 임금이 총 900만원이고 그 기간이
            92일이라면, 1일 평균임금은 900만원 ÷ 92일 ≈ 97,826원입니다. 이 금액의 60%는 약
            58,696원으로 2026년 하한액(66,048원)보다 낮기 때문에, 실제로는 하한액이 적용됩니다.
            35세, 고용보험 가입기간 3년이라면 소정급여일수는 180일이므로, 예상 총 수령액은
            66,048원 × 180일 ≈ 1,188만 8,640원이 됩니다.
          </p>
          <p>
            <strong>신청 절차</strong>: 퇴사 후 고용24 홈페이지에서 구직등록을 하고, 거주지
            관할 고용센터에서 수급자격 인정을 신청해야 합니다. 신청일로부터 7일간은 대기기간으로
            급여가 지급되지 않고, 이후 4주(취업 취약계층은 8주)마다 실업인정을 받아야 계속
            지급됩니다.
          </p>
        </>
      }
      faq={[
        {
          question: "자발적으로 퇴사해도 실업급여를 받을 수 있나요?",
          answer:
            "원칙적으로 자발적 이직(자진 퇴사)은 수급 자격이 제한됩니다. 다만 임금체불, 근로조건 악화, 육아 등 정당한 사유가 인정되면 예외적으로 받을 수 있습니다. 이 계산기는 수급 자격이 있다는 것을 전제로 예상 금액만 계산합니다.",
        },
        {
          question: "1일 구직급여 상한액과 하한액은 왜 있나요?",
          answer:
            "평균임금이 매우 높은 사람이 소득 대비 과도한 급여를 받거나, 반대로 임금이 낮은 사람이 생활이 어려울 정도로 적게 받는 것을 막기 위해 고용보험법에서 1일 지급액의 상·하한을 정해두고 있습니다.",
        },
        {
          question: "소정급여일수가 남았는데 재취업하면 어떻게 되나요?",
          answer:
            "재취업하면 그 시점부터 구직급여 지급이 중단됩니다. 다만 조기에 재취업하면 남은 소정급여일수의 일부를 조기재취업수당으로 받을 수 있는 별도 제도가 있습니다.",
        },
        {
          question: "실업급여는 세금을 떼나요?",
          answer:
            "아니요, 구직급여는 비과세 소득으로 소득세가 부과되지 않습니다.",
        },
      ]}
      related={["severance-pay", "salary-converter", "four-insurance"]}
    >
      <UnemploymentBenefitCalculator />
    </CalculatorLayout>
  );
}
