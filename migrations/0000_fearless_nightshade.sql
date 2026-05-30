CREATE TABLE `account` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` text NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` integer,
	`refresh_token_expires_at` integer,
	`scope` text,
	`password` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `contract_templates` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`name_ja` text NOT NULL,
	`job_types` text,
	`contract_type` text NOT NULL,
	`new_law_compliant` integer DEFAULT false NOT NULL,
	`is_pro` integer DEFAULT false NOT NULL,
	`template_body` text NOT NULL,
	`fields` text,
	`lawyer_reviewed_at` integer,
	`lawyer_name` text,
	`version` integer DEFAULT 1 NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `contracts` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`template_id` text NOT NULL,
	`client_name` text NOT NULL,
	`project_name` text NOT NULL,
	`amount` real,
	`currency` text DEFAULT 'JPY' NOT NULL,
	`start_date` integer,
	`end_date` integer,
	`status` text DEFAULT 'draft' NOT NULL,
	`field_values` text,
	`pdf_storage_key` text,
	`signed_at` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`template_id`) REFERENCES `contract_templates`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_contracts_user_id` ON `contracts` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_contracts_status` ON `contracts` (`status`);--> statement-breakpoint
CREATE INDEX `idx_contracts_created_at` ON `contracts` (`created_at`);--> statement-breakpoint
CREATE TABLE `founding_members` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`signup_order` integer NOT NULL,
	`stripe_customer_id` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `founding_members_user_id_unique` ON `founding_members` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_founding_members_user_id` ON `founding_members` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_founding_members_signup_order` ON `founding_members` (`signup_order`);--> statement-breakpoint
CREATE TABLE `processed_webhooks` (
	`id` text PRIMARY KEY NOT NULL,
	`event_type` text NOT NULL,
	`processed_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `rate_market_data` (
	`id` text PRIMARY KEY NOT NULL,
	`job_type` text NOT NULL,
	`experience_bucket` text NOT NULL,
	`region` text,
	`skill` text,
	`hourly_rate_min` integer NOT NULL,
	`hourly_rate_max` integer NOT NULL,
	`source` text NOT NULL,
	`sample_count` integer DEFAULT 1 NOT NULL,
	`collected_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_rate_market_job_type` ON `rate_market_data` (`job_type`);--> statement-breakpoint
CREATE INDEX `idx_rate_market_exp` ON `rate_market_data` (`job_type`,`experience_bucket`);--> statement-breakpoint
CREATE TABLE `rate_profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`job_type` text NOT NULL,
	`experience_years` integer NOT NULL,
	`skills` text,
	`available_hours_per_month` integer,
	`region` text,
	`calculated_hourly_min` integer,
	`calculated_hourly_max` integer,
	`calculated_monthly_min` integer,
	`calculated_monthly_max` integer,
	`market_percentile` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_rate_profiles_user_id` ON `rate_profiles` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_rate_profiles_job_type` ON `rate_profiles` (`job_type`);--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	`token` text NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer DEFAULT false NOT NULL,
	`image` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `user_settings` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`plan` text DEFAULT 'free' NOT NULL,
	`stripe_customer_id` text,
	`subscription_id` text,
	`subscription_ends_at` integer,
	`contracts_used_this_month` integer DEFAULT 0 NOT NULL,
	`contracts_quota_reset_at` integer,
	`onboarded` integer DEFAULT false NOT NULL,
	`job_type` text,
	`experience_years` integer,
	`onboarding_emails_enabled` integer DEFAULT true NOT NULL,
	`welcome_email_sent_at` integer,
	`is_founding` integer DEFAULT false NOT NULL,
	`founding_member_order` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_settings_user_id_unique` ON `user_settings` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_user_settings_user_id` ON `user_settings` (`user_id`);--> statement-breakpoint
CREATE TABLE `verification` (
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
