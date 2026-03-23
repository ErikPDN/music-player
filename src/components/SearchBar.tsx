import { FontAwesome } from '@expo/vector-icons'
import { StyleSheet, TextInput, View } from 'react-native'

interface SearchBarProps {
	placeholder?: string
	value?: string
	onChangeText?: (text: string) => void
}

const SearchBar = ({ placeholder, value, onChangeText }: SearchBarProps) => {
	return (
		<View style={styles.searchContainer}>
			<FontAwesome name="search" size={20} color="#9ca3af" style={{ marginRight: 8 }} />
			<TextInput
				style={styles.searchInput}
				placeholder={placeholder}
				placeholderTextColor={styles.searchPlaceholder.color}
				value={value}
				onChangeText={onChangeText}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 6,
		paddingHorizontal: 14,
		marginBottom: 8,
		marginHorizontal: 10,
		backgroundColor: '#27272a',
		borderRadius: 6,
		overflow: 'hidden',
	},

	searchInput: {
		marginTop: 4,
		height: 40,
		color: '#fff',
		fontSize: 16,
	},

	searchPlaceholder: {
		color: '#9ca3af',
	},
})

export default SearchBar
