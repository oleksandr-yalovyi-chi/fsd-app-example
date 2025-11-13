import { PATH } from "@/shared/config"

import { IPermissions } from "../permissions.types"

const PERMISSIONS: IPermissions = {
  [PATH.withAuth.campaign.members.list.path]: {
    read: true,
    edit: true,
    create: true,
    view: true,
    send: true,
  },
  [PATH.withAuth.campaign.launch.path]: true,
  [PATH.withAuth.campaign.donationInvite.list.path]: {
    read: true,
    create: true,
    edit: true,
    delete: true,
  },
  [PATH.withAuth.campaign.dashboard.path]: true,
}

export default PERMISSIONS
