'use client'

import styles from './VideoPlayer.module.scss'
import cn from 'classnames'
import { useEffect, useState, useRef, useCallback } from 'react'
import { useInView } from 'react-intersection-observer'
//import SoundOn from '/public/images/sound-on.svg'
//import SondOff from '/public/images/sound-off.svg'

export type VideoPlayerProps = { data: FileField, className?: string }

export default function VideoPlayer({ data, className }: VideoPlayerProps) {

	const [inViewRef, inView] = useInView();
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const posterRef = useRef<any | null>(null);
	const muteRef = useRef<HTMLDivElement | null>(null);
	const [active, setActive] = useState(false)
	const [showPoster, setShowPoster] = useState(false)
	const [muted, setMuted] = useState(true)
	const [hasAudio, setHasAudio] = useState(false)
	const [quality, setQuality] = useState<String | null>('high')


	const setRefs = useCallback((node) => {
		videoRef.current = node;
		inViewRef(node);
	}, [inViewRef]);


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

		if (!videoRef.current) return

		const loadedData = () => setHasAudio(videoHasAudio(videoRef.current))
		const canPlay = () => { setShowPoster(false) }

		videoRef.current.addEventListener('loadeddata', loadedData)
		videoRef.current.addEventListener('canplay', canPlay)

		return () => {
			videoRef.current?.removeEventListener('loadeddata', loadedData)
			videoRef.current?.removeEventListener('canplay', canPlay)
		}
	}, [active, videoRef])

	useEffect(() => {
		clearTimeout(posterRef.current)
		posterRef.current = setTimeout(() => setShowPoster(true), 1000)
	}, [showPoster, videoRef])

	return (
		<video
			className={cn(styles.video, className)}
			src={quality ? data.video[`mp4${quality}`] : undefined}
			ref={setRefs}
			playsInline={true}
			muted={true}
			loop={true}
			autoPlay={false}
			disablePictureInPicture={true}
			poster={showPoster && `${data.video?.thumbnailUrl}?time=0`}
		/>
	)
}

const videoHasAudio = (video) => {
	if (!video) return false
	return (
		video.mozHasAudio ||
		Boolean(video.webkitAudioDecodedByteCount) ||
		Boolean(video.audioTracks?.length)
	);
}