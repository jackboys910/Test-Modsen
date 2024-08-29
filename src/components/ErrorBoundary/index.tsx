import React, { Component, ReactNode } from 'react';
import { ErrorText } from './index.styled';

interface IErrorBoundaryProps {
  children: ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Uncaught erorr:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorText>Something went wrong. Please try again later!!</ErrorText>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
