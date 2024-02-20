'use server'

import s from './page.module.scss'
import cn from 'classnames';
import { LocaleParams } from '@app/[locale]/layout';
import { apiQuery, DraftMode } from 'next-dato-utils';
import { AboutDocument } from '@graphql';
import { notFound } from 'next/navigation';

export default async function About({ params }: LocaleParams) {

  const { about, draftUrl } = await apiQuery<AboutQuery, AboutQueryVariables>(AboutDocument, {
    variables: { siteId: process.env.NEXT_PUBLIC_SITE_ID, locale: params.locale as SiteLocale },
    tags: ['about']
  });

  if (!about) return notFound();

  return (
    <>
      <article className={cn(s.about)}>
        <h1>About {params.locale}</h1>
        {about?.title}
      </article>
      <DraftMode url={draftUrl} tag={about?.id} />
    </>
  )
}