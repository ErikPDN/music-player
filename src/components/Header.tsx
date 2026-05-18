import { colors } from '@/constants/tokens'
import { FontAwesome6 } from '@expo/vector-icons'
import { router } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface HeaderProps {
	title: string
	isSearchable?: boolean
	isCreatable?: boolean
	handleCreatePress?: () => void
}

const Header = ({
	title,
	isSearchable = true,
	isCreatable = false,
	handleCreatePress,
}: HeaderProps) => {
	const handleSearchPress = () => {
		router.push('/search')
	}

	return (
		<View style={styles.headerContainer}>
			<Text style={styles.headerTitle}>{title}</Text>
			<View style={styles.headerActions}>
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
				{isCreatable && (
					<TouchableOpacity onPress={handleCreatePress}>
						<FontAwesome6 style={styles.searchIcon} name="plus" size={24} color={colors.icon} />
					</TouchableOpacity>
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 16,
		marginTop: 40,
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

	headerActions: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 16,
	},
})

export default Header
