import { initTorrentEngineListeners } from '@/services/torrentEngine'
import { useEffect } from 'react'

export const useTorrentEngineListeners = () => {
	useEffect(() => {
		const subscriptions = initTorrentEngineListeners()
		return () => subscriptions.forEach((subscription) => subscription.remove())
	}, [])
}
