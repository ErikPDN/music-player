import { Event, useTrackPlayerEvents } from 'react-native-track-player'

const eventsToLog: Event[] = [
	Event.PlaybackState,
	Event.PlaybackError,
	Event.PlaybackQueueEnded,
	Event.PlaybackActiveTrackChanged,
]

export const useLogTrackPlayer = () => {
	useTrackPlayerEvents(eventsToLog, async (e) => {
		if (e.type === Event.PlaybackError) {
			console.warn('Track Player Error:', e.code, e.message)
		}

		if (e.type === Event.PlaybackState) {
			console.log('Track Player State:', e.state)
		}

		if (e.type === Event.PlaybackQueueEnded) {
			console.log('Track Player Queue Ended:', e.position)
		}

		if (e.type === Event.PlaybackActiveTrackChanged) {
			console.log('Track Changed:', e.index)
		}
	})
}
