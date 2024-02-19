'use client'

import styles from './VideoPlayer.module.scss'
import cn from 'classnames'
import { useEffect, useState, useRef, useCallback } from 'react'
import { useInView } from 'react-intersection-observer'
import SoundOn from '/public/images/sound-on.svg'
import SondOff from '/public/images/sound-off.svg'

export type VideoPlayerProps = { data: FileField, className?: string }

const videoHasAudio = (video) => {
	if (!video) return false
	return (
		video.mozHasAudio ||
		Boolean(video.webkitAudioDecodedByteCount) ||
		Boolean(video.audioTracks?.length)
	);
}

export default function VideoPlayer({ data, className }: VideoPlayerProps) {

	const [inViewRef, inView] = useInView();
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const muteRef = useRef<HTMLDivElement | null>(null);
	const [active, setActive] = useState(false)
	const [muted, setMuted] = useState(true)
	const [hasAudio, setHasAudio] = useState(false)
	const [quality, setQuality] = useState<String | null>('high')

	const setRefs = useCallback((node) => {
		videoRef.current = node;
		inViewRef(node);
	}, [inViewRef]);

	const handleMute = (e) => {
		e.stopPropagation()
		e.preventDefault()
		videoRef.current.muted = !videoRef.current.muted
		setMuted(videoRef.current.muted)
	}

	useEffect(() => {
		if (!videoRef.current)
			return console.log('no video ref')

		if (active)
			videoRef.current.play().catch((err) => { })
		else
			videoRef.current.pause();

	}, [active, quality, videoRef])

	useEffect(() => { setActive(inView) }, [inView])

	useEffect(() => {
		videoRef.current.addEventListener('loadeddata', () => setHasAudio(videoHasAudio(videoRef.current)))
		setHasAudio(videoHasAudio(videoRef.current))
	}, [active])

	return (
		<div className={styles.container} style={{ width: '100%', height: '100%', position: 'relative' }}>
			<video
				className={cn(styles.video, className)}
				src={quality ? data.video[`mp4${quality}`] : undefined}
				ref={setRefs}
				playsInline={true}
				muted={true}
				loop={true}
				autoPlay={false}
				disablePictureInPicture={true}
			//poster={data.video?.thumbnailUrl}
			/>
			{hasAudio &&
				<div ref={muteRef} className={cn(styles.mute, !muted && styles.enabled)} onClick={handleMute}>
					{muted ? <SondOff /> : <SoundOn />}
				</div>
			}
		</div>
	)
}