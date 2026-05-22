import { unknownTrackImageSource } from '@/constants/images'
import { colors } from '@/constants/tokens'
import { usePlayerBackground } from '@/hooks/usePlayerBackground'
import { usePlaylists } from '@/store/usePlaylist'
import { FontAwesome6 } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const PlaylistDetailScreen = () => {
	const { top } = useSafeAreaInsets()
	const { imageColors } = usePlayerBackground(unknownTrackImageSource)
	const { name: playlistName } = useLocalSearchParams<{ name: string }>()
	const router = useRouter()
	const { playlists } = usePlaylists()
	const playlist = playlists.find((p) => p.name === playlistName)

	if (!playlist) {
		console.warn('Playlist not found')
		return <Redirect href="/(tabs)/playlists" />
	}

	return (
		<View style={styles.container}>
			<LinearGradient
				colors={
					imageColors
						? [imageColors.average ?? colors.background, imageColors.darkMuted ?? colors.background]
						: [colors.background, colors.background]
				}
				style={{
					flex: 1,
				}}
			>
				<TouchableOpacity
					style={[styles.backButton, { top: top + 10 }]}
					onPress={() => router.back()}
				>
					<FontAwesome6 name="arrow-left" size={24} color={colors.text} />
				</TouchableOpacity>

				<View style={styles.imageContainer}>
					<Image source={playlist.artworkPreview} style={styles.image} />
				</View>
			</LinearGradient>
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
	},

	backButton: {
		position: 'absolute',
		left: 20,
		zIndex: 10,
	},
})

export default PlaylistDetailScreen
