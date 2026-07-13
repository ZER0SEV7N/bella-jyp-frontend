import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone", // aislar dependencias para Docker

  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    }
  }
};

export default nextConfig;
