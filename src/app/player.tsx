import { screenPadding } from '@/constants/tokens'
import { defaultStyles } from '@/styles'
import { StyleSheet, View } from 'react-native'

const PlayerScreen = () => {
	return <View style={styles.overlayContainer}></View>
}

const styles = StyleSheet.create({
	overlayContainer: {
		...defaultStyles.container,
		paddingHorizontal: screenPadding.horizontal,
	},
})

export default PlayerScreen
