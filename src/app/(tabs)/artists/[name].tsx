import { QueueControls } from '@/components/QueueControls'
import TrackList from '@/components/TrackList'
import { unknownArtistImageSource } from '@/constants/images'
import { colors } from '@/constants/tokens'
import { useArtists } from '@/store/useArtists'
import { FontAwesome6 } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ArtistDetailScreen = () => {
	const { top } = useSafeAreaInsets()
	const { name: artistName } = useLocalSearchParams<{ name: string }>()
	const router = useRouter()
	const artists = useArtists()
	const artist = artists.find((artist) => artist.name === artistName)
	const artistTracks = artist?.tracks ?? []

	if (!artist) {
		{
			/* Criar uma toast para informar que o artista não foi encontrado */
		}
		console.warn('Artist not found')
		return <Redirect href="/(tabs)/artists" />
	}

	return (
		<View style={[styles.overlayContainer, { paddingTop: top }]}>
			<TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
				<FontAwesome6 name="arrow-left" size={24} color={colors.text} />
			</TouchableOpacity>

			<View style={styles.artistHeaderContainer}>
				<Image
					source={artist.image ? { uri: artist.image } : unknownArtistImageSource}
					style={styles.artistImage}
				/>

				<Text style={styles.artistName}>{artist.name}</Text>
			</View>

			<QueueControls tracks={artistTracks} style={{ marginRight: 4 }} />

			<TrackList tracks={artistTracks} scrollEnabled={true} />
		</View>
	)
}

const styles = StyleSheet.create({
	overlayContainer: {
		flex: 1,
		backgroundColor: colors.background,
		paddingHorizontal: 4,
	},

	artistHeaderContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 24,
		marginTop: 8,
		gap: 16,
	},

	artistName: {
		fontSize: 24,
		fontWeight: 'bold',
		color: colors.text,
	},

	artistImage: {
		width: 180,
		height: 180,
		borderRadius: 9999,
	},

	backButton: {
		padding: 12,
		alignSelf: 'flex-start',
	},
})

export default ArtistDetailScreen
