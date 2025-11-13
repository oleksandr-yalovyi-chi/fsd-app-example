import { Params } from "react-router"

import { Roles } from "@/shared/model"

import privateRouterSchema from "../privateRoutersSchema"
import { IPermissions } from "./permissions/permissions.types"

export type SchemaItem = {
  path: string
  pathComponent: string
  actions?: Record<string, { path: string; pathComponent: string } | undefined>
  children?: SchemaItem[]
}

type SchemaInfo =
  | {
      isAction: false
      isChildren: boolean
      parent: string | null
      typeAction?: string
    }
  | {
      isAction: true
      isChildren: false
      parent: string
      typeAction?: string
    }

function transformSchema(schema: SchemaItem[]): Record<string, SchemaInfo> {
  const result: Record<string, SchemaInfo> = {}

  function processSchema(
    items: SchemaItem[],
    parentPath: string | null = null,
    isChildrenItem = false
  ) {
    for (const item of items) {
      result[item.path] = {
        isAction: false,
        isChildren: isChildrenItem,
        parent: parentPath,
      }

      if (item.actions) {
        for (const actionKey in item.actions) {
          const action = item.actions[actionKey]
          if (action?.path) {
            result[action.path] = {
              isAction: true,
              isChildren: false,
              parent: item.path,
              typeAction: actionKey,
            }
          }
        }
      }

      if (item.children) {
        processSchema(item.children, item.path, true)
      }
    }
  }

  processSchema(schema)

  return result
}

export const preparedSchema = transformSchema(privateRouterSchema)

export const canAccess = ({
  path,
  schema,
  permissions,
  typeAction,
}: {
  path: string
  schema?: Record<string, SchemaInfo>
  permissions: IPermissions
  typeAction?: string
}): boolean => {
  const currentSchema = schema || preparedSchema
  const hasPermission = permissions[path]
  const foundPath = currentSchema[path]

  if (foundPath?.isChildren) {
    const hasParentPermission = canAccess({
      path: foundPath.parent ?? "",
      schema: currentSchema,
      permissions,
      typeAction,
    })

    if (!hasParentPermission) return false
  }

  if (typeof hasPermission === "boolean") return hasPermission

  if (typeAction && hasPermission) {
    return !!hasPermission[typeAction as keyof typeof hasPermission]
  }

  if (typeof hasPermission === "object") return !!hasPermission?.read

  if (foundPath?.isAction) {
    return canAccess({
      path: foundPath.parent,
      schema: currentSchema,
      permissions,
      typeAction: foundPath.typeAction,
    })
  }
  if (typeAction) {
    return !!hasPermission[foundPath.typeAction ?? ""]
  }

  return false
}

/**
 * Converts a URL path with actual parameter values into a template path with placeholders.
 * Example: "/users/123/profile" with params {userId: "123"} becomes "/users/:userId/profile"
 *
 * @param path - URL path to be converted
 * @param params - object with parameters where keys are parameter names and values are their actual values
 * @returns template path with placeholders
 */
export const generatePatternFromPath = (
  path: string,
  params: Readonly<Params<string>>
): string => {
  // Split the path into parts
  const pathParts = path.split("/")

  // Create an array of [key, value] pairs from the params object
  // This allows us to maintain parameter order and remove used ones
  const paramValues = Object.entries(params)

  return pathParts
    .map((part) => {
      // Find a parameter whose value matches the current path part
      const matchingParam = paramValues.find(([_, value]) => value === part)

      if (matchingParam) {
        // Get the parameter key
        const [paramKey] = matchingParam
        // Remove the used parameter from the array to prevent reuse
        // This is important for cases where different parameters have the same values
        paramValues.splice(paramValues.indexOf(matchingParam), 1)

        return `:${paramKey}`
      }
      return part
    })
    .join("/")
}

export const can = (
  role: Roles,
  path: string,
  permissions: IPermissions | null,
  requiredRoles?: Roles[]
) => {
  // NOTE: if requiredRoles is provided check it, otherwise check the config
  if (requiredRoles && requiredRoles.includes(role)) {
    return true
  }

  if (!permissions) {
    return false
  }

  return canAccess({
    path,
    schema: preparedSchema,
    permissions,
  })
}
