import Header from '@/components/Header'
import TracksList from '@/components/TracksList'
import { defaultStyles } from '@/styles'
import { View } from 'react-native'

const SongsScreen = () => {
	return (
		<View style={defaultStyles.container}>
			<Header title="Songs" />
			<TracksList scrollEnabled={true} />
		</View>
	)
}

export default SongsScreen
