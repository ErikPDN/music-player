import { unknownArtistImageSource } from '@/constants/images'
import { colors } from '@/constants/tokens'
import { Image } from 'expo-image'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'

interface Track {
	title: string
	image?: string
	artist?: string
}

interface TrackListItemProps {
	track: Track
}

export const TrackListItem = ({ track }: TrackListItemProps) => {
	const isActiveTrack = false

	return (
		<TouchableHighlight>
			<View style={styles.trackItemContainer}>
				<View>
					<Image
						source={track.image || unknownArtistImageSource}
						style={{
							...styles.trackArtworkImage,
							opacity: isActiveTrack ? 1 : 0.5,
						}}
					/>
				</View>

				<View style={{ width: '100%' }}>
					<Text
						style={{
							...styles.trackTitleText,
							color: isActiveTrack ? colors.primary : colors.text,
						}}
					>
						{track.title}
					</Text>

					{track.artist && (
						<Text numberOfLines={1} style={styles.trackArtistText}>
							{track.artist}
						</Text>
					)}
				</View>
			</View>
		</TouchableHighlight>
	)
}

const styles = StyleSheet.create({
	trackArtworkImage: {
		width: 50,
		height: 50,
		borderRadius: 4,
	},

	trackTitleText: {
		color: colors.text,
		fontSize: 16,
		fontWeight: '600',
		maxWidth: '90%',
	},

	trackArtistText: {
		color: '#666',
		fontSize: 14,
		fontWeight: '400',
		marginTop: 4,
	},

	trackItemContainer: {
		flexDirection: 'row',
		columnGap: 12,
		alignItems: 'center',
		paddingVertical: 8,
		paddingHorizontal: 12,
	},
})
