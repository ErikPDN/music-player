import { FlatList, FlatListProps } from 'react-native'
import { Track } from 'react-native-track-player'
import { TrackListItem } from './TrackListItem'

type TrackListProps = Partial<FlatListProps<Track>> & {
	tracks?: Track[]
}

const TracksList = ({ tracks, ...props }: TrackListProps) => {
	const handleTrackPress = (track: Track) => {
		console.log('Track pressed:', track.title)
	}

	return (
		<FlatList
			{...props}
			data={tracks}
			contentContainerStyle={{ paddingBottom: 120 }}
			renderItem={({ item: track }) => (
				<TrackListItem track={track} onTrackPress={handleTrackPress} />
			)}
		/>
	)
}

export default TracksList
