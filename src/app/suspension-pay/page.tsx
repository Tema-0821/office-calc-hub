import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { buildMetadata } from "@/lib/seo";
import { SuspensionPayCalculator } from "./SuspensionPayCalculator";

export const metadata = buildMetadata({
  title: "휴업수당 계산기",
  description: "평균임금과 통상임금, 휴업일수를 입력하면 근로기준법 기준 휴업수당을 계산해줍니다.",
  path: "/suspension-pay",
});

export default function Page() {
  return (
    <CalculatorLayout
      title="휴업수당 계산기"
      description="평균임금·통상임금·휴업일수로 휴업수당을 계산합니다."
      accent="purple"
      guide={
        <>
          <p>
            회사 사정으로 갑자기 출근할 수 없게 됐다고 해서 그 기간 급여가 아예 없는 건
            아닙니다. 근로기준법 제46조에 따라 <strong>사용자의 귀책사유</strong>로 휴업하는
            경우, 사용자는 휴업기간 동안 근로자에게 <strong>평균임금의 70% 이상</strong>을
            휴업수당으로 지급해야 합니다.
          </p>
          <p>
            다만 평균임금의 70%가 통상임금을 초과하는 경우에는{" "}
            <strong>통상임금을 휴업수당으로 지급</strong>할 수 있습니다.
          </p>
          <p>
            <strong>계산 예시</strong>: 1일 평균임금과 1일 통상임금이 모두 10만원인 근로자가 10일
            동안 휴업했다면, 1일 휴업수당은 10만원 × 70% = 7만원이고(70%가 통상임금 10만원을
            넘지 않으므로 그대로 적용), 총 휴업수당은 7만원 × 10일 = 70만원입니다.
          </p>
          <p>
            <strong>노동위원회 승인을 받은 경우</strong>: 부득이한 사유로 사업을 계속하는 것이
            불가능해 노동위원회의 승인을 받으면, 평균임금의 70%보다 낮은 금액을 휴업수당으로 지급할
            수도 있습니다. 다만 이는 예외적인 경우이며, 승인 없이 임의로 낮춰 지급하면 근로기준법
            위반이 됩니다.
          </p>
        </>
      }
      faq={[
        {
          question: "사용자 귀책사유란 구체적으로 뭔가요?",
          answer:
            "경영상 어려움, 원자재 부족, 설비 고장 등 사용자 측의 사정으로 근로자가 일할 수 없게 된 경우를 말합니다. 천재지변 등 불가항력적 사유는 포함되지 않습니다.",
        },
        {
          question: "코로나19 같은 재난 상황도 휴업수당 대상인가요?",
          answer:
            "감염병 확산 등으로 인한 휴업도 상황에 따라 사용자 귀책사유로 인정될 수 있어 고용노동부 판단과 개별 사례에 따라 다릅니다. 정확한 판단은 관할 고용노동관서에 문의하는 것이 좋습니다.",
        },
      ]}
      related={["dismissal-notice-pay", "unemployment-benefit", "hourly-wage"]}
    >
      <SuspensionPayCalculator />
    </CalculatorLayout>
  );
}
