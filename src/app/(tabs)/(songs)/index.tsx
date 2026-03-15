import Header from '@/components/Header'
import { defaultStyles } from '@/styles'
import { View } from 'react-native'

const SongsScreen = () => {
	return (
		<View style={defaultStyles.container}>
			<Header title="Songs" />
		</View>
	)
}

export default SongsScreen
