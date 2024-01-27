/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      output: 'export',
    },
    images: {
      unoptimized: true,
    },
    reactStrictMode: true,
    trailingSlash: true,
  };
  
  module.exports = nextConfig;
  