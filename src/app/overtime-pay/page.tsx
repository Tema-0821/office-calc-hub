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
            정해진 시간 외에 더 일했다면 시급을 그대로 받는 게 아니라 <strong>가산율</strong>이
            붙습니다. 근로기준법 제56조가 정한 가산율은 근로 유형에 따라 다릅니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[380px] text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                  <th className="py-1.5 pr-2 font-medium">근로 유형</th>
                  <th className="py-1.5 font-medium">가산율</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                <tr>
                  <td className="py-1.5 pr-2">연장근로 (1일 8시간·1주 40시간 초과)</td>
                  <td className="py-1.5">+50%</td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-2">야간근로 (오후 10시~오전 6시)</td>
                  <td className="py-1.5">+50%</td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-2">휴일근로 (8시간 이내)</td>
                  <td className="py-1.5">+50%</td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-2">휴일근로 (8시간 초과분)</td>
                  <td className="py-1.5">+100%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            같은 시간이 연장근로이면서 동시에 야간근로에도 해당하면 두 가산율이 중복 적용됩니다.
          </p>
          <p>
            5인 미만 사업장은 근로기준법상 연장·야간·휴일 가산수당 규정이 적용되지 않을 수
            있습니다.
          </p>
          <p>
            <strong>계산 예시</strong>: 통상시급 10,320원인 근로자가 연장근로 2시간, 야간근로
            2시간, 휴일근로 3시간(그중 8시간 이내 2시간, 8시간 초과 1시간)을 했다면, 연장근로수당
            10,320원 × 1.5 × 2 ≈ 30,960원, 야간근로수당 10,320원 × 0.5 × 2 ≈ 10,320원, 휴일근로수당
            (8시간 이내) 10,320원 × 1.5 × 2 ≈ 30,960원, 휴일근로수당(8시간 초과) 10,320원 × 2 × 1 ≈
            20,640원으로, 합계는 약 9만 2,880원이 추가로 지급됩니다.
          </p>
          <p>
            <strong>포괄임금제와의 관계</strong>: 일부 회사는 연장·야간·휴일수당을 미리 월급에
            포함해서 지급하는 &ldquo;포괄임금제&rdquo;를 운영합니다. 이 경우에도 실제 초과근로시간에
            대한 법정 가산수당이 포괄임금에 포함된 금액보다 많다면, 그 차액은 추가로 지급받을 수
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
