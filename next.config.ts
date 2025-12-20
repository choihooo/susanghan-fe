import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "img1.kakaocdn.net",
      "t1.kakaocdn.net",
      "k.kakaocdn.net",

      "lh3.googleusercontent.com",

      "ssl.pstatic.net",
      "phinf.pstatic.net",

      "via.placeholder.com", // 모킹 데이터용 플레이스홀더 이미지
    ],
  },
};

export default nextConfig;
