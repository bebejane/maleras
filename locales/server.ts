// locales/server.ts
import { createI18nServer } from 'next-international/server'

export const { getI18n, getScopedI18n, getStaticParams } = createI18nServer({
  en: () => import(`./en-${process.env.NEXT_PUBLIC_SITE_ID}.ts`),
  sv: () => import(`./sv-${process.env.NEXT_PUBLIC_SITE_ID}.ts`)
})