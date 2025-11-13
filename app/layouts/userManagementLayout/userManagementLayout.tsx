import React, { useEffect, useMemo } from "react"

import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

import { PATH } from "@/shared/config"
import { DashboardLayout, ListLayout } from "@/shared/layouts"
import { usePageTitle } from "@/shared/lib"

import { TABS } from "./userManagementLayout.settings"

export const UserManagementLayout = () => {
  usePageTitle("User Management")
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === PATH.withAuth.userManagement.home) {
      navigate(TABS?.[0]?.path)
    }
  }, [location.pathname, navigate])

  const currentTab = useMemo(
    () =>
      TABS.find((tab) => {
        return location.pathname.includes(tab.path)
      })?.path || TABS?.[0]?.path,
    [location.pathname]
  )

  const handleTabChange = (_: React.SyntheticEvent, newPath: string) => {
    navigate(newPath)
  }

  return (
    <DashboardLayout>
      <ListLayout title="User Management" hideBackButton={true}>
        <div className="bg-white shadow-xs rounded">
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            {TABS.map((tab) => (
              <Tab key={tab.path} label={tab.label} value={tab.path} />
            ))}
          </Tabs>
        </div>
        <div className="pt-6">
          <Outlet />
        </div>
      </ListLayout>
    </DashboardLayout>
  )
}

export default UserManagementLayout
