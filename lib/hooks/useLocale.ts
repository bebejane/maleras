'use client'

import { locales, defaultLocale } from '@i18n'

import { usePathname } from "@i18n/navigation"

export default function useLocale() {
  const pathname = usePathname()
  return getLocaleFromPathname(pathname)
}

const getLocaleFromPathname = (pathname: string) => {
  const [path, hash] = pathname.split('#')
  const locale = locales.find(l => l === path.toLowerCase().split('/')[1]) ?? defaultLocale
  return locale
}