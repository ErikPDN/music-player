import { db } from '@/db'
import { tracks } from '@/db/schema'
import { Track } from '@/helpers/types'
import { eq } from 'drizzle-orm'

export const toggleTrackFavorite = async (track: Track) => {
	await db
		.update(tracks)
		.set({ isFavorite: track.isFavorite ? 0 : 1 })
		.where(eq(tracks.id, track.id))
}
