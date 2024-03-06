'use client'

import s from './Footer.module.scss'
import cn from 'classnames'
import { useStore } from "@lib/store";

export type Props = {
  contact: ContactQuery['contact']
}

export default function Footer({ contact }: Props) {

  const [showContact, setShowContact] = useStore(state => [state.showContact, state.setShowContact])

  return (
    <footer className={s.footer} onClick={() => setShowContact(!showContact)}>
      <span>
        {contact.footer}
      </span>
      <figure>
        <img src="/images/hovlev.png" alt="logo" />
      </figure>
    </footer>
  );
}