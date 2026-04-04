import { colors } from '@/constants/tokens'
import { useEffect, useRef } from 'react'
import { Animated, StyleSheet, View } from 'react-native'

const PlayingEqualizerIcon = () => {
	const bar1 = useRef(new Animated.Value(0.4)).current
	const bar2 = useRef(new Animated.Value(1)).current
	const bar3 = useRef(new Animated.Value(0.8)).current

	const animateBar = (bar: Animated.Value, duration: number, delay: number) => {
		Animated.loop(
			Animated.sequence([
				Animated.delay(delay),
				Animated.timing(bar, {
					toValue: 1,
					duration,
					useNativeDriver: true,
				}),
				Animated.timing(bar, {
					toValue: 0.2,
					duration,
					useNativeDriver: true,
				}),
			]),
		).start()
	}

	useEffect(() => {
		animateBar(bar1, 400, 0)
		animateBar(bar2, 450, 150)
		animateBar(bar3, 350, 80)

		return () => {
			bar1.stopAnimation()
			bar2.stopAnimation()
			bar3.stopAnimation()
		}
	}, [])

	return (
		<View style={styles.container}>
			{[bar1, bar2, bar3].map((bar, index) => (
				<Animated.View key={index} style={[styles.bar, { transform: [{ scaleY: bar }] }]} />
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		gap: 2,
		height: 16,
		paddingRight: 4,
	},

	bar: {
		width: 3,
		height: 14,
		borderRadius: 2,
		backgroundColor: colors.primary,
	},
})

export default PlayingEqualizerIcon
