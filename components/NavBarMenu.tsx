'use client'

import React, { useEffect, useRef, useState } from "react";
import { Link, locales } from '@i18n/navigation'
import cn from 'classnames'
import s from './NavBarMenu.module.scss'
import Content from "./Content";
import { usePathname } from '@i18n/navigation';


export type Props = {
  messages: any
  locale: string
  contact: ContactQuery['contact']
}

export default function NavBarMenu({ messages, locale, contact }: Props) {

  const [showContact, setShowContact] = useState(false)
  const contactRef = useRef<HTMLElement | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    setShowContact(false)
  }, [pathname])
  console.log(pathname)
  return (
    <>
      <div className={s.navbar}>
        <nav className={s.menu}>
          <ul>
            <li className={cn(pathname === '/offer' && !showContact && s.selected)}>
              <Link href={`/offer`}>{messages['our-offer']}</Link>
            </li>
            <li className={cn(pathname === '/about' && !showContact && s.selected)}>
              <Link href={`/about`}>{messages['about']}</Link>
            </li>
            <li className={cn(showContact && s.selected)} onClick={() => setShowContact(!showContact)}>
              {messages['contact']}
            </li>
          </ul>
          <nav className={s.language}>
            <span>|</span>
            {locales.filter(l => l !== locale).map((l, idx) =>
              <Link
                key={l}
                href={'/'}
                locale={l}
              >{l}</Link>
            )}
          </nav>
        </nav>
        <section ref={contactRef} className={s.contact} style={{ maxHeight: showContact ? contactRef.current?.scrollHeight : 0 }}>
          <h3>Contact</h3>
          <div className={s.info}>
            <Content content={contact?.text} />
          </div>
        </section>
      </div>
    </>
  );
}

