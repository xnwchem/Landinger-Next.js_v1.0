'use client';

import { ReactNode } from 'react';
import ErrorBoundary from './ErrorBoundary';

interface ErrorBoundaryWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * 错误边界包装器组件
 * 用于在应用的不同部分包装错误边界
 */
const ErrorBoundaryWrapper = ({ children, fallback }: ErrorBoundaryWrapperProps) => {
  return <ErrorBoundary fallback={fallback}>{children}</ErrorBoundary>;
};

export default ErrorBoundaryWrapper;

