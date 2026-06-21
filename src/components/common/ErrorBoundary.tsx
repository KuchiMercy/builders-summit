import { Component, type ErrorInfo, type ReactNode } from "react";
import { logger } from "../../utils/logger";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error("Uncaught exception caught by ErrorBoundary:", { error, errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="min-h-[400px] flex items-center justify-center p-8 text-center bg-gray-50 rounded-2xl border border-gray-200">
          <div className="space-y-4 max-w-md">
            <h2 className="text-2xl font-bold text-dark">Something went wrong</h2>
            <p className="text-gray-600">
              We encountered an unexpected error loading this section. Our engineering team has been notified.
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-6 py-2 bg-dark text-white rounded-lg font-medium hover:bg-black transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
