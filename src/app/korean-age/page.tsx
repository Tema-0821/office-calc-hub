import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { buildMetadata } from "@/lib/seo";
import { KoreanAgeCalculator } from "./KoreanAgeCalculator";

export const metadata = buildMetadata({
  title: "만 나이 계산기",
  description: "생년월일을 입력하면 만 나이, 연 나이, 다음 생일까지 남은 날짜를 바로 계산해줍니다.",
  path: "/korean-age",
});

export default function Page() {
  return (
    <CalculatorLayout
      title="만 나이 계산기"
      description="생년월일을 입력하면 만 나이와 연 나이, 다음 생일까지 남은 날짜를 계산합니다."
      accent="teal"
      guide={
        <>
          <p>
            <strong>만 나이</strong>는 태어난 날을 0살로 시작해서, 생일이 지날 때마다 한 살씩
            늘어나는 방식입니다. 2023년 6월 28일부터 시행된 &ldquo;만 나이 통일법&rdquo;에 따라
            계약, 행정 서류, 대부분의 법령에서 기본으로 사용됩니다.
          </p>
          <p>
            <strong>연 나이</strong>는 생일과 상관없이 &ldquo;기준 연도 − 출생 연도&rdquo;로 계산하는
            방식으로, 병역법이나 청소년보호법처럼 일부 법령에서만 예외적으로 쓰입니다.
          </p>
          <p>
            <strong>기준일</strong>을 오늘이 아닌 다른 날짜로 바꾸면, 특정 시점(예: 입사일, 시험일)
            기준의 만 나이도 미리 확인할 수 있습니다.
          </p>
        </>
      }
    >
      <KoreanAgeCalculator />
    </CalculatorLayout>
  );
}
