'use client'

import s from './OfferBlock.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper";
import 'swiper/css';
import React, { useRef, useState } from 'react'
import { Image } from 'react-datocms'
import { Link } from '@i18n/navigation'
import Content from '@components/Content';
import { Swiper as SwiperType } from 'swiper/types';

import cn from 'classnames';

export type LayoutProps = { data: OfferBlockRecord }

export default function OfferBlock({ data: { title, text, categories, background } }: LayoutProps) {

	const swiperRef = useRef<SwiperType | null>(null)
	const [index, setIndex] = useState(0)

	return (
		<section className={cn(s.offer, "grid")}>
			{background?.responsiveImage && <Image data={background.responsiveImage} className={s.background} />}
			<div className={s.offers}>
				<h2>{title}</h2>
				<p>{text}</p>
				<ul>
					{categories.map(({ title, slug }, i) => (
						<li key={i} className={i === index ? s.active : undefined} onMouseEnter={() => swiperRef.current.slideTo(i)}>
							<Link href={{ pathname: `/offer`, hash: slug }}>
								<span className="nav">{title}</span>
							</Link>
						</li>
					))}
				</ul>
				<Link className="button nav" href={`/offer`}>Read more</Link>
			</div>
			<div className={s.gallery}>
				<Swiper
					spaceBetween={0}
					slidesPerView={1}
					initialSlide={0}
					autoplay={{ delay: 2000, disableOnInteraction: true }}
					modules={[Autoplay]}
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
		</section>
	)
}