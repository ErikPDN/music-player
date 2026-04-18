import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import TracksList from '@/components/TracksList'
import { filterSongs } from '@/helpers/filter'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useTracks } from '@/store/useTracks'
import { defaultStyles } from '@/styles'
import { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const SearchScreen = () => {
	const { search, setSearch } = useNavigationSearch()

	const tracks = useTracks()

	const filteredTracks = useMemo(() => {
		if (!search) return []

		return tracks.filter(filterSongs(search))
	}, [search, tracks])

	return (
		<View style={defaultStyles.container}>
			<View>
				<Header title="Search" isSearchable={false} />
				<SearchBar
					placeholder="What do you want to listen to?"
					value={search}
					onChangeText={setSearch}
				/>

				{search && filteredTracks.length === 0 && (
					<Text style={styles.emptyText}>No songs found matching "{search}"</Text>
				)}
			</View>

			<TracksList tracks={filteredTracks} scrollEnabled={true} />
		</View>
	)
}

const styles = StyleSheet.create({
	overlayContainer: {
		...defaultStyles.container,
	},

	emptyText: {
		color: '#aaa',
		textAlign: 'center',
		marginTop: 32,
		fontSize: 16,
	},
})

export default SearchScreen
