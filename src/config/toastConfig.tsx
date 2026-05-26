import { BaseToast, ErrorToast, ToastConfig } from 'react-native-toast-message'

export const toastConfig: ToastConfig = {
	success: (props) => (
		<BaseToast
			{...props}
			style={{
				borderLeftColor: '#22c55e',
				backgroundColor: '#1c1c1e',
				borderRadius: 10,
				height: 'auto',
				paddingVertical: 16,
				marginTop: 16,
			}}
			contentContainerStyle={{ paddingHorizontal: 14 }}
			text1Style={{ color: '#ffffff', fontSize: 14, fontWeight: '600' }}
			text2Style={{ color: '#9ca3af', fontSize: 13 }}
		/>
	),
	error: (props) => (
		<ErrorToast
			{...props}
			style={{
				borderLeftColor: '#ef4444',
				backgroundColor: '#1c1c1e',
				borderRadius: 10,
				height: 'auto',
				paddingVertical: 16,
				marginTop: 16,
			}}
			contentContainerStyle={{ paddingHorizontal: 14 }}
			text1Style={{ color: '#ffffff', fontSize: 14, fontWeight: '600' }}
			text2Style={{ color: '#9ca3af', fontSize: 13 }}
		/>
	),
	info: (props) => (
		<BaseToast
			{...props}
			style={{
				borderLeftColor: '#3b82f6',
				backgroundColor: '#1c1c1e',
				borderRadius: 10,
				height: 'auto',
				paddingVertical: 16,
				marginTop: 16,
			}}
			contentContainerStyle={{ paddingHorizontal: 14 }}
			text1Style={{ color: '#ffffff', fontSize: 14, fontWeight: '600' }}
			text2Style={{ color: '#9ca3af', fontSize: 13 }}
		/>
	),
}
