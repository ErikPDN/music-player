import { db } from '@/db'
import { playlists, playlistTracks, tracks } from '@/db/schema'
import { Track } from '@/helpers/types'
import { eq } from 'drizzle-orm'
import { useLiveQuery } from 'drizzle-orm/expo-sqlite'

export const usePlaylist = () => {
	const { data: playlistList } = useLiveQuery(db.select().from(playlists).orderBy(playlists.name))

	const createPlaylist = async (name: string) => {
		await db.insert(playlists).values({
			id: crypto.randomUUID(),
			name,
			createdAt: Date.now(),
			updatedAt: Date.now(),
		})
	}

	const addPlaylist = async (track: Track, playlistId: string) => {
		const existing = await db
			.select()
			.from(playlistTracks)
			.where(eq(playlistTracks.playlistId, playlistId))

		await db.insert(playlistTracks).values({
			playlistId,
			trackId: track.id,
			position: existing.length,
		})
	}

	return { playlists: playlistList ?? [], createPlaylist, addPlaylist }
}

export const getPlaylistTracks = async (playlistId: string): Promise<Track[]> => {
	const result = await db
		.select({ track: tracks })
		.from(tracks)
		.innerJoin(playlistTracks, eq(playlistTracks.trackId, tracks.id))
		.where(eq(playlistTracks.playlistId, playlistId))
		.orderBy(playlistTracks.position)

	return result.map((r) => r.track) || []
}

export const usePlaylistTracks = (playlistId: string) => {
	const { data } = useLiveQuery(
		db
			.select({ track: tracks })
			.from(tracks)
			.innerJoin(playlistTracks, eq(playlistTracks.trackId, tracks.id))
			.where(eq(playlistTracks.playlistId, playlistId))
			.orderBy(playlistTracks.position),
		[playlistId],
	)
	return data?.map((r) => r.track) ?? []
}
