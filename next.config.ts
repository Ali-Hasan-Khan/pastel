import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pugmfgyuiagymqozenhb.supabase.co',
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
