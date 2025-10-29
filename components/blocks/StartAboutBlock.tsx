import s from './StartAboutBlock.module.scss';
import React from 'react';
import { Markdown } from 'next-dato-utils/components';
import { Image } from 'react-datocms';
import { Link } from '@/i18n/routing';
import cn from 'classnames';
import { useTranslations } from 'next-intl';

export type Props = { data: StartAboutBlockRecord };

export default function StartAboutBlock({ data: { headline, text, image, background } }: Props) {
	const t = useTranslations('General');

	return (
		<section className={cn(s.about, 'grid')}>
			<figure>
				{image?.responsiveImage && (
					<Image data={image.responsiveImage} className={s.image} intersectionMargin={'0px 0px 200% 0px'} />
				)}
			</figure>
			<header>
				<h2>{headline}</h2>
				<Markdown className='intro' content={text} />
				<Link className='button nav' href={`/about`}>
					{t('read-more')}
				</Link>
			</header>
			{background?.responsiveImage && <Image data={background.responsiveImage} className={s.background} />}
		</section>
	);
}
