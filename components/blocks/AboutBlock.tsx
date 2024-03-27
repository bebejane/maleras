import s from './AboutBlock.module.scss'
import React from 'react'
import { Image } from 'react-datocms'
import VideoPlayer from '@components/VideoPlayer'
import Content from '../Content'
import cn from 'classnames'

export type LayoutProps = { data: AboutBlockRecord }

export default function AboutBlock({ data: { headline, text, media } }: LayoutProps) {

	return (
		<section className={cn(s.aboutBlock, "grid")}>
			<div className={s.text}>
				<h2>{headline}</h2>
				<Content content={text} className="intro" />
			</div>
			{media.responsiveImage ?
				<figure className={s.image}>
					<Image data={media.responsiveImage} intersectionMargin="0px 0px 100% 0px" />
				</figure>
				:
				<VideoPlayer data={media} className={s.video} />
			}
		</section>
	)
}