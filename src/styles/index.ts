import { StyleSheet } from 'react-native'
import { colors, fontSize } from '../constants/tokens'

export const defaultStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	text: {
		fontSize: fontSize.md,
		color: colors.text,
	},
	screenTitle: {
		fontSize: fontSize.md,
		color: colors.text,
		marginTop: 12,
		marginBottom: 16,
		fontWeight: 'bold',
	},
	headerTitle: {
		fontSize: fontSize.xxl,
		color: colors.text,
		fontWeight: 'bold',
		marginBottom: 8,
		marginTop: 12,
		marginHorizontal: 12,
	},
})
