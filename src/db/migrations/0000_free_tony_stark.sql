CREATE TABLE `downloads` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text,
	`source_url` text,
	`type` text NOT NULL,
	`status` text NOT NULL,
	`progress` real DEFAULT 0,
	`dest_path` text,
	`error_msg` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `playlist_tracks` (
	`playlist_id` text NOT NULL,
	`track_id` text NOT NULL,
	`position` integer NOT NULL,
	FOREIGN KEY (`playlist_id`) REFERENCES `playlists`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`track_id`) REFERENCES `tracks`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `playlists` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`artwork` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `playlists_name_unique` ON `playlists` (`name`);--> statement-breakpoint
CREATE TABLE `tracks` (
	`id` text PRIMARY KEY NOT NULL,
	`uri` text NOT NULL,
	`title` text NOT NULL,
	`artist` text,
	`album` text,
	`album_artist` text,
	`genre` text,
	`year` text,
	`track_number` text,
	`duration` integer,
	`artwork` text,
	`file_size` integer,
	`date_added` integer NOT NULL,
	`play_count` integer DEFAULT 0,
	`last_played` integer,
	`is_favorite` integer DEFAULT 0,
	`source` text DEFAULT 'local'
);
--> statement-breakpoint
CREATE INDEX `idx_artist` ON `tracks` (`artist`);--> statement-breakpoint
CREATE INDEX `idx_album` ON `tracks` (`album`);--> statement-breakpoint
CREATE INDEX `idx_title` ON `tracks` (`title`);