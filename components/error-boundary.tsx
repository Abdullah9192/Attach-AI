'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  onReset?: () => void
  featureName?: string
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[ATTACHAI Error Boundary]', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    this.props.onReset?.()
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex min-h-[400px] w-full items-center justify-center p-4 md:p-8">
          <div className="mx-auto max-w-md text-center space-y-6">
            {/* Icon */}
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(216,200,168,0.15)] backdrop-blur-sm">
              <div className="h-8 w-8 rounded-full border-2 border-[#C9A876]" />
            </div>

            {/* Title - Spectral in all caps */}
            <h1 className="font-serif text-[20px] md:text-[24px] font-light uppercase tracking-[0.08em] text-[#6E5A4F]">
              This Area Isn't Available Right Now.
            </h1>

            {/* Body - calm and reassuring */}
            <p className="font-sans text-[14px] md:text-[15px] font-light leading-relaxed text-[#8B7355]">
              An unexpected interruption occurred. Gently refresh, or return to your dashboard while we realign things.
            </p>

            {/* Buttons - generous spacing, responsive */}
            <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-center">
              <Button
                onClick={this.handleReset}
                className="h-11 gap-2 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] px-8 font-serif text-[13px] uppercase tracking-wider text-white shadow-[0_8px_24px_rgba(201,168,118,0.25)] hover:shadow-[0_12px_32px_rgba(201,168,118,0.35)] transition-all duration-500"
              >
                <RefreshCw className="h-4 w-4" strokeWidth={1.5} />
                Try Again
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-11 gap-2 rounded-full border border-[#D8C8A8]/40 bg-white/40 px-8 font-serif text-[13px] uppercase tracking-wider text-[#6E5A4F] backdrop-blur-xl hover:bg-white/60 transition-all duration-500"
              >
                <Link href="/dashboard">
                  <Home className="h-4 w-4" strokeWidth={1.5} />
                  Go to Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export function ErrorBoundaryWrapper({
  children,
  featureName,
}: {
  children: React.ReactNode
  featureName?: string
}) {
  return <ErrorBoundary featureName={featureName}>{children}</ErrorBoundary>
}
