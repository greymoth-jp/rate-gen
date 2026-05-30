import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '利用規約 | RateGen',
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold text-brand-navy mb-2">利用規約</h1>
      <p className="text-xs text-ink-subtle mb-8">最終更新: 2026年11月1日</p>

      <div className="space-y-6 text-sm text-ink-muted">
        <section>
          <h2 className="text-base font-semibold text-ink mb-2">第1条（適用）</h2>
          <p>本規約は、greymoth-jp（以下「当社」）が提供するRateGen（以下「本サービス」）の利用条件を定めるものです。登録ユーザーは本規約に同意した上で本サービスを利用するものとします。</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-ink mb-2">第2条（利用登録）</h2>
          <p>本サービスへの登録は、メールアドレスまたはソーシャルログインにより行います。虚偽の情報を登録した場合、当社は登録を取り消すことができます。</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-ink mb-2">第3条（料金・支払い）</h2>
          <p>有料プランの料金は本サービスの料金ページに記載の通りです。自動継続契約であり、解約しない限り毎月または毎年継続課金されます。</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-ink mb-2">第4条（Founding 100）</h2>
          <p>Founding 100 プランのFounders価格（¥9,800）は、プランを継続している間のみ適用されます。プランのキャンセル・解約をした場合、Founders価格は失効し、再購入の際は通常価格が適用されます。枠は先着100名限定であり、追加販売は行いません。</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-ink mb-2">第5条（法的免責）</h2>
          <p>本サービスが提供する契約書テンプレートは参考書式であり、法的効力を保証するものではありません。弁護士法第72条に基づき、当社は法律事務・法的助言を提供しません。重要な法的事項については専門家（弁護士等）にご相談ください。</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-ink mb-2">第6条（禁止事項）</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>法令・公序良俗に反する行為</li>
            <li>本サービスの不正利用・リバースエンジニアリング</li>
            <li>他のユーザーへの妨害行為</li>
            <li>虚偽情報の登録</li>
            <li>商用目的での本サービスの転売・再配布</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-ink mb-2">第7条（サービスの変更・終了）</h2>
          <p>当社は事前通知の上、本サービスの内容を変更・終了することがあります。サービス終了の場合は30日前にメールにてお知らせします。</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-ink mb-2">第8条（免責）</h2>
          <p>当社は、本サービスの利用によって生じた損害（直接・間接を問わず）について、当社の故意・重過失による場合を除き、責任を負いません。損害賠償の上限は、利用者が当社に対して支払った直近1ヶ月の料金とします。</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-ink mb-2">第9条（準拠法・管轄）</h2>
          <p>本規約は日本法に準拠します。紛争が生じた場合は、東京地方裁判所を専属的合意管轄裁判所とします。</p>
        </section>
      </div>
    </div>
  );
}
