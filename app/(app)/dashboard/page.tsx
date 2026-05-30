import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-navy mb-6">ダッシュボード</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Rate estimate CTA */}
        <div className="rounded-xl border-2 border-brand-indigo bg-brand-cream p-6">
          <div className="eyebrow mb-2">単価診断</div>
          <h2 className="text-xl font-bold text-brand-navy mb-2">あなたの適正単価を確認</h2>
          <p className="text-sm text-ink-muted mb-4">
            職種・経験・スキルで3秒算出。最新の市場データに基づく中央値を表示します。
          </p>
          <Link
            href="/estimate"
            className="inline-block px-4 py-2 rounded-md bg-brand-indigo text-white text-sm font-semibold hover:bg-brand-navy transition-colors"
          >
            診断を始める
          </Link>
        </div>

        {/* Contract CTA */}
        <div className="rounded-xl border hairline bg-surface-1 p-6">
          <div className="eyebrow mb-2">契約書生成</div>
          <h2 className="text-xl font-bold text-brand-navy mb-2">新法準拠の契約書を作成</h2>
          <p className="text-sm text-ink-muted mb-4">
            フリーランス保護新法2026年11月対応。業務委託・NDA・著作権譲渡など12種類のテンプレート。
          </p>
          <Link
            href="/contracts"
            className="inline-block px-4 py-2 rounded-md bg-surface-2 text-ink text-sm font-medium border hairline hover:bg-surface-3 transition-colors"
          >
            契約書を作成する
          </Link>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: '今月の契約書', value: '0件', sub: '3件まで無料' },
          { label: '単価診断', value: '0回', sub: '無制限' },
          { label: 'プラン', value: '無料', sub: 'Pro にアップグレード' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border hairline bg-surface-1 p-4 text-center">
            <div className="text-xs text-ink-subtle mb-1">{stat.label}</div>
            <div className="text-xl font-bold text-brand-navy">{stat.value}</div>
            <div className="text-xs text-ink-tertiary mt-1">{stat.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
