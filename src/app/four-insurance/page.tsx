import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { buildMetadata } from "@/lib/seo";
import { FourInsuranceCalculator } from "./FourInsuranceCalculator";

export const metadata = buildMetadata({
  title: "4대보험료 계산기 (2026년 기준)",
  description:
    "월급을 입력하면 국민연금, 건강보험, 장기요양보험, 고용보험 근로자 부담분과 예상 실수령액을 바로 계산해줍니다.",
  path: "/four-insurance",
});

export default function Page() {
  return (
    <CalculatorLayout
      title="4대보험료 계산기"
      description="2026년 기준 요율로 월급에서 공제되는 4대보험 근로자 부담분을 계산합니다."
      accent="blue"
      guide={
        <>
          <p>
            4대보험료는 국민연금, 건강보험, 장기요양보험, 고용보험 네 가지로 구성되며, 원칙적으로
            근로자와 사업주가 절반씩 부담합니다. 이 계산기는 근로자가 실제로 월급에서 공제받는 금액만
            보여줍니다.
          </p>
          <p>
            <strong>국민연금</strong>은 기준소득월액에 상한액과 하한액이 있어, 월급이 매우 높거나 낮으면
            실제 급여가 아닌 상한·하한 기준으로 계산됩니다.
          </p>
          <p>
            <strong>주의</strong>: 이 계산기는 4대보험료만 계산하며, 소득세·지방소득세는 포함하지
            않습니다. 소득세는 부양가족 수 등 개인 상황에 따라 국세청 근로소득 간이세액표 기준으로
            별도 결정됩니다.
          </p>
        </>
      }
      faq={[
        {
          question: "4대보험료는 왜 근로자와 회사가 절반씩 부담하나요?",
          answer:
            "국민연금·건강보험·장기요양보험·고용보험 모두 법으로 근로자와 사업주가 보험료를 절반씩 나눠 부담하도록 정해져 있습니다. 이 계산기는 그중 근로자가 월급에서 실제로 공제당하는 절반만 계산합니다.",
        },
        {
          question: "산재보험은 왜 이 계산기에 없나요?",
          answer:
            "산재보험은 4대보험 중 유일하게 사업주가 전액 부담하는 보험이라 근로자의 월급에서 공제되지 않습니다. 그래서 실수령액 계산에는 포함하지 않았습니다.",
        },
        {
          question: "이 계산기로 나온 금액이 실제 월급명세서와 다를 수 있나요?",
          answer:
            "네, 다를 수 있습니다. 국민연금은 기준소득월액 상한·하한이 적용되고, 회사에 따라 비과세 수당(식대 등)을 제외한 금액으로 보험료를 산정하기도 합니다. 정확한 금액은 급여명세서나 회사 담당자를 통해 확인하세요.",
        },
        {
          question: "소득세도 이 계산기에서 계산되나요?",
          answer:
            "아니요, 이 계산기는 4대보험료만 계산합니다. 소득세·지방소득세는 부양가족 수 등에 따라 국세청 근로소득 간이세액표를 기준으로 별도 결정되며, 이 사이트에서는 아직 제공하지 않습니다.",
        },
      ]}
    >
      <FourInsuranceCalculator />
    </CalculatorLayout>
  );
}
