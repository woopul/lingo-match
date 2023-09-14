/* eslint-disable sort-keys */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: true,
});
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    deviceSizes: [320, 768, 1024, 1280],
    loader: 'default',
    domains: ['localhost', 'res.cloudinary.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/platforms/',
        permanent: true,
      },
      {
        source: '/platforms/1',
        destination: '/platforms/',
        permanent: true,
      },
    ];
  },
  i18n: {
    locales: ['default', 'pl', 'en'],
    defaultLocale: 'default',
    localeDetection: false,
  },
};

module.exports = process.env.ANALYZE === 'true' ? withBundleAnalyzer(nextConfig) : nextConfig;
