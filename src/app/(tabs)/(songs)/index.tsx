import Header from '@/components/Header'
import { PlayerPlayPauseButton } from '@/components/PlayerPlayPauseButton'
import { ShuffleButton } from '@/components/ShuffleButton'
import TracksList from '@/components/TrackList'
import { colors } from '@/constants/tokens'
import { filterSongs } from '@/helpers/filter'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
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

	return (
		<View style={styles.overlayContainer}>
			<View>
				<Header title="Songs" />
			</View>

			<View style={styles.queueControlsContainer}>
				<PlayerPlayPauseButton
					iconSize={20}
					iconColor={colors.text}
					style={styles.playPauseButtonContainer}
				/>

				<ShuffleButton iconSize={20} style={styles.shuffleButtonContainer} />
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
	},

	emptyText: {
		color: '#aaa',
		textAlign: 'center',
		marginTop: 32,
		fontSize: 16,
	},

	queueControlsContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		columnGap: 8,
		paddingRight: 12,
	},

	playPauseButtonContainer: {
		width: 50,
		height: 50,
		borderRadius: 999,
		backgroundColor: colors.primary,
		justifyContent: 'center',
		alignItems: 'center',
	},

	shuffleButtonContainer: {
		width: 50,
		height: 50,
		borderRadius: 999,
		backgroundColor: colors.primary,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default SongsScreen
