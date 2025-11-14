import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'standalone', // 支持 Docker 部署
  eslint: {
    // 构建时忽略 ESLint 错误（生产环境建议修复这些错误）
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 构建时忽略 TypeScript 错误
    ignoreBuildErrors: false,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/zh/home-1',
        permanent: false,
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default withNextIntl(nextConfig);