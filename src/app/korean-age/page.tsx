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
      faq={[
        {
          question: "만 나이 통일법은 언제부터 시행됐나요?",
          answer:
            "2023년 6월 28일부터 시행됐습니다. 이후로는 계약, 행정 서류, 대부분의 법령에서 별도 규정이 없는 한 만 나이를 기본으로 사용합니다.",
        },
        {
          question: "생일이 지나지 않았으면 나이가 어떻게 되나요?",
          answer:
            "만 나이는 생일이 지나야 한 살이 늘어납니다. 아직 생일이 지나지 않았다면 '기준 연도 − 출생 연도 − 1'이 만 나이가 됩니다.",
        },
        {
          question: "만 나이와 세는 나이(한국식 나이)는 어떻게 다른가요?",
          answer:
            "세는 나이는 태어나자마자 1살로 시작해 매년 1월 1일마다 한 살씩 늘어나는 방식으로, 만 나이 통일법 시행 이후 법적·행정적 효력은 사라졌습니다. 다만 일상 대화에서는 여전히 관습적으로 쓰이기도 합니다.",
        },
        {
          question: "연 나이는 언제 쓰이나요?",
          answer:
            "병역법, 청소년보호법 등 일부 법령에서는 생일과 관계없이 '기준 연도 − 출생 연도'로 계산하는 연 나이를 예외적으로 사용합니다.",
        },
      ]}
    >
      <KoreanAgeCalculator />
    </CalculatorLayout>
  );
}
