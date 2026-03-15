import { colors, fontSize } from '@/constants/tokens'
import { FontAwesome } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { Tabs } from 'expo-router'
import { StyleSheet } from 'react-native'

const TabsNavigation = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: colors.primary,
				tabBarLabelStyle: {
					fontSize: fontSize.xs,
					fontWeight: '500',
				},
				headerShown: false,
				tabBarStyle: {
					position: 'absolute',
					// borderTopLeftRadius: 20,
					// borderTopRightRadius: 20,
					borderTopWidth: 0,
					paddingTop: 10,
					paddingBottom: 40,
					elevation: 0,
					backgroundColor: 'transparent',
					overflow: 'hidden',
					borderColor: 'transparent',
					shadowColor: 'transparent',
					height: 110,
				},
				tabBarBackground: () => <BlurView intensity={30} style={styles.blurViewStyle} />,
			}}
		>
			<Tabs.Screen
				name="favorites"
				options={{
					title: 'Favorites',
					tabBarIcon: ({ color }) => <FontAwesome name="heart" size={20} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="(songs)"
				options={{
					title: 'Songs',
					tabBarIcon: ({ color }) => <FontAwesome name="music" size={20} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="playlists"
				options={{
					title: 'Playlists',
					tabBarIcon: ({ color }) => <FontAwesome name="list" size={20} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="downloads"
				options={{
					title: 'Downloads',
					tabBarIcon: ({ color }) => <FontAwesome name="download" size={20} color={color} />,
				}}
			/>
		</Tabs>
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
