import { db } from '@/db'
import { downloads } from '@/db/schema'
import { eq } from 'drizzle-orm'
import * as Crypto from 'expo-crypto'
import { Directory, Paths } from 'expo-file-system'
import TorrentEngineModule from '../../modules/torrent-engine'

export const addMagnetDownload = async (magnetUri: string) => {
	const downloadId = Crypto.randomUUID()

	const directory = new Directory(Paths.document, 'downloads', downloadId)
	directory.create({ intermediates: true, idempotent: true })
	const savePath = directory.uri.replace('file://', '')

	await db.insert(downloads).values({
		id: downloadId,
		sourceUrl: magnetUri,
		type: 'torrent',
		status: 'pending',
		destPath: savePath,
		createdAt: Date.now(),
		updatedAt: Date.now(),
	})

	await TorrentEngineModule.addMagnet(downloadId, magnetUri, savePath)
}

export const initTorrentEngineListeners = () => {
	const onMetadataSubscription = TorrentEngineModule.addListener('onMetadata', (payload) => {
		db.update(downloads)
			.set({
				title: payload.title,
				totalBytes: payload.totalBytes,
				trackCount: payload.trackCount,
				status: 'downloading',
				updatedAt: Date.now(),
			})
			.where(eq(downloads.id, payload.downloadId))
	})

	const onProgressSubscription = TorrentEngineModule.addListener('onProgress', (payload) => {
		db.update(downloads)
			.set({
				downloadedBytes: payload.downloadedBytes,
				tracksCompleted: payload.tracksCompleted,
				updatedAt: Date.now(),
			})
			.where(eq(downloads.id, payload.downloadId))
	})

	const onFileCompleteSubscription = TorrentEngineModule.addListener(
		'onFileComplete',
		(payload) => {
			db.update(downloads)
				.set({ status: 'done', updatedAt: Date.now() })
				.where(eq(downloads.id, payload.downloadId))
		},
	)

	const onErrorSubscription = TorrentEngineModule.addListener('onError', (payload) => {
		db.update(downloads)
			.set({ status: 'error', errorMsg: payload.message, updatedAt: Date.now() })
			.where(eq(downloads.id, payload.downloadId))
	})

	return [
		onMetadataSubscription,
		onProgressSubscription,
		onFileCompleteSubscription,
		onErrorSubscription,
	]
}
