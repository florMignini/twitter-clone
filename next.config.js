/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  reactStrictMode: true,
  images: {
    domains: [
      "https://res.cloudinary.com",
      "media1.giphy.com",
      "media2.giphy.com",
      "media3.giphy.com",
      "media4.giphy.com",
      "media5.giphy.com",
      "media6.giphy.com",
      "media7.giphy.com",
      "media8.giphy.com",
      "media0.giphy.com",
      "giphy.com",
      "gph.is",
      "res.cloudinary.com",
      "https:/lh3.googleusercontent.com",
      "lh3.googleusercontent.com",
      "upload.wikimedia.org",
      "https://upload.wikimedia.org",
      "avatars.githubusercontent.com",
      "images.pexels.com",
      "www.vecteezy.com",
      "helios-i.mashable.com",
    ],
  }
};

module.exports = nextConfig;
