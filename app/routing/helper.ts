import { RouteObject } from "react-router"

import { IPrivateRouterSchema } from "./privateRoutersSchema"

const modules = import.meta.glob([
  "/src/pages/**/*.tsx",
  "/src/pages/**/**/*.tsx",
  "/src/app/layouts/**/*.tsx",
])

function normalize(path: string) {
  const cleaned = path.replace(/^@\//, "")

  if (cleaned.startsWith("/")) {
    return path
  }

  return "/src/" + cleaned
}

type RouterItem = {
  path: string
  lazy: () => Promise<any>
}

type Convert = (m: any) => any

const mapRouterUser = (item: any, convert: Convert) => {
  const arr: (RouterItem & {
    children?: RouterItem[]
  })[] = [
    {
      path: item.path,
      lazy: () => lazyLoad(item.pathComponent, convert),
    },
  ]

  if (item.actions) {
    Object.values(item.actions).forEach((itemActions: any) => {
      arr.push({
        path: itemActions.path,
        lazy: () => lazyLoad(itemActions.pathComponent, convert),
      })
    })
  }

  if (item.children && arr[0]) {
    arr[0].children = item.children.flatMap((o: any) =>
      mapRouterUser(o, convert)
    )
  }

  return arr
}

const lazyLoad = (pathComponent: string, convert: Convert): Promise<any> => {
  const key = normalize(pathComponent)
  const loader = modules[key]

  if (!loader) {
    throw new Error(`Module not found for ${pathComponent}. Tried key "${key}"`)
  }

  return loader().then(convert)
}

export const mapPrivateRouters = (
  schema: IPrivateRouterSchema,
  convert: Convert
): RouteObject[] => {
  return schema.flatMap((item) => mapRouterUser(item, convert))
}
