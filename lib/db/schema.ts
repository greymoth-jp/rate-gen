import { sql, relations } from 'drizzle-orm';
import {
  sqliteTable,
  text,
  integer,
  real,
  index,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';

// ─── Better Auth tables ───────────────────────────────────────────────────────

export const user = sqliteTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: integer('email_verified', { mode: 'boolean' }).notNull().default(false),
  image: text('image'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
});

export const session = sqliteTable('session', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  token: text('token').notNull().unique(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
});

export const account = sqliteTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: integer('access_token_expires_at', { mode: 'timestamp' }),
  refreshTokenExpiresAt: integer('refresh_token_expires_at', { mode: 'timestamp' }),
  scope: text('scope'),
  password: text('password'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
});

export const verification = sqliteTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
});

// ─── User Settings ────────────────────────────────────────────────────────────

export const userSettings = sqliteTable(
  'user_settings',
  {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }).unique(),
    // Plan
    plan: text('plan', { enum: ['free', 'pro', 'lifetime'] }).notNull().default('free'),
    stripeCustomerId: text('stripe_customer_id'),
    subscriptionId: text('subscription_id'),
    subscriptionEndsAt: integer('subscription_ends_at', { mode: 'timestamp' }),
    // Quota: free = 3 contracts/month
    contractsUsedThisMonth: integer('contracts_used_this_month').notNull().default(0),
    contractsQuotaResetAt: integer('contracts_quota_reset_at'),
    // Onboarding
    onboarded: integer('onboarded', { mode: 'boolean' }).notNull().default(false),
    jobType: text('job_type'), // stored from onboarding
    experienceYears: integer('experience_years'),
    onboardingEmailsEnabled: integer('onboarding_emails_enabled', { mode: 'boolean' }).notNull().default(true),
    welcomeEmailSentAt: integer('welcome_email_sent_at'),
    // Founding 100
    isFounding: integer('is_founding', { mode: 'boolean' }).notNull().default(false),
    foundingMemberOrder: integer('founding_member_order'),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  },
  (t) => [uniqueIndex('idx_user_settings_user_id').on(t.userId)]
);

// ─── Rate Profiles (単価診断結果) ─────────────────────────────────────────────

export const rateProfiles = sqliteTable(
  'rate_profiles',
  {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
    jobType: text('job_type').notNull(), // 'web_design' | 'engineer' | 'writer' | 'video' | 'other'
    experienceYears: integer('experience_years').notNull(),
    skills: text('skills'), // JSON array: ['React', 'Figma', ...]
    availableHoursPerMonth: integer('available_hours_per_month'),
    region: text('region'), // 'tokyo' | 'regional' | 'remote'
    calculatedHourlyMin: integer('calculated_hourly_min'),
    calculatedHourlyMax: integer('calculated_hourly_max'),
    calculatedMonthlyMin: integer('calculated_monthly_min'),
    calculatedMonthlyMax: integer('calculated_monthly_max'),
    marketPercentile: integer('market_percentile'), // 0-100
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  },
  (t) => [
    index('idx_rate_profiles_user_id').on(t.userId),
    index('idx_rate_profiles_job_type').on(t.jobType),
  ]
);

// ─── Contract Templates ───────────────────────────────────────────────────────

export const contractTemplates = sqliteTable('contract_templates', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  nameJa: text('name_ja').notNull(),
  jobTypes: text('job_types'), // JSON array: ['web_design', 'engineer'] or null = all
  contractType: text('contract_type').notNull(), // 'basic' | 'single' | 'nda' | 'copyright' | 'warranty'
  newLawCompliant: integer('new_law_compliant', { mode: 'boolean' }).notNull().default(false), // 2026新法準拠
  isPro: integer('is_pro', { mode: 'boolean' }).notNull().default(false), // Pro only
  templateBody: text('template_body').notNull(), // Handlebars template
  fields: text('fields'), // JSON: field definitions [{key, label, type, required}]
  lawyerReviewedAt: integer('lawyer_reviewed_at', { mode: 'timestamp' }),
  lawyerName: text('lawyer_name'),
  version: integer('version').notNull().default(1),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
});

