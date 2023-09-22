/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true
    },
    reactStrictMode: true,
  images: {
    domains: [
      "images.pexels.com",
      "www.vecteezy.com",
      "helios-i.mashable.com"
    ],
  },
}

module.exports = nextConfig
