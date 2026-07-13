import Header from '@/components/Header'
import { MagnetBar } from '@/components/MagnetBar'
import { defaultStyles } from '@/styles'
import { StyleSheet, View } from 'react-native'

const DownloadsScreen = () => {
	return (
		<View style={styles.overlayContainer}>
			<Header title="Downloads" />

			<View>
				<MagnetBar placeholder="Enter magnet link.." magnetLink={undefined} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	overlayContainer: {
		...defaultStyles.container,
	},
})

export default DownloadsScreen
