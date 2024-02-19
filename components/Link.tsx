'use client';

import cn from 'classnames';
import { defaultLocale } from '@lib/i18n';
import NextLink, { LinkProps } from 'next/link';
import useLocale from '@lib/hooks/useLocale';
import { usePathname } from 'next/navigation';
import { AnchorHTMLAttributes } from 'react';
import omit from 'object.omit';
import { forwardRef } from 'react';

export type Props = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: React.ReactNode | React.ReactNode[]
  className?: string
  activeClassName?: string
}

const Link = forwardRef<HTMLAnchorElement, Props>(function Link(props: Props, ref) {

  const locale = useLocale();
  const pathname = usePathname();
  const href = parseHref(props.href as string, pathname, locale)

  const mergedProps = {
    ...omit(props, ['locale', 'activeClassName', 'className', 'href']),
    href,
    className: cn(props.className, pathname === href && props.activeClassName),
  }

  return <NextLink
    {...mergedProps}
    passHref={true}
    ref={ref}
  >{props.children}</NextLink>
})

export default Link;

const parseHref = (href: string, pathname: string, locale: string) => {

  if (href.startsWith('http')) return href;
  if (href.startsWith('#'))
    return `${pathname}${href}`;
  else {
    const localeSegment = (locale === defaultLocale ? '' : `/${locale}`).toLowerCase()
    return `${localeSegment}/${href.slice(1)}`
  }
}