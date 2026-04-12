import { colors } from '@/constants/tokens'
import { FontAwesome } from '@expo/vector-icons'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'

interface ShuffleButtonProps {
	iconSize?: number
}

export const ShuffleButton = ({ iconSize }: ShuffleButtonProps) => {
	const [isShuffleActive, setIsShuffleActive] = useState(false)

	return (
		<TouchableOpacity
			style={{ paddingHorizontal: 16 }}
			onPress={() => setIsShuffleActive((prev) => !prev)}
		>
			<FontAwesome
				name="random"
				size={iconSize ?? 28}
				color={isShuffleActive ? colors.primary : colors.icon}
			/>
		</TouchableOpacity>
	)
}
