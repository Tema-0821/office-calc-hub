import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { buildMetadata } from "@/lib/seo";
import { MinimumWageCalculator } from "./MinimumWageCalculator";

export const metadata = buildMetadata({
  title: "최저임금 계산기 (2026년 기준)",
  description: "2026년 최저시급 기준으로 일급·주급·월급을 계산하고, 내 시급이 최저임금 위반인지 확인해줍니다.",
  path: "/minimum-wage",
});

export default function Page() {
  return (
    <CalculatorLayout
      title="최저임금 계산기"
      description="2026년 최저시급 기준으로 일급·주급·월급을 계산하고 최저임금 준수 여부를 확인합니다."
      accent="fuchsia"
      guide={
        <>
          <p>
            &ldquo;최저시급 이상만 주면 문제없다&rdquo;고 생각하기 쉽지만, 월급으로 받는
            경우에도 시급으로 환산했을 때 기준을 넘어야 합니다. 2026년 최저시급은{" "}
            <strong>10,320원</strong>이며, 최저임금위원회가 매년 심의해 고용노동부 장관이 고시하고
            1월 1일부터 새 금액이 적용됩니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[320px] text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                  <th className="py-1.5 pr-2 font-medium">기준</th>
                  <th className="py-1.5 font-medium">2026년 최저 금액</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                <tr>
                  <td className="py-1.5 pr-2">시급</td>
                  <td className="py-1.5">10,320원</td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-2">일급 (8시간)</td>
                  <td className="py-1.5">82,560원</td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-2">주급 (주휴 포함 48시간)</td>
                  <td className="py-1.5">495,360원</td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-2">월급 (209시간)</td>
                  <td className="py-1.5">2,156,880원</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <strong>계산 예시</strong>: 2026년 최저시급 10,320원을 기준으로 하면, 하루 8시간
            근무 시 최저 일급은 10,320원 × 8 = 82,560원, 주휴수당을 포함한 주 48시간 기준 최저
            주급은 10,320원 × 48 = 495,360원, 월 소정근로시간 209시간 기준 최저 월급은 10,320원
            × 209 = 2,156,880원입니다.
          </p>
          <p>
            <strong>최저임금 산입범위에서 빠지는 항목</strong>: 연장·야간·휴일근로수당처럼
            소정근로시간 외의 근로에 대한 대가, 연차수당, 그리고 매달 정기적으로 지급되지 않는
            상여금·복리후생비 일부는 최저임금 위반 여부를 판단할 때 포함되지 않습니다. 즉 월급
            총액이 최저 월급보다 많더라도, 그 안에 이런 항목이 많이 섞여 있다면 실제로는 최저임금
            위반일 수 있습니다.
          </p>
        </>
      }
      faq={[
        {
          question: "최저임금보다 적게 받으면 어떻게 해야 하나요?",
          answer:
            "사용자가 최저임금에 미달하는 금액을 지급하면 최저임금법 위반으로 3년 이하의 징역 또는 2천만원 이하의 벌금에 처해질 수 있습니다. 고용노동부 고객센터(국번없이 1350)나 관할 지방고용노동관서에 신고할 수 있습니다.",
        },
        {
          question: "최저임금에 식대나 교통비도 포함되나요?",
          answer:
            "정기적으로 지급되는 상여금과 복리후생비 중 일부는 최저임금 산입범위에 포함될 수 있습니다. 다만 매월 정기적으로 지급되지 않는 상여금이나 특정 항목의 복리후생비는 제외되는 등 세부 기준이 있어, 정확한 판단은 고용노동부 안내를 참고하는 것이 좋습니다.",
        },
        {
          question: "아르바이트생도 최저임금을 적용받나요?",
          answer:
            "네, 고용 형태(정규직·계약직·아르바이트·단시간 근로 등)와 관계없이 근로자라면 누구나 최저임금을 적용받습니다.",
        },
      ]}
      related={["hourly-wage", "weekly-holiday-pay", "four-insurance"]}
    >
      <MinimumWageCalculator />
    </CalculatorLayout>
  );
}
