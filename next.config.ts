import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone", // aislar dependencias para Docker
  experimental: {
    serverAction: {
      bodySizeLimit: "2mb",
    }
  }
};

export default nextConfig;
