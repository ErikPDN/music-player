import Header from '@/components/Header'
import { defaultStyles } from '@/styles'
import { View } from 'react-native'

const FavoritesScreen = () => {
	return (
		<View style={defaultStyles.container}>
			<Header title="Favorites" />
		</View>
	)
}

export default FavoritesScreen
