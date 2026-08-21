export interface GuideMeta {
  slug: string;
  title: string;
  description: string;
  date: string; // yyyy-mm-dd, 발행일
}

export const GUIDES: GuideMeta[] = [
  {
    slug: "four-insurance-rates-2026",
    title: "2026년 4대보험료율 총정리",
    description:
      "국민연금·건강보험·장기요양보험·고용보험 요율과 상한·하한액을 한 번에 정리했습니다.",
    date: "2026-08-12",
  },
  {
    slug: "before-you-resign",
    title: "퇴사 전 꼭 확인해야 할 5가지",
    description: "퇴직금, 실업급여, 연차수당 정산부터 4대보험 처리까지 퇴사 전 체크리스트입니다.",
    date: "2026-08-12",
  },
  {
    slug: "minimum-wage-and-weekly-holiday-pay",
    title: "최저임금과 주휴수당, 제대로 받고 있나요?",
    description: "2026년 최저임금 기준과 주휴수당 지급 조건, 흔한 위반 사례를 정리했습니다.",
    date: "2026-08-12",
  },
];
