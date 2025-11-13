import { PATH } from "@/shared/config"

export const TABS: {
  label: string
  includePath?: (campaignId: string | number) => string
  path: string
}[] = [
  { label: "Users", path: PATH.withAuth.userManagement.user.list },
  {
    label: "Athletic directors",
    path: PATH.withAuth.userManagement.ad.list,
  },
  { label: "Admins", path: PATH.withAuth.userManagement.admin.list },
]
