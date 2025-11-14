import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  // 支持的语言列表
  locales,
  // 默认语言
  defaultLocale,
  // 语言检测策略 - 始终显示语言前缀
  localePrefix: 'always',
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 如果访问根路径，重定向到默认语言
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}/home-1`, request.url));
  }
  
  // 如果访问 /home-1 等没有语言前缀的路径，重定向到默认语言版本
  const pathWithoutLocale = pathname.split('/').filter(Boolean);
  if (pathWithoutLocale.length > 0 && !locales.includes(pathWithoutLocale[0] as any)) {
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
  }
  
  return intlMiddleware(request);
}

export const config = {
  // 匹配所有路径，除了：
  // - api (API routes)
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

