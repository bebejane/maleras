import { locales as allLocales, defaultLocale } from './i18n';
import { Pathnames, createLocalizedPathnamesNavigation } from 'next-intl/navigation';

export const locales = allLocales;
export const localePrefix = 'always'; // Default

export const pathnames = {
  '/': '/',
  '/about': {
    en: '/about',
    sv: '/om-oss'
  },
  '/offer': {
    en: '/offer',
    sv: '/erbjudande'
  }
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });

