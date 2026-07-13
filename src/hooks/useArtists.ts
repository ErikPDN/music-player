import { Artist } from '@/helpers/types'
import { useMemo } from 'react'
import { useTracks } from './useTracks'

export const useArtists = () => {
	const tracks = useTracks()

	return useMemo(() => {
		return tracks.reduce((acc, track) => {
			if (!track.artist) return acc

			const artist = acc.find((a) => a.name === track.artist)

			if (artist) {
				artist.tracks.push(track)
			} else {
				acc.push({
					name: track.artist,
					image: track.artwork ?? undefined,
					tracks: [track],
				})
			}

			return acc
		}, [] as Artist[])
	}, [tracks])
}
