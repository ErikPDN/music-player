import { colors } from '@/constants/tokens'
import { StyleSheet, Text, View } from 'react-native'

interface HeaderProps {
	title: string
}

const Header = ({ title }: HeaderProps) => {
	return (
		<View style={styles.headerContainer}>
			<Text style={styles.headerTitle}>{title}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	headerContainer: {
		marginBottom: 16,
		marginTop: 32,
		paddingHorizontal: 12,
	},
	headerTitle: {
		fontSize: 30,
		fontWeight: 'bold',
		color: colors.text,
	},
})

export default Header
