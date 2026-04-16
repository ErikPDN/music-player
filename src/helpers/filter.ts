import { Track } from 'react-native-track-player'

export const filterSongs = (searchQuery: string) => (track: Track) =>
	track.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
	track.artist?.toLowerCase().includes(searchQuery.toLowerCase())