// ─── Contracts (生成済み契約書) ───────────────────────────────────────────────

export const contracts = sqliteTable(
  'contracts',
  {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
    templateId: text('template_id').notNull().references(() => contractTemplates.id),
    clientName: text('client_name').notNull(),
    projectName: text('project_name').notNull(),
    amount: real('amount'), // 契約金額
    currency: text('currency').notNull().default('JPY'),
    startDate: integer('start_date', { mode: 'timestamp' }),
    endDate: integer('end_date', { mode: 'timestamp' }),
    status: text('status', { enum: ['draft', 'sent', 'signed', 'completed', 'cancelled'] })
      .notNull()
      .default('draft'),
    fieldValues: text('field_values'), // JSON: {key: value}
    pdfStorageKey: text('pdf_storage_key'), // R2 key or local path
    signedAt: integer('signed_at', { mode: 'timestamp' }),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  },
  (t) => [
    index('idx_contracts_user_id').on(t.userId),
    index('idx_contracts_status').on(t.status),
    index('idx_contracts_created_at').on(t.createdAt),
  ]
);

// ─── Market Rate Data ─────────────────────────────────────────────────────────

export const rateMarketData = sqliteTable(
  'rate_market_data',
  {
    id: text('id').primaryKey(),
    jobType: text('job_type').notNull(),
    experienceBucket: text('experience_bucket').notNull(), // '0-1' | '1-3' | '3-5' | '5+'
    region: text('region'), // 'tokyo' | 'regional' | 'remote' | null = all
    skill: text('skill'), // specific skill modifier
    hourlyRateMin: integer('hourly_rate_min').notNull(),
    hourlyRateMax: integer('hourly_rate_max').notNull(),
    source: text('source').notNull(), // 'coconala' | 'crowdworks' | 'user_input' | 'research'
    sampleCount: integer('sample_count').notNull().default(1),
    collectedAt: integer('collected_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  },
  (t) => [
    index('idx_rate_market_job_type').on(t.jobType),
    index('idx_rate_market_exp').on(t.jobType, t.experienceBucket),
  ]
);

// ─── Processed Webhooks (idempotency) ────────────────────────────────────────

export const processedWebhooks = sqliteTable('processed_webhooks', {
  id: text('id').primaryKey(), // Stripe event id
  eventType: text('event_type').notNull(),
  processedAt: integer('processed_at').notNull(),
});

// ─── Founding Members ─────────────────────────────────────────────────────────

export const foundingMembers = sqliteTable(
  'founding_members',
  {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }).unique(),
    signupOrder: integer('signup_order').notNull(),
    stripeCustomerId: text('stripe_customer_id').notNull(),
    createdAt: integer('created_at').notNull().default(sql`(unixepoch())`),
  },
  (t) => [
    uniqueIndex('idx_founding_members_user_id').on(t.userId),
    uniqueIndex('idx_founding_members_signup_order').on(t.signupOrder),
  ]
);

// ─── Relations ────────────────────────────────────────────────────────────────

export const userRelations = relations(user, ({ one, many }) => ({
  settings: one(userSettings, { fields: [user.id], references: [userSettings.userId] }),
  rateProfiles: many(rateProfiles),
  contracts: many(contracts),
  sessions: many(session),
  accounts: many(account),
}));

export const userSettingsRelations = relations(userSettings, ({ one }) => ({
  user: one(user, { fields: [userSettings.userId], references: [user.id] }),
}));

export const rateProfilesRelations = relations(rateProfiles, ({ one }) => ({
  user: one(user, { fields: [rateProfiles.userId], references: [user.id] }),
}));

export const contractsRelations = relations(contracts, ({ one }) => ({
  user: one(user, { fields: [contracts.userId], references: [user.id] }),
  template: one(contractTemplates, { fields: [contracts.templateId], references: [contractTemplates.id] }),
}));

export const contractTemplatesRelations = relations(contractTemplates, ({ many }) => ({
  contracts: many(contracts),
}));

export const foundingMembersRelations = relations(foundingMembers, ({ one }) => ({
  user: one(user, { fields: [foundingMembers.userId], references: [user.id] }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));
