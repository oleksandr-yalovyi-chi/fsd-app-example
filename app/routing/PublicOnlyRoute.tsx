import { Navigate, Outlet } from "react-router-dom"

import { getInitialRouteByRole } from "@/features/auth"
import { useUserStore } from "@/shared/model"

export const PublicOnlyRoute = () => {
  const { userInfo } = useUserStore()

  if (userInfo?.id) {
    return <Navigate to={getInitialRouteByRole(userInfo.role)} replace />
  }

  return <Outlet />
}
