import { colors } from '@/constants/tokens'
import { Download } from '@/db/schema'
import { formatBytes } from '@/helpers/formatBytes'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'

interface DownloadStatusProps {
	status: Download['status']
	trackCount: number
	totalBytes: number
	downloadedBytes: number
	tracksCompleted: number
}

export const DownloadStatus = ({
	status,
	trackCount,
	tracksCompleted = 0,
	totalBytes,
	downloadedBytes,
}: DownloadStatusProps) => {
	const isActiveDownload = status === 'downloading'
	const isCompletedDownload = status === 'done'
	const isFailedDownload = status === 'error'
	const isPendingDownload = status === 'pending'

	return (
		<View style={styles.downloadStatusContainer}>
			{isActiveDownload && trackCount === 1 && (
				<>
					<FontAwesome name="arrow-down" size={12} color={colors.primary} />
					<Text style={styles.downloadStatusText}>{formatBytes(downloadedBytes ?? 0)}</Text>
					<Text style={styles.downloadStatusText}>of</Text>
					<Text style={styles.downloadStatusText}>{formatBytes(totalBytes ?? 0)}</Text>
				</>
			)}
			{isActiveDownload && trackCount > 1 && (
				<>
					<FontAwesome name="arrow-down" size={12} color={colors.primary} />
					<Text style={styles.downloadStatusText}>{tracksCompleted}</Text>
					<Text style={styles.downloadStatusText}>of</Text>
					<Text style={styles.downloadStatusText}>{trackCount} tracks</Text>
				</>
			)}
			{isPendingDownload && (
				<>
					<Ionicons name="pause" size={12} color="#666" />
					<Text style={styles.downloadStatusText}>Paused</Text>
				</>
			)}
			{isCompletedDownload && (
				<>
					<FontAwesome name="check" size={12} color={colors.primary} />
					<Text style={styles.downloadSuccessText}>Completed</Text>
				</>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	downloadStatusContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
		marginTop: 4,
	},

	downloadStatusText: {
		fontSize: 12,
		color: '#666',
	},

	downloadSuccessText: {
		fontSize: 12,
		color: colors.primary,
	},
})
