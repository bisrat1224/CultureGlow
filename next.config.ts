import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    qualities: [75, 85, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  async headers() {
    return [
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

export default nextConfig;