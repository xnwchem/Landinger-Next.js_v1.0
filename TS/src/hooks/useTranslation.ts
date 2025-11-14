import { useTranslations } from 'next-intl';

/**
 * 自定义翻译 Hook
 * 提供类型安全的翻译功能
 */
export const useTranslation = () => {
  const t = useTranslations();
  
  return {
    t,
    // 可以添加更多辅助函数
    translate: (key: string, values?: Record<string, string | number>) => {
      return t(key, values);
    },
  };
};

