import { PlayPauseButton } from '@/components/PlayPauseButton'
import { PIXELS_PER_CHAR } from '@/constants/animation'
import { unknownTrackImageSource } from '@/constants/images'
import { useLastActiveTrack } from '@/hooks/useLastActiveTrack'
import { defaultStyles } from '@/styles'
import { Image } from 'expo-image'
import { useState } from 'react'
import { StyleSheet, TouchableOpacity, View, ViewProps } from 'react-native'
import { useActiveTrack } from 'react-native-track-player'
import MovingText from './MovingText'

const FloatingPlayer = ({ style }: ViewProps) => {
	const [containerWidth, setContainerWidth] = useState(0)

	const activeTrack = useActiveTrack()
	const lastActiveTrack = useLastActiveTrack()
	const threshold = Math.floor(containerWidth / PIXELS_PER_CHAR)

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

			<View
				style={styles.trackInfoContainer}
				onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
			>
				<MovingText
					style={styles.trackTitle}
					text={displayedTrack.title ?? 'Unknown Title'}
					animationThreshold={threshold}
				/>
				<MovingText
					style={styles.trackArtist}
					text={displayedTrack.artist ?? 'Unknown Artist'}
					animationThreshold={threshold}
				/>
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
		overflow: 'hidden',
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
