import Link from 'next/link';

const FEATURES = [
  {
    icon: '¥',
    title: '職種別・経験年数別 単価診断',
    desc: 'Webデザイン・エンジニア・ライターなど6職種 × 経験年数 × スキルセット × 地域で適正時給・月額を3秒で算出。2,847件以上のデータに基づく中央値を表示。',
  },
  {
    icon: '📄',
    title: 'フリーランス保護新法2026年11月対応 契約書',
    desc: '特定受託事業者に係る取引の適正化等に関する法律（2026年11月施行）に完全準拠したテンプレートを自動選択。業務委託基本契約・NDA・著作権譲渡など12種類。',
  },
  {
    icon: '⬇',
    title: 'PDF即出力・書類管理',
    desc: '入力した内容をテンプレートに差し込み、PDF生成まで1クリック。案件ごとに書類履歴を管理。「あのクライアントとの過去書類」もすぐ見つかる。',
  },
  {
    icon: '🛡',
    title: '法的リスク回避設計',
    desc: '弁護士法72条に準拠し、テンプレートマッチング・情報提供にとどめます。「この条項は弁護士に確認することをお勧めします」の警告表示で適切な判断を促します。',
  },
];

const FAQS = [
  {
    q: 'フリーランス保護新法とは何ですか？',
    a: '2024年11月に施行された「特定受託事業者に係る取引の適正化等に関する法律」のことです。副業・フリーランス全般を対象に、発注者が業務内容・報酬・支払期日などを書面（または電磁的方法）で明示することが義務づけられました。書面交付を怠ると行政指導・罰則の対象になります。',
  },
  {
    q: 'RateGenは法的に有効な契約書を生成できますか？',
    a: 'RateGenはテンプレートマッチングと情報提供のサービスです。生成される書類は参考書式であり、法的効力を保証するものではありません（弁護士法72条対応）。重要な契約には弁護士のご確認をお勧めします。フリーランス保護新法の「書面明示義務」はRateGenのテンプレートで対応できますが、最終確認は専門家にご相談ください。',
  },
  {
    q: '単価診断のデータはどこから来ていますか？',
    a: 'coconala・Crowdworks・Lancers の公開データ、フリーランス協会2024年実態調査をもとに職種別・経験年数別の中央値を計算しています。あくまで市場参考値であり、個別の案件価格を保証するものではありません。',
  },
  {
    q: '無料プランでどこまでできますか？',
    a: '単価診断は無制限で利用できます。契約書生成は月3件まで無料です。Pro（¥490/月）では契約書生成が無制限になり、フリーランス保護新法準拠版を含む全12種類のテンプレートが使えます。',
  },
  {
    q: 'キャンセルはいつでもできますか？',
    a: 'はい。Settings画面からいつでも解約できます。解約後は次回更新日まで利用可能です。日割り返金は行っておりません。Founding 100プランの場合、解約するとFounders価格は失効します。',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-cream border border-brand-gold/30 text-sm text-brand-gold font-medium mb-6">
          <span>🆕</span>
          フリーランス保護新法 2026年11月施行対応
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6 leading-tight">
          適正単価を3秒で。<br />
          <span className="text-brand-indigo">契約書を1クリックで。</span>
        </h1>
        <p className="text-lg text-ink-muted max-w-2xl mx-auto mb-8 leading-relaxed">
          弁護士に¥10万払う前に、月¥490で試してください。
          フリーランス457万人の「単価がわからない」「契約書が作れない」を3分で解決します。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/login"
            className="px-6 py-3 rounded-md bg-brand-indigo text-white font-semibold text-base hover:bg-brand-navy transition-colors shadow-sm"
          >
            無料で単価診断する
          </Link>
          <Link
            href="/pricing"
            className="px-6 py-3 rounded-md bg-surface-2 text-ink-muted font-medium text-base hover:bg-surface-3 transition-colors border hairline"
          >
            料金を見る
          </Link>
        </div>
        <p className="text-xs text-ink-subtle mt-4">
          クレジットカード不要 · 単価診断は永久無料 · 契約書生成は月3件まで無料
        </p>
      </section>

      {/* Rate Preview Widget */}
      <section className="max-w-3xl mx-auto px-4 mb-20">
        <div className="rounded-xl border hairline bg-surface-1 p-6 shadow-sm">
          <div className="eyebrow mb-4">サンプル: Webデザイナー · 経験3〜5年 · React/Figma · 東京</div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-xs text-ink-subtle mb-1">適正時給</div>
              <div className="text-2xl font-bold text-brand-navy">
                ¥3,800 〜 ¥5,500
              </div>
            </div>
            <div>
              <div className="text-xs text-ink-subtle mb-1">月額換算（160h）</div>
              <div className="text-2xl font-bold text-brand-navy">
                ¥608,000 〜 ¥880,000
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-ink-muted">
            <div className="h-2 flex-1 bg-surface-3 rounded-full overflow-hidden">
              <div className="h-2 bg-brand-indigo rounded-full" style={{ width: '63%' }} />
            </div>
            <span className="text-brand-indigo font-medium">市場上位 37%</span>
            <span className="text-ink-subtle">（参照: 1,253件）</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-5xl mx-auto px-4 mb-20">
        <div className="eyebrow text-center mb-3">機能</div>
        <h2 className="text-2xl font-bold text-brand-navy text-center mb-10">
          受注前の悩みを全部解決する
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-xl border hairline bg-surface-1 p-6">
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-ink mb-2">{f.title}</h3>
              <p className="text-sm text-ink-subtle leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="max-w-3xl mx-auto px-4 mb-20">
        <div className="rounded-xl bg-brand-navy p-8 text-center text-white">
          <div className="eyebrow text-white/60 mb-3">Founding 100</div>
          <h2 className="text-2xl font-bold mb-3">
            先着100名限定: ¥9,800で永久 Pro アクセス
          </h2>
          <p className="text-white/70 text-sm mb-6">
            月¥490 × 約20ヶ月分。Founders価格は永久固定（キャンセルで失効）。
            新法施行前に準備しましょう。
          </p>
          <Link
            href="/pricing"
            className="inline-block px-6 py-3 rounded-md bg-brand-gold text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Founding 100 を確認する
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 mb-20">
        <h2 className="text-2xl font-bold text-brand-navy text-center mb-8">よくある質問</h2>
        <div className="space-y-4">
          {FAQS.map((faq) => (
            <details key={faq.q} className="group border hairline rounded-lg bg-surface-1">
              <summary className="cursor-pointer px-5 py-4 font-medium text-ink flex justify-between items-center list-none">
                {faq.q}
                <span className="text-ink-subtle group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-5 pb-4 text-sm text-ink-muted leading-relaxed border-t hairline pt-3">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Legal disclaimer */}
      <section className="max-w-3xl mx-auto px-4 mb-10 text-center">
        <p className="text-xs text-ink-tertiary leading-relaxed">
          本サービスは弁護士法72条に準拠し、法的助言・法律事務は行いません。
          テンプレートの提供・情報提供に留まります。
          契約書の法的効力を保証するものではありません。
          景品表示法の規制に基づき、過大な効果は表示しておりません。
        </p>
      </section>
    </div>
  );
}
