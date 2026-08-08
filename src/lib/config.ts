// 배포 도메인이 정해지면 NEXT_PUBLIC_SITE_URL 환경변수로 덮어쓸 것.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
