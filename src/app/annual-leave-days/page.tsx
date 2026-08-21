import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { buildMetadata } from "@/lib/seo";
import { AnnualLeaveDaysCalculator } from "./AnnualLeaveDaysCalculator";

export const metadata = buildMetadata({
  title: "연차 발생일수 계산기",
  description: "입사일을 입력하면 근로기준법 기준으로 지금까지 발생한 연차 일수를 계산해줍니다.",
  path: "/annual-leave-days",
});

export default function Page() {
  return (
    <CalculatorLayout
      title="연차 발생일수 계산기"
      description="입사일과 기준일로 지금까지 발생한 연차 일수를 계산합니다."
      accent="pink"
      guide={
        <>
          <p>
            연차는 입사와 동시에 한꺼번에 생기는 게 아니라 근속기간에 따라 단계적으로 쌓입니다.
            근로기준법 제60조 기준으로 정리하면 다음과 같습니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[320px] text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                  <th className="py-1.5 pr-2 font-medium">근속기간</th>
                  <th className="py-1.5 font-medium">발생 연차</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                <tr>
                  <td className="py-1.5 pr-2">1년 미만</td>
                  <td className="py-1.5">매월 개근 시 1일씩 (최대 11일)</td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-2">1~2년</td>
                  <td className="py-1.5">15일</td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-2">3~4년</td>
                  <td className="py-1.5">16일</td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-2">5~6년</td>
                  <td className="py-1.5">17일</td>
                </tr>
                <tr>
                  <td className="py-1.5 pr-2">21년 이상</td>
                  <td className="py-1.5">25일 (상한)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>3년차부터는 2년마다 1일씩 가산되어 최대 25일까지 늘어납니다.</p>
          <p>
            발생한 연차를 실제로 얼마 받을 수 있는지 금액으로 확인하고 싶다면 연차수당 계산기를
            함께 사용해보세요.
          </p>
          <p>
            <strong>계산 예시</strong>: 2024년 1월 1일에 입사해서 2026년 8월 12일 기준으로
            계산하면 근속기간은 만 2년입니다. 1년차에 15일이 발생한 뒤, 3년차부터 2년마다 1일씩
            가산되는 규칙에 따라 아직 3년차(만 2년 초과 시점)에 도달하지 않았으므로 발생 연차일수는
            15일 그대로입니다. 만약 입사 6개월 시점(근속 1년 미만)이라면, 매월 개근을 가정할 때
            발생 연차일수는 6일이 됩니다.
          </p>
          <p>
            <strong>연차 사용 촉진 제도</strong>: 회사가 근로기준법에 정한 절차(사용 시기 지정
            요청 → 근로자 미회신 시 회사가 시기 지정 → 서면 통보)를 제대로 밟았는데도 근로자가
            연차를 쓰지 않았다면, 회사는 미사용 연차수당을 지급하지 않아도 됩니다. 촉진 절차를
            안 밟았다면 발생한 연차만큼 수당으로 정산받을 수 있습니다.
          </p>
        </>
      }
      faq={[
        {
          question: "입사 1년이 안 됐는데 연차가 있나요?",
          answer:
            "네, 매월 개근하면 그다음 달에 1일씩 발생합니다. 입사 후 1년이 되는 날 전날까지 최대 11일을 사용할 수 있습니다.",
        },
        {
          question: "연차는 최대 며칠까지 늘어나나요?",
          answer:
            "근속 1년차에 15일이 발생한 뒤, 3년차부터 2년마다 1일씩 가산되어 최대 25일까지 늘어납니다(21년차 이상).",
        },
        {
          question: "결근을 했으면 연차가 줄어드나요?",
          answer:
            "네, 이 계산기는 매월 개근을 가정한 값입니다. 실제로 결근이 있었다면 그달에는 연차가 발생하지 않거나(1년 미만) 출근율이 80% 미만이면 다음 해 연차가 발생하지 않을 수 있습니다(1년 이상).",
        },
      ]}
      related={["annual-leave-pay", "weekly-holiday-pay", "korean-age"]}
    >
      <AnnualLeaveDaysCalculator />
    </CalculatorLayout>
  );
}
