import s from './page.module.scss';
import cn from 'classnames';
import { LocaleParams } from '@/app/[locale]/layout';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { AllOfferCategoriesDocument, OfferDocument } from '@/graphql';
import { notFound } from 'next/navigation';
import { Image } from 'react-datocms';
import { locales, defaultLocale, getPathname } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

import Content from '@/components/Content';
import OfferNavBar from './OfferNavBar';
import VideoPlayer from '@/components/VideoPlayer';
import { Metadata } from 'next';

export default async function Offer({ params }: LocaleParams) {
	const locale = (await params).locale;
	const { offer, draftUrl } = await apiQuery(OfferDocument, {
		variables: { siteId: process.env.NEXT_PUBLIC_SITE_ID, locale },
	});

	const { allOfferCategories } = await apiQuery(AllOfferCategoriesDocument, {
		variables: { siteId: process.env.NEXT_PUBLIC_SITE_ID, locale },
	});

	if (!offer) return notFound();

	return (
		<>
			<article id='offers' className={cn(s.offer)}>
				<header>
					<section>
						<h1>{offer.title}</h1>
						<div className={s.text}>
							<Content content={offer.content} className='intro' />
						</div>
					</section>
					{offer.image?.responsiveImage && (
						<figure>
							<Image data={offer.image.responsiveImage} pictureClassName={s.image} fadeInDuration={0} />
						</figure>
					)}
				</header>
				<OfferNavBar allOfferCategories={allOfferCategories} />
				{allOfferCategories?.map(({ id, slug, _allReferencingOfferItems: items }, idx) => {
					return (
						<section id={slug} key={idx} data-offer-id={id}>
							<ul>
								{items.map(({ title, content, gallery, subtitle, backgroundImage }, idx) => {
									return (
										<li key={idx} className='grid'>
											<div className={s.content}>
												<h3>{title}</h3>
												{subtitle && <h4>{subtitle}</h4>}
												<Content content={content} />
											</div>
											<div className={s.gallery}>
												{gallery.map(({ media }) =>
													media.map((m, idx) => (
														<figure className={cn(media.length > 1 && s.double)} key={idx}>
															{m.video ? (
																<VideoPlayer data={m as FileField} />
															) : m.responsiveImage ? (
																<Image data={m.responsiveImage} intersectionMargin='0px 0px 200% 0px' />
															) : null}
														</figure>
													))
												)}
											</div>
											{backgroundImage?.responsiveImage && (
												<Image data={backgroundImage.responsiveImage} className={s.background} />
											)}
										</li>
									);
								})}
							</ul>
						</section>
					);
				})}
			</article>
			<DraftMode url={draftUrl} tag={offer?.id} />
		</>
	);
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
	const t = await getTranslations('NavBar');

	const languages = {};
	locales.forEach(
		(l) => (languages[l] = `${process.env.NEXT_PUBLIC_SITE_URL}/${l}${getPathname({ href: '/products', locale: l })}`)
	);

	return {
		title: t('offer'),
		alternates: {
			canonical: getPathname({ href: '/products', locale: defaultLocale }),
			languages,
		},
	};
}
