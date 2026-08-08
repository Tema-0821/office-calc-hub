import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { BalanceSimulator } from "./BalanceSimulator";

export const metadata: Metadata = {
  title: "잔고 시뮬레이터 (가계부) | 직장인 계산기 허브",
  description:
    "월급과 고정지출을 등록하고 달력에 지출을 기록하면, 매달 잔고가 어떻게 쌓이는지 자동으로 계산해주는 가계부형 시뮬레이터입니다.",
};

export default function Page() {
  return (
    <CalculatorLayout
      title="잔고 시뮬레이터"
      description="월급, 고정지출, 그날그날의 지출을 기록하면 매달 잔고가 얼마나 쌓이는지 보여줍니다."
      bare
      guide={
        <>
          <p>
            <strong>기본 설정</strong>에서 월급(실수령액 기준)과 매달 반복되는 고정지출(월세, 구독료
            등)을 등록하세요. <strong>지출 달력</strong>에서 날짜를 클릭하면 그날 쓴 돈을 카테고리와
            함께 기록할 수 있습니다.
          </p>
          <p>
            매달 순증감은 <strong>수입 − 고정지출 − 그 달에 기록한 변동지출</strong>로 계산되고,{" "}
            <strong>월별 누적 잔고 추이</strong> 표에서 기록 시작월부터 지금까지 잔고가 어떻게
            쌓여왔는지 확인할 수 있습니다.
          </p>
          <p>
            <strong>다음 달 예상 순증감</strong>은 이번 달 하루 평균 지출액을 다음 달 전체 일수에
            단순히 곱해서 추정한 값으로, 실제와 차이가 있을 수 있는 참고용 수치입니다.
          </p>
          <p>
            <strong>데이터는 이 브라우저에만 저장됩니다.</strong> 로그인 기능이 없어 다른 기기와는
            동기화되지 않고, 브라우저 데이터(캐시)를 지우면 함께 사라집니다. 정기적으로{" "}
            <strong>CSV 내보내기</strong>로 백업해 두는 것을 추천합니다.
          </p>
        </>
      }
    >
      <BalanceSimulator />
    </CalculatorLayout>
  );
}
