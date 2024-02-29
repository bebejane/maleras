import s from './page.module.scss'
import cn from 'classnames';
import { LocaleParams } from '@app/[locale]/layout';
import { unstable_setRequestLocale as setRequestLocale } from 'next-intl/server';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode, Block } from 'next-dato-utils/components';
import { StartDocument } from '@graphql';
import { notFound } from 'next/navigation';
import { Image } from 'react-datocms';
import * as BlockComponets from '@components/blocks';
import Content from '../../components/Content';

export default async function Start({ params }: LocaleParams) {

  setRequestLocale(params.locale);

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
        <section className={s.about}>
          <h2>{start.aboutHeadline}</h2>
          <Content content={start.aboutText} />
          <Image data={start.aboutImage.responsiveImage} className={s.image} />
        </section>
      </article>
      <DraftMode url={draftUrl} tag={start?.id} />
    </>
  )
}