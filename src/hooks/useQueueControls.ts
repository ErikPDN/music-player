import TrackPlayer, { Track } from 'react-native-track-player'

export const useQueueControls = (tracks: Track[]) => {
	const handlePlay = async () => {
		await TrackPlayer.setQueue(tracks)
		await TrackPlayer.skip(0)
		await TrackPlayer.play()
	}

	const handleShuffle = async () => {
		const shuffledTracks = [...tracks].sort(() => Math.random() - 0.5)
		await TrackPlayer.setQueue(shuffledTracks)
		await TrackPlayer.skip(0)
		await TrackPlayer.play()
	}

	return { handlePlay, handleShuffle }
}
