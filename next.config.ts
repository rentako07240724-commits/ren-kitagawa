import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // public/images/ は静的アセットとして配信されるため
  // サーバーレス関数のファイルトレースから除外し Vercel 250MB 制限を回避する
  outputFileTracingExcludes: {
    "*": ["public/**/*"],
  },
  async redirects() {
    return [
      {
        source: "/shop/frow-jeans",
        destination: "/shop/flow-jeans",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
