import '@/styles/index.scss';
import { getPathname, defaultLocale, locales } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import { apiQuery } from 'next-dato-utils/api';
import { ContactDocument, GlobalDocument } from '@/graphql';
import { Metadata } from 'next/types';
import { Icon } from 'next/dist/lib/metadata/types/metadata-types';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';

export type LocaleParams = {
	params: Promise<{ locale: SiteLocale }>;
	searchParams?: any;
};

export type RootLayoutProps = {
	children: React.ReactNode;
	params: LocaleParams['params'];
};

export type BodyProps = {
	children: React.ReactNode;
	locale: string;
	contact: ContactQuery['contact'];
};

export const dynamic = 'force-static';

export default async function RootLayout({ children, params }: RootLayoutProps) {
	const locale = (await params).locale ?? defaultLocale;
	if (!locales.includes(locale)) return notFound();

	setRequestLocale(locale);

	const { contact } = await apiQuery(ContactDocument, {
		variables: { siteId: process.env.NEXT_PUBLIC_SITE_ID, locale: locale as SiteLocale },
	});

	return (
		<html lang={locale}>
			<Body locale={locale} contact={contact}>
				{children}
			</Body>
		</html>
	);
}

function Body({ children, locale, contact }: BodyProps) {
	const messages = useMessages();

	return (
		<body id='root'>
			<NextIntlClientProvider locale={locale} messages={messages}>
				<NavBar locale={locale} contact={contact} />
				<main>{children}</main>
				<Footer contact={contact} />
			</NextIntlClientProvider>
		</body>
	);
}

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
	const locale = (await params).locale;

	const {
		site: { globalSeo, faviconMetaTags },
	} = await apiQuery<GlobalQuery, GlobalQueryVariables>(GlobalDocument, {
		variables: { locale },
	});

	const languages = {};
	locales.forEach((l) => {
		languages[l] = `${process.env.NEXT_PUBLIC_SITE_URL}/${l}${getPathname({ href: '/', locale: l })}`;
	});

	return {
		metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
		alternates: {
			canonical: '/',
			languages,
		},
		title: {
			template: `${globalSeo?.siteName} — %s`,
			default: globalSeo?.siteName,
		},
		description: globalSeo?.fallbackSeo?.description,
		image: globalSeo?.fallbackSeo?.image?.url,
		icons: faviconMetaTags.map(({ attributes: { rel, sizes, type, href: url } }) => ({
			rel,
			url,
			sizes,
			type,
		})) as Icon[],
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
					alt: globalSeo?.siteName,
				},
				{
					url: `${globalSeo?.fallbackSeo?.image?.url}?w=1600&h=800&fit=fill&q=80`,
					width: 1600,
					height: 800,
					alt: globalSeo?.siteName,
				},
				{
					url: `${globalSeo?.fallbackSeo?.image?.url}?w=790&h=627&fit=crop&q=80`,
					width: 790,
					height: 627,
					alt: globalSeo?.siteName,
				},
			],
			locale,
			type: 'website',
		},
	} as Metadata;
}
