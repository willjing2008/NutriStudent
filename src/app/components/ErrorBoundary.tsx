import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  /** Names the section in the fallback copy, e.g. "Admin Dashboard". */
  label?: string;
}

interface ErrorBoundaryState {
  error: Error | null;
}

/**
 * Catches render/lifecycle exceptions below it and swaps in an in-place error
 * card instead of letting React unmount the whole tree to a blank screen.
 * "Try again" clears the error and re-renders the children.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary]', this.props.label ?? 'app', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div role="alert" className="m-4 rounded-2xl border-2 border-red-200 bg-red-50 p-6 text-center">
          <AlertTriangle className="mx-auto mb-3 h-8 w-8 text-red-500" />
          <h2 className="mb-1 font-semibold text-red-900">
            {this.props.label ? `${this.props.label} ran into a problem` : 'Something went wrong'}
          </h2>
          <p className="mb-4 text-sm text-red-700">
            The rest of the app is unaffected. You can try again, or navigate elsewhere.
          </p>
          <button
            onClick={() => this.setState({ error: null })}
            className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
