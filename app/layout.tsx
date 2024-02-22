'use server'

import '@styles/index.scss'

export type LayoutProps = {
  children: React.ReactNode,
}

export default async function RootLayout({ children }: LayoutProps) {

  return (
    <>
      {children}
    </>
  );
}
