import { useMemo } from "react"

import { Navigate, Outlet, useLocation, useParams } from "react-router-dom"

import { PATH } from "@/shared/config"
import { useUserStore } from "@/shared/model"

import { can, generatePatternFromPath } from "./authorization/can"
import { usePermissions } from "./authorization/usePermissions"

export const PrivateOnlyRoute = () => {
  const { userInfo } = useUserStore()
  //TODO: location needs for re render this component whe pathname change
  const location = useLocation()
  const permissions = usePermissions()

  const params = useParams()

  const pathName = location.pathname

  const path = useMemo(
    () => generatePatternFromPath(pathName, params),
    [params, pathName]
  )

  if (!userInfo) {
    return <Navigate to={PATH.withoutAuth.login} replace />
  }

  const role = userInfo.role

  if (!can(role, path, permissions)) {
    console.error(`${role} is not authorized to see this page`)
    return <Navigate to={PATH.withAuth.forbidden} replace />
  }

  return <Outlet />
}
