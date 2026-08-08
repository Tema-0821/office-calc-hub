import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { SeverancePayCalculator } from "./SeverancePayCalculator";

export const metadata: Metadata = {
  title: "퇴직금 계산기 (2026년 기준) | 직장인 계산기 허브",
  description:
    "입사일, 퇴사일, 최근 3개월 급여를 입력하면 근로기준법 평균임금 기준 예상 퇴직금을 계산해줍니다.",
};

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
    >
      <SeverancePayCalculator />
    </CalculatorLayout>
  );
}
