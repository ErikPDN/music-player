import Header from '@/components/Header'
import { defaultStyles } from '@/styles'
import { View } from 'react-native'

const DownloadsScreen = () => {
	return (
		<View style={defaultStyles.container}>
			<Header title="Downloads" />
		</View>
	)
}

export default DownloadsScreen
