import { unknownArtistImageSource } from '@/constants/images'
import { colors, screenPadding } from '@/constants/tokens'
import { defaultStyles } from '@/styles'
import { FontAwesome6 } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useActiveTrack } from 'react-native-track-player'

const PlayerScreen = () => {
	const router = useRouter()
	const activeTrack = useActiveTrack()
	const { top, bottom } = useSafeAreaInsets()

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
})

export default PlayerScreen
