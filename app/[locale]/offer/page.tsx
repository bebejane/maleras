import s from './page.module.scss'
import cn from 'classnames';
import { LocaleParams } from '@app/[locale]/layout';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode, Block } from 'next-dato-utils/components';
import { OfferDocument } from '@graphql';
import { notFound } from 'next/navigation';
import * as BlockComponets from '@components/content/blocks';

export default async function Offer({ params }: LocaleParams) {

  const { offer, draftUrl } = await apiQuery<OfferQuery, OfferQueryVariables>(OfferDocument, {
    variables: { siteId: process.env.NEXT_PUBLIC_SITE_ID, locale: params.locale as SiteLocale },
    tags: ['offer']
  });

  if (!offer) return notFound();

  return (
    <>
      <article className={cn(s.start)}>
        <h1>{offer.title}</h1>
      </article>
      <DraftMode url={draftUrl} tag={offer?.id} />
    </>
  )
}