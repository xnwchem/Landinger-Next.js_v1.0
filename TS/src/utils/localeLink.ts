/**
 * 国际化链接工具函数
 * 用于生成带语言前缀的链接路径
 */

import { defaultLocale } from '@/i18n/config';

/**
 * 为路径添加语言前缀
 * @param path 路径（如 '/home-1', '/about'）
 * @param locale 语言代码（如 'zh', 'en'），如果未提供则使用默认语言
 * @returns 带语言前缀的路径（如 '/zh/home-1', '/en/about'）
 */
export function getLocalePath(path: string, locale?: string): string {
  // 如果路径已经包含语言前缀，直接返回
  if (path.startsWith('/zh/') || path.startsWith('/en/')) {
    return path;
  }
  
  // 如果路径是根路径，返回默认语言的首页
  if (path === '/' || path === '') {
    return `/${locale || defaultLocale}/home-1`;
  }
  
  // 确保路径以 / 开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // 添加语言前缀
  return `/${locale || defaultLocale}${normalizedPath}`;
}

/**
 * Hook: 获取当前语言的路径
 * 在客户端组件中使用
 */
export function useLocalePath() {
  if (typeof window === 'undefined') {
    // 服务端渲染时返回默认语言的路径
    return (path: string) => getLocalePath(path, defaultLocale);
  }
  
  // 客户端：从 URL 中提取当前语言
  const pathname = window.location.pathname;
  const localeMatch = pathname.match(/^\/(zh|en)/);
  const currentLocale = localeMatch ? localeMatch[1] : defaultLocale;
  
  return (path: string) => getLocalePath(path, currentLocale);
}

