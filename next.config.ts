import type { NextConfig } from 'next'
import path from 'node:path'

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone', // aislar dependencias para Docker
  reactCompiler: true,
  turbopack: {
    root: path.resolve(__dirname, '..'),
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
}

export default nextConfig
