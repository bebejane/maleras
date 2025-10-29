import s from './FullscreenMediaBlock.module.scss';
import React from 'react';
import { Image } from 'react-datocms';
import VideoPlayer from '@/components/VideoPlayer';

export type LayoutProps = { data: FullscreenMediaBlockRecord };

export default function FullscreenMediaBlock({ data: { title, text, media } }: LayoutProps) {
	return (
		<section className={s.fullscreenMedia}>
			<div className={s.text}>
				<h1>{title}</h1>
				<h2>{text}</h2>
			</div>
			{media?.responsiveImage ? (
				<figure className={s.image}>
					<Image data={media.responsiveImage} fadeInDuration={0} />
				</figure>
			) : (
				<VideoPlayer data={media} className={s.video} />
			)}
		</section>
	);
}
