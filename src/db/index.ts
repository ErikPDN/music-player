import { drizzle } from 'drizzle-orm/expo-sqlite'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import * as SQLite from 'expo-sqlite'
import migrations from './migrations/migrations'
import * as schema from './schema'

const sqlite = SQLite.openDatabaseSync('music_library.db', {
	enableChangeListener: true, // habilita reatividade
})

// Performance pragmas — rodar uma vez na abertura
sqlite.execSync(`PRAGMA journal_mode = WAL;`)
sqlite.execSync(`PRAGMA synchronous = NORMAL;`)
sqlite.execSync('PRAGMA busy_timeout = 2000;')
sqlite.execSync('PRAGMA cache_size = -20000;') // 20MB cache

// Tabela virtual de busca full-text
sqlite.execSync(`
    CREATE VIRTUAL TABLE IF NOT EXISTS tracks_fts
    USING fts5(title, artist, album, content='tracks', content_rowid='rowid')
`)

export const db = drizzle(sqlite, { schema })
export { migrations, useMigrations }
