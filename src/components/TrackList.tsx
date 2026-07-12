import { TrackListItem } from '@/components/TrackListItem'
import { toPlayerTrack, Track } from '@/helpers/types'
import { utilsStyles } from '@/styles'
import { FlatList, FlatListProps, Text, View } from 'react-native'
import Toast from 'react-native-toast-message'
import TrackPlayer from 'react-native-track-player'

type TrackListProps = Partial<FlatListProps<Track>> & {
	tracks?: Track[]
}

const TrackList = ({ tracks, ...props }: TrackListProps) => {
	const handleTrackPress = async (track: Track, index: number) => {
		try {
			const queue = await TrackPlayer.getQueue()

			const isSameQueue =
				queue.length === tracks?.length &&
				queue[0]?.uri === tracks?.[0]?.uri &&
				queue[queue.length - 1]?.uri === tracks?.[tracks.length - 1]?.uri

			if (isSameQueue) {
				await TrackPlayer.skip(index)
			} else {
				await TrackPlayer.reset()
				const rnTracks = (tracks || []).map((t) => toPlayerTrack(t))
				await TrackPlayer.add(rnTracks)
				await TrackPlayer.skip(index)
			}

			await TrackPlayer.play()
		} catch (error) {
			Toast.show({
				type: 'error',
				text1: 'Error while playing the track',
			})
		}
	}

	return (
		<FlatList
			{...props}
			data={tracks}
			contentContainerStyle={{ paddingBottom: 175 }}
			renderItem={({ item: track, index }) => (
				<TrackListItem track={track} onTrackPress={() => handleTrackPress(track, index)} />
			)}
			ListEmptyComponent={
				<View>
					<Text style={utilsStyles.emptyContentText}>No songs found</Text>
				</View>
			}
		/>
	)
}

export default TrackList
