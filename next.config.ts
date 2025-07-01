import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disables ESLint during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disables TypeScript errors during builds
    ignoreBuildErrors: true,
  },
};

export default nextConfig;