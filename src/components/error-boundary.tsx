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
        <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden px-4">
          {/* Background orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full opacity-15 animate-orb-1"
              style={{ background: "radial-gradient(circle, #FF2D55, transparent)" }}
            />
            <div
              className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full opacity-15 animate-orb-2"
              style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }}
            />
          </div>

          <div className="relative z-10 text-center max-w-md">
            {/* Animated error icon */}
            <div className="flex justify-center mb-6">
              <div className="animate-float">
                <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center">
                  <AlertCircle className="h-10 w-10 text-gutsy-pink" />
                </div>
              </div>
            </div>

            {/* Error message */}
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Oops! Ada yang error
            </h2>
            <p className="text-muted-foreground text-base mb-2">
              Something went wrong
            </p>

            {/* Error details (collapsible) */}
            {this.state.error && (
              <div className="mt-4 mb-6 p-3 rounded-lg bg-muted/50 border border-border text-left">
                <p className="text-xs text-muted-foreground font-mono break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
              <button
                onClick={this.handleRetry}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all hover:scale-105"
                style={{ background: "linear-gradient(to right, #FF2D55, #7C3AED)" }}
              >
                <RefreshCw className="h-4 w-4" />
                Coba Lagi
              </button>
              <a
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-border bg-card text-foreground hover:bg-muted transition-colors"
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
