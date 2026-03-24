import { FlatList, FlatListProps } from 'react-native'
import { TrackListItem } from './TrackListItem'

type TrackListProps = Partial<FlatListProps<unknown>> & {
	tracks?: any[]
}

const TracksList = ({ tracks, ...props }: TrackListProps) => {
	return (
		<FlatList
			{...props}
			data={tracks}
			contentContainerStyle={{ paddingBottom: 120 }}
			renderItem={({ item: track }) => (
				<TrackListItem
					track={{
						title: track.title,
						image: track.artwork,
						artist: track.artist,
					}}
				/>
			)}
		/>
	)
}

export default TracksList
