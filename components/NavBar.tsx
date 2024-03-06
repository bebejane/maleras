'use client'

import React, { useEffect, useRef } from "react";
import { Link, locales } from '@i18n/navigation'
import { useScrollInfo } from 'next-dato-utils/hooks'
import cn from 'classnames'
import s from './NavBar.module.scss'
import Content from "./Content";
import { usePathname, getPathname } from '@i18n/navigation';
import { useStore } from "@lib/store";
import { useTranslations } from "next-intl";

export type Props = {
  locale: string
  contact: ContactQuery['contact']
}

export default function NavBar({ locale, contact }: Props) {

  const t = useTranslations('NavBar')
  const [showContact, setShowContact] = useStore(state => [state.showContact, state.setShowContact])
  const contactRef = useRef<HTMLElement | null>(null)
  const pathname = usePathname()
  const { scrolledPosition, viewportHeight } = useScrollInfo()
  const inverted = (scrolledPosition < viewportHeight || pathname === '/') && !showContact

  useEffect(() => {
    setShowContact(false)
  }, [pathname])

  return (
    <>
      <Link href="/" className={cn(s.logo, inverted && s.invert)}>
        <img src="/images/logo.svg" alt="logo" />
      </Link>
      <div className={s.navbar}>
        <nav className={cn(s.menu, inverted && s.invert)}>
          <ul>
            <li className={cn(pathname === '/offer' && !showContact && s.selected)}>
              <Link href={`/offer`}>{t('offer')}</Link>
            </li>
            <li className={cn(pathname === '/about' && !showContact && s.selected)}>
              <Link href={`/about`}>{t('about')}</Link>
            </li>
            <li className={cn(showContact && s.selected)} onClick={() => setShowContact(!showContact)}>
              {t('contact')}
            </li>
          </ul>
          <nav className={s.language}>
            <span>|</span>
            {locales.filter(l => l !== locale).map((l, idx) =>
              <Link
                key={l}
                href={getPathname({ href: pathname, locale: l }) as ReturnType<typeof Link>['props']['href']}
                locale={l}
              >{l}</Link>
            )}
          </nav>
        </nav>
        <section
          ref={contactRef}
          className={cn(s.contact, inverted && s.invert, "grid")}
          style={{ maxHeight: showContact ? contactRef.current?.scrollHeight : 0 }}
        >
          <h1>{contact.title}</h1>
          <div className={s.info}>
            <Content className="intro" content={contact?.text} />
            <ul className={s.sellers}>
              {[contact.seller1, contact.seller2].map((seller, idx) =>
                <li>{seller}</li>
              )}
            </ul>
          </div>
        </section>
        <div className={cn(s.background, inverted && s.invert)}></div>
      </div>
    </>
  );
}
