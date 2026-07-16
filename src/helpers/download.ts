import { Download } from '@/db/schema'

export const getProgress = (download: Download) =>
	download.totalBytes ? download.downloadedBytes! / download.totalBytes : 0
