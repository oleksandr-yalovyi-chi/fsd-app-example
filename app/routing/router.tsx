import { useMemo } from "react"

import { QueryClient, useQueryClient } from "@tanstack/react-query"
import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router/dom"

import { ErrorFallback } from "@/app/errorBoundary/ErrorBoundary"
import { PrivateOnlyRoute } from "@/app/routing/PrivateOnlyRoute"
import { PublicOnlyRoute } from "@/app/routing/PublicOnlyRoute"
import { PATH } from "@/shared/config/routes"

import { mapPrivateRouters } from "./helper"
import schema from "./privateRoutersSchema"

// TODO: fix typings
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convert = (queryClient: QueryClient) => (m: any) => {
  const { clientLoader, clientAction, default: Component, ...rest } = m
  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component,
  }
}

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: PATH.withoutAuth.donation.path,
      lazy: () =>
        import("@/pages/donationPage/ui/donationPage.tsx").then(
          convert(queryClient)
        ),
      errorElement: <ErrorFallback />,
    },
    {
      path: PATH.withoutAuth.termsOfService,
      lazy: () =>
        import("@/pages/termsOfService/ui/termsOfServicePage.tsx").then(
          convert(queryClient)
        ),
      errorElement: <ErrorFallback />,
    },
    {
      path: PATH.withoutAuth.unsubscribeConfirm,
      lazy: () =>
        import("@/pages/unsubscribe/ui/unsubscribeConfirmPage.tsx").then(
          convert(queryClient)
        ),
      errorElement: <ErrorFallback />,
    },
    {
      element: <PublicOnlyRoute />,
      errorElement: <ErrorFallback />,
      children: [
        {
          path: PATH.withoutAuth.login,
          lazy: () =>
            import("@/pages/auth/login/ui/loginPage.tsx").then(
              convert(queryClient)
            ),
        },
        {
          path: PATH.withoutAuth.signup,
          lazy: () =>
            import("@/pages/auth/signUp/ui/signUpPage.tsx").then(
              convert(queryClient)
            ),
        },
        {
          path: PATH.withoutAuth.forgotPassword,
          lazy: () =>
            import(
              "@/pages/auth/forgotPassword/ui/forgotPasswordPage.tsx"
            ).then(convert(queryClient)),
        },
        {
          path: PATH.withoutAuth.resetPassword,
          lazy: () =>
            import("@/pages/auth/resetPassword/ui/resetPasswordPage.tsx").then(
              convert(queryClient)
            ),
        },
        {
          path: PATH.withoutAuth.welcome,
          lazy: () =>
            import("@/pages/auth/welcome/ui/welcomePage").then(
              convert(queryClient)
            ),
        },
      ],
    },
    {
      element: <PrivateOnlyRoute />,
      errorElement: <ErrorFallback />,
      children: mapPrivateRouters(schema, convert(queryClient)),
    },

    {
      path: "*",
      lazy: () =>
        import("@/pages/notFound/ui/notFoundPage.tsx").then(
          convert(queryClient)
        ),
      errorElement: <ErrorFallback />,
    },
  ])

export const AppRouter = () => {
  const queryClient = useQueryClient()
  const router = useMemo(() => createAppRouter(queryClient), [queryClient])

  return <RouterProvider router={router} />
}
