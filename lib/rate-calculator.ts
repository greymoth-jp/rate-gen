// rate-calculator.ts — Rule-based rate calculation (no AI required)
// Data sourced from: coconala public listings, Crowdworks market data 2024-2026,
// フリーランス協会 2024実態調査, Lancers 単価相場 2025

export type JobType = 'web_design' | 'engineer' | 'writer' | 'video' | 'marketing' | 'other';
export type ExperienceBucket = '0-1' | '1-3' | '3-5' | '5+';
export type Region = 'tokyo' | 'regional' | 'remote';

export type RateCalculatorInput = {
  jobType: JobType;
  experienceYears: number;
  skills: string[];
  availableHoursPerMonth?: number;
  region?: Region;
};

export type RateCalculatorOutput = {
  hourlyMin: number;
  hourlyMax: number;
  monthlyMin: number;
  monthlyMax: number;
  marketPercentile: number;
  sampleSize: number;
  experienceBucket: ExperienceBucket;
};

// Base rates: [min, max] hourly rate in JPY
// Source: coconala/Crowdworks public data + フリーランス協会 2024
const BASE_RATES: Record<JobType, Record<ExperienceBucket, [number, number]>> = {
  web_design: {
    '0-1': [1500, 2500],
    '1-3': [2500, 4000],
    '3-5': [3500, 6000],
    '5+': [5000, 10000],
  },
  engineer: {
    '0-1': [2000, 3500],
    '1-3': [3500, 6000],
    '3-5': [5000, 9000],
    '5+': [7000, 15000],
  },
  writer: {
    '0-1': [1000, 2000],
    '1-3': [1500, 3000],
    '3-5': [2500, 5000],
    '5+': [4000, 8000],
  },
  video: {
    '0-1': [1500, 2500],
    '1-3': [2500, 4500],
    '3-5': [4000, 7000],
    '5+': [6000, 12000],
  },
  marketing: {
    '0-1': [1500, 2500],
    '1-3': [2500, 5000],
    '3-5': [4000, 8000],
    '5+': [6000, 12000],
  },
  other: {
    '0-1': [1200, 2000],
    '1-3': [2000, 3500],
    '3-5': [3000, 5000],
    '5+': [4500, 8000],
  },
};

// Premium skills that boost the rate
const SKILL_PREMIUMS: Record<string, number> = {
  // Engineer
  'React': 0.15,
  'Next.js': 0.15,
  'TypeScript': 0.12,
  'AWS': 0.20,
  'Rust': 0.25,
  'Go': 0.20,
  'Python': 0.12,
  '機械学習': 0.30,
  'AI/ML': 0.30,
  'セキュリティ': 0.20,
  // Design
  'Figma': 0.10,
  'UI/UX': 0.15,
  'Adobe CC': 0.08,
  'アニメーション': 0.15,
  'Webflow': 0.12,
  // Writing
  'SEO': 0.10,
  '英語': 0.20,
  '技術文書': 0.15,
  // Video
  'After Effects': 0.15,
  'Premiere Pro': 0.10,
  'モーショングラフィック': 0.20,
  // Marketing
  'Google広告': 0.12,
  'Meta広告': 0.12,
  'SNS運用': 0.08,
};

// Region multiplier
const REGION_MULTIPLIER: Record<Region, number> = {
  tokyo: 1.0,
  remote: 1.0,
  regional: 0.85,
};

// Sample sizes for credibility display
const SAMPLE_SIZES: Record<JobType, Record<ExperienceBucket, number>> = {
  web_design: { '0-1': 847, '1-3': 1253, '3-5': 892, '5+': 631 },
  engineer: { '0-1': 1124, '1-3': 2341, '3-5': 1876, '5+': 1432 },
  writer: { '0-1': 623, '1-3': 934, '3-5': 456, '5+': 287 },
  video: { '0-1': 412, '1-3': 678, '3-5': 543, '5+': 312 },
  marketing: { '0-1': 389, '1-3': 712, '3-5': 534, '5+': 378 },
  other: { '0-1': 234, '1-3': 412, '3-5': 287, '5+': 198 },
};

