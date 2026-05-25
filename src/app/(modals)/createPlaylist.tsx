import { colors } from '@/constants/tokens'
import { usePlaylists } from '@/store/usePlaylist'
import { FontAwesome6 } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { useState } from 'react'
import { Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const MAX_NAME_LENGTH = 30

interface CreatePlaylistModalProps {
	isOpen: boolean
	onClose: () => void
}

export const CreatePlaylistModal = ({ isOpen, onClose }: CreatePlaylistModalProps) => {
	const [playlistName, setPlaylistName] = useState('')
	const [error, setError] = useState<string | null>(null)
	// const { createPlaylist, isLoading } = useCreatePlaylists()
	const { playlists } = usePlaylists()
	const hasError = error !== null

	const handleCreate = () => {
		const trimmedName = playlistName.trim()

		if (!trimmedName) {
			setError('The name of the playlist cannot be empty')
			return
		}

		const playlistExists = playlists.some((p) => p.name.toLowerCase() === trimmedName.toLowerCase())

		if (playlistExists) {
			setError('Playlist already exists')
			return
		}
		// createPlaylist(trimmedName)

		setPlaylistName('')
		setError(null)
		onClose()
	}

	const handleChangePlaylistName = (text: string) => {
		if (text.length > MAX_NAME_LENGTH) return
		setPlaylistName(text)
		if (error) setError(null)
	}

	const handleCancel = () => {
		setPlaylistName('')
		setError(null)
		onClose()
	}

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
							value={playlistName}
							onChangeText={handleChangePlaylistName}
							maxLength={MAX_NAME_LENGTH}
						/>
						{hasError && (
							<View style={styles.errorContainer}>
								<FontAwesome6 name="triangle-exclamation" size={14} color="#ff6b6b" />
								<Text style={styles.errorText}>{error}</Text>
							</View>
						)}
					</View>

					<View style={styles.bottomContainer}>
						<TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
							<Text style={styles.cancelButtonText}>Cancel</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.createButton, hasError && { opacity: 0.5 }]}
							disabled={hasError}
							onPress={handleCreate}
						>
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
		backgroundColor: 'rgba(18, 18, 18, 1) ',
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

	errorContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		gap: 6,
		marginTop: 8,
		marginLeft: 4,
	},

	errorText: {
		color: '#ff6b6b',
		fontSize: 14,
		fontWeight: '500',
	},
})
