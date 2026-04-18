import { colors } from '@/constants/tokens'
import { FontAwesome } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableOpacity, View, ViewProps } from 'react-native'
import { Track } from 'react-native-track-player'

type QueueControlsProps = {
	tracks: Track[]
	handlePlay?: () => void
	handleShuffle?: () => void
} & ViewProps

export const QueueControls = ({
	tracks,
	style,
	handlePlay,
	handleShuffle,
	...viewProps
}: QueueControlsProps) => {
	return (
		<View style={[{ flexDirection: 'row', columnGap: 8 }, style]} {...viewProps}>
			<View style={{ flex: 1 }}>
				<TouchableOpacity onPress={handlePlay} activeOpacity={0.8} style={styles.button}>
					<FontAwesome name="play" size={16} color={colors.primary} />
					<Text style={styles.buttonText}>Play</Text>
				</TouchableOpacity>
			</View>

			<View style={{ flex: 1 }}>
				<TouchableOpacity onPress={handleShuffle} activeOpacity={0.8} style={styles.button}>
					<FontAwesome name="random" size={16} color={colors.primary} />
					<Text style={styles.buttonText}>Shuffle</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: 'rgba(47, 47, 47, 0.8)',
		padding: 12,
		borderRadius: 8,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		columnGap: 8,
	},

	buttonText: {
		fontSize: 18,
		color: colors.primary,
		fontWeight: '600',
		textAlign: 'center',
	},
})
