import Header from '@/components/Header'
import { QueueControls } from '@/components/QueueControls'
import SearchBar from '@/components/SearchBar'
import TracksList from '@/components/TracksList'
import { filterSongs } from '@/helpers/filter'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useQueueControls } from '@/hooks/useQueueControls'
import { useTracks } from '@/store/useTracks'
import { defaultStyles } from '@/styles'
import { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const SongsScreen = () => {
	const { search, setSearch } = useNavigationSearch()

	const tracks = useTracks()

	const filteredTracks = useMemo(() => {
		if (!search) return tracks
		return tracks.filter(filterSongs(search))
	}, [search, tracks])

	const { handlePlay, handleShuffle } = useQueueControls(tracks)

	return (
		<View style={styles.overlayContainer}>
			<View>
				<Header title="Songs" />
				<SearchBar placeholder="Search songs..." value={search} onChangeText={setSearch} />
			</View>

			<QueueControls
				tracks={tracks}
				style={{ marginHorizontal: 12 }}
				handlePlay={handlePlay}
				handleShuffle={handleShuffle}
			/>

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
