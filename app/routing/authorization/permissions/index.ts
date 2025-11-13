import { PATH } from "@/shared/config"

import Ad from "./ad"
import Admin from "./admin"
import AssistantCoach from "./campaign/assistantCoach"
import Athlete from "./campaign/athlete"
import AthleticDirector from "./campaign/athleticDirector"
import BoosterClub from "./campaign/boosterClub"
import Coach from "./campaign/coach"
import ProgramLeader from "./campaign/programLeader"
import { IPermissions } from "./permissions.types"
import SuperAdmin from "./superAdmin"
import User from "./user"

const DEFAULT_PRIVATE_ROUTERS: IPermissions = {
  [PATH.withAuth.forbidden]: true,
  [PATH.withAuth.home]: true,
  [PATH.withAuth.changePassword]: true,
  [PATH.withAuth.selectCampaign]: true,
  [PATH.withAuth.selectGroup]: true,
  [PATH.withAuth.importDonors]: true,
}

const addedDefaultRouters = (perm: IPermissions): IPermissions => {
  return {
    ...perm,
    ...DEFAULT_PRIVATE_ROUTERS,
  }
}

export const adminPermissions = addedDefaultRouters(Admin)
export const superAdminPermissions = addedDefaultRouters(SuperAdmin)
export const userPermissions = addedDefaultRouters(User)
export const adPermissions = addedDefaultRouters(Ad)

export const coachPermissions = Coach
export const athletePermissions = Athlete
export const assistantCoachPermissions = AssistantCoach
export const athleticDirectorPermissions = AthleticDirector
export const programLeaderPermissions = ProgramLeader
export const boosterClubPermissions = BoosterClub
