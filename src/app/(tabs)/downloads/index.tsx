import { DownloadList } from '@/components/DownloadList'
import Header from '@/components/Header'
import { MagnetBar } from '@/components/MagnetBar'
import { seedMockDownloads } from '@/db/seed'
import { useDownloads } from '@/hooks/useDownloads'
import { defaultStyles } from '@/styles'
import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'

const DownloadsScreen = () => {
	const handleAddMagnetLink = (magnetLink: string) => {} // TODO: Implement the logic

	const { activeDownloads, completedDownloads, failedDownloads } = useDownloads()

	useEffect(() => {
		if (__DEV__) seedMockDownloads()
	}, [])

	return (
		<View style={styles.overlayContainer}>
			<Header title="Downloads" />

			<MagnetBar
				placeholder="Enter magnet link.."
				magnetLink={undefined}
				onAddMagnetLink={handleAddMagnetLink}
			/>

			<DownloadList
				activeDownloads={activeDownloads}
				completedDownloads={completedDownloads}
				failedDownloads={failedDownloads}
			/>
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