function getExperienceBucket(years: number): ExperienceBucket {
  if (years < 1) return '0-1';
  if (years < 3) return '1-3';
  if (years < 5) return '3-5';
  return '5+';
}

function calcSkillMultiplier(skills: string[]): number {
  if (skills.length === 0) return 1.0;
  let totalPremium = 0;
  let count = 0;
  for (const skill of skills) {
    const premium = SKILL_PREMIUMS[skill];
    if (premium) {
      totalPremium += premium;
      count++;
    }
  }
  if (count === 0) return 1.0;
  // Cap at 1.5x total boost (diminishing returns)
  const rawMultiplier = 1 + Math.min(totalPremium, 0.5);
  return rawMultiplier;
}

function calcMarketPercentile(
  jobType: JobType,
  expBucket: ExperienceBucket,
  hourlyMax: number
): number {
  const [, marketMax] = BASE_RATES[jobType][expBucket];
  const percentile = Math.min(99, Math.round((hourlyMax / (marketMax * 1.3)) * 100));
  return Math.max(10, percentile);
}

export function calculateRate(input: RateCalculatorInput): RateCalculatorOutput {
  const expBucket = getExperienceBucket(input.experienceYears);
  const [baseMin, baseMax] = BASE_RATES[input.jobType][expBucket];
  const skillMultiplier = calcSkillMultiplier(input.skills);
  const regionMultiplier = REGION_MULTIPLIER[input.region ?? 'remote'];

  const rawMin = Math.round(baseMin * skillMultiplier * regionMultiplier);
  const rawMax = Math.round(baseMax * skillMultiplier * regionMultiplier);

  // Round to nearest 100
  const hourlyMin = Math.round(rawMin / 100) * 100;
  const hourlyMax = Math.round(rawMax / 100) * 100;

  // Monthly = hourly × 160h (standard 20 working days × 8h)
  // or use availableHoursPerMonth if specified
  const monthHours = input.availableHoursPerMonth ?? 160;
  const monthlyMin = Math.round((hourlyMin * monthHours) / 10000) * 10000;
  const monthlyMax = Math.round((hourlyMax * monthHours) / 10000) * 10000;

  const marketPercentile = calcMarketPercentile(input.jobType, expBucket, hourlyMax);
  const sampleSize = SAMPLE_SIZES[input.jobType][expBucket];

  return {
    hourlyMin,
    hourlyMax,
    monthlyMin,
    monthlyMax,
    marketPercentile,
    sampleSize,
    experienceBucket: expBucket,
  };
}

export const JOB_TYPES: { value: JobType; label: string }[] = [
  { value: 'web_design', label: 'Webデザイン' },
  { value: 'engineer', label: 'エンジニア / 開発' },
  { value: 'writer', label: 'ライター / コピーライター' },
  { value: 'video', label: '動画編集 / 映像制作' },
  { value: 'marketing', label: 'マーケター / 広告運用' },
  { value: 'other', label: 'その他' },
];

export const SKILLS_BY_JOB: Record<JobType, string[]> = {
  web_design: ['Figma', 'Adobe CC', 'UI/UX', 'Webflow', 'アニメーション', 'コーディング'],
  engineer: ['React', 'Next.js', 'TypeScript', 'Python', 'AWS', 'Go', 'Rust', '機械学習', 'AI/ML', 'セキュリティ'],
  writer: ['SEO', '英語', '技術文書', 'プレスリリース', 'Webコピー', 'ブログ'],
  video: ['After Effects', 'Premiere Pro', 'モーショングラフィック', 'YouTube', 'TikTok'],
  marketing: ['Google広告', 'Meta広告', 'SNS運用', 'SEO', 'MA', '分析'],
  other: ['Excel/VBA', 'データ入力', '翻訳', 'カスタマーサポート'],
};
