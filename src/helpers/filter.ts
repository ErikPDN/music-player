import { Track } from '@/helpers/types'

export const filterSongs = (searchQuery: string) => (track: Track) =>
	track.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
	track.artist?.toLowerCase().includes(searchQuery.toLowerCase())
