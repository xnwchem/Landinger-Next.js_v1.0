import { render, screen } from '@testing-library/react';
import ErrorBoundary from '@/component/ErrorBoundary';

// 测试组件，用于触发错误
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('测试错误');
  }
  return <div>正常渲染</div>;
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // 抑制控制台错误输出
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('应该正常渲染子组件', () => {
    render(
      <ErrorBoundary>
        <div>测试内容</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('测试内容')).toBeInTheDocument();
  });

  it('应该在错误发生时显示错误 UI', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('出错了')).toBeInTheDocument();
    expect(screen.getByText(/抱歉，发生了意外错误/)).toBeInTheDocument();
  });

  it('应该支持自定义 fallback', () => {
    const customFallback = <div>自定义错误页面</div>;

    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('自定义错误页面')).toBeInTheDocument();
  });
});

