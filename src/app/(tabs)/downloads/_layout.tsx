import { defaultStyles } from '@/styles'
import { Stack } from 'expo-router'
import { View } from 'react-native'

const DownloadsScreenLayout = () => {
	return (
		<View style={defaultStyles.container}>
			<Stack>
				<Stack.Screen
					name="index"
					options={{
						headerShown: false,
						headerTitle: 'Downloads',
					}}
				/>
			</Stack>
		</View>
	)
}

export default DownloadsScreenLayout
