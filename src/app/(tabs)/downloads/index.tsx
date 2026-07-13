import { DownloadList } from '@/components/DownloadList'
import Header from '@/components/Header'
import { MagnetBar } from '@/components/MagnetBar'
import { useDownloads } from '@/hooks/useDownloads'
import { defaultStyles } from '@/styles'
import { StyleSheet, View } from 'react-native'

const DownloadsScreen = () => {
	const handleAddMagnetLink = (magnetLink: string) => {} // TODO: Implement the logic

	const { activeDownloads, completedDownloads, failedDownloads, downloads } = useDownloads()

	return (
		<View style={styles.overlayContainer}>
			<Header title="Downloads" />

			<MagnetBar
				placeholder="Enter magnet link.."
				magnetLink={undefined}
				onAddMagnetLink={handleAddMagnetLink}
			/>

			<DownloadList downloads={downloads} />
		</View>
	)
}

const styles = StyleSheet.create({
	overlayContainer: {
		...defaultStyles.container,
		flexDirection: 'column',
	},
})

export default DownloadsScreen
