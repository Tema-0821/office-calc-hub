import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { buildMetadata } from "@/lib/seo";
import { VatCalculator } from "./VatCalculator";

export const metadata = buildMetadata({
  title: "부가가치세 계산기",
  description: "금액이 부가세 포함인지 별도인지 선택하면 공급가액·부가세·합계금액을 바로 계산해줍니다.",
  path: "/vat",
});

export default function Page() {
  return (
    <CalculatorLayout
      title="부가가치세 계산기"
      description="공급가액 또는 합계금액을 입력하면 부가가치세와 나머지 금액을 계산합니다."
      accent="cyan"
      guide={
        <>
          <p>
            <strong>부가가치세(VAT)</strong>는 재화·용역의 공급 과정에서 발생하는 부가가치에 대해
            부과되는 세금으로, 일반과세자 기준 세율은 <strong>10%</strong>입니다.
          </p>
          <p>
            <strong>부가세 별도(공급가액)</strong>를 선택하면 물건 가격에 10%를 더해 실제 결제
            금액을 계산하고, <strong>부가세 포함(합계금액)</strong>을 선택하면 영수증에 찍힌 총액에서
            공급가액과 부가세를 역산합니다.
          </p>
          <p>
            간이과세자는 업종별로 부가가치율이 달라 실제 납부세액 계산 방식이 다르므로, 정확한
            신고 금액은 국세청 홈택스 또는 세무 대리인을 통해 확인하세요.
          </p>
        </>
      }
      faq={[
        {
          question: "부가세 포함 가격에서 부가세만 따로 얼마인지 어떻게 알 수 있나요?",
          answer:
            "영수증에 찍힌 합계금액을 이 계산기의 '부가세 포함(합계금액)' 모드에 입력하면, 공급가액과 부가세 10%를 자동으로 역산해서 보여줍니다.",
        },
        {
          question: "일반과세자와 간이과세자는 부가세 계산이 어떻게 다른가요?",
          answer:
            "일반과세자는 매출세액에서 매입세액을 공제해 10% 세율로 납부세액을 계산하지만, 간이과세자는 업종별로 정해진 부가가치율을 곱해 훨씬 낮은 세율로 계산합니다. 이 계산기는 일반과세자 기준만 제공합니다.",
        },
        {
          question: "면세 품목도 부가세가 붙나요?",
          answer:
            "아니요, 미가공 식료품, 도서, 의료·교육 용역 등 부가가치세법상 면세 품목은 부가세가 붙지 않습니다. 이 계산기는 과세 대상 거래를 전제로 합니다.",
        },
      ]}
    >
      <VatCalculator />
    </CalculatorLayout>
  );
}
