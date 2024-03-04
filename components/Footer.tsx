'use client'

import s from './Footer.module.scss'
import cn from 'classnames'
import { useStore, shallow } from "../lib/store";

export default function Footer() {

  const [showContact, setShowContact] = useStore(state => [state.showContact, state.setShowContact], shallow)

  return (
    <footer className={s.footer} onClick={() => setShowContact(!showContact)}>
      <span>
        What can we do for you? Contact us and let us know.
      </span>
      <figure>
        <img src="/images/hovlev.png" alt="logo" />
      </figure>
    </footer>
  );
}