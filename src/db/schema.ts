import { InferSelectModel } from 'drizzle-orm'
import { index, integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const tracks = sqliteTable(
	'tracks',
	{
		id: text('id').primaryKey(),
		uri: text('uri').notNull(),
		title: text('title').notNull(),
		artist: text('artist'),
		album: text('album'),
		albumArtist: text('album_artist'),
		genre: text('genre'),
		year: text('year'),
		trackNumber: text('track_number'),
		duration: integer('duration'), // em ms
		artwork: text('artwork'), // path local da capa extraida
		fileSize: integer('file_size'),
		dateAdded: integer('date_added').notNull(),
		playCount: integer('play_count').default(0),
		lastPlayed: integer('last_played'),
		isFavorite: integer('is_favorite').default(0),
		source: text('source').default('local'), // 'local'  | 'imported' | 'downloaded' | 'torrent'
	},
	(t) => [
		index('idx_artist').on(t.artist),
		index('idx_album').on(t.album),
		index('idx_title').on(t.title),
	],
)

export const playlists = sqliteTable('playlists', {
	id: text('id').primaryKey(),
	name: text('name').notNull().unique(),
	artwork: text('artwork'),
	createdAt: integer('created_at').notNull(),
	updatedAt: integer('updated_at').notNull(),
})

export const playlistTracks = sqliteTable('playlist_tracks', {
	playlistId: text('playlist_id')
		.notNull()
		.references(() => playlists.id, { onDelete: 'cascade' }),
	trackId: text('track_id')
		.notNull()
		.references(() => tracks.id, { onDelete: 'cascade' }),
	position: integer('position').notNull(),
})

export const downloads = sqliteTable('downloads', {
	id: text('id').primaryKey(),
	title: text('title'),
	sourceUrl: text('source_url'),
	type: text('type').notNull(), // 'http' | 'torrent'
	status: text('status').notNull(), // 'pending' | 'downloading' | 'done' | 'error'
	progress: real('progress').default(0), // 0.0 a 1.0
	destPath: text('dest_path'),
	errorMsg: text('error_msg'),
	createdAt: integer('created_at').notNull(),
})

export type Download = InferSelectModel<typeof downloads>
