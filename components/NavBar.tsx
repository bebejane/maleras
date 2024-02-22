
import React from "react";
import { Link } from '@navigation'
import cn from 'classnames'
import s from './NavBar.module.scss'
import { locales } from "@i18n";
import { useTranslations } from "next-intl";

export type Props = {
  locale: string
}

export default function NavBar({ locale }: Props) {

  const t = useTranslations('NavBar')

  return (
    <>
      <Link href="/" className={s.logo}>
        <img src="/images/logo.png" alt="logo" />
      </Link>
      <nav className={s.navbar}>
        <ul>
          <li><Link href={`/offer`}>{t('our-offer')}</Link></li>
          <li><Link href={`/about`}>{t('about')}</Link></li>
          <li>{t('contact')}</li>
        </ul>
        <nav className={s.language}>
          {locales.map((l, idx) =>
            <Link
              key={l}
              href={'/'}
              locale={l}
              className={cn(locale === l && s.active)}
            >{l}</Link>
          )}
        </nav>
      </nav>
    </>
  );
}

