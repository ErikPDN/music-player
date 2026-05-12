import { colors } from '@/constants/tokens'
import { FontAwesome } from '@expo/vector-icons'
import { TouchableOpacity, ViewStyle } from 'react-native'
import TrackPlayer, { useIsPlaying } from 'react-native-track-player'

type PlayerPlayPauseButtonProps = {
	style?: ViewStyle
	iconSize?: number
	iconColor?: string
	onPlay?: () => void
}

export const PlayerPlayPauseButton = ({
	style,
	iconSize,
	iconColor,
	onPlay,
}: PlayerPlayPauseButtonProps) => {
	const { playing } = useIsPlaying()

	const handlePress = playing ? TrackPlayer.pause : (onPlay ?? TrackPlayer.play)

	return (
		<TouchableOpacity style={style} onPress={handlePress}>
			<FontAwesome
				name={playing ? 'pause' : 'play'}
				size={iconSize}
				color={iconColor ?? colors.text}
			/>
		</TouchableOpacity>
	)
}
