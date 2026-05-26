import { useEffect, useRef } from 'react'
import Toast from 'react-native-toast-message'
import TrackPlayer, { RepeatMode } from 'react-native-track-player'

const setupPlayer = async () => {
	await TrackPlayer.setupPlayer({
		maxCacheSize: 1024 * 1024 * 10,
	})

	await TrackPlayer.setVolume(0.5)
	await TrackPlayer.setRepeatMode(RepeatMode.Queue)
}

export const useSetupTrackPlayer = ({ onLoad }: { onLoad?: () => void }) => {
	const isInitialized = useRef(false)

	useEffect(() => {
		setupPlayer()
			.then(() => {
				isInitialized.current = true
				onLoad?.()
			})
			.catch(() => {
				isInitialized.current = false
				Toast.show({
					type: 'error',
					text1: 'Error while setting up TrackPlayer',
				})
			})
	}, [onLoad])
}
