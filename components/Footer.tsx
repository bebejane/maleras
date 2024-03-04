'use client'

import Link from "next/link";
import s from './Footer.module.scss'
import cn from 'classnames'
import { useEffect, useState } from "react";

export default function Footer() {

  return (
    <>
      <footer className={s.footer}>
        <span>
          What can we do for you? Contact us and let us know.
        </span>
        <figure>
          <img src="/images/hovlev.png" alt="logo" />
        </figure>
      </footer>
    </>
  );
}