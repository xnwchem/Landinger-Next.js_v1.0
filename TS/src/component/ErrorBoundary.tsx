'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import IconifyIconClient from './IconifyIconClient';
import { getLocalePath } from '@/utils/localeLink';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * 错误边界组件
 * 捕获子组件树中的 JavaScript 错误，记录这些错误，并显示降级 UI
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 在生产环境中，可以将错误日志发送到错误报告服务
    if (process.env.NODE_ENV === 'production') {
      console.error('Error caught by boundary:', error, errorInfo);
      // 这里可以集成 Sentry 或其他错误监控服务
      // Sentry.captureException(error, { contexts: { react: errorInfo } });
    } else {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-body-bg px-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <IconifyIconClient
                icon="tabler:alert-circle"
                className="text-6xl text-red-500 mx-auto mb-4"
              />
              <h1 className="text-3xl font-bold text-dark mb-2">
                {process.env.NEXT_PUBLIC_APP_NAME || 'Landinger'} - 出错了
              </h1>
              <p className="text-body-color mb-4">
                抱歉，发生了意外错误。我们已经记录了这个问题，正在努力修复。
              </p>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 text-left">
                  <p className="text-sm text-red-800 font-mono break-all">
                    {this.state.error.toString()}
                  </p>
                </div>
              )}
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="bg-primary text-dark hover:bg-dark hover:text-primary px-6 py-3 rounded-2xl font-medium transition-all duration-300"
              >
                重试
              </button>
              <ErrorBoundaryLink />
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * 错误边界中的链接组件（需要访问 locale）
 */
function ErrorBoundaryLink() {
  const locale = useLocale();
  const homePath = getLocalePath('/home-1', locale as string);
  
  return (
    <Link
      href={homePath}
      className="bg-dark text-white hover:bg-primary hover:text-dark px-6 py-3 rounded-2xl font-medium transition-all duration-300"
    >
      返回首页
    </Link>
  );
}

export default ErrorBoundary;

