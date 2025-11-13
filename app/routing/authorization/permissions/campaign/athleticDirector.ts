import { PATH } from "@/shared/config"

import { IPermissions } from "../permissions.types"

const PERMISSIONS: IPermissions = {
  [PATH.withAuth.campaign.details.path]: {
    read: true,
  },
  [PATH.withAuth.campaign.groups.path]: {
    read: true,
    details: true,
  },
  [PATH.withAuth.campaign.group.path]: {
    read: true,
  },
  [PATH.withAuth.campaign.members.list.path]: true,
  [PATH.withAuth.campaign.members.update.path]: true,
  [PATH.withAuth.campaign.donationInvite.list.path]: true,
  [PATH.withAuth.campaign.donationInvite.create.path]: true,
  [PATH.withAuth.campaign.donationInvite.update.path]: true,
  [PATH.withAuth.campaign.donations.list.path]: true,
  [PATH.withAuth.campaign.dashboard.path]: true,
}

export default PERMISSIONS
