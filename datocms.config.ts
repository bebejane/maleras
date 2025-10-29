import { getPathname, locales, routing, defaultLocale } from '@/i18n/routing';
import { DatoCmsConfig, getUploadReferenceRoutes } from 'next-dato-utils/config';
import { MetadataRoute } from 'next';

export default {
	i18n: {
		locales,
		defaultLocale,
	},
	routes: {
		start: async (record, locale) => [getPathname({ locale, href: '/' })],
		about: async (record, locale) => [getPathname({ locale, href: '/about' })],
		contact: async (record, locale) => [getPathname({ locale, href: '/' })],
		offer: async (record, locale) => [getPathname({ locale, href: '/products' }), getPathname({ locale, href: '/' })],
		offer_category: async (record, locale) => [
			getPathname({ locale, href: '/products' }),
			getPathname({ locale, href: '/' }),
		],
		offer_item: async (record, locale) => [getPathname({ locale, href: '/products' })],
		upload: async ({ id }) => getUploadReferenceRoutes(id),
	},
	sitemap: async () => {
		//@ts-ignore
		const staticRoutes: MetadataRoute.Sitemap = locales
			.map((locale) =>
				Object.keys(routing.pathnames).map((href: keyof typeof routing.pathnames) => {
					return {
						url: `${process.env.NEXT_PUBLIC_SITE_URL}${getPathname({ href, locale })}`,
						lastModified: new Date(),
						changeFrequency: 'monthly',
						priority: 1,
					};
				})
			)
			.flat();
		return staticRoutes;
	},
	manifest: async () => {
		return {
			name: 'Målerås Glasbruk',
			short_name: 'Målerås',
			description: 'Målerås Glasbruk',
			start_url: '/',
			display: 'standalone',
			background_color: '#ffffff',
			theme_color: '#ffffff',
			icons: [
				{
					src: '/favicon.ico',
					sizes: 'any',
					type: 'image/x-icon',
				},
			],
		} satisfies MetadataRoute.Manifest;
	},
	robots: async () => {
		return {
			rules: {
				userAgent: '*',
				allow: '/',
			},
		};
	},
} satisfies DatoCmsConfig;
