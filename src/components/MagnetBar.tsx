import { colors } from '@/constants/tokens'
import { FontAwesome } from '@expo/vector-icons'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'

interface MagnetBarProps {
	placeholder?: string
	magnetLink?: string
}

export const MagnetBar = ({ placeholder, magnetLink }: MagnetBarProps) => {
	return (
		<View style={styles.container}>
			<View style={styles.magnetContainer}>
				<FontAwesome name="magnet" size={20} color="#9ca3af" style={{ marginHorizontal: 8 }} />
				<TextInput
					placeholder={placeholder}
					placeholderTextColor="#9ca3af"
					value={magnetLink}
					style={styles.magnetInput}
				/>
			</View>
			<TouchableOpacity style={styles.addButton}>
				<FontAwesome name="plus" size={20} color="#fff" />
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 6,
		paddingHorizontal: 14,
		marginBottom: 8,
	},

	magnetContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#27272a',
		borderRadius: 6,
		paddingHorizontal: 8,
		paddingVertical: 4,
		marginRight: 8,
	},

	magnetInput: {
		flex: 1,
		fontSize: 16,
		height: 40,
		color: '#fff',
	},

	addButton: {
		width: 46,
		height: 46,
		borderRadius: 10,
		backgroundColor: colors.primary,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
