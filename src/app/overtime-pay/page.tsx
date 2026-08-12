import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { buildMetadata } from "@/lib/seo";
import { OvertimePayCalculator } from "./OvertimePayCalculator";

export const metadata = buildMetadata({
  title: "연장·야간·휴일수당 계산기",
  description: "통상시급과 연장·야간·휴일 근로시간을 입력하면 근로기준법 기준 가산수당을 계산해줍니다.",
  path: "/overtime-pay",
});

export default function Page() {
  return (
    <CalculatorLayout
      title="연장·야간·휴일수당 계산기"
      description="통상시급과 연장·야간·휴일 근로시간으로 가산수당을 계산합니다."
      accent="orange"
      guide={
        <>
          <p>
            근로기준법 제56조에 따라 <strong>연장근로</strong>(1일 8시간·1주 40시간 초과)와{" "}
            <strong>휴일근로</strong>(8시간 이내)는 통상임금의 <strong>50%</strong>를 가산해서
            지급해야 합니다.
          </p>
          <p>
            <strong>휴일근로가 8시간을 초과</strong>하면 그 초과분은 통상임금의{" "}
            <strong>100%</strong>를 가산합니다. <strong>야간근로</strong>(오후 10시~오전 6시)는
            별도로 통상임금의 50%를 가산합니다.
          </p>
          <p>
            5인 미만 사업장은 근로기준법상 연장·야간·휴일 가산수당 규정이 적용되지 않을 수
            있습니다.
          </p>
        </>
      }
      faq={[
        {
          question: "5인 미만 사업장도 가산수당을 받을 수 있나요?",
          answer:
            "상시근로자 5인 미만 사업장은 근로기준법의 연장·야간·휴일 가산수당 규정이 적용되지 않습니다. 다만 회사 내규나 근로계약으로 별도로 정했다면 그에 따를 수 있습니다.",
        },
        {
          question: "야간근로와 연장근로가 겹치면 어떻게 계산하나요?",
          answer:
            "같은 시간에 연장근로와 야간근로가 동시에 해당하면 두 가산율(각 50%)이 중복 적용되어 통상임금의 100%가 가산됩니다. 이 계산기에서는 겹치는 시간만큼을 야간근로시간에 별도로 더해서 입력하면 됩니다.",
        },
      ]}
      related={["hourly-wage", "weekly-holiday-pay", "annual-leave-days"]}
    >
      <OvertimePayCalculator />
    </CalculatorLayout>
  );
}
