'use client'

import React from "react";
import Link from "@components/Link";
import NextLink from "next/link";
import cn from 'classnames'
import s from './NavBar.module.scss'
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useScrollInfo } from 'next-dato-utils/hooks'
import { locales, defaultLocale } from "../lib/i18n";
import useLocale from "../lib/hooks/useLocale";

export type Props = {

}

export default function NavBar({ }: Props) {

  const pathname = usePathname()
  const locale = useLocale()
  const { scrolledPosition } = useScrollInfo()
  const [open, setOpen] = useState(false)

  return (
    <>
      <Link href="/" className={s.logo}>
        <img src="/images/logo.png" alt="logo" />
      </Link>
      <nav className={s.navbar}>
        <ul>
          <li>Our offer</li>
          <li><Link href="/about">About Us</Link></li>
          <li>Contact</li>
        </ul>
        <nav className={s.language}>
          {locales.map((l, idx) => {
            const href = `${l === defaultLocale ? '/' : `/${l}`}${pathname === '/' ? '' : pathname.replace(`/${locale}`, '')}`.replace('//', '/')
            return (
              <NextLink
                key={l}
                href={href}
                className={cn(locale === l && s.active)}
              >{l}</NextLink>
            )
          }
          )}
        </nav>
      </nav>
    </>
  );
}

