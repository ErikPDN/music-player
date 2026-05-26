import Header from '@/components/Header'
import { PlaylistItem } from '@/components/PlaylistItem'
import { Playlist } from '@/helpers/types'
import { usePlaylists } from '@/store/usePlaylist'
import { defaultStyles } from '@/styles'
import { Link } from 'expo-router'
import { useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import CreatePlaylistModal from '../../(modals)/createPlaylist'

const PlaylistsScreen = () => {
	const [isModalCreatePlaylistOpen, setIsModalCreatePlaylistOpen] = useState(false)
	const { playlists, addToPlaylist } = usePlaylists()

	const handleOpenCreatePlaylistModal = () => {
		setIsModalCreatePlaylistOpen(true)
	}

	const handleCloseCreatePlaylistModal = () => {
		setIsModalCreatePlaylistOpen(false)
	}

	return (
		<View style={defaultStyles.container}>
			<Header title="Playlists" isCreatable handleCreatePress={handleOpenCreatePlaylistModal} />
			<FlatList
				data={playlists}
				numColumns={2}
				keyExtractor={(item) => item.name}
				columnWrapperStyle={{
					paddingHorizontal: 10,
					paddingVertical: 2,
					marginLeft: 6,
					columnGap: 12,
				}}
				renderItem={({ item: playlist }: { item: Playlist }) => {
					return (
						<Link href={`/playlists/${playlist.name}`} asChild>
							<PlaylistItem playlist={playlist} />
						</Link>
					)
				}}
				scrollEnabled={true}
				contentContainerStyle={{ paddingTop: 4, gap: 12 }}
				ListEmptyComponent={
					<View>
						<Text style={styles.emptyText}>No playlists found</Text>
					</View>
				}
			/>
			<CreatePlaylistModal
				isOpen={isModalCreatePlaylistOpen}
				onClose={handleCloseCreatePlaylistModal}
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
