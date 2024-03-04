import s from './StartAboutBlock.module.scss'
import React, { useRef } from 'react'
import { Image } from 'react-datocms'
import { Link } from '@i18n/navigation'
import cn from 'classnames'

export type Props = { data: StartAboutBlockRecord }

export default function StartAboutBlock({ data: { headline, text, image, background } }: Props) {

	return (
		<section className={cn(s.about, "grid")}>
			<figure>
				<Image data={image.responsiveImage} className={s.image} />
			</figure>
			<header>
				<h1>{headline}</h1>
				<p className="intro" >{text}</p>
				<Link className="button nav" href={`/about`}>Read more</Link>
			</header>
			{background && <Image data={background.responsiveImage} className={s.background} />}
		</section>
	)
}