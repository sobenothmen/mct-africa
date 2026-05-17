import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85, 90],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560],
    imageSizes: [384, 512, 640, 750, 828, 1080, 1200, 1440],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
