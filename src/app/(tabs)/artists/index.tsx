import { ArtistItem } from '@/components/ArtistItem'
import Header from '@/components/Header'
import { Artist } from '@/helpers/types'
import { useArtists } from '@/store/useArtists'
import { defaultStyles } from '@/styles'
import { Link } from 'expo-router'
import { FlatList, StyleSheet, Text, View } from 'react-native'

const Artists = () => {
	const artists = useArtists()

	return (
		<View style={defaultStyles.container}>
			<Header title="Artists" />

			<FlatList
				data={artists}
				renderItem={({ item: artist }: { item: Artist }) => {
					return (
						<Link href={`/artists/${artist.name}`} asChild>
							<ArtistItem artist={artist} />
						</Link>
					)
				}}
				scrollEnabled={true}
				contentContainerStyle={{ paddingTop: 4 }}
				ListEmptyComponent={
					<View>
						<Text style={styles.emptyText}>No artists found</Text>
					</View>
				}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	emptyText: {
		color: '#aaa',
		textAlign: 'center',
		marginTop: 32,
		fontSize: 16,
	},
})

export default Artists
