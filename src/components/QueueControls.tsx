import { colors } from '@/constants/tokens'
import { FontAwesome } from '@expo/vector-icons'
import { StyleSheet, TouchableOpacity, View, ViewProps } from 'react-native'
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
		<View
			style={[{ flexDirection: 'row', justifyContent: 'flex-end', gap: 12 }, style]}
			{...viewProps}
		>
			<View>
				<TouchableOpacity onPress={handlePlay} activeOpacity={0.8} style={styles.button}>
					<FontAwesome name="play" size={24} color={colors.text} />
				</TouchableOpacity>
			</View>

			<View>
				<TouchableOpacity onPress={handleShuffle} activeOpacity={0.8} style={styles.button}>
					<FontAwesome name="random" size={24} color={colors.text} />
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: 'rgba(252, 60, 68, 0.85)',
		padding: 4,
		borderRadius: 999,
		width: 56,
		height: 56,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 10,
	},
})
