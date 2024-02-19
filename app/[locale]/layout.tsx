import { locales } from "../../lib/i18n"

export type LocaleParams = { params: { locale: string }, searchParams: any } | undefined

export type LayoutProps = {
  children: React.ReactNode
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children }: LayoutProps) {
  return <>{children}</>
}