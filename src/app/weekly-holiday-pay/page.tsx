import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { WeeklyHolidayPayCalculator } from "./WeeklyHolidayPayCalculator";

export const metadata: Metadata = {
  title: "주휴수당 계산기 (2026년 최저시급 기준) | 직장인 계산기 허브",
  description: "시급과 주 근무시간을 입력하면 주휴수당 지급 대상 여부와 예상 금액을 계산해줍니다.",
};

export default function Page() {
  return (
    <CalculatorLayout
      title="주휴수당 계산기"
      description="시급과 주 소정근로시간으로 주휴수당 지급 대상 여부와 금액을 계산합니다."
      accent="amber"
      guide={
        <>
          <p>
            주휴수당은 <strong>시급 × (주 소정근로시간 ÷ 40) × 8</strong> 공식으로 계산됩니다. 주
            40시간을 초과해서 일해도 주휴수당은 최대 8시간분까지만 인정됩니다.
          </p>
          <p>
            <strong>지급 조건</strong>: 1주 소정근로시간이 15시간 이상이고, 그 주에 결근 없이
            개근했을 때만 발생합니다. 근로자 본인의 사유로 하루라도 결근하면 그 주의 주휴수당은
            지급되지 않습니다.
          </p>
          <p>아르바이트, 계약직, 정규직 관계없이 조건을 충족하면 동일하게 적용됩니다.</p>
        </>
      }
    >
      <WeeklyHolidayPayCalculator />
    </CalculatorLayout>
  );
}
