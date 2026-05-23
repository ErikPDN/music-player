import { PlayerPlayPauseButton } from '@/components/PlayerPlayPauseButton'
import { ShuffleButton } from '@/components/ShuffleButton'
import TrackList from '@/components/TrackList'
import { unknownTrackImageSource } from '@/constants/images'
import { colors } from '@/constants/tokens'
import { usePlayerBackground } from '@/hooks/usePlayerBackground'
import { useQueuePlay } from '@/hooks/useQueuePlay'
import { usePlaylists } from '@/store/usePlaylist'
import { FontAwesome6 } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const HEADER_HEIGHT = Dimensions.get('window').height * 0.44

const PlaylistDetailScreen = () => {
	const { top } = useSafeAreaInsets()
	const { name: playlistName } = useLocalSearchParams<{ name: string }>()
	const router = useRouter()
	const { playlists } = usePlaylists()
	const playlist = playlists.find((p) => p.name === playlistName)
	const playlistTracks = playlist?.tracks ?? []

	const artworkSource = playlist?.artworkPreview ?? unknownTrackImageSource
	const { imageColors } = usePlayerBackground(artworkSource)

	if (!playlist) {
		{
			/* TODO: Criar uma toast para informar que a playlist não foi encontrada */
		}
		console.warn('Playlist not found')
		return <Redirect href="/(tabs)/playlists" />
	}

	const handlePlay = useQueuePlay(playlistTracks)

	console.log('IMAGE COLORS', imageColors)

	return (
		<View style={styles.container}>
			<LinearGradient
				colors={
					imageColors
						? [imageColors.average ?? colors.background, imageColors.darkMuted ?? colors.background]
						: [colors.background, colors.background]
				}
				style={styles.headerGradient}
			>
				<TouchableOpacity
					style={[styles.backButton, { top: top + 10 }]}
					onPress={() => router.back()}
				>
					<FontAwesome6 name="arrow-left" size={24} color={colors.text} />
				</TouchableOpacity>

				<View style={styles.imageContainer}>
					<Image source={playlist.artworkPreview} style={styles.image} />
					<Text style={styles.playlistName}>{playlist.name}</Text>
					<Text style={styles.playlistTracksCountText}>{playlist.tracks.length} songs</Text>
				</View>

				<LinearGradient
					colors={['transparent', colors.background]}
					style={styles.headerFade}
					pointerEvents="none"
				/>
			</LinearGradient>

			<View style={styles.scrollView}>
				<View style={styles.queueControlsContainer}>
					<ShuffleButton iconSize={20} style={styles.shuffleButton} />
					<PlayerPlayPauseButton
						iconSize={20}
						iconColor={colors.text}
						style={styles.playPauseButton}
						onPlay={handlePlay}
					/>
				</View>

				<TrackList tracks={playlistTracks} scrollEnabled={true} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},

	image: {
		width: 200,
		height: 200,
		borderRadius: 8,
	},

	imageContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 72,
		gap: 10,
	},

	headerGradient: {
		height: HEADER_HEIGHT,
	},

	headerFade: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		height: 80,
	},

	backButton: {
		position: 'absolute',
		left: 20,
		zIndex: 10,
	},

	scrollView: {
		flex: 1,
	},

	gradientOverlay: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: 80,
	},

	playlistName: {
		fontSize: 30,
		fontWeight: '800',
		color: colors.text,
	},

	playlistTracksCountText: {
		fontSize: 16,
		fontWeight: '500',
		color: '#dddddd7a',
		paddingBottom: 10,
	},

	queueControlsContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		columnGap: 10,
		marginBottom: 16,
		paddingRight: 12,
	},

	shuffleButton: {
		width: 52,
		height: 52,
		borderRadius: 999,
		backgroundColor: colors.primary,
		justifyContent: 'center',
		alignItems: 'center',
	},

	playPauseButton: {
		width: 52,
		height: 52,
		borderRadius: 999,
		backgroundColor: colors.primary,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default PlaylistDetailScreen
