import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import TracksList from '@/components/TracksList'
import { filterSongs } from '@/helpers/filter'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { defaultStyles } from '@/styles'
import library from '@assets/data/library.json'
import { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const FavoritesScreen = () => {
	const { search, setSearch } = useNavigationSearch()

	const likedTracks = useMemo(() => {
		const favorites = library.filter((song) => song.rating)
		if (!search) return favorites
		return favorites.filter(filterSongs(search))
	}, [search])

	return (
		<View style={styles.overlayContainer}>
			<View>
				<Header title="Favorites" />
				<SearchBar placeholder="Search songs..." value={search} onChangeText={setSearch} />
			</View>

			{search && likedTracks.length === 0 && (
				<Text style={styles.emptyText}>No songs found matching</Text>
			)}

			<TracksList tracks={likedTracks} scrollEnabled={true} />
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
		fontSize: 16,
		fontWeight: '500',
		textAlign: 'center',
		marginTop: 32,
	},
})

export default FavoritesScreen
