import { LocalePrefix } from 'next-intl/dist/types/src/shared/types';
import { locales as allLocales } from './';
import { Pathnames, createLocalizedPathnamesNavigation } from 'next-intl/navigation';

export const locales = allLocales;
export const localePrefix: LocalePrefix = 'as-needed';
export const pathnames = {
  '/': '/',
  '/about': {
    en: '/about',
    sv: '/om-oss'
  },
  '/products': {
    en: '/products',
    sv: '/produkter'
  }
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });

