import { defaultStyles } from '@/styles'
import { Text, View } from 'react-native'

const SongsScreen = () => {
	return (
		<View style={defaultStyles.container}>
			<Text
				style={[
					defaultStyles.text,
					{
						fontSize: 36,
						fontWeight: 'bold',
						marginTop: 50,
						marginBottom: 16,
						textAlign: 'center',
					},
				]}
			>
				Songs
			</Text>
		</View>
	)
}

export default SongsScreen
