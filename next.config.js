/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  webpack: (config, { dev }) => {
    return config
  }
}

export default nextConfig
