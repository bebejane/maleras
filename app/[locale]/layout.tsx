import '@styles/index.scss'
import { defaultLocale } from '@lib/i18n';
import { apiQuery } from "next-dato-utils";
import { GlobalDocument } from "@graphql";
import { Metadata } from "next/types";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";

import NavBar from '@components/NavBar';
import Footer from '@components/Footer';

export type LocaleParams = {
  params: {
    locale: string
  }
  searchParams?: any
}

export type LayoutProps = {
  children: React.ReactNode,
  params: LocaleParams,
  backgroundColor?: string,
}

export const dynamic = 'force-static'

export default async function RootLayout({ children, params }: LayoutProps) {
  const locale = params?.params?.locale ?? defaultLocale

  return (
    <html lang={locale}>
      <body id="root">
        <NavBar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

export async function generateMetadata({ params }: LocaleParams) {
  params = Object.keys(params).length === 0 ? { locale: defaultLocale } : params

  const { site: { globalSeo, faviconMetaTags } } = await apiQuery<GlobalQuery, GlobalQueryVariables>(GlobalDocument, {
    variables: { locale: params.locale as SiteLocale },
    generateTags: false
  });

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
    alternates: { canonical: '/' },
    title: {
      template: `${globalSeo?.siteName} — %s`,
      default: globalSeo?.siteName,
    },
    description: globalSeo?.fallbackSeo?.description,
    image: globalSeo?.fallbackSeo?.image?.url,
    icons: faviconMetaTags.map(({ attributes: { rel, sizes, type, href: url } }) => ({ rel, url, sizes, type })) as Icon[],
    openGraph: {
      title: globalSeo?.siteName,
      description: globalSeo?.fallbackSeo?.description,
      url: process.env.NEXT_PUBLIC_SITE_URL,
      siteName: globalSeo?.siteName,
      images: [
        {
          url: `${globalSeo?.fallbackSeo?.image?.url}?w=1200&h=630&fit=fill&q=80`,
          width: 800,
          height: 600,
          alt: globalSeo?.siteName
        },
        {
          url: `${globalSeo?.fallbackSeo?.image?.url}?w=1600&h=800&fit=fill&q=80`,
          width: 1600,
          height: 800,
          alt: globalSeo?.siteName
        },
        {
          url: `${globalSeo?.fallbackSeo?.image?.url}?w=790&h=627&fit=crop&q=80`,
          width: 790,
          height: 627,
          alt: globalSeo?.siteName
        },
      ],
      locale: params.locale,
      type: 'website',
    },
  } as Metadata
}
