import FloatingPlayer from '@/components/FloatingPlayer'
import { colors, fontSize } from '@/constants/tokens'
import { FontAwesome } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { Tabs } from 'expo-router'
import { StyleSheet } from 'react-native'

const TabsNavigation = () => {
	return (
		<>
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: colors.primary,
					tabBarLabelStyle: {
						fontSize: fontSize.xs,
						fontWeight: '500',
					},
					tabBarStyle: {
						position: 'absolute',
						borderTopWidth: 0,
						paddingTop: 10,
						paddingBottom: 40,
						elevation: 0,
						backgroundColor: colors.background,
						overflow: 'hidden',
						height: 110,
						opacity: 1,
						paddingHorizontal: 12,
					},
					tabBarBackground: () => <BlurView intensity={30} style={styles.blurViewStyle} />,
				}}
			>
				<Tabs.Screen
					name="favorites"
					options={{
						tabBarLabel: 'Favorites',
						tabBarIcon: ({ color }) => <FontAwesome name="heart" size={20} color={color} />,
						headerShown: false,
					}}
				/>
				<Tabs.Screen
					name="(songs)"
					options={{
						tabBarLabel: 'Songs',
						tabBarIcon: ({ color }) => <FontAwesome name="music" size={20} color={color} />,
						headerShown: false,
					}}
				/>
				<Tabs.Screen
					name="playlists"
					options={{
						tabBarLabel: 'Playlists',
						tabBarIcon: ({ color }) => <FontAwesome name="list" size={20} color={color} />,
						headerShown: false,
					}}
				/>
				<Tabs.Screen
					name="artists"
					options={{
						tabBarLabel: 'Artists',
						tabBarIcon: ({ color }) => <FontAwesome name="users" size={20} color={color} />,
						headerShown: false,
					}}
				/>
				<Tabs.Screen
					name="downloads"
					options={{
						tabBarLabel: 'Downloads',
						tabBarIcon: ({ color }) => <FontAwesome name="download" size={20} color={color} />,
						headerShown: false,
					}}
				/>
			</Tabs>

			<FloatingPlayer
				style={{
					position: 'absolute',
					left: 8,
					right: 8,
					bottom: 78,
				}}
			/>
		</>
	)
}

const styles = StyleSheet.create({
	blurViewStyle: {
		...StyleSheet.absoluteFill,
		overflow: 'hidden',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
})

export default TabsNavigation
