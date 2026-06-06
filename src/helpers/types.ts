import { tracks } from '@/db/schema'
import { Track as PlayerTrack } from 'react-native-track-player'

export type Track = typeof tracks.$inferSelect

export type Playlist = {
	name: string
	tracks: Track[]
	artworkPreview: string
}

export type Artist = {
	name: string
	tracks: Track[]
	image?: string
}

export const toPlayerTrack = (track: Track): PlayerTrack => {
	return {
		id: track.id,
		url: track.uri, // ← RNTP usa 'url', db usa 'uri'
		title: track.title,
		artist: track.artist ?? undefined,
		album: track.album ?? undefined,
		artwork: track.artwork ?? undefined,
		duration: track.duration ? track.duration / 1000 : undefined,
	}
}
