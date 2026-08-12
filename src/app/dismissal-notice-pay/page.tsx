import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { buildMetadata } from "@/lib/seo";
import { DismissalNoticePayCalculator } from "./DismissalNoticePayCalculator";

export const metadata = buildMetadata({
  title: "해고예고수당 계산기",
  description: "월급을 입력하면 해고예고 없이 즉시 해고됐을 때 받을 수 있는 해고예고수당을 계산해줍니다.",
  path: "/dismissal-notice-pay",
});

export default function Page() {
  return (
    <CalculatorLayout
      title="해고예고수당 계산기"
      description="월급으로 해고예고수당(30일분 통상임금)을 계산합니다."
      accent="yellow"
      guide={
        <>
          <p>
            근로기준법 제26조에 따라 사용자는 근로자를 해고하려면 <strong>적어도 30일 전</strong>
            에 예고해야 합니다. 30일 전에 예고하지 않았다면{" "}
            <strong>30일분 이상의 통상임금</strong>을 해고예고수당으로 지급해야 합니다.
          </p>
          <p>
            계속 근로한 기간이 <strong>3개월 미만</strong>인 근로자는 이 규정의 예외 대상이라
            해고예고수당을 받을 수 없습니다.
          </p>
        </>
      }
      faq={[
        {
          question: "해고예고를 15일 전에만 했다면 어떻게 되나요?",
          answer:
            "30일에서 부족한 일수만큼 비례해서 수당을 지급하는 것이 원칙적으로 통용되는 방식이지만, 실무에서는 예고기간을 조금이라도 못 채우면 30일분 전액을 지급하는 경우가 많습니다. 이 계산기는 예고를 아예 하지 않은 경우를 기준으로 30일분을 계산합니다.",
        },
        {
          question: "정당한 해고 사유가 있어도 해고예고수당을 줘야 하나요?",
          answer:
            "네, 해고예고(또는 해고예고수당)는 해고 사유의 정당성과는 별개의 절차적 의무입니다. 정당한 사유로 해고하더라도 30일 전 예고를 하지 않았다면 해고예고수당을 지급해야 합니다.",
        },
      ]}
      related={["severance-pay", "unemployment-benefit", "suspension-pay"]}
    >
      <DismissalNoticePayCalculator />
    </CalculatorLayout>
  );
}
