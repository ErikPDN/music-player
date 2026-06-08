import { db } from '@/db'
import { playlists, playlistTracks, tracks } from '@/db/schema'
import { Track } from '@/helpers/types'
import { eq } from 'drizzle-orm'
import { useLiveQuery } from 'drizzle-orm/expo-sqlite'
import { useCallback, useEffect, useState } from 'react'

type PlaylistRow = typeof playlists.$inferSelect

export const usePlaylist = () => {
	const [playlistList, setPlaylistList] = useState<PlaylistRow[]>([])
	const [isLoading, setIsLoading] = useState(false)

	const loadPlaylists = useCallback(async () => {
		setIsLoading(true)
		const results = await db.select().from(playlists).orderBy(playlists.name)
		setPlaylistList(results)
		setIsLoading(false)
	}, [])

	useEffect(() => {
		loadPlaylists()
	}, [loadPlaylists])

	const createPlaylist = async (name: string) => {
		await db.insert(playlists).values({
			id: crypto.randomUUID(),
			name,
			createdAt: Date.now(),
			updatedAt: Date.now(),
		})
		loadPlaylists()
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

	return { playlists: playlistList, isLoading, createPlaylist, addPlaylist, loadPlaylists }
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
