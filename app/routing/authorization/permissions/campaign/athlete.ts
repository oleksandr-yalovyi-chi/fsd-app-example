import { PATH } from "@/shared/config"

import { IPermissions } from "../permissions.types"

const PERMISSIONS: IPermissions = {
  [PATH.withAuth.campaign.donationInvite.list.path]: {
    read: true,
    create: true,
    edit: true,
    delete: true,
  },
  [PATH.withAuth.campaign.donationMessage.path]: true,
}

export default PERMISSIONS
