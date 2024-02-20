import s from './page.module.scss'
import cn from 'classnames';
import { LocaleParams } from '@app/[locale]/layout';
import { apiQuery, DraftMode, Block } from 'next-dato-utils';
import { StartDocument } from '@graphql';
import { notFound } from 'next/navigation';
import * as BlockComponets from '@components/content/blocks';

export default async function Start({ params }: LocaleParams) {

  const { start, draftUrl } = await apiQuery<StartQuery, StartQueryVariables>(StartDocument, {
    variables: { siteId: process.env.NEXT_PUBLIC_SITE_ID, locale: params.locale as SiteLocale },
    tags: ['start']
  });

  if (!start) return notFound();

  return (
    <>
      <article className={cn(s.start)}>
        {start?.content?.map((block, idx) =>
          <Block key={idx} components={BlockComponets} data={block} />
        )}
      </article>
      <DraftMode url={draftUrl} tag={start?.id} />
    </>
  )
}