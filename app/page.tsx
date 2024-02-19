'use server'

import s from './page.module.scss'
import cn from 'classnames';
import { apiQuery, DraftMode } from 'next-dato-utils';
import { StartDocument } from '@graphql';
import { notFound } from 'next/navigation';

export default async function Start() {

  const { start, draftUrl } = await apiQuery<StartQuery, StartQueryVariables>(StartDocument, {
    variables: { siteId: process.env.NEXT_PUBLIC_SITE_ID }
  });

  if (!start) return notFound();

  return (
    <>
      <article className={cn(s.start)}>
        {start?.title}
      </article>
      <DraftMode url={draftUrl} tag={start?.id} />
    </>
  )
}