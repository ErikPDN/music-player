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
				<Image source={artist.image ?? unknownArtistImageSource} style={styles.artistImage} />

				<View style={styles.artistNameContainer}>
					<Text numberOfLines={1} style={styles.artistNameText}>
						{artist.name}
					</Text>
					<Text style={styles.artistText}>Artist</Text>
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
		width: 56,
		height: 56,
		borderRadius: 999,
	},

	artistText: {
		color: '#666',
		fontSize: 14,
		fontWeight: '400',
		marginTop: 2,
	},

	artistNameText: {
		fontSize: 16,
		maxWidth: '80%',
		color: colors.text,
		fontWeight: '600',
	},
})
