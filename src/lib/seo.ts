import type { Metadata } from "next";
import { SITE_URL } from "./config";

export const SITE_NAME = "직장인 계산기 허브";

interface BuildMetadataOptions {
  title: string;
  description: string;
  path?: string; // "/four-insurance" 처럼 슬래시로 시작. 홈은 ""
}

// opengraph-image.tsx는 같은 경로("/")에서만 자동 적용되고 다른 라우트로는
// 상속되지 않아서, 모든 페이지가 같은 이미지를 명시적으로 참조하게 한다.
const OG_IMAGE = {
  url: `${SITE_URL}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: SITE_NAME,
};

// 페이지마다 반복되는 openGraph/twitter/canonical 설정을 한 곳에서 만든다.
export function buildMetadata({ title, description, path = "" }: BuildMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "ko_KR",
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
