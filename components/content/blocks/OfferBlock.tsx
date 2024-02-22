import s from './OfferBlock.module.scss'
import React, { useRef } from 'react'
import { Image } from 'react-datocms'
import Link from '@components/Link'
import Content from '../Content'

export type LayoutProps = { data: OfferBlockRecord }

export default function OfferBlock({ data: { title, text, categories } }: LayoutProps) {

	return (
		<section className={s.offer}>
			<h2>{title}</h2>
			<Content content={text} />
			<ul>
				{categories.map(({ title, slug }, i) => (
					<li key={i}>
						{title}
					</li>
				))}
			</ul>
			<Link href={`/offer`}>Read more</Link>
		</section>
	)
}