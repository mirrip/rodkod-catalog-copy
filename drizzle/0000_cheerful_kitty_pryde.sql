CREATE TABLE `leads` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text NOT NULL,
	`lead_type` text NOT NULL,
	`source` text NOT NULL,
	`product` text DEFAULT '' NOT NULL,
	`contact_name` text NOT NULL,
	`phone` text NOT NULL,
	`chat_summary` text DEFAULT '' NOT NULL,
	`consent_version` text NOT NULL,
	`marketing_consent` integer DEFAULT false NOT NULL,
	`page_url` text DEFAULT '' NOT NULL,
	`utm_source` text DEFAULT '' NOT NULL,
	`utm_medium` text DEFAULT '' NOT NULL,
	`utm_campaign` text DEFAULT '' NOT NULL,
	`utm_content` text DEFAULT '' NOT NULL,
	`utm_term` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'new' NOT NULL
);
