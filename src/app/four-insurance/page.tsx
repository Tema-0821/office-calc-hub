import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { FourInsuranceCalculator } from "./FourInsuranceCalculator";

export const metadata: Metadata = {
  title: "4대보험료 계산기 (2026년 기준) | 직장인 계산기 허브",
  description:
    "월급을 입력하면 국민연금, 건강보험, 장기요양보험, 고용보험 근로자 부담분과 예상 실수령액을 바로 계산해줍니다.",
};

export default function Page() {
  return (
    <CalculatorLayout
      title="4대보험료 계산기"
      description="2026년 기준 요율로 월급에서 공제되는 4대보험 근로자 부담분을 계산합니다."
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
    >
      <FourInsuranceCalculator />
    </CalculatorLayout>
  );
}
