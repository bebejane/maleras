import s from './page.module.scss';
import cn from 'classnames';
import { LocaleParams } from '@/app/[locale]/layout';
import { setRequestLocale } from 'next-intl/server';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode, Block } from 'next-dato-utils/components';
import { StartDocument } from '@/graphql';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/routing';
import * as BlockComponets from '@/components/blocks';

export default async function Start({ params }: LocaleParams) {
	const locale = (await params).locale;
	if (!locales.includes(locale)) return notFound();
	setRequestLocale(locale);

	const { start, draftUrl } = await apiQuery(StartDocument, {
		variables: { siteId: process.env.NEXT_PUBLIC_SITE_ID, locale },
	});

	if (!start) return notFound();

	return (
		<>
			<article className={cn(s.start)}>
				{start?.content?.map((block, idx) => (
					<Block key={idx} components={BlockComponets} data={block} />
				))}
			</article>
			<DraftMode url={draftUrl} tag={start?.id} />
		</>
	);
}
