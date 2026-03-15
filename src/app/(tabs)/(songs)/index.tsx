import Header from '@/components/Header'
import TracksList from '@/components/TracksList'
import { defaultStyles } from '@/styles'
import { ScrollView, View } from 'react-native'

const SongsScreen = () => {
	return (
		<View style={defaultStyles.container}>
			<ScrollView>
				<Header title="Songs" />
				<TracksList scrollEnabled={true} />
			</ScrollView>
		</View>
	)
}

export default SongsScreen
