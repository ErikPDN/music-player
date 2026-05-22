import { Playlist } from '@/helpers/types'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, Text, TouchableHighlight, TouchableHighlightProps, View } from 'react-native'

interface PlaylistItemProps extends TouchableHighlightProps {
	playlist: Playlist
}

export const PlaylistItem = ({ playlist, ...rest }: PlaylistItemProps) => {
	return (
		<TouchableHighlight {...rest} style={styles.playlistItemContainer} underlayColor="#ffffff10">
			<View style={styles.imageWrapper}>
				<Image source={playlist.artworkPreview} style={styles.playlistImage} contentFit="cover" />

				<LinearGradient colors={['transparent', 'rgba(0,0,0,0.75)']} style={styles.gradient}>
					<Text numberOfLines={1} style={styles.playlistNameText}>
						{playlist.name}
					</Text>
				</LinearGradient>
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

	imageWrapper: {
		width: 184,
		height: 184,
		borderRadius: 8,
		overflow: 'hidden',
	},

	playlistImage: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},

	gradient: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		paddingHorizontal: 10,
		paddingVertical: 8,
	},

	playlistNameText: {
		color: '#fff',
		fontSize: 14,
		fontWeight: '700',
	},
})
