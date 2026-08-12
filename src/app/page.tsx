import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { buildMetadata } from "@/lib/seo";
import { BalanceSimulator } from "./BalanceSimulator";

export const metadata = buildMetadata({
  title: "가계부 (잔고 시뮬레이터)",
  description:
    "무료 온라인 가계부입니다. 월급과 고정지출을 등록하고 달력에 지출을 기록하면, 매달 잔고가 어떻게 쌓이는지 자동으로 계산해주는 잔고 시뮬레이터 기능을 제공합니다.",
  path: "",
});

export default function Home() {
  return (
    <CalculatorLayout
      title="가계부 (잔고 시뮬레이터)"
      description="월급, 고정지출, 그날그날의 지출을 기록하면 매달 잔고가 얼마나 쌓이는지 보여줍니다."
      accent="rose"
      bare
      hideBackLink
      guide={
        <>
          <p>
            <strong>기본 설정</strong>에서 월급(실수령액 기준)과 매달 반복되는 고정지출(월세, 구독료
            등)을 등록하세요. <strong>지출 달력</strong>에서 날짜를 클릭하면 그날 쓴 돈을 카테고리와
            함께 기록할 수 있습니다.
          </p>
          <p>
            매달 남는 돈은 <strong>수입 − 고정지출 − 그 달에 기록한 변동지출</strong>로 계산되고,{" "}
            <strong>월별 누적 잔고 추이</strong> 표에서 기록 시작월부터 지금까지 잔고가 어떻게
            쌓여왔는지 확인할 수 있습니다.
          </p>
          <p>
            <strong>다음 달에 남을 것으로 예상되는 돈</strong>은 이번 달 하루 평균 지출액을 다음 달
            전체 일수에 단순히 곱해서 추정한 값으로, 실제와 차이가 있을 수 있는 참고용 수치입니다.
          </p>
          <p>
            <strong>목표 금액</strong>을 설정하면, 지금 남는 돈의 속도가 계속된다고 가정했을 때 몇
            개월 후에 목표에 도달하는지 요약 카드에 함께 보여줍니다.
          </p>
          <p>
            <strong>데이터는 이 브라우저에만 저장됩니다.</strong> 로그인 기능이 없어 다른 기기와는
            동기화되지 않고, 브라우저 데이터(캐시)를 지우면 함께 사라집니다. 정기적으로{" "}
            <strong>CSV 내보내기</strong>로 백업해 두는 것을 추천합니다.
          </p>
          <p>
            다른 계산기는 상단 탭에서 바로 이동할 수 있습니다.
          </p>
        </>
      }
      faq={[
        {
          question: "회원가입 없이도 쓸 수 있나요?",
          answer:
            "네, 로그인이나 회원가입 없이 바로 사용할 수 있습니다. 입력한 데이터는 서버가 아니라 사용하는 브라우저에만 저장됩니다.",
        },
        {
          question: "다른 기기(스마트폰↔PC)에서도 같은 기록을 볼 수 있나요?",
          answer:
            "아니요, 데이터가 브라우저에만 저장되기 때문에 기기나 브라우저를 바꾸면 기록이 동기화되지 않습니다. CSV 내보내기로 백업한 뒤 다른 기기에서 CSV 가져오기로 옮길 수 있습니다.",
        },
        {
          question: "카드 할부금은 어떻게 기록하나요?",
          answer:
            "기본 설정의 '할부 지출'에서 총 할부금액과 개월수, 시작일을 입력하면 매달 균등하게 나눠 지출에 반영되고, 할부가 끝나는 달 이후에는 자동으로 지출 목록에서 빠집니다.",
        },
        {
          question: "다른 계산기 결과를 잔고 계산에 자동으로 반영할 수 있나요?",
          answer:
            "네, 기본 설정의 '계산기 연동'에서 4대보험료·주휴수당·퇴직금·연차수당 계산기를 사용한 뒤 체크박스를 켜면 그 결과가 매달 고정지출이나 특정 달 수입으로 자동 반영됩니다.",
        },
      ]}
    >
      <BalanceSimulator />
    </CalculatorLayout>
  );
}
