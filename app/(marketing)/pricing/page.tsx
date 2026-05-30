import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '料金プラン | RateGen',
  robots: { index: true, follow: true },
};

const FREE_FEATURES = [
  '単価診断: 無制限',
  '契約書生成: 月3件まで',
  'テンプレート: 基本4種',
  'PDF ダウンロード: ¥290/件',
  '書類管理: なし',
];

const PRO_FEATURES = [
  '単価診断: 無制限',
  '契約書生成: 無制限',
  'テンプレート: 全12種（新法準拠版含む）',
  'PDF ダウンロード: 無制限',
  '書類管理: 100件まで',
  '優先サポート',
];

export default function PricingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="eyebrow text-center mb-3">料金プラン</div>
      <h1 className="text-3xl font-bold text-brand-navy text-center mb-4">
        シンプルな料金体系
      </h1>
      <p className="text-center text-ink-muted mb-12 text-sm">
        弁護士費用¥10万と比べてROI 200倍。まずは無料で試してください。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Free */}
        <div className="rounded-xl border hairline bg-surface-1 p-6 flex flex-col">
          <div className="eyebrow mb-2">無料プラン</div>
          <div className="text-3xl font-bold text-brand-navy mb-1">¥0</div>
          <div className="text-xs text-ink-subtle mb-6">永久無料</div>
          <ul className="space-y-2 text-sm text-ink-muted flex-1 mb-6">
            {FREE_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="text-success mt-0.5">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <Link
            href="/login"
            className="block text-center py-2.5 rounded-md border hairline text-ink font-medium hover:bg-surface-2 transition-colors text-sm"
          >
            無料で始める
          </Link>
        </div>

        {/* Pro Monthly */}
        <div className="rounded-xl border-2 border-brand-indigo bg-surface-1 p-6 flex flex-col relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="bg-brand-indigo text-white text-xs font-semibold px-3 py-1 rounded-full">推奨</span>
          </div>
          <div className="eyebrow mb-2">Pro 月払い</div>
          <div className="text-3xl font-bold text-brand-navy mb-1">¥490<span className="text-base font-normal text-ink-subtle">/月</span></div>
          <div className="text-xs text-ink-subtle mb-6">コーヒー1杯より安い</div>
          <ul className="space-y-2 text-sm text-ink-muted flex-1 mb-6">
            {PRO_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="text-brand-indigo mt-0.5">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <Link
            href="/login"
            className="block text-center py-2.5 rounded-md bg-brand-indigo text-white font-semibold hover:bg-brand-navy transition-colors text-sm"
          >
            Pro を始める
          </Link>
          <p className="text-xs text-ink-tertiary text-center mt-2">
            自動継続 · Settings からいつでも解約可
          </p>
        </div>

        {/* Founding 100 */}
        <div className="rounded-xl border hairline bg-brand-cream p-6 flex flex-col">
          <div className="eyebrow mb-2 text-brand-gold">Founding 100</div>
          <div className="flex items-baseline gap-2 mb-1">
            <div className="text-3xl font-bold text-brand-navy">¥9,800</div>
            <div className="text-sm text-ink-subtle">一括</div>
          </div>
          <div className="text-xs text-ink-subtle mb-1">月払い換算 ≒ ¥490/月×20ヶ月分</div>
          <div className="text-xs text-brand-gold font-medium mb-6">先着100名限定 · Founders価格永久固定</div>
          <ul className="space-y-2 text-sm text-ink-muted flex-1 mb-6">
            {PRO_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="text-brand-gold mt-0.5">✓</span>
                {f}
              </li>
            ))}
            <li className="flex items-start gap-2 font-medium">
              <span className="text-brand-gold mt-0.5">★</span>
              Founders バッジ
            </li>
            <li className="flex items-start gap-2 font-medium">
              <span className="text-brand-gold mt-0.5">★</span>
              新機能β優先アクセス
            </li>
          </ul>
          <Link
            href="/login"
            className="block text-center py-2.5 rounded-md bg-brand-gold text-white font-semibold hover:opacity-90 transition-opacity text-sm"
          >
            Founding 100 に参加する
          </Link>
          <p className="text-xs text-ink-tertiary text-center mt-2">
            残り枠確認はログイン後 · キャンセルでFounders価格失効
          </p>
        </div>
      </div>

      {/* 料金比較 (景表法準拠) */}
      <div className="bg-surface-2 rounded-xl p-6 mb-8 text-sm">
        <h3 className="font-semibold text-brand-navy mb-4">なぜ¥490なのか</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b hairline">
                <th className="pb-2 text-ink-subtle">方法</th>
                <th className="pb-2 text-ink-subtle">コスト</th>
                <th className="pb-2 text-ink-subtle">対応状況</th>
              </tr>
            </thead>
            <tbody className="text-ink-muted divide-y divide-hairline">
              <tr>
                <td className="py-2">弁護士に依頼</td>
                <td className="py-2">¥80,000〜¥150,000/件</td>
                <td className="py-2">新法対応可 (費用高)</td>
              </tr>
              <tr>
                <td className="py-2">LegalOn Cloud</td>
                <td className="py-2">¥50,000+/月</td>
                <td className="py-2">法人向け、個人不対応</td>
              </tr>
              <tr>
                <td className="py-2">無料Wordテンプレ</td>
                <td className="py-2">¥0</td>
                <td className="py-2">新法未対応が多い</td>
              </tr>
              <tr className="font-semibold text-brand-indigo">
                <td className="py-2">RateGen Pro</td>
                <td className="py-2">¥490/月</td>
                <td className="py-2">新法準拠 + 単価診断 + PDF</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-ink-tertiary mt-3">
          ※ 景品表示法に基づき、弁護士費用との比較はあくまで参考情報です。本サービスの効果を保証するものではありません。
        </p>
      </div>

      {/* 特商法リンク */}
      <div className="text-center text-xs text-ink-subtle space-x-4">
        <Link href="/tokushoho" className="hover:text-ink underline">特定商取引法に基づく表示</Link>
        <Link href="/terms" className="hover:text-ink underline">利用規約</Link>
        <Link href="/privacy" className="hover:text-ink underline">プライバシーポリシー</Link>
      </div>
    </div>
  );
}
