import { PlayerPlayPauseButton } from '@/components/PlayerPlayPauseButton'
import { ShuffleButton } from '@/components/ShuffleButton'
import TrackList from '@/components/TrackList'
import { unknownArtistImageSource } from '@/constants/images'
import { colors } from '@/constants/tokens'
import { useQueuePlay } from '@/hooks/useQueuePlay'
import { useArtists } from '@/hooks/useArtists'
import { FontAwesome6 } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router'
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

const HERO_HEIGHT = Dimensions.get('window').height * 0.45

const ArtistDetailScreen = () => {
	const { top } = useSafeAreaInsets()
	const { name: artistName } = useLocalSearchParams<{ name: string }>()
	const router = useRouter()
	const artists = useArtists()
	const artist = artists.find((artist) => artist.name === artistName)
	const artistTracks = artist?.tracks ?? []
	const handlePlay = useQueuePlay(artistTracks)

	if (!artist) {
		Toast.show({
			type: 'error',
			text1: 'Artist not found',
		})
		return <Redirect href="/(tabs)/artists" />
	}

	return (
		<View style={styles.root}>
			<Image
				source={artist.image ? { uri: artist.image } : unknownArtistImageSource}
				style={styles.heroImage}
				contentFit="cover"
			/>

			<LinearGradient colors={['transparent', colors.background]} style={styles.heroGradient} />

			<TouchableOpacity style={[styles.backButton, { top: top + 8 }]} onPress={() => router.back()}>
				<FontAwesome6 name="arrow-left" size={24} color={colors.text} />
			</TouchableOpacity>

			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				<View style={{ height: HERO_HEIGHT - 72 }} />

				<Text style={styles.artistName}>{artist.name}</Text>

				<View style={styles.queueControlsContainer}>
					<ShuffleButton iconSize={20} style={styles.shuffleButtonContainer} />
					<PlayerPlayPauseButton
						iconSize={20}
						iconColor={colors.text}
						style={styles.playPauseButtonContainer}
						onPlay={handlePlay}
					/>
				</View>

				<TrackList tracks={artistTracks} scrollEnabled={false} />
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colors.background,
	},

	heroImage: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: HERO_HEIGHT,
		width: '100%',
	},

	heroGradient: {
		position: 'absolute',
		top: HERO_HEIGHT - 120,
		left: 0,
		right: 0,
		height: 120,
	},

	backButton: {
		position: 'absolute',
		left: 20,
		zIndex: 10,
	},

	scrollView: {
		flex: 1,
	},

	scrollContent: {
		paddingBottom: 32,
	},

	artistName: {
		fontSize: 32,
		fontWeight: '900',
		color: colors.text,
		marginBottom: 16,
		marginLeft: 12,
	},

	queueControlsContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		columnGap: 10,
		marginBottom: 16,
		paddingRight: 12,
	},

	playPauseButtonContainer: {
		width: 52,
		height: 52,
		borderRadius: 999,
		backgroundColor: colors.primary,
		justifyContent: 'center',
		alignItems: 'center',
	},

	shuffleButtonContainer: {
		width: 52,
		height: 52,
		borderRadius: 999,
		backgroundColor: colors.primary,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default ArtistDetailScreen
