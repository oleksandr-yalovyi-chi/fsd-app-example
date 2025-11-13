import { PATH } from "@/shared/config"

const schema = [
  {
    path: PATH.withAuth.home,
    pathComponent: "@/pages/home/ui/homePage.tsx",
  },
  {
    path: PATH.withAuth.changePassword,
    pathComponent: "@/pages/profile/changePassword/ui/changePasswordPage.tsx",
  },
  {
    path: PATH.withAuth.campaign.list,
    pathComponent: "@/pages/campaign/list/ui/campaignsListPage.tsx",
    actions: {
      create: {
        path: PATH.withAuth.campaign.create,
        pathComponent: "@/pages/campaign/create/ui/createCampaignPage.tsx",
      },
      bulkCreate: {
        path: PATH.withAuth.campaign.bulkCreate,
        pathComponent:
          "@/pages/campaign/bulkCreate/ui/bulkCreateCampaignPage.tsx",
      },
    },
  },
  {
    path: PATH.withAuth.campaign.home.path,
    pathComponent: "@/app/layouts/campaignLayout/campaignLayout.tsx",
    children: [
      {
        path: PATH.withAuth.campaign.details.path,
        pathComponent: "@/pages/campaign/details/ui/campaignDetails.tsx",
        actions: {
          edit: {
            path: PATH.withAuth.campaign.edit.path,
            pathComponent: "@/pages/campaign/details/ui/campaignEdit.tsx",
          },
        },
      },
      {
        path: PATH.withAuth.campaign.launch.path,
        pathComponent: "@/pages/campaign/launch/ui/campaignLaunchPage.tsx",
      },
      {
        path: PATH.withAuth.campaign.groups.path,
        pathComponent: "@/pages/campaign/groups/ui/campaignGroupPage.tsx",
        actions: {
          details: {
            path: PATH.withAuth.campaign.group.path,
            pathComponent:
              "@/pages/campaign/groupMembers/ui/campaignGroupMembers.tsx",
          },
        },
      },
      {
        path: PATH.withAuth.campaign.members.list.path,
        pathComponent:
          "@/pages/campaign/members/list/ui/campaignMembersPage.tsx",
        actions: {
          edit: {
            path: PATH.withAuth.campaign.members.update.path,
            pathComponent:
              "@/pages/campaign/members/update/ui/updateCampaignMember.tsx",
          },
        },
      },
      {
        path: PATH.withAuth.campaign.donationInvite.list.path,
        pathComponent:
          "@/pages/campaign/donationInvites/list/ui/campaignDonationInvites.tsx",
        actions: {
          create: {
            path: PATH.withAuth.campaign.donationInvite.create.path,
            pathComponent:
              "@/pages/campaign/donationInvites/create/ui/donationInviteCreatePage.tsx",
          },
          edit: {
            path: PATH.withAuth.campaign.donationInvite.update.path,
            pathComponent:
              "@/pages/campaign/donationInvites/update/ui/donationInviteUpdatePage.tsx",
          },
        },
      },
      {
        path: PATH.withAuth.campaign.donations.list.path,
        pathComponent:
          "@/pages/campaign/donations/list/ui/campaignDonations.tsx",
        actions: {
          edit: {
            path: PATH.withAuth.campaign.donations.details.path,
            pathComponent:
              "@/pages/campaign/donations/update/ui/updateCampaignDonation.tsx",
          },
        },
      },
      {
        path: PATH.withAuth.campaign.smsTemplates.list.path,
        pathComponent:
          "@/pages/campaign/smsTemplates/list/ui/campaignSmsTemplates.tsx",
        actions: {
          edit: {
            path: PATH.withAuth.campaign.smsTemplates.details.path,
            pathComponent:
              "@/pages/campaign/smsTemplates/update/ui/updateCampaignSmsTemplates.tsx",
          },
        },
      },
      {
        path: PATH.withAuth.campaign.emailTemplates.list.path,
        pathComponent:
          "@/pages/campaign/emailTemplates/list/ui/campaignEmailTemplates.tsx",
        actions: {
          edit: {
            path: PATH.withAuth.campaign.emailTemplates.details.path,
            pathComponent:
              "@/pages/campaign/emailTemplates/update/ui/updateCampaignEmailTemplates.tsx",
          },
        },
      },
      {
        path: PATH.withAuth.campaign.dripSchedules.path,
        pathComponent:
          "@/pages/campaign/dripSchedules/ui/campaignDripSchedules.tsx",
      },
      {
        path: PATH.withAuth.campaign.donationsSettings.path,
        pathComponent:
          "@/pages/campaign/donationsSettings/settings/ui/campaignDonationsSettings.tsx",
        children: [
          {
            path: PATH.withAuth.campaign.donationsSettings.topAmount.path,
            pathComponent:
              "@/pages/campaign/donationsSettings/tipAmount/ui/tipAmount.tsx",
          },
          {
            path: PATH.withAuth.campaign.donationsSettings.donationAmounts.path,
            pathComponent:
              "@/pages/campaign/donationsSettings/donationAmounts/ui/donationAmounts.tsx",
          },
          {
            path: PATH.withAuth.campaign.donationsSettings.fee.path,
            pathComponent:
              "@/pages/campaign/donationsSettings/fee/ui/campaignFee.tsx",
          },
          {
            path: PATH.withAuth.campaign.donationsSettings.paymentType.path,
            pathComponent:
              "@/pages/campaign/donationsSettings/paymentType/ui/paymentType.tsx",
          },
        ],
      },
      {
        path: PATH.withAuth.campaign.donationMessage.path,
        pathComponent:
          "@/pages/campaign/donationMessage/ui/campaignDonationMessage.tsx",
      },
      {
        path: PATH.withAuth.campaign.moments.path,
        pathComponent: "@/pages/campaign/moments/ui/campaignMoments.tsx",
      },
      {
        path: PATH.withAuth.campaign.fund.list.path,
        pathComponent: "@/pages/campaign/fund/ui/campaignFundPage.tsx",
        actions: {
          edit: {
            path: PATH.withAuth.campaign.fund.update.path,
            pathComponent: "@/pages/campaign/fund/ui/campaignFundEditPage.tsx",
          },
        },
      },
      {
        path: PATH.withAuth.campaign.messageLog.list.path,
        pathComponent:
          "@/pages/campaign/messageLog/ui/campaignMessageLogPage.tsx",
      },
    ],
  },
  {
    path: PATH.withAuth.campaign.dashboard.path,
    pathComponent: "@/pages/campaignDashboard/ui/campaignDashboardPage.tsx",
  },
  {
    path: PATH.withAuth.athleticDirectorDashboard,
    pathComponent: "@/pages/adDashboard/ui/adDashboard.tsx",
  },
  {
    path: PATH.withAuth.selectCampaign,
    pathComponent: "@/pages/auth/selectCampaign/ui/selectCampaignPage.tsx",
  },
  {
    path: PATH.withAuth.selectGroup,
    pathComponent: "@/pages/auth/selectGroup/ui/selectGroupPage.tsx",
  },
  {
    path: PATH.withAuth.importDonors,
    pathComponent: "@/pages/auth/importDonors/ui/importDonorsPage.tsx",
  },
  {
    path: PATH.withAuth.forbidden,
    pathComponent: "@/pages/forbidden/ui/forbiddenPage.tsx",
  },
  {
    path: PATH.withAuth.sports,
    pathComponent: "@/pages/sports/ui/sportsPage.tsx",
  },
  {
    path: PATH.withAuth.relationships,
    pathComponent: "@/pages/relationships/ui/relationshipsPage.tsx",
  },
  {
    path: PATH.withAuth.userManagement.home,
    pathComponent:
      "@/app/layouts/userManagementLayout/userManagementLayout.tsx",
    children: [
      {
        path: PATH.withAuth.userManagement.admin.list,
        pathComponent:
          "@/pages/userManagement/admins/list/ui/adminListPage.tsx",
      },
      {
        path: PATH.withAuth.userManagement.admin.create,
        pathComponent:
          "@/pages/userManagement/admins/create/ui/createAdminPage.tsx",
      },
      {
        path: PATH.withAuth.userManagement.admin.update.path,
        pathComponent:
          "@/pages/userManagement/admins/update/ui/updateAdminPage.tsx",
      },
      {
        path: PATH.withAuth.userManagement.user.list,
        pathComponent: "@/pages/userManagement/users/list/ui/userListPage.tsx",
      },
      {
        path: PATH.withAuth.userManagement.user.create,
        pathComponent:
          "@/pages/userManagement/users/create/ui/createUserPage.tsx",
      },
      {
        path: PATH.withAuth.userManagement.user.update.path,
        pathComponent:
          "@/pages/userManagement/users/update/ui/updateUserPage.tsx",
      },
      {
        path: PATH.withAuth.userManagement.ad.list,
        pathComponent: "@/pages/userManagement/ads/list/ui/adListPage.tsx",
      },
      {
        path: PATH.withAuth.userManagement.ad.create,
        pathComponent: "@/pages/userManagement/ads/create/ui/createAdPage.tsx",
      },
      {
        path: PATH.withAuth.userManagement.ad.update.path,
        pathComponent: "@/pages/userManagement/ads/update/ui/updateAdPage.tsx",
      },
    ],
  },
  {
    path: PATH.withAuth.logs.home,
    pathComponent: "@/pages/logs/logsLayout/ui/logsLayout.tsx",
    children: [
      {
        path: PATH.withAuth.logs.email.list,
        pathComponent: "@/pages/logs/email/ui/emailLogsListPage.tsx",
      },
      {
        path: PATH.withAuth.logs.sms.list,
        pathComponent: "@/pages/logs/sms/ui/smsLogsListPage.tsx",
      },
    ],
  },
]

export type IPrivateRouterSchema = typeof schema

export default schema
