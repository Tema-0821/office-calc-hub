import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { buildMetadata } from "@/lib/seo";
import { WeeklyHolidayPayCalculator } from "./WeeklyHolidayPayCalculator";

export const metadata = buildMetadata({
  title: "주휴수당 계산기 (2026년 최저시급 기준)",
  description: "시급과 주 근무시간을 입력하면 주휴수당 지급 대상 여부와 예상 금액을 계산해줍니다.",
  path: "/weekly-holiday-pay",
});

export default function Page() {
  return (
    <CalculatorLayout
      title="주휴수당 계산기"
      description="시급과 주 소정근로시간으로 주휴수당 지급 대상 여부와 금액을 계산합니다."
      accent="amber"
      guide={
        <>
          <p>
            주휴수당은 <strong>시급 × (주 소정근로시간 ÷ 40) × 8</strong> 공식으로 계산됩니다. 주
            40시간을 초과해서 일해도 주휴수당은 최대 8시간분까지만 인정됩니다.
          </p>
          <p>
            <strong>지급 조건</strong>: 1주 소정근로시간이 15시간 이상이고, 그 주에 결근 없이
            개근했을 때만 발생합니다. 근로자 본인의 사유로 하루라도 결근하면 그 주의 주휴수당은
            지급되지 않습니다.
          </p>
          <p>아르바이트, 계약직, 정규직 관계없이 조건을 충족하면 동일하게 적용됩니다.</p>
        </>
      }
      faq={[
        {
          question: "주휴수당은 아르바이트생도 받을 수 있나요?",
          answer:
            "네, 고용 형태와 무관하게 1주 소정근로시간이 15시간 이상이고 그 주에 결근 없이 개근했다면 아르바이트생도 동일하게 주휴수당을 받을 수 있습니다.",
        },
        {
          question: "주 15시간 미만이면 왜 못 받나요?",
          answer:
            "근로기준법상 주휴수당은 1주 소정근로시간이 15시간 이상인 근로자에게만 발생하도록 정해져 있습니다. 15시간 미만은 법적 지급 대상이 아닙니다.",
        },
        {
          question: "지각을 했는데 주휴수당을 받을 수 있나요?",
          answer:
            "지각이나 조퇴는 결근이 아니므로 그 자체로는 주휴수당 지급에 영향을 주지 않습니다. 다만 하루라도 결근(무단 또는 정당한 사유 없는 결석)하면 그 주의 주휴수당은 지급되지 않습니다.",
        },
        {
          question: "주 40시간 넘게 일하면 주휴수당도 더 받나요?",
          answer:
            "아니요, 주휴수당은 실제 근무시간과 관계없이 최대 8시간분(하루치)까지만 인정됩니다. 주 40시간을 초과해서 일해도 주휴수당이 비례해서 늘어나지는 않습니다.",
        },
      ]}
    >
      <WeeklyHolidayPayCalculator />
    </CalculatorLayout>
  );
}
