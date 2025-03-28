/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: []
  },
  trailingSlash: true,
  distDir: 'out'
}

module.exports = nextConfig 