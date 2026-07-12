import { db } from '@/db'
import { tracks } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { useLiveQuery } from 'drizzle-orm/expo-sqlite'
import { useLibraryStore } from './useLibrary'

export const useFavorites = () => {
	const { data: favorites } = useLiveQuery(db.select().from(tracks).where(eq(tracks.isFavorite, 1)))

	const toggleTrackFavorite = useLibraryStore((state) => state.toggleTrackFavorite)

	return { favorites: favorites ?? [], toggleTrackFavorite }
}
