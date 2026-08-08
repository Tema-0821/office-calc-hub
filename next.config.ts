import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // 잔고 시뮬레이터가 홈으로 이동하면서 기존 주소는 홈으로 영구 이동.
        source: "/balance-simulator",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
