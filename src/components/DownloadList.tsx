import { Download } from '@/db/schema'
import { SectionList, StyleSheet, Text, View } from 'react-native'
import { DownloadListEmpty } from './DownloadListEmpty'
import { DownloadListItem } from './DownloadListItem'

interface DownloadListProps {
	activeDownloads?: Download[]
	completedDownloads?: Download[]
	failedDownloads?: Download[]
	pausedDownloads?: Download[]
}

export const DownloadList = ({
	activeDownloads = [],
	completedDownloads = [],
	failedDownloads = [],
	pausedDownloads = [],
}: DownloadListProps) => {
	const unfinishedDownloads = [...activeDownloads, ...pausedDownloads, ...failedDownloads]
	const sections = [
		{ title: 'Downloading Now', data: unfinishedDownloads },
		{ title: 'Completed', data: completedDownloads },
	].filter((section) => section.data.length > 0)

	return (
		<SectionList
			sections={sections}
			keyExtractor={(download) => download.id}
			contentContainerStyle={styles.downloadListContainer}
			renderSectionHeader={({ section: { title } }) => {
				return (
					<View style={styles.downloadListSectionHeaderContainer}>
						<Text style={styles.downloadListSectionHeaderText}>{title}</Text>
					</View>
				)
			}}
			renderItem={({ item: download }) => <DownloadListItem download={download} />}
			ListEmptyComponent={<DownloadListEmpty />}
		/>
	)
}

const styles = StyleSheet.create({
	downloadListContainer: {
		flexGrow: 1,
		flexDirection: 'column',
		paddingHorizontal: 16,
		paddingBottom: 120,
	},

	downloadListSectionHeaderContainer: {
		paddingVertical: 12,
		marginTop: 20,
	},

	downloadListSectionHeaderText: {
		fontSize: 14,
		fontWeight: 700,
		color: '#666',
		textTransform: 'uppercase',
		letterSpacing: 1,
	},
})
