import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import TracksList from '@/components/TracksList'
import { filterSongs } from '@/helpers/filter'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useFavorites } from '@/store/useFavorites'
import { defaultStyles } from '@/styles'
import { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const FavoritesScreen = () => {
	const { search, setSearch } = useNavigationSearch()

	const { favorites } = useFavorites()

	const filteredFavorites = useMemo(
		() => favorites.filter(filterSongs(search)),
		[favorites, search],
	)

	return (
		<View style={styles.overlayContainer}>
			<View>
				<Header title="Favorites" />
				<SearchBar placeholder="Search songs..." value={search} onChangeText={setSearch} />
			</View>

			{search && filteredFavorites.length === 0 && (
				<Text style={styles.emptyText}>No songs found matching</Text>
			)}

			<TracksList tracks={filteredFavorites} scrollEnabled={true} />
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
