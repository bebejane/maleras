import { MetadataRoute } from 'next'
import { getPathname, locales, pathnames } from '../i18n/navigation'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  //@ts-ignore
  const staticRoutes: MetadataRoute.Sitemap = locales.map((locale) => Object.keys(pathnames).map((href) => {
    return {
      //@ts-ignore
      url: `${process.env.NEXT_PUBLIC_SITE_URL}${getPathname({ href, locale })}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    }
  })).flat()

  return staticRoutes
}