import { colors } from '@/constants/tokens'
import { FontAwesome6 } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

interface CreatePlaylistModalProps {
	isOpen: boolean
	onClose: () => void
}

export const CreatePlaylistModal = ({ isOpen, onClose }: CreatePlaylistModalProps) => {
	return (
		<Modal visible={isOpen} transparent animationType="fade" onRequestClose={onClose}>
			<Pressable style={styles.backdrop} onPress={onClose}>
				<BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />

				<Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
					<View style={styles.header}>
						<Text style={styles.title}>Create playlist</Text>

						<TouchableOpacity onPress={onClose}>
							<FontAwesome6 name="xmark" size={24} color="white" />
						</TouchableOpacity>
					</View>

					<View style={styles.inputContainer}>
						<TextInput
							style={styles.input}
							placeholder="Playlist name"
							placeholderTextColor="#9ca3af"
						/>
					</View>

					<View style={styles.bottomContainer}>
						<TouchableOpacity style={styles.cancelButton} onPress={onClose}>
							<Text style={styles.cancelButtonText}>Cancel</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.createButton}>
							<Text style={styles.createButtonText}>Create</Text>
						</TouchableOpacity>
					</View>
				</Pressable>
			</Pressable>
		</Modal>
	)
}

const styles = StyleSheet.create({
	backdrop: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
	},

	modalContainer: {
		justifyContent: 'space-between',
		backgroundColor: 'rgba(63,63,70,1)',
		width: '90%',
		height: 220,
		borderRadius: 14,
		maxWidth: 448,
		overflow: 'hidden',
		paddingHorizontal: 20,
	},

	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 14,
	},

	title: {
		fontWeight: '600',
		fontSize: 20,
		color: colors.text,
	},

	inputContainer: {
		paddingVertical: 10,
	},

	input: {
		backgroundColor: 'rgba(255,255,255,0.1)',
		paddingVertical: 14,
		paddingHorizontal: 14,
		color: colors.text,
		fontSize: 15,
		borderRadius: 8,
	},

	bottomContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		gap: 12,
		paddingVertical: 8,
		marginBottom: 10,
	},

	cancelButton: {
		paddingVertical: 10,
		paddingHorizontal: 14,
		backgroundColor: 'rgba(255,255,255,0.1)',
		borderRadius: 8,
	},

	createButton: {
		paddingVertical: 10,
		paddingHorizontal: 14,
		backgroundColor: colors.text,
		borderRadius: 8,
	},

	cancelButtonText: {
		fontWeight: '500',
		fontSize: 16,
		color: colors.text,
	},

	createButtonText: {
		fontWeight: '500',
		fontSize: 16,
		color: 'black',
	},
})
