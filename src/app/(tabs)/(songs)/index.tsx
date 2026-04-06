import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import TracksList from '@/components/TracksList'
import { filterSongs } from '@/helpers/filter'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { defaultStyles } from '@/styles'
import library from '@assets/data/library.json'
import { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const SongsScreen = () => {
	const { search, setSearch } = useNavigationSearch()

	const filteredTracks = useMemo(() => {
		if (!search) return library
		return library.filter(filterSongs(search))
	}, [search])

	return (
		<View style={styles.overlayContainer}>
			<View>
				<Header title="Songs" />
				<SearchBar placeholder="Search songs..." value={search} onChangeText={setSearch} />
			</View>

			{search && filteredTracks.length === 0 && (
				<Text style={styles.emptyText}>No songs found matching "{search}"</Text>
			)}

			<TracksList tracks={filteredTracks} scrollEnabled={true} />
		</View>
	)
}

const styles = StyleSheet.create({
	overlayContainer: {
		...defaultStyles.container,
		paddingHorizontal: 6,
	},

	emptyText: {
		color: '#aaa',
		textAlign: 'center',
		marginTop: 32,
		fontSize: 16,
	},
})

export default SongsScreen
