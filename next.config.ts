import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.e2b.app", "localhost:3000"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
      {
        protocol: "https",
        hostname: "**.spotifycdn.com",
      },
      {
        protocol: "https",
        hostname: "mosaic.scdn.co",
      },
    ],
  },
};

export default nextConfig;
