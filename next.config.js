/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  reactStrictMode: true,
  images: {
    domains: [
      "https://res.cloudinary.com",
      "res.cloudinary.com",
      "https:/lh3.googleusercontent.com",
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "images.pexels.com",
      "www.vecteezy.com",
      "helios-i.mashable.com",
    ],
  }
};

module.exports = nextConfig;
