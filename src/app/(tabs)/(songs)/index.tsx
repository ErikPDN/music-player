import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import TracksList from '@/components/TracksList'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { defaultStyles } from '@/styles'
import { View } from 'react-native'

const SongsScreen = () => {
	const { search, setSearch } = useNavigationSearch()

	return (
		<View style={defaultStyles.container}>
			<View>
				<Header title="Songs" />
				<SearchBar placeholder="Search songs..." value={search} onChangeText={setSearch} />
			</View>

			<TracksList scrollEnabled={true} />
		</View>
	)
}

export default SongsScreen
