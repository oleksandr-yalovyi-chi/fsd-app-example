import { StrictMode } from "react"

import { ThemeProvider } from "@mui/material/styles"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ToastContainer } from "react-toastify"

import { theme } from "@/shared/config"
import { StoreProvider } from "@/shared/model"
import { MountConfirmation } from "@/shared/ui"

import ErrorBoundaryWrapper from "../errorBoundary/ErrorBoundaryWrapper"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
})

type AppProviderProps = {
  children: React.ReactNode
}

function AppProviders({ children }: AppProviderProps) {
  return (
    <ErrorBoundaryWrapper>
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <ThemeProvider theme={theme}>
            <StoreProvider>{children}</StoreProvider>
            <MountConfirmation />
          </ThemeProvider>
        </QueryClientProvider>
        <ToastContainer />
      </StrictMode>
    </ErrorBoundaryWrapper>
  )
}

export default AppProviders
