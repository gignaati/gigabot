/** @type {import('next').NextConfig} */
const nextConfig = {
  // Giga Bot — Next.js Configuration
  // Powered by Gignaati — https://www.gignaati.com

  experimental: {
    serverActions: {
      allowedOrigins: process.env.APP_URL ? [new URL(process.env.APP_URL).host] : [],
    },
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.gignaati.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Powered-By", value: "Giga Bot by Gignaati" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
