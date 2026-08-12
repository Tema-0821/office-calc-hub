export interface KoreanAgeResult {
  internationalAge: number; // 만 나이 (2023년 만 나이 통일법 기준, 대부분의 법적 용도)
  yearAge: number; // 연 나이 (기준연도 - 출생연도, 병역법 등 일부 법령에서 사용)
  hasHadBirthdayThisYear: boolean;
  daysUntilNextBirthday: number;
}

function parseDateParts(dateStr: string): { year: number; month: number; day: number } {
  const [year, month, day] = dateStr.split("-").map(Number);
  return { year, month, day };
}

// 문자열을 new Date()로 바로 파싱하면 UTC 기준으로 해석돼 시간대에 따라 하루가
// 밀릴 수 있어서, 연/월/일을 직접 분해해 로컬 Date를 만든다.
export function calculateKoreanAge(birthDateStr: string, referenceDateStr: string): KoreanAgeResult {
  const birth = parseDateParts(birthDateStr);
  const reference = parseDateParts(referenceDateStr);

  const hasHadBirthdayThisYear =
    reference.month > birth.month || (reference.month === birth.month && reference.day >= birth.day);
  // 다음 생일까지 남은 일수 계산에는 "이미 지남" 조건을 엄격한 초과(>)로 판단해서,
  // 오늘이 생일이면 다음 생일이 내년이 아니라 오늘(0일 남음)이 되도록 한다.
  const hasBirthdayStrictlyPassedThisYear =
    reference.month > birth.month || (reference.month === birth.month && reference.day > birth.day);

  const internationalAge = reference.year - birth.year - (hasHadBirthdayThisYear ? 0 : 1);
  const yearAge = reference.year - birth.year;

  const nextBirthdayYear = hasBirthdayStrictlyPassedThisYear ? reference.year + 1 : reference.year;
  const nextBirthday = new Date(nextBirthdayYear, birth.month - 1, birth.day);
  const referenceDate = new Date(reference.year, reference.month - 1, reference.day);
  const daysUntilNextBirthday = Math.round(
    (nextBirthday.getTime() - referenceDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return { internationalAge, yearAge, hasHadBirthdayThisYear, daysUntilNextBirthday };
}
