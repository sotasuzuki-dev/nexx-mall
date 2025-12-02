/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // 開発環境では画像最適化を無効化（via.placeholder.com への接続エラーを回避）
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "thumbnail.image.rakuten.co.jp",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;


