import { colors } from '@/constants/tokens'
import { useNavigation } from 'expo-router'
import { useLayoutEffect, useState } from 'react'
import { SearchBarProps } from 'react-native-screens'

const defaultSearchOptions: SearchBarProps = {
	tintColor: colors.primary,
	hideWhenScrolling: false,
}

interface UseNavigationSearchProps {
	searchBarOptions?: SearchBarProps
}

export const useNavigationSearch = ({ searchBarOptions }: UseNavigationSearchProps) => {
	const [search, setSearch] = useState('')
	const navigation = useNavigation()

	useLayoutEffect(() => {
		navigation.setOptions({
			headerSearchBarOptions: {
				...defaultSearchOptions,
				...searchBarOptions,
				onChangeText: ({ nativeEvent }: { nativeEvent: { text: string } }) =>
					setSearch(nativeEvent.text),
			},
		})
	}, [navigation, searchBarOptions])

	return search
}
