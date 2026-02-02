/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,

  // Optimize for modern browsers - reduces legacy JavaScript
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Target modern browsers only (ES2020+)
  experimental: {
    modern: true,
  },
};

module.exports = nextConfig;

