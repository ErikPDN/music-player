import Header from '@/components/Header'
import { defaultStyles } from '@/styles'
import { View } from 'react-native'

const PlaylistsScreen = () => {
	return (
		<View style={defaultStyles.container}>
			<Header title="Playlists" />
		</View>
	)
}

export default PlaylistsScreen
