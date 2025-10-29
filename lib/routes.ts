import { buildClient } from '@datocms/cma-client-browser';
import { defaultLocale } from '@/i18n';
import { getPathname } from '@/i18n/navigation';

const client = buildClient({
	apiToken: process.env.DATOCMS_API_TOKEN,
	environment: process.env.DATOCMS_ENVIRONMENT,
});

type Routes = {
	[key: string]: Route;
};

type Route = {
	path: (item: any, locale: string) => Promise<string | null>;
	typeName: string;
};

const routes: Routes = {
	start: {
		typeName: 'StartRecord',
		path: async (item, locale) => getPathname({ locale, href: '/' }),
	},
	about: {
		typeName: 'AboutRecord',
		path: async (item, locale) => getPathname({ locale, href: '/about' }),
	},
	contact: {
		typeName: 'ContactRecord',
		path: async (item, locale) => getPathname({ locale, href: '/' }),
	},
	offer: {
		typeName: 'OfferRecord',
		path: async (item, locale) => getPathname({ locale, href: '/products' }),
	},
	offer_category: {
		typeName: 'OfferCategoryRecord',
		path: async (item, locale) => getPathname({ locale, href: '/products' }),
	},
	offer_item: {
		typeName: 'OfferItemRecord',
		path: async (item, locale) => getPathname({ locale, href: '/products' }),
	},
};

export const buildRoute = async (model: string, item?: any, locale?: string): Promise<string> => {
	if (!routes[model]) throw new Error(`Invalid model: ${model}`);
	const localePrefix = !locale || locale === defaultLocale ? '' : `/${locale}`;
	return `${localePrefix}${await routes[model].path(item, locale)}`;
};

export const recordToRoute = async (record: any): Promise<string> => {
	const { __typename } = record;
	const model = Object.keys(routes).find((key) => routes[key].typeName === __typename);
	if (!model) throw new Error(`Invalid record: ${__typename} `);
	return await buildRoute(model, record);
};

export const getDomain = (siteId: string): string => {
	return `https://maleras-${siteId}.vercel.app`;
};

export default routes;
