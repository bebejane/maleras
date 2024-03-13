"use client"
import { createI18nClient } from 'next-international/client'

export const { useI18n, useScopedI18n, I18nProviderClient } = createI18nClient({
  en: () => import(`./en-${process.env.NEXT_PUBLIC_SITE_ID}.ts`),
  sv: () => import(`./sv-${process.env.NEXT_PUBLIC_SITE_ID}.ts`)
})
