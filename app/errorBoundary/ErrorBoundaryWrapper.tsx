import { Component, ErrorInfo, ReactNode, useEffect } from "react"

import { ErrorFallback } from "@/app/errorBoundary"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

const VitePreloadErrorHandler = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    // NOTE: Vite known issue. Fix from official site https://vite.dev/guide/build#load-error-handling
    const handleVitePreloadError = () => {
      window.location.reload()
    }

    window.addEventListener("vite:preloadError", handleVitePreloadError)

    return () => {
      window.removeEventListener("vite:preloadError", handleVitePreloadError)
    }
  }, [])

  return <>{children}</>
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />
    }

    return (
      <VitePreloadErrorHandler>{this.props.children}</VitePreloadErrorHandler>
    )
  }
}

export default ErrorBoundary
