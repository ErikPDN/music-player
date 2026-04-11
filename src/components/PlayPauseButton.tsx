import { colors } from '@/constants/tokens'
import { FontAwesome } from '@expo/vector-icons'
import { TouchableOpacity, View, ViewStyle } from 'react-native'
import TrackPlayer, { useIsPlaying } from 'react-native-track-player'

type PlayPauseButtonProps = {
	style?: ViewStyle
	iconSize?: number
	iconColor?: string
}

export const PlayPauseButton = ({ style, iconSize, iconColor }: PlayPauseButtonProps) => {
	const { playing } = useIsPlaying()

	return (
		<View style={[{ height: iconSize }, style]}>
			<TouchableOpacity
				activeOpacity={0.85}
				onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
				style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
			>
				<FontAwesome
					name={playing ? 'pause' : 'play'}
					size={iconSize}
					color={iconColor ?? colors.text}
				/>
			</TouchableOpacity>
		</View>
	)
}
