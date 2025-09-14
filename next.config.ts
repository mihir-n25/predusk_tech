import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true, // <-- important for src/app/page.tsx
  },
  images: {
    domains: ["i.pinimg.com"],
  },
};

export default nextConfig;
