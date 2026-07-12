import { toPlayerTrack, Track } from '@/helpers/types'
import TrackPlayer from 'react-native-track-player'

export const useQueuePlay = (tracks: Track[]) => {
	const handlePlay = async () => {
		await TrackPlayer.setQueue(tracks.map((t) => toPlayerTrack(t)))
		await TrackPlayer.play()
	}

	return handlePlay
}
