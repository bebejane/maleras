'use server'

import s from './page.module.scss'
import cn from 'classnames';
import { LocaleParams } from '@app/[locale]/layout';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { AboutDocument } from '@graphql';
import { notFound } from 'next/navigation';
import Content from '@components/Content';

export default async function About({ params }: LocaleParams) {

  const { about, draftUrl } = await apiQuery<AboutQuery, AboutQueryVariables>(AboutDocument, {
    variables: { siteId: process.env.NEXT_PUBLIC_SITE_ID, locale: params.locale as SiteLocale },
    tags: ['about']
  });

  if (!about) return notFound();

  return (
    <>
      <article className={cn(s.about)}>
        <h1>{about.title}</h1>
        <Content content={about.content} />
      </article>
      <DraftMode url={draftUrl} tag={about?.id} />
    </>
  )
}