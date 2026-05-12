import { colors } from '@/constants/tokens'
import { usePlayerStore } from '@/store/usePlayerStore'
import { FontAwesome } from '@expo/vector-icons'
import { TouchableOpacity, ViewStyle } from 'react-native'
import TrackPlayer, { Track } from 'react-native-track-player'

interface ShuffleButtonProps {
	iconSize?: number
	showActiveColor?: boolean
	style?: ViewStyle
}

function shuffleArray<T>(array: T[]): T[] {
	const arr = [...array]
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[arr[i], arr[j]] = [arr[j], arr[i]]
	}
	return arr
}

// TODO: ajustar funcionalidade para receber a queue como parâmetro
export const ShuffleButton = ({ iconSize, showActiveColor = false, style }: ShuffleButtonProps) => {
	const { isShuffleActive, originalQueue, setShuffleActive, setOriginalQueue } = usePlayerStore()

	const shufflePlayerQueue = async () => {
		const currentQueue = await TrackPlayer.getQueue()
		const activeTrack = await TrackPlayer.getActiveTrack()

		if (!isShuffleActive) {
			setOriginalQueue(currentQueue)
			const otherTracks = currentQueue.filter(
				(track: Track) => activeTrack && track.url !== activeTrack.url,
			)
			const shuffled = activeTrack
				? [activeTrack, ...shuffleArray(otherTracks)]
				: shuffleArray(currentQueue)

			await TrackPlayer.setQueue(shuffled)
			await TrackPlayer.play()
		} else {
			const queue = originalQueue.length > 0 ? originalQueue : currentQueue
			const activeIndex = queue.findIndex((t: Track) => t.url === activeTrack?.url)
			await TrackPlayer.setQueue(queue)
			await TrackPlayer.skip(activeIndex >= 0 ? activeIndex : 0)
			await TrackPlayer.play()
		}

		setShuffleActive(!isShuffleActive)
	}

	const iconColor = showActiveColor && isShuffleActive ? colors.primary : colors.icon

	return (
		<TouchableOpacity onPress={shufflePlayerQueue} style={style}>
			<FontAwesome name="random" size={iconSize ?? 28} color={iconColor} />
		</TouchableOpacity>
	)
}
