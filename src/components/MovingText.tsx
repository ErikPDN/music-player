import { PAUSE_DURATION, PIXELS_PER_CHAR, SPEED } from '@/constants/animation'
import { ReactNode, useEffect } from 'react'
import { StyleProp, TextStyle, View } from 'react-native'
import Animated, {
	cancelAnimation,
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withRepeat,
	withSequence,
	withTiming,
} from 'react-native-reanimated'

type MovingTextProps = {
	text: string
	animationThreshold: number
	style?: StyleProp<TextStyle>
	children?: ReactNode
}

const MovingText = ({ text, animationThreshold, style, children }: MovingTextProps) => {
	const translateX = useSharedValue(0)
	const shouldAnimate = text.length >= animationThreshold
	const textWidth = text.length * PIXELS_PER_CHAR

	useEffect(() => {
		if (!shouldAnimate) return

		const duration = (textWidth / SPEED) * 1000

		translateX.value = withDelay(
			PAUSE_DURATION,
			withRepeat(
				withSequence(
					withTiming(-textWidth, { duration, easing: Easing.linear }),
					withTiming(-textWidth, { duration: PAUSE_DURATION }), // pausa no fim
					withTiming(0, { duration: 0 }), // reset instantâneo
				),
				-1,
				false, // false = loop unidirecional, sem bounce
			),
		)

		return () => {
			cancelAnimation(translateX)
			translateX.value = 0
		}
	}, [translateX, textWidth, shouldAnimate])

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }],
	}))

	return (
		<View style={{ overflow: 'hidden', flex: 1 }}>
			<Animated.Text
				numberOfLines={1}
				style={[style, animatedStyle, shouldAnimate && { width: textWidth, flexShrink: 0 }]}
			>
				{children || text}
			</Animated.Text>
		</View>
	)
}

export default MovingText
