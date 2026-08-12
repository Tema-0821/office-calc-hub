import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { buildMetadata } from "@/lib/seo";
import { SalaryConverterCalculator } from "./SalaryConverterCalculator";

export const metadata = buildMetadata({
  title: "연봉·월급 환산기",
  description: "연봉을 입력하면 월급으로, 월급을 입력하면 연봉으로 12개월 기준 세전 금액을 계산해줍니다.",
  path: "/salary-converter",
});

export default function Page() {
  return (
    <CalculatorLayout
      title="연봉·월급 환산기"
      description="세금·4대보험 공제 없이 연봉과 월급을 12개월 기준으로 서로 환산합니다."
      accent="indigo"
      guide={
        <>
          <p>
            연봉을 입력하면 <strong>연봉 ÷ 12</strong>로 세전 월급을 계산하고, 월급을 입력하면{" "}
            <strong>월급 × 12</strong>로 세전 연봉을 계산합니다.
          </p>
          <p>
            <strong>주의</strong>: 이 계산기는 4대보험료·소득세 등 공제 전 금액만 다룹니다. 실제
            통장에 들어오는 실수령액을 확인하려면 4대보험료 계산기를 함께 사용해보세요.
          </p>
          <p>
            일부 회사는 상여금을 매달 나눠주지 않고 특정 달에 몰아 지급하기 때문에, 실제 매달 받는
            월급은 이 계산기의 결과와 다를 수 있습니다.
          </p>
        </>
      }
      faq={[
        {
          question: "연봉에 상여금도 포함해서 계산해야 하나요?",
          answer:
            "네, 이 계산기는 연간 총 지급액을 12로 나누는 방식이라 상여금·수당까지 포함한 연봉 총액을 입력하면 평균적인 월 환산액을 알 수 있습니다. 다만 실제 지급은 회사 규정에 따라 매달 균등하지 않을 수 있습니다.",
        },
        {
          question: "여기서 나온 월급이 통장에 그대로 들어오나요?",
          answer:
            "아니요, 이 계산기는 세전 금액을 단순히 12개월로 나눈 값입니다. 4대보험료와 소득세를 공제한 실제 실수령액은 4대보험료 계산기에서 추가로 확인하세요.",
        },
        {
          question: "연봉 협상할 때 이 계산기를 어떻게 활용하나요?",
          answer:
            "제시받은 연봉을 입력해 월 환산액을 먼저 확인한 뒤, 4대보험료 계산기에 그 월급을 다시 입력하면 대략적인 월 실수령액 감을 잡는 데 도움이 됩니다.",
        },
      ]}
      related={["four-insurance", "unemployment-benefit", "balance-simulator"]}
    >
      <SalaryConverterCalculator />
    </CalculatorLayout>
  );
}
