ALTER TABLE `downloads` ADD `artist` text;--> statement-breakpoint
ALTER TABLE `downloads` ADD `album` text;--> statement-breakpoint
ALTER TABLE `downloads` ADD `track_count` integer;--> statement-breakpoint
ALTER TABLE `downloads` ADD `total_bytes` integer;--> statement-breakpoint
ALTER TABLE `downloads` ADD `downloaded_bytes` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE `downloads` DROP COLUMN `progress`;