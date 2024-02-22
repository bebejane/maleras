import { locales as allLocales, defaultLocale } from './i18n';
import { Pathnames, createLocalizedPathnamesNavigation } from 'next-intl/navigation';

export const locales = allLocales;
export const localePrefix = 'always'; // Default

export const pathnames = {
  // If all locales use the same pathname, a
  // single external path can be provided.
  '/': '/',

  // If locales use different paths, you can
  // specify each external path per locale.
  '/about': {
    en: '/about',
    sv: '/om-oss'
  },
  '/offer': {
    en: '/offer',
    sv: '/erbjudande'
  },
  '/offer/[offerCategory]': {
    en: '/offer/[offerCategory]',
    sv: '/erbjudande/[offerCategory]'
  },
  /*
  // Also (optional) catch-all segments are supported
  '/categories/[...slug]': {
    en: '/categories/[...slug]',
    de: '/kategorien/[...slug]'
  }
  */
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });

