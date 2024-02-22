'use client'

import React from "react";
import { Link } from '@navigation'
import NextLink from "next/link";
import cn from 'classnames'
import s from './NavBar.module.scss'
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useScrollInfo } from 'next-dato-utils/hooks'
import { locales, defaultLocale } from "@i18n";
import { useRouter } from '@navigation';
import useLocale from "../lib/hooks/useLocale";


export type Props = {
  locale: string
}

export default function NavBar({ locale }: Props) {

  //const locale = useLocale()
  const { scrolledPosition } = useScrollInfo()
  const [open, setOpen] = useState(false)
  const router = useRouter();
  console.log(locale)
  return (
    <>
      <Link href="/" className={s.logo}>
        <img src="/images/logo.png" alt="logo" />
      </Link>
      <nav className={s.navbar}>
        <ul>
          <li><Link href={`/offer`}>Our offer</Link></li>
          <li><Link href={`/about`}>About Us</Link></li>
          <li>Contact</li>
        </ul>
        <nav className={s.language}>
          {locales.map((l, idx) => {
            const href = `/${l}`
            return (
              <NextLink
                key={l}
                href={href}
                className={cn(locale === l && s.active)}
              >{l}</NextLink>
            )
          })}
        </nav>
      </nav>
    </>
  );
}

