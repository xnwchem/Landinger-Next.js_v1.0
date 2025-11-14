import { render, screen } from '@testing-library/react';
import OptimizedImage from '@/component/OptimizedImage';

describe('OptimizedImage', () => {
  it('应该渲染图片', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="测试图片"
        width={100}
        height={100}
      />
    );

    const img = screen.getByAltText('测试图片');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', expect.stringContaining('/test-image.jpg'));
  });

  it('应该设置正确的属性', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="测试图片"
        width={200}
        height={200}
        priority={true}
        quality={90}
      />
    );

    const img = screen.getByAltText('测试图片');
    expect(img).toHaveAttribute('width', '200');
    expect(img).toHaveAttribute('height', '200');
  });
});

