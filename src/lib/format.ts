export function formatWon(value: number): string {
  if (!Number.isFinite(value)) return "0원";
  return `${Math.round(value).toLocaleString("ko-KR")}원`;
}

export function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return "0";
  return value.toLocaleString("ko-KR");
}

// 1233333 -> "123만 3,333원" 같은 한글 단위 표기. 입력창 아래 실시간 안내용.
export function formatWonKorean(value: number): string {
  if (!Number.isFinite(value) || value === 0) return "0원";

  const sign = value < 0 ? "-" : "";
  const abs = Math.floor(Math.abs(value));

  const eok = Math.floor(abs / 100_000_000);
  const afterEok = abs % 100_000_000;
  const man = Math.floor(afterEok / 10_000);
  const rest = afterEok % 10_000;

  const parts: string[] = [];
  if (eok > 0) parts.push(`${eok.toLocaleString("ko-KR")}억`);
  if (man > 0) parts.push(`${man.toLocaleString("ko-KR")}만`);
  if (rest > 0 || parts.length === 0) parts.push(rest.toLocaleString("ko-KR"));

  return `${sign}${parts.join(" ")}원`;
}
