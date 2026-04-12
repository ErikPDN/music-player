import { colors } from '@/constants/tokens'
import { FontAwesome } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import TrackPlayer, { RepeatMode } from 'react-native-track-player'

interface RepeatButtonProps {
	iconSize?: number
}

export const RepeatButton = ({ iconSize }: RepeatButtonProps) => {
	const [isRepeatActive, setIsRepeatActive] = useState(false)

	// Sync initial state with the player's actual repeat mode
	useEffect(() => {
		TrackPlayer.getRepeatMode().then((mode) => {
			setIsRepeatActive(mode === RepeatMode.Track)
		})
	}, [])

	const toggleRepeat = async () => {
		const newMode = isRepeatActive ? RepeatMode.Off : RepeatMode.Track
		await TrackPlayer.setRepeatMode(newMode)
		setIsRepeatActive(!isRepeatActive)
	}

	return (
		<TouchableOpacity
			style={{ paddingHorizontal: 16 }}
			onPress={toggleRepeat}
		>
			<FontAwesome
				name="repeat"
				size={iconSize ?? 28}
				color={isRepeatActive ? colors.primary : colors.icon}
			/>
		</TouchableOpacity>
	)
}
