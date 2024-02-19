'use client'

import React from "react";
import Link from "next/link";
import cn from 'classnames'
import s from './NavBar.module.scss'
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useScrollInfo } from 'next-dato-utils'

export type Props = {

}

export default function NavBar({ }: Props) {

  const pathname = usePathname()
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
    <nav>
      Menu
    </nav>
  );
}

