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
            근로기준법 제60조에 따라 <strong>계속근로기간 1년 미만</strong>인 근로자는 1개월
            개근 시 1일씩, 최대 11일까지 연차가 발생합니다.
          </p>
          <p>
            <strong>계속근로기간 1년 이상</strong>(1년간 80% 이상 출근)인 근로자는 15일이
            발생하고, 이후 <strong>매 2년마다 1일씩 가산</strong>되어 최대 25일까지 늘어납니다.
          </p>
          <p>
            발생한 연차를 실제로 얼마 받을 수 있는지 금액으로 확인하고 싶다면 연차수당 계산기를
            함께 사용해보세요.
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
