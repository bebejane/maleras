import { locales, localePrefix, pathnames } from './i18n/navigation';
import { defaultLocale } from './i18n';
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales,
  localePrefix,
  defaultLocale,
  pathnames,
});

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ]
};
