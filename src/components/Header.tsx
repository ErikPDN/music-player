import { colors } from '@/constants/tokens'
import { FontAwesome6 } from '@expo/vector-icons'
import { router } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface HeaderProps {
	title: string
	isSearchable?: boolean
}

const Header = ({ title, isSearchable = true }: HeaderProps) => {
	const handleSearchPress = () => {
		router.push('/search')
	}

	return (
		<View style={styles.headerContainer}>
			<Text style={styles.headerTitle}>{title}</Text>
			{isSearchable && (
				<TouchableOpacity onPress={handleSearchPress}>
					<FontAwesome6
						style={styles.searchIcon}
						name="magnifying-glass"
						size={24}
						color={colors.icon}
					/>
				</TouchableOpacity>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 16,
		marginTop: 32,
		paddingHorizontal: 12,
	},
	headerTitle: {
		fontSize: 30,
		fontWeight: 'bold',
		color: colors.text,
	},
	searchIcon: {
		marginRight: 8,
	},
})

export default Header
