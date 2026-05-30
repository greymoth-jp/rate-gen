'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  JOB_TYPES,
  SKILLS_BY_JOB,
  calculateRate,
  type JobType,
  type Region,
  type RateCalculatorOutput,
} from '@/lib/rate-calculator';

type Step = 1 | 2 | 3 | 4 | 5;

const EXPERIENCE_OPTIONS = [
  { value: 0, label: '1年未満' },
  { value: 2, label: '1〜3年' },
  { value: 4, label: '3〜5年' },
  { value: 6, label: '5年以上' },
];

const REGION_OPTIONS: { value: Region; label: string }[] = [
  { value: 'tokyo', label: '東京・関東' },
  { value: 'remote', label: 'フルリモート' },
  { value: 'regional', label: '地方' },
];

const HOURS_OPTIONS = [
  { value: 80, label: '半稼働（約80h/月）' },
  { value: 120, label: '週3日（約120h/月）' },
  { value: 160, label: 'フルタイム（約160h/月）' },
  { value: 200, label: 'フルタイム+残業（約200h/月）' },
];

export default function EstimatePage() {
  const [step, setStep] = useState<Step>(1);
  const [jobType, setJobType] = useState<JobType | ''>('');
  const [experienceYears, setExperienceYears] = useState<number>(2);
  const [skills, setSkills] = useState<string[]>([]);
  const [region, setRegion] = useState<Region>('remote');
  const [hours, setHours] = useState<number>(160);
  const [result, setResult] = useState<RateCalculatorOutput | null>(null);

  function toggleSkill(skill: string) {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  }

  function handleCalculate() {
    if (!jobType) return;
    const output = calculateRate({
      jobType,
      experienceYears,
      skills,
      availableHoursPerMonth: hours,
      region,
    });
    setResult(output);
    setStep(5);
  }

  if (step === 5 && result) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="eyebrow mb-2">単価診断結果</div>
        <h1 className="text-2xl font-bold text-brand-navy mb-6">あなたの適正単価</h1>

        <div className="rounded-xl border-2 border-brand-indigo bg-brand-cream p-8 mb-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <div className="text-xs text-ink-subtle mb-1">適正時給</div>
              <div className="text-3xl font-bold text-brand-navy">
                ¥{result.hourlyMin.toLocaleString()}<br />
                <span className="text-xl">〜 ¥{result.hourlyMax.toLocaleString()}</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-ink-subtle mb-1">月額換算（{hours}h/月）</div>
              <div className="text-3xl font-bold text-brand-navy">
                ¥{(result.monthlyMin / 10000).toFixed(0)}万<br />
                <span className="text-xl">〜 ¥{(result.monthlyMax / 10000).toFixed(0)}万</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <div className="h-2 flex-1 bg-white/60 rounded-full overflow-hidden">
              <div
                className="h-2 bg-brand-indigo rounded-full transition-all"
                style={{ width: `${result.marketPercentile}%` }}
              />
            </div>
            <span className="text-brand-indigo font-semibold text-sm whitespace-nowrap">
              市場上位 {100 - result.marketPercentile}%
            </span>
          </div>
          <p className="text-xs text-ink-subtle">
            参照データ: {result.sampleSize.toLocaleString()}件（coconala・Crowdworks等）
          </p>
        </div>

        {/* フリーランス保護新法チェッカー — HOOK feature */}
        <div className="rounded-xl border-2 border-brand-gold/40 bg-brand-gold/5 p-5 mb-6">
          <div className="flex items-start gap-3 mb-3">
            <span className="text-lg">⚖️</span>
            <div>
              <h3 className="font-semibold text-brand-navy mb-0.5">フリーランス保護新法チェック</h3>
              <p className="text-xs text-ink-subtle">2024年11月施行 · 特定受託事業者取引適正化等法</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              {
                label: "報酬支払期日（60日ルール）",
                check: true,
                note: "給付受領日から60日以内を支払期日とすること",
              },
              {
                label: "書面明示義務",
                check: true,
                note: "業務委託の内容・報酬・支払期日を書面または電子で明示",
              },
              {
                label: "一方的な報酬減額禁止",
                check: true,
                note: "受発注後の一方的な単価引き下げ・報酬減額は禁止",
              },
              {
                label: "育休・介護休業配慮義務",
                check: result.marketPercentile >= 40,
                note:
                  result.marketPercentile >= 40
                    ? "この単価帯は継続案件が多く配慮義務対象になりやすい"
                    : "単発案件が多い単価帯。配慮義務確認を推奨",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3 p-3 rounded-lg bg-white/60"
              >
                <span
                  className={`mt-0.5 text-sm font-bold ${item.check ? "text-green-600" : "text-amber-500"}`}
                >
                  {item.check ? "✓" : "!"}
                </span>
                <div>
                  <p className="text-sm font-medium text-brand-navy">{item.label}</p>
                  <p className="text-xs text-ink-subtle">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-tertiary mt-3">
            ※ 法令遵守の確認は専門家（弁護士・社労士）にご相談ください。本機能は参考情報の提供のみです。
          </p>
        </div>

        <div className="rounded-xl border hairline bg-surface-1 p-5 mb-6">
          <h3 className="font-semibold text-ink mb-3">次のステップ</h3>
          <div className="space-y-2 text-sm text-ink-muted">
            <div className="flex items-center gap-2">
              <span className="text-brand-gold">①</span>
              この単価をもとに、フリーランス保護新法準拠の契約書を作成しましょう
            </div>
            <div className="flex items-center gap-2">
              <span className="text-brand-gold">②</span>
              クライアントへの見積書として活用できます
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <Link
              href="/contracts"
              className="px-4 py-2 rounded-md bg-brand-indigo text-white text-sm font-semibold hover:bg-brand-navy transition-colors"
            >
              この単価で契約書を作成する
            </Link>
            <button
              onClick={() => { setStep(1); setResult(null); setSkills([]); setJobType(''); }}
              className="px-4 py-2 rounded-md border hairline text-sm text-ink-muted hover:bg-surface-2 transition-colors"
            >
              再診断する
            </button>
          </div>
        </div>

        <div className="text-xs text-ink-tertiary">
          ※ 本診断はcoconala・Crowdworks等の公開データに基づく参考値です。個別案件の価格を保証するものではありません。
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="eyebrow mb-2">単価診断</div>
      <h1 className="text-2xl font-bold text-brand-navy mb-2">適正単価を3秒で診断</h1>
      <p className="text-sm text-ink-muted mb-8">職種・経験年数・スキルで市場の中央値を算出します</p>

      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full transition-colors ${step >= s ? 'bg-brand-indigo' : 'bg-surface-3'}`}
          />
        ))}
      </div>

      {step === 1 && (
        <div>
          <h2 className="font-semibold text-ink mb-4">職種を選んでください</h2>
          <div className="grid grid-cols-2 gap-3">
            {JOB_TYPES.map((jt) => (
              <button
                key={jt.value}
                onClick={() => { setJobType(jt.value); setStep(2); setSkills([]); }}
                className={`p-4 rounded-lg border text-left text-sm font-medium transition-colors ${
                  jobType === jt.value
                    ? 'border-brand-indigo bg-brand-indigo/5 text-brand-indigo'
                    : 'border-hairline bg-surface-1 text-ink hover:border-brand-indigo/50'
                }`}
              >
                {jt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="font-semibold text-ink mb-4">フリーランス歴はどのくらいですか？</h2>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {EXPERIENCE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setExperienceYears(opt.value)}
                className={`p-4 rounded-lg border text-sm font-medium transition-colors ${
                  experienceYears === opt.value
                    ? 'border-brand-indigo bg-brand-indigo/5 text-brand-indigo'
                    : 'border-hairline bg-surface-1 text-ink hover:border-brand-indigo/50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="px-4 py-2 text-sm text-ink-subtle hover:text-ink">← 戻る</button>
            <button
              onClick={() => setStep(3)}
              className="px-5 py-2 rounded-md bg-brand-indigo text-white text-sm font-semibold hover:bg-brand-navy transition-colors"
            >
              次へ
            </button>
          </div>
        </div>
      )}

      {step === 3 && jobType && (
        <div>
          <h2 className="font-semibold text-ink mb-2">スキルを選んでください（複数可）</h2>
          <p className="text-xs text-ink-subtle mb-4">スキルが多いほど単価が上がります（最大3個推奨）</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {SKILLS_BY_JOB[jobType].map((skill) => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`px-3 py-1.5 rounded-full border text-sm transition-colors ${
                  skills.includes(skill)
                    ? 'border-brand-indigo bg-brand-indigo text-white'
                    : 'border-hairline bg-surface-1 text-ink-muted hover:border-brand-indigo/50'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="px-4 py-2 text-sm text-ink-subtle hover:text-ink">← 戻る</button>
            <button
              onClick={() => setStep(4)}
              className="px-5 py-2 rounded-md bg-brand-indigo text-white text-sm font-semibold hover:bg-brand-navy transition-colors"
            >
              次へ
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="font-semibold text-ink mb-4">働き方を教えてください</h2>

          <div className="mb-5">
            <label className="block text-sm font-medium text-ink mb-2">稼働エリア</label>
            <div className="grid grid-cols-3 gap-2">
              {REGION_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setRegion(opt.value)}
                  className={`p-3 rounded-lg border text-sm transition-colors ${
                    region === opt.value
                      ? 'border-brand-indigo bg-brand-indigo/5 text-brand-indigo font-medium'
                      : 'border-hairline bg-surface-1 text-ink-muted hover:border-brand-indigo/50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-ink mb-2">月間稼働時間</label>
            <div className="grid grid-cols-2 gap-2">
              {HOURS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setHours(opt.value)}
                  className={`p-3 rounded-lg border text-sm transition-colors ${
                    hours === opt.value
                      ? 'border-brand-indigo bg-brand-indigo/5 text-brand-indigo font-medium'
                      : 'border-hairline bg-surface-1 text-ink-muted hover:border-brand-indigo/50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(3)} className="px-4 py-2 text-sm text-ink-subtle hover:text-ink">← 戻る</button>
            <button
              onClick={handleCalculate}
              className="px-6 py-2.5 rounded-md bg-brand-indigo text-white font-semibold hover:bg-brand-navy transition-colors"
            >
              単価を診断する
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
