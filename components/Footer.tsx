'use client'

import Link from "next/link";
import s from './Footer.module.scss'
import cn from 'classnames'
import { useEffect, useState } from "react";

export default function Footer() {

  return (
    <>
      <footer className={s.footer}>
        Footer
      </footer>
    </>
  );
}