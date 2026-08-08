import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { AnnualLeavePayCalculator } from "./AnnualLeavePayCalculator";

export const metadata: Metadata = {
  title: "연차수당 계산기 | 직장인 계산기 허브",
  description: "월급과 미사용 연차일수를 입력하면 통상임금 기준 연차수당을 계산해줍니다.",
};

export default function Page() {
  return (
    <CalculatorLayout
      title="연차수당 계산기"
      description="월급(통상임금)과 미사용 연차일수로 연차수당을 계산합니다."
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
    >
      <AnnualLeavePayCalculator />
    </CalculatorLayout>
  );
}
