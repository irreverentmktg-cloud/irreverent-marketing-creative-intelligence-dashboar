import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Netlify deployment via @netlify/plugin-nextjs
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
