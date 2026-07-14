import { colors } from '@/constants/tokens'
import { Download } from '@/db/schema'
import MusicNoteIcon from '@assets/images/music-note.svg'
import { FontAwesome } from '@expo/vector-icons'
import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface DownloadListItemProps {
	download: Download
}

export const DownloadListItem = ({ download }: DownloadListItemProps) => {
	const isActiveDownload = download.status === 'downloading'
	const [isPlaying, setIsPlaying] = useState(isActiveDownload)

	return (
		<View style={styles.downloadListItemContainer}>
			<View style={styles.downloadArtworkPlaceholder}>
				<MusicNoteIcon width={24} height={24} fill="#3a3a3a" />
			</View>

			<View style={styles.downloadInfoContainer}>
				<View style={styles.downloadTitleContainer}>
					<Text style={styles.downloadTitleText}>{download.title}</Text>
					<Text style={styles.downloadProgressText}>
						{Math.round((download.progress ?? 0) * 100)}%
					</Text>
				</View>

				{/* Nome do artista */}
				{/* <View>
					<Text>{download.artist}</Text>
				</View> */}

				<View style={styles.downloadProgressBarContainer}>
					<View
						style={[styles.downloadProgressBar, { width: `${(download.progress ?? 0) * 100}%` }]}
					/>
				</View>

				{/* Estado do download */}
				<View>
					<Text></Text>
				</View>
			</View>

			<TouchableOpacity
				style={styles.downloadActionButton}
				onPress={() => setIsPlaying(!isPlaying)}
			>
				<FontAwesome name={isPlaying ? 'pause' : 'play'} size={12} color="#fff" />
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	downloadListItemContainer: {
		flexDirection: 'row',
		gap: 14,
		alignItems: 'center',
		paddingVertical: 8,
	},

	downloadInfoContainer: {
		flex: 1,
		minWidth: 0,
		gap: 4,
	},

	downloadArtworkPlaceholder: {
		width: 50,
		height: 50,
		borderRadius: 10,
		backgroundColor: '#161616',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		flexShrink: 0,
		overflow: 'hidden',
	},

	downloadTitleContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 8,
	},

	downloadTitleText: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#fff',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},

	downloadProgressText: {
		fontSize: 12,
		color: '#666',
		flexShrink: 1,
	},

	downloadProgressBarContainer: {
		height: 4,
		backgroundColor: '#333',
		borderRadius: 2,
		overflow: 'hidden',
		marginTop: 4,
	},

	downloadProgressBar: {
		height: '100%',
		backgroundColor: colors.primary,
		borderRadius: 2,
	},

	downloadActionButton: {
		width: 32,
		height: 32,
		borderRadius: 999,
		color: '#fff',
		borderWidth: 1.5,
		borderColor: '#333',
		justifyContent: 'center',
		alignItems: 'center',
	},
})
