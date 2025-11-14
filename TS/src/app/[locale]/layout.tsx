import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/config';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AppProvidersWrapper from '@/component/wrappers/AppProvidersWrapper';
import ErrorBoundaryWrapper from '@/component/ErrorBoundaryWrapper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'aos/dist/aos.css';
import '../style.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Landinger - Multipurpose Tailwind CSS Landing Page Template',
  description:
    'Landinger - Full-featured, professional-looking software, saas and startup website template. Multipurpose Tailwind CSS Landing Page Template',
  keywords:
    'saas, saas template, site template, software, startup, digital product, html5, tailwindcss landing, marketing, tailwindcss, agency, digital agency, it solutions, vitejs',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // 确保传入的 locale 有效
  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  // 提供所有消息给客户端组件
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@100,200,300,400,500,700,800,900,1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.variable}>
        <NextIntlClientProvider messages={messages}>
          <ErrorBoundaryWrapper>
            {children}
            <AppProvidersWrapper />
          </ErrorBoundaryWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

