import { useShallow } from 'zustand/react/shallow'
import { useLibraryStore } from './useLibrary'

export const useFavorites = () => {
	const favorites = useLibraryStore(
		useShallow((state) => state.tracks.filter((track) => track.rating === 1)),
	)
	const toggleTrackFavorite = useLibraryStore((state) => state.toggleTrackFavorite)

	return { favorites, toggleTrackFavorite }
}
