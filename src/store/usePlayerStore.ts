import { Track } from 'react-native-track-player'
import { create } from 'zustand'

interface PlayerState {
	isShuffleActive: boolean
	originalQueue: Track[]
	setShuffleActive: (value: boolean) => void
	setOriginalQueue: (queue: Track[]) => void
}

export const usePlayerStore = create<PlayerState>((set) => ({
	isShuffleActive: false,
	originalQueue: [],
	setShuffleActive: (value) => set({ isShuffleActive: value }),
	setOriginalQueue: (queue) => set({ originalQueue: queue }),
}))
