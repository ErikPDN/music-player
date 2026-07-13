import { db } from '@/db'
import { tracks } from '@/db/schema'
import { toggleTrackFavorite } from '@/db/mutations'
import { eq } from 'drizzle-orm'
import { useLiveQuery } from 'drizzle-orm/expo-sqlite'

export const useFavorites = () => {
	const { data: favorites } = useLiveQuery(db.select().from(tracks).where(eq(tracks.isFavorite, 1)))

	return { favorites: favorites ?? [], toggleTrackFavorite }
}
