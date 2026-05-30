// feature-flags.ts — env-var feature flags (warn-only, build-safe)

function flag(key: string, defaultValue: boolean): boolean {
  const val = process.env[key];
  if (val === undefined || val === '') return defaultValue;
  return val === '1' || val.toLowerCase() === 'true';
}

export const FEATURES = {
  /** Founding 100 grandfather pricing. ON. */
  founding100: flag('FEATURE_FOUNDING_100', true),
  /** Contract PDF generation. ON. */
  contractPdf: flag('FEATURE_CONTRACT_PDF', true),
  /** AI negotiation email generation (Pro). OFF until Claude Haiku integration complete. */
  aiNegotiation: flag('FEATURE_AI_NEGOTIATION', false),
  /** Contract upload & check (Pro). OFF until PDF parse + Claude Sonnet integration. */
  contractCheck: flag('FEATURE_CONTRACT_CHECK', false),
  /** Electronic signature (Pro). OFF until Phase 2. */
  esign: flag('FEATURE_ESIGN', false),
  /** PostHog analytics. ON. */
  posthog: flag('FEATURE_POSTHOG', true),
} as const;
