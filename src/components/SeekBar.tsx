import { colors } from '@/constants/tokens'
import { formatTime } from '@/helpers/formatTime'
import Slider from '@react-native-community/slider'
import { StyleSheet, Text, View } from 'react-native'
import TrackPlayer, { useProgress } from 'react-native-track-player'

const SeekBar = () => {
	const { position, duration } = useProgress()
	const remaining = duration - position

	return (
		<View style={style.container}>
			<Slider
				style={{ width: '105%' }}
				value={position}
				minimumValue={0}
				maximumValue={duration}
				onSlidingComplete={(value) => TrackPlayer.seekTo(value)}
				thumbTintColor={colors.primary}
				minimumTrackTintColor={colors.primary}
				maximumTrackTintColor={colors.minimumTrackTintColor}
			/>
			<View style={style.timeContainer}>
				<Text style={style.timeText}>{formatTime(position)}</Text>
				<Text style={style.timeText}>-{formatTime(remaining)}</Text>
			</View>
		</View>
	)
}

const style = StyleSheet.create({
	container: {
		flexDirection: 'column',
		gap: 2,
		alignItems: 'center',
	},
	timeContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		paddingHorizontal: 8,
	},
	timeText: {
		color: colors.text,
		fontSize: 12,
		fontWeight: '500',
	},
})

export default SeekBar
