// 서버에서 렌더링된 <script>를 브라우저가 파싱하는 동안 동기적으로 실행시키기 위한 헬퍼.
// type을 서버/클라이언트에서 다르게 둬서 React가 hydration mismatch로 오인하지 않게 한다.
// (Next.js 공식 가이드: preventing-flash-before-hydration)
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
