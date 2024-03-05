'use server'

import s from './page.module.scss'
import cn from 'classnames';
import { LocaleParams } from '@app/[locale]/layout';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode, Block } from 'next-dato-utils/components';
import { AboutDocument } from '@graphql';
import { notFound } from 'next/navigation';
import { Image } from 'react-datocms';
import VideoPlayer from '@components/VideoPlayer';
import * as BlockCompoents from '@components/blocks';
import { getPathname } from '@i18n/navigation';
import { defaultLocale, locales } from '@i18n';
import { getTranslations } from 'next-intl/server';

export default async function About({ params }: LocaleParams) {

  const { about, draftUrl } = await apiQuery<AboutQuery, AboutQueryVariables>(AboutDocument, {
    variables: { siteId: process.env.NEXT_PUBLIC_SITE_ID, locale: params.locale as SiteLocale },
    tags: ['about']
  });

  if (!about) return notFound();

  return (
    <>
      <article className={cn(s.about)}>
        <header>
          <section>
            <h1>{about.title}</h1>
            <h2>{about.intro}</h2>
          </section>
          {about.media.responsiveImage ?
            <figure className={s.image}>
              <Image data={about.media.responsiveImage} />
            </figure>
            :
            <VideoPlayer data={about.media as FileField} className={s.video} />
          }
        </header>
        <div className={s.content}>
          {about.content?.map((block, idx) =>
            <Block key={idx} data={block} components={BlockCompoents} />
          )}
        </div>
      </article>
      <DraftMode url={draftUrl} tag={about?.id} />
    </>
  )
}

export async function generateMetadata({ params }: LocaleParams) {
  const t = await getTranslations('NavBar');

  const languages = {}
  locales.forEach((l) =>
    languages[l] = `${process.env.NEXT_PUBLIC_SITE_URL}/${l}${getPathname({ href: '/about', locale: l })}`
  )

  return {
    title: t('about'),
    alternates: {
      canonical: getPathname({ href: "/about", locale: defaultLocale }),
      languages
    }
  }
}