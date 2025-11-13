import { PATH } from "@/shared/config"

import { IPermissions } from "./permissions.types"

const PERMISSIONS: IPermissions = {
  [PATH.withAuth.campaign.home.path]: true,
  [PATH.withAuth.campaign.moments.path]: true,
}

export default PERMISSIONS
