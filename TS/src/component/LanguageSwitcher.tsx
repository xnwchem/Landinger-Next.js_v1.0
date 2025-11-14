'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales, localeNames, type Locale } from '@/i18n/config';
import IconifyIconClient from './IconifyIconClient';

/**
 * 语言切换组件
 * 允许用户在支持的语言之间切换
 */
const LanguageSwitcher = () => {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    // 移除当前语言前缀（如果存在）
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    // 添加新语言前缀
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="切换语言"
      >
        <IconifyIconClient icon="tabler:language" className="text-xl" />
        <span className="font-medium">{localeNames[locale]}</span>
        <IconifyIconClient icon="tabler:chevron-down" className="text-sm" />
      </button>
      <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {locales.map((loc) => (
          <button
            key={loc}
            onClick={() => switchLocale(loc)}
            className={`w-full text-left px-4 py-2 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg transition-colors ${
              locale === loc ? 'bg-primary/20 font-semibold' : ''
            }`}
          >
            {localeNames[loc]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;

