import { db } from '@/db'
import { downloads } from '@/db/schema'
import { desc } from 'drizzle-orm'
import { useLiveQuery } from 'drizzle-orm/expo-sqlite'

export const useDownloads = () => {
	const { data } = useLiveQuery(db.select().from(downloads).orderBy(desc(downloads.createdAt)))

	const downloadsList = data ?? []

	return {
		downloads: downloadsList,
		activeDownloads: downloadsList.filter(
			(d) => d.status === 'pending' || d.status === 'downloading',
		),
		completedDownloads: downloadsList.filter((d) => d.status === 'done'),
		failedDownloads: downloadsList.filter((d) => d.status === 'error'),
		pausedDownloads: downloadsList.filter((d) => d.status === 'paused'),
	}
}
