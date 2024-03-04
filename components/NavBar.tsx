import React from "react";
import { Link } from '@i18n/navigation'
import s from './NavBar.module.scss'
import { useMessages, useTranslations } from "next-intl";
import NavBarMenu from "./NavBarMenu";

export type Props = {
  locale: string
  contact: ContactQuery['contact']
}

export default function NavBar({ locale, contact }: Props) {

  const m = useMessages()

  return <NavBarMenu locale={locale} messages={m.NavBar} contact={contact} />
}

