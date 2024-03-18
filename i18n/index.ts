import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['sv', 'en'];
export const defaultLocale = 'sv';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./messages/${locale}-${process.env.NEXT_PUBLIC_SITE_ID}.json`)).default,
  };

});