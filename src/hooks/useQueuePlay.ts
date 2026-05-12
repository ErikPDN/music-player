import TrackPlayer, { Track } from 'react-native-track-player'

export const useQueuePlay = (tracks: Track[]) => {
	const handlePlay = async () => {
		await TrackPlayer.setQueue(tracks)
		await TrackPlayer.play()
	}

	return handlePlay
}
