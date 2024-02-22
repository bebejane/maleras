import { buildClient } from "@datocms/cma-client-browser"
import { defaultLocale, paths } from "../i18n.mjs"

const client = buildClient({
  apiToken: process.env.DATOCMS_API_TOKEN,
  environment: process.env.DATOCMS_ENVIRONMENT
})

type Routes = {
  [key: string]: Route
}

type Route = {
  path: ((item: any, locale: string) => Promise<string | null>)
  typeName: string
}

const routes: Routes = {
  "start": {
    typeName: "StartRecord",
    path: async (item, locale) => paths.start[locale]
  },
  "about": {
    typeName: "AboutRecord",
    path: async (item, locale) => paths.about[locale]
  },
  "contact": {
    typeName: "ContactRecord",
    path: async (item, locale) => paths.contact[locale]
  },
  "offer": {
    typeName: "OfferRecord",
    path: async (item, locale) => paths.start[locale]
  }

}

export const buildRoute = async (model: string, item?: any, locale?: string): Promise<string> => {
  if (!routes[model]) throw new Error(`Invalid model: ${model}`)
  const localePrefix = !locale || locale === defaultLocale ? '' : `/${locale}`
  return `${localePrefix}${await routes[model].path(item, locale)}`
}

export const recordToRoute = async (record: any): Promise<string> => {
  const { __typename } = record
  const model = Object.keys(routes).find(key => routes[key].typeName === __typename)
  if (!model) throw new Error(`Invalid record: ${__typename} `)
  return await buildRoute(model, record)
}

export const getDomain = (siteId: string): string => {
  return `https://maleras-${siteId}.vercel.app`
}

export default routes