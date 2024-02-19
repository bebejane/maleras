'use client'

import { usePathname } from "next/navigation"

export default function useLocale() {
  const pathname = usePathname()
  return getLocaleFromPathname(pathname)
}

const getLocaleFromPathname = (pathname: string) => {
  const [path, hash] = pathname.split('#')
  const locale = path.toLowerCase().split('/')[1].length === 2 ? path.toLowerCase().split('/')[1] : undefined
  return !locale ? 'se' : locale
}