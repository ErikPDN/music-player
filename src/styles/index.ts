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
	},
})

export const utilsStyles = StyleSheet.create({})
