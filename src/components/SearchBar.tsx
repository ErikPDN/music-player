import { colors } from '@/constants/tokens'
import { StyleSheet, TextInput, View } from 'react-native'

interface SearchBarProps {
	placeholder?: string
	value?: string
	onChangeText?: (text: string) => void
}

const SearchBar = ({ placeholder, value, onChangeText }: SearchBarProps) => {
	return (
		<View style={styles.searchContainer}>
			<TextInput placeholder={placeholder} value={value} onChangeText={onChangeText} />
		</View>
	)
}

const styles = StyleSheet.create({
	searchContainer: {
		width: '100%',
		paddingHorizontal: 12,
		paddingVertical: 8,
		marginBottom: 16,
		marginHorizontal: 12,
		backgroundColor: colors.background,
		opacity: 1,
		borderRadius: 8,
	},
})

export default SearchBar
