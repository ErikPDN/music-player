import { toastConfig } from '@/config/toastConfig'
import { db, migrations, useMigrations } from '@/db'
import { useLogTrackPlayer } from '@/hooks/useLogTrackPlayer'
import { useSetupTrackPlayer } from '@/hooks/useSetupTrackPlayer'
import { useTorrentEngineListeners } from '@/hooks/useTorrentEngineListeners'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useCallback } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

SplashScreen.preventAutoHideAsync()

const App = () => {
	const { success } = useMigrations(db, migrations)

	const handleTrackPlayerLoad = useCallback(() => {
		if (success) SplashScreen.hideAsync()
	}, [success])

	useSetupTrackPlayer({
		onLoad: handleTrackPlayerLoad,
	})

	useLogTrackPlayer()

	useTorrentEngineListeners()

	if (!success) return null

	return (
		<SafeAreaProvider>
			<RootNavigation />
			<StatusBar style="auto" />
			<Toast config={toastConfig} bottomOffset={90} visibilityTime={3000} />
		</SafeAreaProvider>
	)
}

const RootNavigation = () => {
	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen
				name="player"
				options={{
					presentation: 'card',
					gestureEnabled: true,
					gestureDirection: 'vertical',
					animationDuration: 400,
					headerShown: false,
				}}
			/>
		</Stack>
	)
}

export default App
