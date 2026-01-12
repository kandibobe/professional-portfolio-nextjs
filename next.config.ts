import type { NextConfig } from 'next';
import createIntlPlugin from 'next-intl/plugin';

const withNextIntl = createIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'standalone',
  turbopack: {},
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
