'use client'

import s from './OfferBlock.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from "swiper";
import 'swiper/css';
import "swiper/css/effect-fade";
import React, { useRef, useState } from 'react'
import { Image } from 'react-datocms'
import { Link } from '@i18n/navigation'
import { Swiper as SwiperType } from 'swiper/types';

import cn from 'classnames';
import { useTranslations } from 'next-intl';

export type LayoutProps = { data: OfferBlockRecord }

export default function OfferBlock({ data: { title, text, categories, background } }: LayoutProps) {

	const t = useTranslations('General')
	const swiperRef = useRef<SwiperType | null>(null)
	const [index, setIndex] = useState(0)

	return (
		<section className={cn(s.offer, "grid")}>
			<div className={s.offers}>
				<h2>{title}</h2>
				<p className="intro">{text}</p>
				<ul
					onMouseEnter={() => swiperRef.current.autoplay.stop()}
					onMouseLeave={() => swiperRef.current.autoplay.start()}
				>
					{categories.map(({ title, slug }, i) => (
						<li
							key={i}
							className={i === index ? s.active : undefined}
							onMouseEnter={() => swiperRef.current.slideTo(i)}
						>
							<Link href={{ pathname: `/products`, hash: slug }}>
								<span className="nav">{title}</span>
							</Link>
						</li>
					))}
				</ul>
				<Link className="button nav" href={`/products`}>{t('read-more')}</Link>
			</div>
			<div className={s.gallery}>
				<Swiper
					spaceBetween={0}
					slidesPerView={1}
					initialSlide={0}
					effect={'fade'}
					autoplay={{ delay: 2000 }}
					modules={[Autoplay, EffectFade]}
					onSlideChange={() => setIndex(swiperRef.current?.activeIndex || 0)}
					onSwiper={(swiper) => swiperRef.current = swiper}
				>
					{categories.map(({ title, slug, image }, i) => (
						<SwiperSlide key={i}>
							<figure id={`i${i}`}>
								<Image data={image?.responsiveImage} />
							</figure>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			{background?.responsiveImage &&
				<Image data={background.responsiveImage} className={s.background} />
			}
		</section>
	)
}