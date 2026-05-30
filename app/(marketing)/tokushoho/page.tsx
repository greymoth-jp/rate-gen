import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '特定商取引法に基づく表示 | RateGen',
};

export default function TokushohoPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold text-brand-navy mb-8">特定商取引法に基づく表示</h1>

      <div className="space-y-6 text-sm text-ink-muted">
        <Section title="販売事業者">
          greymoth-jp（個人事業主）
        </Section>
        <Section title="代表者">
          平川 宗哉
        </Section>
        <Section title="所在地">
          お問い合わせの際に開示いたします。
        </Section>
        <Section title="連絡先メールアドレス">
          support@rategen.dev
        </Section>
        <Section title="販売価格">
          <ul className="space-y-1">
            <li>無料プラン: ¥0/月</li>
            <li>Pro 月払い: ¥490/月（税込）</li>
            <li>Pro 年払い: ¥3,920/年（税込）</li>
            <li>Founding 100: ¥9,800 一括（税込）※先着100名限定</li>
            <li>契約書 従量ダウンロード（無料プラン）: ¥290/件（税込）</li>
          </ul>
          <p className="mt-2 text-xs text-ink-subtle">
            ※ 価格はすべて消費税込みです。消費税率10%で計算しています。
          </p>
        </Section>
        <Section title="支払い方法">
          クレジットカード（Visa / Mastercard / American Express / JCB）、Stripe 経由
        </Section>
        <Section title="支払い時期">
          サブスクリプション（月払い・年払い）: 申込時に初回請求、以降は自動継続更新日に請求。<br />
          Founding 100 / 従量課金: 申込時に一括請求。
        </Section>
        <Section title="サービス提供時期">
          決済完了後、即時ご利用いただけます。
        </Section>
        <Section title="自動継続契約について">
          Pro 月払い・年払いは自動継続契約です。解約手続きをしない限り、毎月または毎年、同一金額が自動的に課金されます。
          Settings 画面またはメールにてご連絡いただくことでいつでも解約可能です。
          次回更新日の前日23:59（JST）までに解約手続きを完了した場合、翌期間の課金が停止されます。
          解約後は当期間の残存期間ご利用いただけます。日割り返金は行いません。
        </Section>
        <Section title="返金・解約ポリシー">
          サービスの性質上、原則として返金は行いません。
          ただし、当サービスの重大な瑕疵によりサービスが利用できない状態が7日以上継続した場合は、対象期間の月額相当額を返金いたします。
          Founding 100 は購入後30日以内に限り、返金申請を受け付けます。
        </Section>
        <Section title="解約方法">
          マイページ（Settings &gt; Billing）の「プランを解約する」ボタンから手続きいただけます。
          解約後、即日有料機能の利用は終了しますが、当月（または当年）の残期間はご利用いただけます。
        </Section>
        <Section title="動作環境">
          最新バージョンの Chrome・Firefox・Safari・Edge 推奨。
        </Section>
        <Section title="特記事項">
          <ul className="space-y-1">
            <li>・本サービスは弁護士法72条に基づき、法的助言は提供しません。</li>
            <li>・テンプレートは参考書式であり、法的効力を保証するものではありません。</li>
            <li>・Founding 100 のFounders価格は、プランのキャンセル・解約により失効します。再購入は通常価格になります。</li>
          </ul>
        </Section>
      </div>

      <div className="mt-8 text-xs text-ink-tertiary">
        最終更新: 2026年11月（フリーランス保護新法施行対応版）
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t hairline pt-4">
      <dt className="font-semibold text-ink mb-1">{title}</dt>
      <dd className="leading-relaxed">{children}</dd>
    </div>
  );
}
