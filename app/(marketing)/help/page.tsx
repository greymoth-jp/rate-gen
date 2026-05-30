import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ヘルプ | RateGen',
};

const HELP_SECTIONS = [
  {
    title: '単価診断について',
    items: [
      { q: '単価診断はどのように計算されますか？', a: '職種・経験年数・スキルセット・地域をもとに、coconala・Crowdworks等の公開データ（2,800件以上）からルールベースで算出しています。AIは使用していません。市場参考値であり、個別案件の価格を保証するものではありません。' },
      { q: '単価診断は何度でも使えますか？', a: 'はい。無料プラン・有料プランともに、単価診断は無制限でご利用いただけます。' },
    ],
  },
  {
    title: '契約書生成について',
    items: [
      { q: 'フリーランス保護新法に対応していますか？', a: '2026年11月施行の「特定受託事業者に係る取引の適正化等に関する法律」に準拠したテンプレートを提供しています。業務内容・報酬・支払期日・提供時期の書面明示に対応しています。' },
      { q: '無料プランで何件まで契約書を作れますか？', a: '月3件まで無料でPDF生成できます。4件目以降は¥290/件（従量課金）またはProプランへのアップグレードが必要です。' },
      { q: 'テンプレートは法的に有効ですか？', a: '本サービスのテンプレートは参考書式です。弁護士法第72条に基づき、法的助言は提供しません。重要な契約については弁護士にご確認ください。' },
    ],
  },
  {
    title: 'プランと料金について',
    items: [
      { q: 'Founding 100とは何ですか？', a: '先着100名限定の特別プランです。¥9,800の一括払いで永久Pro機能が利用できます。キャンセルするとFounders価格は失効します。枠の追加販売はしません。' },
      { q: '解約はどうやってしますか？', a: 'Settings > Billing から「プランを解約する」をクリックしてください。3クリック以内で完了します。解約後は当月（年払いの場合は当年）末日まで利用可能です。' },
      { q: '年払いにするとどれくらいお得ですか？', a: '月払い¥490×12=¥5,880が、年払いだと¥3,920です。2ヶ月分無料になります。' },
    ],
  },
  {
    title: 'アカウントについて',
    items: [
      { q: 'パスワードを忘れました', a: '本サービスはパスワードレス認証（マジックリンク）を採用しています。メールアドレスを入力するとサインイン用のリンクが届きます。' },
      { q: 'アカウントを削除したい', a: 'Settings > Account から「アカウントを削除する」でアカウントを削除できます。削除後30日以内にすべてのデータが消去されます。' },
    ],
  },
  {
    title: 'セキュリティ・プライバシー',
    items: [
      { q: '契約書の内容は第三者に見られますか？', a: 'いいえ。作成した契約書はご自身のアカウントでのみ閲覧できます。第三者への開示はしません。' },
      { q: 'クレジットカード情報は安全ですか？', a: '決済はStripe（PCI DSS Level 1準拠）が処理します。当社はカード番号を保持しません。' },
    ],
  },
  {
    title: 'お問い合わせ',
    items: [
      { q: 'その他のご質問', a: 'support@rategen.dev までメールでお問い合わせください。通常3営業日以内に返信します。' },
    ],
  },
];

export default function HelpPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold text-brand-navy mb-8">ヘルプセンター</h1>
      <div className="space-y-8">
        {HELP_SECTIONS.map((section) => (
          <div key={section.title}>
            <h2 className="font-semibold text-brand-indigo mb-3">{section.title}</h2>
            <div className="space-y-3">
              {section.items.map((item) => (
                <details key={item.q} className="border hairline rounded-lg bg-surface-1 group">
                  <summary className="cursor-pointer px-4 py-3 font-medium text-sm text-ink list-none flex justify-between items-center">
                    {item.q}
                    <span className="text-ink-subtle group-open:rotate-180 transition-transform text-xs">▼</span>
                  </summary>
                  <div className="px-4 pb-3 pt-2 text-sm text-ink-muted leading-relaxed border-t hairline">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
