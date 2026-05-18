import Header from '@/components/Header'
import { defaultStyles } from '@/styles'
import { FlatList, StyleSheet, Text, View } from 'react-native'

const PlaylistsScreen = () => {
	return (
		<View style={defaultStyles.container}>
			<Header title="Playlists" isCreatable />

			<FlatList
				data={[]}
				renderItem={() => null}
				scrollEnabled={true}
				contentContainerStyle={{ paddingTop: 4 }}
				ListEmptyComponent={
					<View>
						<Text style={styles.emptyText}>No playlists found</Text>
					</View>
				}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: 'row',
	},

	emptyText: {
		color: '#aaa',
		textAlign: 'center',
		marginTop: 32,
		fontSize: 16,
	},
})

export default PlaylistsScreen
