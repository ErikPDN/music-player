import { PlayPauseButton } from '@/components/PlayPauseButton'
import { unknownArtistImageSource } from '@/constants/images'
import { colors, screenPadding } from '@/constants/tokens'
import { defaultStyles } from '@/styles'
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useActiveTrack } from 'react-native-track-player'

const PlayerScreen = () => {
	const router = useRouter()
	const activeTrack = useActiveTrack()
	const { top, bottom } = useSafeAreaInsets()

	const [isShuffleActive, setIsShuffleActive] = useState(false)
	const [isRepeatActive, setIsRepeatActive] = useState(false)

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
		<View style={styles.overlayContainer}>
			<FontAwesome6 name="chevron-down" size={24} color="white" onPress={handleOnPress} />

			<View
				style={[
					styles.cardContainer,
					{
						marginTop: top + 30,
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

				<View style={{ flex: 1, marginTop: 24 }}>
					<Text numberOfLines={1} style={styles.trackTitleText}>
						{activeTrack.title}
					</Text>
					<Text numberOfLines={1} style={styles.trackArtistText}>
						{activeTrack.artist || 'Unknown Artist'}
					</Text>
				</View>

				<View style={styles.trackControlsContainer}>
					<TouchableOpacity
						style={{ paddingHorizontal: 16 }}
						onPress={() => setIsShuffleActive((prev) => !prev)}
					>
						<FontAwesome name="random" size={28} color={isShuffleActive ? '#e53935' : 'white'} />
					</TouchableOpacity>

					<TouchableOpacity>
						<FontAwesome name="backward" size={28} color="white" />
					</TouchableOpacity>

					<TouchableOpacity style={styles.playPauseButtonContainer}>
						<PlayPauseButton iconSize={24} iconColor="black" />
					</TouchableOpacity>

					<TouchableOpacity>
						<FontAwesome name="forward" size={28} color="white" />
					</TouchableOpacity>

					<TouchableOpacity
						style={{ paddingHorizontal: 16 }}
						onPress={() => setIsRepeatActive((prev) => !prev)}
					>
						<FontAwesome name="repeat" size={28} color={isRepeatActive ? '#e53935' : 'white'} />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	overlayContainer: {
		...defaultStyles.container,
		paddingHorizontal: screenPadding.horizontal,
		backgroundColor: '#252525',
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

	artworkImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
		borderRadius: 12,
	},

	trackTitleText: {
		color: colors.text,
		fontSize: 24,
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
		gap: 16,
		flex: 1,
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
})

export default PlayerScreen
