import { locales, localePrefix, pathnames } from './navigation';
import { defaultLocale } from './i18n';
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales,
  localePrefix,
  defaultLocale,
  pathnames
});

export const config = {
  matcher: ['/', `/(en|sv)/:path*`]
};
