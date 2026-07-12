import { db } from '@/db'
import { tracks } from '@/db/schema'
import { Track } from '@/helpers/types'
import { eq } from 'drizzle-orm'
import { create } from 'zustand'

interface LibraryState {
	toggleTrackFavorite: (track: Track) => void
}

export const useLibraryStore = create<LibraryState>()((set, get) => ({
	toggleTrackFavorite: async (track) => {
		await db
			.update(tracks)
			.set({ isFavorite: track.isFavorite ? 0 : 1 })
			.where(eq(tracks.id, track.id))
	},
}))
