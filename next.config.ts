import type { NextConfig } from "next";
import { withVercelToolbar } from "@vercel/toolbar/plugins/next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
    ],
    unoptimized: true,
  },
};

export default withVercelToolbar()(nextConfig);
