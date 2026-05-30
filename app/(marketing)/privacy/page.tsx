import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | RateGen',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold text-brand-navy mb-2">プライバシーポリシー</h1>
      <p className="text-xs text-ink-subtle mb-8">最終更新: 2026年11月1日</p>

      <div className="prose prose-sm max-w-none text-ink-muted space-y-6">
        <section>
          <h2 className="text-base font-semibold text-ink mb-2">1. 事業者情報</h2>
          <p>greymoth-jp（以下「当社」）は、RateGen（以下「本サービス」）の提供にあたり、利用者の個人情報を以下の方針に従って取り扱います。</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-ink mb-2">2. 収集する情報</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>メールアドレス（認証・連絡のため）</li>
            <li>単価診断入力データ（職種・経験・スキル・地域）</li>
            <li>作成した契約書の情報（クライアント名・金額等）</li>
            <li>利用ログ・アクセス情報（PostHog によるアクセス解析）</li>
            <li>決済情報（Stripe が処理、当社はカード番号を保持しません）</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-ink mb-2">3. 利用目的</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>本サービスの提供・改善</li>
            <li>お問い合わせへの対応</li>
            <li>サービスに関するメールの送信</li>
            <li>不正利用の防止</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-ink mb-2">4. 第三者提供</h2>
          <p>法令に基づく場合を除き、利用者の同意なく第三者に個人情報を提供しません。</p>
          <p className="mt-2">本サービスでは以下のサードパーティサービスを利用します（各社のプライバシーポリシーが適用されます）:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Turso（データベース）</li>
            <li>Stripe（決済、PCI DSS Level 1 準拠）</li>
            <li>Resend（メール配信）</li>
            <li>PostHog（アクセス解析）</li>
            <li>Sentry（エラー監視）</li>
            <li>Vercel（インフラ・CDN）</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-ink mb-2">5. 保存期間</h2>
          <p>アカウント削除の申請を受けた場合、30日以内に個人情報を削除します（法令上の保存義務がある場合を除く）。</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-ink mb-2">6. Cookie</h2>
          <p>認証セッションの維持のためにCookieを使用します。ブラウザの設定でCookieを無効にするとサービスをご利用いただけない場合があります。</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-ink mb-2">7. 利用者の権利</h2>
          <p>個人情報の開示・訂正・削除・利用停止を請求できます。support@rategen.dev までお問い合わせください。</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-ink mb-2">8. お問い合わせ</h2>
          <p>support@rategen.dev</p>
        </section>
      </div>
    </div>
  );
}
