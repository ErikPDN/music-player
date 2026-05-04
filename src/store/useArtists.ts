import { Artist } from '@/helpers/types'
import { useMemo } from 'react'
import { useLibraryStore } from './useLibrary'

export const useArtists = () => {
	const tracks = useLibraryStore((state) => state.tracks)

	return useMemo(() => {
		return tracks.reduce((acc, track) => {
			const artist = acc.find((artist) => artist.name === track.artist)

			if (artist) {
				artist.tracks.push(track)
			} else {
				acc.push({
					name: track.artist ?? 'Unknown Artist',
					// image: track.artwork, // TODO: add futuramente
					tracks: [track],
				})
			}

			return acc
		}, [] as Artist[])
	}, [tracks])
}
