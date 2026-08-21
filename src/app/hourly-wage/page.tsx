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
            연장근로수당이나 해고예고수당처럼 다른 계산기에서 자꾸 등장하는{" "}
            <strong>통상임금</strong>이라는 개념, 정작 얼마인지 직접 계산해본 적은 없을 수
            있습니다. 통상임금은 근로자에게 정기적·일률적으로 지급하기로 정해진 시급성 임금으로,
            각종 수당 계산의 기준이 됩니다.
          </p>
          <p>
            시급은 <strong>월급 ÷ 209시간</strong>(주 40시간 근무 기준 월 소정근로시간)으로
            계산하고, 일급은 시급에 8시간을 곱해서 구합니다.
          </p>
          <p>
            <strong>계산 예시</strong>: 월급 300만원이면 시급은 300만원 ÷ 209시간 ≈ 14,354원,
            일급은 14,354원 × 8시간 ≈ 114,832원입니다. 반대로 시급 14,354원을 알고 있다면 월급은
            14,354원 × 209시간 ≈ 300만원으로 역산할 수 있습니다.
          </p>
          <p>
            <strong>통상임금에 포함되는 것과 안 되는 것</strong>: 기본급, 매달 정기적으로 지급되는
            직책수당·기술수당 등은 통상임금에 포함됩니다. 반면 실제 근무 여부에 따라 달라지는
            연장·야간·휴일수당이나, 매달이 아니라 특정 조건에서만 지급되는 성과급·인센티브는
            통상임금에서 제외되는 것이 원칙입니다. 이 계산기는 이미 통상임금으로 확정된 월급을
            입력한다고 가정합니다.
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
