import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true, // TS might complain
  } as any,       // ← cast to any
  images: {
    domains: ["i.pinimg.com"],
  },
};

export default nextConfig;
