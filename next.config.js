/* eslint-disable sort-keys */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'default',
    domains: ['localhost', 'res.cloudinary.com'],
  },
  i18n: {
    locales: ['pl', 'en'],
    defaultLocale: 'pl',
  },
};

module.exports = nextConfig;
