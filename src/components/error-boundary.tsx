"use client";

import React from "react";
import { AlertCircle, Home, RefreshCw } from "lucide-react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#09090B] relative overflow-hidden px-4">
          {/* Subtle red glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-[0.05] pointer-events-none"
            style={{ background: "radial-gradient(circle, #F97316 0%, transparent 70%)" }}
          />

          <div className="relative z-10 text-center max-w-md">
            {/* Error icon */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 rounded-2xl bg-[#111113] border border-[#27272A] flex items-center justify-center">
                <AlertCircle className="h-10 w-10 text-[#F97316]" />
              </div>
            </div>

            {/* Error message */}
            <h2 className="text-2xl sm:text-3xl font-bold text-[#FAFAFA] mb-3">
              Oops! Ada yang error
            </h2>
            <p className="text-[#A1A1AA] text-sm mb-2">
              Something went wrong
            </p>

            {/* Error details */}
            {this.state.error && (
              <div className="mt-4 mb-6 p-3 rounded-lg bg-[#111113] border border-[#27272A] text-left">
                <p className="text-xs text-[#A1A1AA] font-mono break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
              <button
                onClick={this.handleRetry}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition-all btn-press bg-[#F97316] hover:bg-[#EA580C]"
              >
                <RefreshCw className="h-4 w-4" />
                Coba Lagi
              </button>
              <a
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border border-[#27272A] bg-[#111113] text-[#FAFAFA] hover:bg-[#18181B] transition-colors"
              >
                <Home className="h-4 w-4" />
                Kembali ke Homepage
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
