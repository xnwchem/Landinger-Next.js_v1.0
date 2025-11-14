'use client';

import Image, { ImageProps, StaticImageData } from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string | StaticImageData;
  fallbackSrc?: string | StaticImageData;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  quality?: number;
}

/**
 * 优化的图片组件
 * - 自动使用 Next.js Image 优化
 * - 支持加载失败时的回退图片
 * - 支持优先级加载
 * - 自动懒加载
 */
const OptimizedImage = ({
  src,
  alt,
  fallbackSrc,
  priority = false,
  loading = 'lazy',
  quality = 85,
  className,
  ...props
}: OptimizedImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (fallbackSrc && !hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <Image
      src={imgSrc}
      alt={alt || ''}
      priority={priority}
      loading={loading}
      quality={quality}
      className={className}
      onError={handleError}
      {...props}
    />
  );
};

export default OptimizedImage;

