// pricing-constants.ts — env-driven pricing (no hardcodes)

export const PRICING = {
  monthly: parseInt(process.env.PRICE_MONTHLY ?? '490'),
  annual: parseInt(process.env.PRICE_ANNUAL ?? '3920'),     // ¥490×10 = "2ヶ月無料"
  founding: parseInt(process.env.PRICE_FOUNDING ?? '9800'), // Founding 100: ¥9,800一括
  foundingSlots: parseInt(process.env.FOUNDING_SLOTS ?? '100'),
  freeContractsPerMonth: 3,
} as const;

export type PricePlan = 'pro_monthly' | 'pro_annual' | 'founding';
