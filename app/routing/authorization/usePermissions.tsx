import { useMemo } from "react"

import {
  IPermissions,
  adPermissions,
  adminPermissions,
  assistantCoachPermissions,
  athletePermissions,
  athleticDirectorPermissions,
  boosterClubPermissions,
  coachPermissions,
  programLeaderPermissions,
  superAdminPermissions,
  userPermissions,
} from "@/app/routing/authorization"
import { Roles, useCampaignStore, useUserStore } from "@/shared/model"

const PERMISSIONS_MAP = {
  1: superAdminPermissions,
  2: adminPermissions,
  3: userPermissions,
  4: adPermissions,
}

const PERMISSIONS_USER_MAP = {
  1: coachPermissions,
  2: assistantCoachPermissions,
  3: athleticDirectorPermissions,
  4: athletePermissions,
  5: programLeaderPermissions,
  6: boosterClubPermissions,
}

const getPermissions = (id?: number, isUser?: boolean): IPermissions | null => {
  if (!id) {
    return null
  }

  if (isUser) {
    return PERMISSIONS_USER_MAP[id as keyof typeof PERMISSIONS_USER_MAP] || null
  }

  return PERMISSIONS_MAP[id as keyof typeof PERMISSIONS_MAP] || null
}

export const usePermissions = (): IPermissions | null => {
  const { userInfo } = useUserStore()
  const { selectedCampaign } = useCampaignStore()
  const campaignRoleId =
    selectedCampaign?.current_campaign_role_id ??
    selectedCampaign?.campaign_role_id

  const permissions = useMemo(() => {
    let campaignPermissions: IPermissions | null = null
    if (campaignRoleId && userInfo?.role === Roles.User) {
      campaignPermissions = getPermissions(campaignRoleId, true)
    }

    return {
      ...getPermissions(userInfo?.userRoleId),
      ...campaignPermissions,
    }
  }, [campaignRoleId, userInfo?.role, userInfo?.userRoleId])

  return permissions
}
