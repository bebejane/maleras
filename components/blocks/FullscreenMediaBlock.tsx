import s from './FullscreenMediaBlock.module.scss'
import React, { useRef } from 'react'
import { Image } from 'react-datocms'
import Link from 'next/link'
import VideoPlayer from '@components/VideoPlayer'

export type LayoutProps = { data: FullscreenMediaBlockRecord }

export default function FullscreenMediaBlock({ data: { title, text, media } }: LayoutProps) {

	return (
		<section className={s.fullscreenMedia}>
			<div className={s.text}>
				<h1>{title}</h1>
				<h2>{text}</h2>
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