import { useLibraryStore } from './useLibrary'

export const useTracks = () => useLibraryStore((state) => state.tracks)
