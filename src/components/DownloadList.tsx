import { FlatList } from 'react-native'
import { DownloadListEmpty } from './DownloadListEmpty'
import { DownloadListItem } from './DownloadListItem'

interface DownloadListProps {
	downloads?: any[]
}

export const DownloadList = ({ downloads, ...props }: DownloadListProps) => {
	return (
		<FlatList
			data={downloads}
			{...props}
			renderItem={({ item: download }) => <DownloadListItem download={download} />}
			ListEmptyComponent={<DownloadListEmpty />}
		/>
	)
}
