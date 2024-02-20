
import { buildRoute } from '@lib/routes';
import { revalidate } from 'next-dato-utils/route-handlers'

export const runtime = "edge"
export const dynamic = "force-dynamic"

export async function POST(req: Request) {

  return await revalidate(req, async (payload, revalidate) => {

    const { api_key, entity, event_type, entity_type } = payload;
    const { id, attributes } = entity
    const siteId = attributes?.siteSelector?.siteId ?? null

    if (siteId && siteId !== process.env.NEXT_PUBLIC_SITE_ID) {
      console.log('Site ID does not match', siteId, process.env.NEXT_PUBLIC_SITE_ID)
      return
    }

    const paths: string[] = []
    const tags: string[] = [id]

    paths.push(await buildRoute(api_key, attributes))
    api_key && tags.push(api_key)
    return revalidate(paths, tags)
  })
}