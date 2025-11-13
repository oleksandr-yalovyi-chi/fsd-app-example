export type PermissionsKeys =
  | "read"
  | "delete"
  | "edit"
  | "create"
  | "details"
  | "view"
  | "send"

export type Permission = boolean | Partial<Record<PermissionsKeys, boolean>>

export type IPermissions = Record<string, Permission>
