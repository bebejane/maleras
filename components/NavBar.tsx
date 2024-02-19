'use client'

import React from "react";
import Link from "@components/Link";
import NextLink from "next/link";
import cn from 'classnames'
import s from './NavBar.module.scss'
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useScrollInfo } from 'next-dato-utils'
import useLocale from "../lib/hooks/useLocale";

export type Props = {

}

export default function NavBar({ }: Props) {

  const pathname = usePathname()
  const locale = useLocale()
  const { scrolledPosition } = useScrollInfo()
  const [open, setOpen] = useState(false)
  const [isScrolledDown, setIsScrolledDown] = useState(false)
  const [showNewsletter, setShowNewsletter] = useState(false)

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => { setIsScrolledDown(scrolledPosition > 0) }, [scrolledPosition])

  useEffect(() => {
    document.body.classList.toggle('slide-up', showNewsletter)
  }, [showNewsletter])

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
          <NextLink href="/" className={cn(locale === 'se' && s.active)}>Sv</NextLink>
          <NextLink href="/en" className={cn(locale === 'en' && s.active)}>En</NextLink>
        </nav>
      </nav>
    </>
  );
}

