
import React, { Component, ErrorInfo, ReactNode } from 'react';
import type { Language } from '../types';
import { TEXTS } from '../constants';
import { XCircleIcon } from './icons';

interface Props {
  children: ReactNode;
  language: Language;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      const texts = TEXTS[this.props.language].errorBoundary;
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen w-full flex items-center justify-center bg-brand-bg">
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
                <XCircleIcon className="w-16 h-16 mx-auto text-brand-red"/>
                <h1 className="mt-4 text-2xl font-bold text-brand-text">{texts.title}</h1>
                <p className="mt-2 text-gray-600">{texts.message}</p>
            </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
