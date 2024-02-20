'use server'

import '@styles/index.scss'
import NavBar from '@components/NavBar';
import Footer from '@components/Footer';

export type LocaleParams = {
  params: {
    locale: string
  }
  searchParams?: any
}

export type LayoutProps = {
  children: React.ReactNode,
  params: LocaleParams,
  backgroundColor?: string,

}

export default async function RootLayout({ children, params }: LayoutProps) {

  return (
    <>
      {children}
    </>
  );
}

