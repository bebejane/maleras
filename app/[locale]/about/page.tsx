'use server';

import s from './page.module.scss';
import cn from 'classnames';
import { LocaleParams } from '@/app/[locale]/layout';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode, Block } from 'next-dato-utils/components';
import { AboutDocument } from '@/graphql';
import { notFound } from 'next/navigation';
import { Image } from 'react-datocms';
import VideoPlayer from '@/components/VideoPlayer';
import * as BlockCompoents from '@/components/blocks';
import { defaultLocale, locales, getPathname } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export default async function About({ params }: LocaleParams) {
	const locale = (await params).locale;
	if (!locales.includes(locale)) return notFound();
	const { about, draftUrl } = await apiQuery(AboutDocument, {
		variables: { siteId: process.env.NEXT_PUBLIC_SITE_ID, locale },
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
					{about.media?.responsiveImage ? (
						<figure className={s.image}>
							<Image data={about.media.responsiveImage} />
						</figure>
					) : (
						<VideoPlayer data={about.media as FileField} className={s.video} />
					)}
				</header>
				<div className={s.content}>
					{about.content?.map((block, idx) => (
						<Block key={idx} data={block} components={BlockCompoents} />
					))}
				</div>
			</article>
			<DraftMode url={draftUrl} tag={about?.id} />
		</>
	);
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
	const t = await getTranslations('NavBar');

	const languages = {};
	locales.forEach(
		(l) => (languages[l] = `${process.env.NEXT_PUBLIC_SITE_URL}/${l}${getPathname({ href: '/about', locale: l })}`)
	);

	return {
		title: t('about'),
		alternates: {
			canonical: getPathname({ href: '/about', locale: defaultLocale }),
			languages,
		},
	};
}
