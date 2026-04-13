import { PlayerPlayPauseButton } from '@/components/PlayerPlayPauseButton'
import { RepeatButton } from '@/components/RepeatButton'
import SeekBar from '@/components/SeekBar'
import { ShuffleButton } from '@/components/ShuffleButton'
import { SkipNextButton, SkipPreviousButton } from '@/components/SkipButton'
import { unknownArtistImageSource, unknownTrackImageSource } from '@/constants/images'
import { colors, screenPadding } from '@/constants/tokens'
import { usePlayerBackground } from '@/hooks/usePlayerBackground'
import { defaultStyles } from '@/styles'
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useActiveTrack } from 'react-native-track-player'

const PlayerScreen = () => {
	const router = useRouter()
	const activeTrack = useActiveTrack()
	const { top, bottom } = useSafeAreaInsets()
	const { imageColors } = usePlayerBackground(activeTrack?.artwork ?? unknownTrackImageSource)
	console.log('Image colors: ', imageColors)

	// TODO: Implement actual like functionality
	const [isLiked, setIsLiked] = useState(false)

	const handleOnPress = () => {
		router.back()
	}

	if (!activeTrack) {
		return (
			<View style={[defaultStyles.container, { justifyContent: 'center' }]}>
				<ActivityIndicator color={colors.icon} />
			</View>
		)
	}

	return (
		<LinearGradient
			style={{ flex: 1 }}
			colors={
				imageColors
					? [imageColors.average ?? colors.background, imageColors.darkMuted ?? colors.background]
					: [colors.background, colors.background]
			}
		>
			<View style={styles.overlayContainer}>
				<FontAwesome6 name="chevron-down" size={24} color="white" onPress={handleOnPress} />

				<View
					style={[
						styles.cardContainer,
						{
							marginTop: top + 10,
							marginBottom: bottom,
						},
					]}
				>
					<View style={styles.artworkImageContainer}>
						<Image
							source={activeTrack.artwork ?? unknownArtistImageSource}
							style={styles.artworkImage}
						/>
					</View>

					<View
						style={{
							marginTop: 12,
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<View style={{ flexDirection: 'column', maxWidth: '75%' }}>
							<Text numberOfLines={1} style={styles.trackTitleText}>
								{activeTrack.title}
							</Text>
							<Text numberOfLines={1} style={styles.trackArtistText}>
								{activeTrack.artist || 'Unknown Artist'}
							</Text>
						</View>

						<TouchableOpacity onPress={() => setIsLiked((prev) => !prev)} style={styles.likeButton}>
							<FontAwesome name="heart" size={26} color={isLiked ? colors.primary : colors.icon} />
						</TouchableOpacity>
					</View>

					<View style={styles.seekContainer}>
						<SeekBar />
					</View>

					<View style={styles.trackControlsContainer}>
						<ShuffleButton iconSize={28} />

						<SkipPreviousButton iconSize={28} />

						<PlayerPlayPauseButton
							iconSize={26}
							iconColor="black"
							style={styles.playPauseButtonContainer}
						/>

						<SkipNextButton iconSize={28} />

						<RepeatButton iconSize={28} />
					</View>
				</View>
			</View>
		</LinearGradient>
	)
}

const styles = StyleSheet.create({
	overlayContainer: {
		flex: 1,
		paddingHorizontal: screenPadding.horizontal,
		paddingTop: 72,
	},

	cardContainer: {
		flex: 1,
	},

	artworkImageContainer: {
		shadowOffset: {
			width: 0,
			height: 8,
		},
		shadowOpacity: 0.5,
		shadowRadius: 10,
		elevation: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		height: '55%',
	},

	seekContainer: {
		marginTop: 48,
	},

	artworkImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
		borderRadius: 12,
	},

	trackTitleText: {
		color: colors.text,
		fontSize: 20,
		fontWeight: '700',
		width: '100%',
	},

	trackArtistText: {
		color: colors.minimumTrackTintColor,
		fontSize: 16,
		fontWeight: '500',
	},

	trackControlsContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 26,
		marginTop: 16,
		paddingBottom: 16,
	},

	playPauseButtonContainer: {
		width: 64,
		height: 64,
		borderRadius: 999,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
	},

	likeButton: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default PlayerScreen
