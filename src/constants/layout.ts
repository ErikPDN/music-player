import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { colors } from './tokens'

export const StackScreenWithSearchBar: NativeStackNavigationOptions = {
	headerLargeTitle: true,
	headerStyle: {
		backgroundColor: colors.background,
	},
	headerTitleStyle: {
		color: colors.text,
		fontSize: 32,
		fontWeight: 'bold',
	},
	headerTintColor: colors.text,
	headerTransparent: true,
	headerBlurEffect: 'prominent',
	headerShadowVisible: false,
}
