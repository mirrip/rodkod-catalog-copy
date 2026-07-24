import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable("leads", {
  id: text("id").primaryKey(),
  createdAt: text("created_at").notNull(),
  leadType: text("lead_type").notNull(),
  source: text("source").notNull(),
  product: text("product").notNull().default(""),
  contactName: text("contact_name").notNull(),
  phone: text("phone").notNull(),
  chatSummary: text("chat_summary").notNull().default(""),
  consentVersion: text("consent_version").notNull(),
  marketingConsent: integer("marketing_consent", { mode: "boolean" })
    .notNull()
    .default(false),
  pageUrl: text("page_url").notNull().default(""),
  utmSource: text("utm_source").notNull().default(""),
  utmMedium: text("utm_medium").notNull().default(""),
  utmCampaign: text("utm_campaign").notNull().default(""),
  utmContent: text("utm_content").notNull().default(""),
  utmTerm: text("utm_term").notNull().default(""),
  status: text("status").notNull().default("new"),
});
