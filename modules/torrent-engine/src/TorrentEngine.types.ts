export type MetadataEventPayload = {
	downloadId: string
	title: string
	totalBytes: number
	trackCount: number
}

export type ProgressEventPayload = {
	downloadId: string
	downloadedBytes: number
	tracksCompleted: number
}

export type FileCompleteEventPayload = {
	downloadId: string
	destPath: string
}

export type ErrorEventPayload = {
	downloadId: string
	message: string
}

export type TorrentEngineModuleEvents = {
	onMetadata: (params: MetadataEventPayload) => void
	onProgress: (params: ProgressEventPayload) => void
	onFileComplete: (params: FileCompleteEventPayload) => void
	onError: (params: ErrorEventPayload) => void
}
