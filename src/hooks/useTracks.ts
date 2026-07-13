import { db } from '@/db'
import { tracks } from '@/db/schema'
import { useLiveQuery } from 'drizzle-orm/expo-sqlite'

export const useTracks = () => {
	const { data } = useLiveQuery(db.select().from(tracks).orderBy(tracks.title))

	return data ?? []
}
