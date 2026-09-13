import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    qualities: [75, 85, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; " +
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.instagram.com https://www.tiktok.com; " +
              "style-src 'self' 'unsafe-inline'; " +
              "font-src 'self'; " +
              "img-src 'self' data: https://tile.openstreetmap.org https://images.pexels.com https://images.ctfassets.net https://*.tiktokcdn.com https://*.cdninstagram.com https://*.fbcdn.net; " +
              "connect-src 'self' https://tile.openstreetmap.org https://cdn.contentful.com https://preview.contentful.com https://www.tiktok.com https://www.instagram.com; " +
              "frame-src https://www.tiktok.com https://www.instagram.com; " +
              "media-src 'self' https://*.tiktokcdn.com https://*.cdninstagram.com; " +
              "frame-ancestors 'none';",
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
