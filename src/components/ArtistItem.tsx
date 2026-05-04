import { unknownArtistImageSource } from '@/constants/images'
import { colors } from '@/constants/tokens'
import { Artist } from '@/helpers/types'
import { Image } from 'expo-image'
import { StyleSheet, Text, TouchableHighlight, TouchableHighlightProps, View } from 'react-native'

interface ArtistItemProps extends TouchableHighlightProps {
	artist: Artist
}

export const ArtistItem = ({ artist, ...rest }: ArtistItemProps) => {
	return (
		<TouchableHighlight
			{...rest}
			style={styles.artistItemContainer}
			underlayColor="rgba(156, 163, 175, 0.3)"
		>
			<View style={styles.innerContainer}>
				<Image source={unknownArtistImageSource} style={styles.artistImage} />

				<View style={styles.artistNameContainer}>
					<Text numberOfLines={1} style={styles.artistNameText}>
						{artist.name}
					</Text>
				</View>
			</View>
		</TouchableHighlight>
	)
}

const styles = StyleSheet.create({
	artistItemContainer: {
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 8,
	},

	innerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},

	artistNameContainer: {
		width: '100%',
	},

	artistImage: {
		width: 40,
		height: 40,
		borderRadius: 32,
	},

	artistNameText: {
		fontSize: 17,
		maxWidth: '80%',
		color: colors.text,
		fontWeight: '600',
	},
})
