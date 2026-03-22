import Header from '@/components/Header'
import { defaultStyles } from '@/styles'
import { View } from 'react-native'

const Artists = () => {
	return (
		<View style={defaultStyles.container}>
			<Header title="Artists" />
		</View>
	)
}

export default Artists
