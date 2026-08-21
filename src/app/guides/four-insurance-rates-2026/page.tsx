import { GuideLayout } from "@/components/guides/GuideLayout";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "2026년 4대보험료율 총정리",
  description: "국민연금·건강보험·장기요양보험·고용보험 요율과 상한·하한액을 한 번에 정리했습니다.",
  path: "/guides/four-insurance-rates-2026",
});

export default function Page() {
  return (
    <GuideLayout title="2026년 4대보험료율 총정리" date="2026-08-12" relatedCalculators={["four-insurance", "hourly-wage"]}>
      <p>
        급여명세서를 받을 때마다 국민연금, 건강보험, 장기요양보험, 고용보험이라는 네 가지 항목이
        빠져나가는 걸 볼 수 있습니다. 이 네 가지를 통틀어 &ldquo;4대보험&rdquo;이라고 부르는데,
        각각 요율과 계산 방식이 달라서 헷갈리기 쉽습니다. 2026년 기준 요율을 항목별로 정리했습니다.
      </p>

      <section>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          1. 국민연금 — 전체 9.5%, 근로자 부담 4.75%
        </h2>
        <p className="mt-2">
          국민연금은 근로자와 사업주가 절반씩(각 4.75%) 부담합니다. 다만 아무 월급이나 그대로
          적용되는 건 아니고, <strong>기준소득월액</strong>이라는 별도 기준을 씁니다. 2026년 기준
          기준소득월액은 최저 40만원, 최고 637만원으로 제한되어 있어서, 월급이 637만원을 넘는
          고소득자도 국민연금은 637만원을 기준으로만 계산됩니다. 반대로 40만원보다 적게 벌어도
          40만원을 기준으로 계산됩니다.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          2. 건강보험 — 전체 7.19%, 근로자 부담 3.595%
        </h2>
        <p className="mt-2">
          건강보험료는 국민연금과 달리 상한·하한액 없이 보수월액 전체에 요율을 곱해서 계산합니다.
          다만 식대(월 20만원 이내)처럼 세법상 비과세로 인정되는 항목은 보수월액에서 빠지기
          때문에, 급여명세서의 세전 총액과 실제 건강보험료 산정 기준액이 정확히 같지 않은 경우가
          많습니다.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          3. 장기요양보험 — 건강보험료의 약 12.95%
        </h2>
        <p className="mt-2">
          장기요양보험은 노인장기요양보험법에 따라 별도로 걷지만, 계산 기준은 건강보험료입니다.
          &ldquo;보수월액 × 건강보험 요율 × 장기요양보험 요율(약 12.95%)&rdquo; 순서로 계산되기
          때문에, 건강보험료가 오르면 장기요양보험료도 함께 오릅니다.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          4. 고용보험 — 근로자는 실업급여 부분만 부담 (0.45%)
        </h2>
        <p className="mt-2">
          고용보험은 크게 실업급여 재원과 고용안정·직업능력개발사업 재원으로 나뉩니다. 이 중
          근로자는 실업급여 재원(전체 0.9%의 절반인 0.45%)만 부담하고, 고용안정·직업능력개발사업
          비용은 사업주가 전액 부담합니다. 그래서 고용보험은 국민연금·건강보험처럼 정확히
          &ldquo;절반씩&rdquo;은 아닙니다.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          5. 산재보험은 왜 안 보이나요?
        </h2>
        <p className="mt-2">
          흔히 &ldquo;4대보험&rdquo;이라고 하면 산재보험까지 포함해서 부르지만, 산재보험료는
          사업주가 전액 부담하기 때문에 근로자의 월급에서는 공제되지 않습니다. 그래서 급여명세서
          공제 항목에는 나타나지 않습니다.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          요율은 매년 바뀔 수 있습니다
        </h2>
        <p className="mt-2">
          4대보험 요율은 국민연금공단·국민건강보험공단·고용노동부가 매년 심의해서 조정합니다.
          이 글의 수치는 2026년 기준이며, 다음 해에는 달라질 수 있으니 최신 요율은 각 공단
          홈페이지에서 확인하는 것이 가장 정확합니다.
        </p>
      </section>

      <p>
        직접 요율을 계산하기 번거롭다면 4대보험료 계산기에 월급만 입력해도 네 항목의 공제액과
        예상 실수령액을 바로 확인할 수 있습니다.
      </p>
    </GuideLayout>
  );
}
