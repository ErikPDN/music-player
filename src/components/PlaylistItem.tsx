import { colors } from '@/constants/tokens'
import { Playlist } from '@/helpers/types'
import { Image } from 'expo-image'
import { StyleSheet, Text, TouchableHighlight, TouchableHighlightProps, View } from 'react-native'

interface PlaylistItemProps extends TouchableHighlightProps {
	playlist: Playlist
}

export const PlaylistItem = ({ playlist, ...rest }: PlaylistItemProps) => {
	return (
		<TouchableHighlight {...rest} style={styles.playlistItemContainer} underlayColor="#ffffff10">
			<View style={styles.innerContainer}>
				<Image source={playlist.artworkPreview} style={styles.playlistImage} contentFit="cover" />

				<Text numberOfLines={1} style={styles.playlistNameText}>
					{playlist.name}
				</Text>

				<Text style={styles.playlistText}>{playlist.tracks.length} songs</Text>
			</View>
		</TouchableHighlight>
	)
}

const styles = StyleSheet.create({
	playlistItemContainer: {
		flex: 1,
		borderRadius: 8,
		overflow: 'hidden',
	},

	innerContainer: {
		flex: 1,
	},

	playlistImage: {
		width: '100%',
		aspectRatio: 1, // quadrado
		borderRadius: 8,
	},

	playlistNameText: {
		color: colors.text,
		fontSize: 14,
		fontWeight: '600',
		marginTop: 8,
	},

	playlistText: {
		color: colors.textMuted,
		fontSize: 12,
		marginTop: 2,
	},
})
