import s from './AboutBlock.module.scss'
import React, { useRef } from 'react'
import { Image } from 'react-datocms'
import Link from 'next/link'
import VideoPlayer from '@components/VideoPlayer'
import Content from '../Content'

export type LayoutProps = { data: AboutBlockRecord }

export default function AboutBlock({ data: { headline, text, media } }: LayoutProps) {

	return (
		<section className={s.aboutBlock}>
			<div className={s.text}>
				<h2>{headline}</h2>
				<Content content={text} />
			</div>
			{media.responsiveImage ?
				<figure className={s.image}>
					<Image data={media.responsiveImage} />
				</figure>
				:
				<VideoPlayer data={media} className={s.video} />
			}
		</section>
	)
}