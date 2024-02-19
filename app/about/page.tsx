'use server'

import s from './page.module.scss'
import cn from 'classnames';
import { apiQuery, DraftMode } from 'next-dato-utils';
import { AboutDocument } from '@graphql';
import { notFound } from 'next/navigation';

export default async function About() {

  const { about, draftUrl } = await apiQuery<AboutQuery, AboutQueryVariables>(AboutDocument, {
    variables: { siteId: process.env.NEXT_PUBLIC_SITE_ID },
    tags: ['about']
  });

  if (!About) return notFound();

  return (
    <>
      <article className={cn(s.about)}>
        {about?.title}
      </article>
      <DraftMode url={draftUrl} tag={about?.id} />
    </>
  )
}