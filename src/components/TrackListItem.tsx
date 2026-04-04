import { unknownArtistImageSource } from '@/constants/images'
import { colors } from '@/constants/tokens'
import { Entypo } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { Track, useActiveTrack } from 'react-native-track-player'
import PlayingEqualizerIcon from './PlayingEqualizerIcon'

interface TrackListItemProps {
	track: Track
	onTrackPress?: (track: Track) => void
}

export const TrackListItem = ({ track, onTrackPress }: TrackListItemProps) => {
	const isActiveTrack = useActiveTrack()?.url === track.url

	return (
		<TouchableHighlight
			onPress={() => onTrackPress?.(track)}
			underlayColor="rgba(156, 163, 175, 0.3)"
			style={styles.touchable}
		>
			<View style={styles.trackItemContainer}>
				<View>
					<Image
						source={track.artwork || unknownArtistImageSource}
						style={{
							...styles.trackArtworkImage,
							opacity: isActiveTrack ? 1 : 0.5,
						}}
					/>
				</View>

				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<View style={{ width: '100%' }}>
						<Text
							style={{
								...styles.trackTitleText,
								color: isActiveTrack ? colors.primary : colors.text,
							}}
						>
							{isActiveTrack && <PlayingEqualizerIcon />}
							{track.title}
						</Text>

						{track.artist && (
							<Text numberOfLines={1} style={styles.trackArtistText}>
								{track.artist}
							</Text>
						)}
					</View>

					<Entypo name="dots-three-vertical" size={20} color={colors.text} />
				</View>
			</View>
		</TouchableHighlight>
	)
}

const styles = StyleSheet.create({
	touchable: {
		borderRadius: 8,
		marginHorizontal: 4,
	},
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
		marginRight: 16,
	},
})
