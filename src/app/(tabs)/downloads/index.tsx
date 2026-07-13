import Header from '@/components/Header'
import { MagnetBar } from '@/components/MagnetBar'
import { useDownloads } from '@/hooks/useDownloads'
import { defaultStyles } from '@/styles'
import { StyleSheet, Text, View } from 'react-native'

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

			{downloads.length === 0 && (
				<View style={styles.emptyDownloadsContainer}>
					<View style={styles.textContainer}>
						<Text style={styles.emptyPrimaryText}>No downloads available.</Text>
						<Text style={styles.emptySecondaryText}>
							Paste a magnet link above to download music
						</Text>
					</View>
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	overlayContainer: {
		...defaultStyles.container,
		flexDirection: 'column',
	},

	emptyDownloadsContainer: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 16,
	},

	textContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 32,
	},

	emptyPrimaryText: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 8,
		color: 'white',
	},

	emptySecondaryText: {
		fontSize: 18,
		color: 'gray',
		textAlign: 'center',
	},
})

export default DownloadsScreen
