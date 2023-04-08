/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  transpilePackages: ["ui", "common-functions"],
};

module.exports = nextConfig;
