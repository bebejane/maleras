import styles from './FullscreenVideo.module.scss'
import React from 'react'
import { VideoPlayer, ArrowLink } from '/components'
import Link from 'next/link'
import { useRef } from 'react'

export type FullscreenVideoProps = { data: FullscreenVideoRecord }

export default function FullscreenVideo({ data: { video, text, link, linkText } }: FullscreenVideoProps) {

	const ref = useRef()

	return (
		<section className={styles.fullScreenVideo} ref={ref}>
			{link ?
				<Link scroll={false} href={link} passHref={true}>
					<VideoPlayer data={video} />
				</Link>
				:
				<VideoPlayer data={video} />
			}
			<div className={styles.textWrap}>
				<div className={styles.text}>
					<div><h1 className="start">{text}</h1></div>
					<div className={styles.link}>
						{link &&
							<Link scroll={false} href={link} passHref={true}>
								<span className="medium white">
									<ArrowLink hoverRef={ref} inverted={true}>{linkText}</ArrowLink>
								</span>
							</Link>
						}
					</div>
				</div>
			</div>
		</section>
	)
}