/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'i.scdn.co',
        pathname: '/image/***',
      },
      {
        protocol: "https",
        hostname: 'mosaic.scdn.co',
        pathname: '/640/***',
      }
    ]
  },
}

module.exports = nextConfig
