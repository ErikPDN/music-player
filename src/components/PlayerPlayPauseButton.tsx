import { colors } from '@/constants/tokens'
import { FontAwesome } from '@expo/vector-icons'
import { TouchableOpacity, ViewStyle } from 'react-native'
import TrackPlayer, { useIsPlaying } from 'react-native-track-player'

type PlayerPlayPauseButtonProps = {
	style?: ViewStyle
	iconSize?: number
	iconColor?: string
}

export const PlayerPlayPauseButton = ({
	style,
	iconSize,
	iconColor,
}: PlayerPlayPauseButtonProps) => {
	const { playing } = useIsPlaying()

	return (
		<TouchableOpacity style={style} onPress={playing ? TrackPlayer.pause : TrackPlayer.play}>
			<FontAwesome
				name={playing ? 'pause' : 'play'}
				size={iconSize}
				color={iconColor ?? colors.text}
			/>
		</TouchableOpacity>
	)
}
