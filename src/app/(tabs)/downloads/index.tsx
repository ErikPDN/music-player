import { DownloadList } from '@/components/DownloadList'
import Header from '@/components/Header'
import { MagnetBar } from '@/components/MagnetBar'
import { seedMockDownloads } from '@/db/seed'
import { isValidMagnetUri } from '@/helpers/magnet'
import { useDownloads } from '@/hooks/useDownloads'
import { addMagnetDownload } from '@/services/torrentEngine'
import { defaultStyles } from '@/styles'
import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Toast from 'react-native-toast-message'

const DownloadsScreen = () => {
	const [magnetLink, setMagnetLink] = useState('')

	const handleAddMagnetLink = async (magnetLink: string) => {
		if (!isValidMagnetUri(magnetLink)) {
			Toast.show({
				type: 'error',
				text1: 'Invalid magnet link',
				text2: 'Please enter a valid magnet link.',
			})
			return
		}

		try {
			await addMagnetDownload(magnetLink)
		} catch (error) {
			Toast.show({
				type: 'error',
				text1: 'Failed to add magnet link',
				text2: (error as Error).message,
			})
		} finally {
			setMagnetLink('')
		}
	}

	const { activeDownloads, completedDownloads, failedDownloads, pausedDownloads } = useDownloads()

	useEffect(() => {
		if (__DEV__) seedMockDownloads()
	}, [])

	return (
		<View style={styles.overlayContainer}>
			<Header title="Downloads" />

			<MagnetBar
				placeholder="Enter magnet link.."
				magnetLink={magnetLink}
				onAddMagnetLink={handleAddMagnetLink}
				onChangeText={setMagnetLink}
			/>

			<DownloadList
				activeDownloads={activeDownloads}
				completedDownloads={completedDownloads}
				failedDownloads={failedDownloads}
				pausedDownloads={pausedDownloads}
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
