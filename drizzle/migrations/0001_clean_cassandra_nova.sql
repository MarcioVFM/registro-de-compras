PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_list` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`value` text NOT NULL,
	`payday` text NOT NULL,
	`expireday` text NOT NULL,
	`status` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_list`("id", "name", "description", "value", "payday", "expireday", "status") SELECT "id", "name", "description", "value", "payday", "expireday", "status" FROM `list`;--> statement-breakpoint
DROP TABLE `list`;--> statement-breakpoint
ALTER TABLE `__new_list` RENAME TO `list`;--> statement-breakpoint
PRAGMA foreign_keys=ON;