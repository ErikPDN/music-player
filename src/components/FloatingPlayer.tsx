import { PlayPauseButton } from '@/components/PlayPauseButton'
import { unknownTrackImageSource } from '@/constants/images'
import { useLastActiveTrack } from '@/hooks/useLastActiveTrack'
import { defaultStyles } from '@/styles'
import { Image } from 'expo-image'
import { StyleSheet, Text, TouchableOpacity, View, ViewProps } from 'react-native'
import { useActiveTrack } from 'react-native-track-player'

const FloatingPlayer = ({ style }: ViewProps) => {
	const activeTrack = useActiveTrack()
	const lastActiveTrack = useLastActiveTrack()

	const displayedTrack = activeTrack ?? lastActiveTrack

	if (!displayedTrack) {
		return null
	}

	return (
		<TouchableOpacity style={[styles.container, style]} activeOpacity={0.8}>
			<Image
				source={displayedTrack.artwork ?? unknownTrackImageSource}
				style={styles.trackArtworkImage}
			/>

			<View style={styles.trackInfoContainer}>
				<Text style={styles.trackTitle}>{displayedTrack.title}</Text>
				<Text style={styles.trackArtist}>{displayedTrack.artist}</Text>
			</View>

			<View style={styles.trackControlsContainer}>
				<PlayPauseButton iconSize={24} />
				{/* Criar botões de curtir futuramente */}
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#252525',
		padding: 8,
		borderRadius: 12,
		paddingVertical: 10,
	},

	trackInfoContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		paddingLeft: 10,
		marginLeft: 4,
	},

	trackArtworkImage: {
		width: 40,
		height: 40,
		borderRadius: 4,
	},

	trackTitle: {
		...defaultStyles.text,
		fontSize: 16,
		fontWeight: '600',
	},

	trackArtist: {
		...defaultStyles.text,
		fontSize: 14,
		color: '#666',
	},

	trackControlsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 12,
		marginRight: 16,
		paddingLeft: 8,
	},
})

export default FloatingPlayer
