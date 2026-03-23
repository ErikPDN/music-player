import library from '@assets/data/library.json'
import { FlatList, FlatListProps } from 'react-native'
import { TrackListItem } from './TrackListItem'

type TrackListProps = Partial<FlatListProps<unknown>>

const TracksList = ({ ...props }: TrackListProps) => {
	return (
		<FlatList
			{...props}
			data={library}
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
