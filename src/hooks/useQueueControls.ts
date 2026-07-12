import { toPlayerTrack, Track } from '@/helpers/types'
import TrackPlayer from 'react-native-track-player'

export const useQueueControls = (tracks: Track[]) => {
	const handlePlay = async () => {
		await TrackPlayer.setQueue(tracks.map((t) => toPlayerTrack(t)))
		await TrackPlayer.skip(0)
		await TrackPlayer.play()
	}

	const handleShuffle = async () => {
		const shuffledTracks = [...tracks].sort(() => Math.random() - 0.5)
		await TrackPlayer.setQueue(shuffledTracks.map((t) => toPlayerTrack(t)))
		await TrackPlayer.skip(0)
		await TrackPlayer.play()
	}

	return { handlePlay, handleShuffle }
}
