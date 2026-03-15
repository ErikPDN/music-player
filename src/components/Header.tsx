import { defaultStyles } from '@/styles'
import { Text, View } from 'react-native'

interface HeaderProps {
	title: string
}

const Header = ({ title }: HeaderProps) => {
	return (
		<View style={defaultStyles.container}>
			<Text style={defaultStyles.screenTitle}>{title}</Text>
		</View>
	)
}

export default Header
