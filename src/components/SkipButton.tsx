import { colors } from '@/constants/tokens'
import { FontAwesome6 } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import TrackPlayer from 'react-native-track-player'

type SkipButtonProps = {
	iconSize?: number
}

export const SkipNextButton = ({ iconSize = 24 }: SkipButtonProps) => {
	return (
		<TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.skipToNext()}>
			<FontAwesome6 name="forward" size={iconSize} color={colors.text} />
		</TouchableOpacity>
	)
}

export const SkipPreviousButton = ({ iconSize = 24 }: SkipButtonProps) => {
	return (
		<TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.skipToPrevious()}>
			<FontAwesome6 name="backward" size={iconSize} color={colors.text} />
		</TouchableOpacity>
	)
}
