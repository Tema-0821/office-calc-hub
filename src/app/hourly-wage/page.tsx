import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { buildMetadata } from "@/lib/seo";
import { HourlyWageCalculator } from "./HourlyWageCalculator";

export const metadata = buildMetadata({
  title: "통상임금(시급) 계산기",
  description: "월급 또는 시급을 입력하면 월 소정근로시간 기준으로 시급·일급·월급을 서로 환산해줍니다.",
  path: "/hourly-wage",
});

export default function Page() {
  return (
    <CalculatorLayout
      title="통상임금(시급) 계산기"
      description="월급 또는 시급을 입력하면 시급·일급·월급을 서로 환산합니다."
      accent="lime"
      guide={
        <>
          <p>
            <strong>통상임금</strong>은 근로자에게 정기적·일률적으로 지급하기로 정해진 시급성
            임금으로, 연장·야간·휴일수당이나 해고예고수당 같은 각종 수당 계산의 기준이 됩니다.
          </p>
          <p>
            시급은 <strong>월급 ÷ 209시간</strong>(주 40시간 근무 기준 월 소정근로시간)으로
            계산하고, 일급은 시급에 8시간을 곱해서 구합니다.
          </p>
        </>
      }
      faq={[
        {
          question: "209시간은 어떻게 나온 숫자인가요?",
          answer:
            "주 40시간 근무에 유급 주휴시간 8시간을 더한 48시간에, 1년 평균 한 달의 주 수(4.345주)를 곱하면 약 209시간이 나옵니다. 주 40시간 근무제의 표준 월 소정근로시간으로 널리 쓰입니다.",
        },
        {
          question: "통상임금과 최저임금은 어떻게 다른가요?",
          answer:
            "통상임금은 각종 수당 계산의 기준이 되는 임금이고, 최저임금은 법으로 정한 임금의 하한선입니다. 실제 지급되는 통상임금이 최저임금보다 낮으면 안 됩니다.",
        },
      ]}
      related={["minimum-wage", "overtime-pay", "dismissal-notice-pay"]}
    >
      <HourlyWageCalculator />
    </CalculatorLayout>
  );
}
