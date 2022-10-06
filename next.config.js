/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: false,
      },
      {
        source: "/restricted",
        destination: "/messages",
        permanent: false,
      },
    ];
  },

  webpack(config) {
    // Set custom webpack config
    config.resolve.modules.push(path.resolve("./src"));
    return config;
  },
};

module.exports = nextConfig;
