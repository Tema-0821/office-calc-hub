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
    >
      <VatCalculator />
    </CalculatorLayout>
  );
}
