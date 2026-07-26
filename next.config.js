/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config, { dev, isServer }) => {
    config.cache = false;
    if (config.snapshot) {
      config.snapshot.managedPaths = [];
    }
    return config;
  },
};

module.exports = nextConfig;
