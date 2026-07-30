import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emits .next/standalone with a self-contained server.js and only the
  // node_modules actually traced as reachable. Required by the container
  // image, which copies that directory instead of the full dependency tree.
  output: "standalone",
  turbopack: {
    root: __dirname,
  },
  images: {
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
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; " +
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.instagram.com https://www.tiktok.com; " +
              "style-src 'self' 'unsafe-inline'; " +
              "font-src 'self'; " +
              "img-src 'self' data: https://images.pexels.com https://images.ctfassets.net https://*.tiktokcdn.com https://*.cdninstagram.com https://*.fbcdn.net; " +
              "connect-src 'self' https://cdn.contentful.com https://preview.contentful.com https://www.tiktok.com https://www.instagram.com; " +
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
