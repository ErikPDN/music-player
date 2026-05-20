import { unknownArtistImageSource } from '@/constants/images'
import { Playlist } from '@/helpers/types'
import { useMemo } from 'react'
import { useLibraryStore } from './useLibrary'

export const usePlaylists = () => {
	const tracks = useLibraryStore((state) => state.tracks)

	const playlists = useMemo(() => {
		return tracks.reduce((acc, track) => {
			track.playlist?.forEach((playlistName) => {
				const existingPlaylist = acc.find((playlist) => playlist.name === playlistName)

				if (existingPlaylist) {
					existingPlaylist.tracks.push(track)
				} else {
					acc.push({
						name: playlistName,
						tracks: [track],
						artworkPreview: track.artwork ?? unknownArtistImageSource,
					})
				}
			})

			return acc
		}, [] as Playlist[])
	}, [tracks])

	const addToPlaylist = useLibraryStore((state) => state.addToPlaylist)

	return { playlists, addToPlaylist }
}

