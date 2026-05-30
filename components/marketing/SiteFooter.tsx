import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t hairline bg-surface-2 py-10 mt-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="font-semibold text-brand-navy mb-3">
              <span className="text-brand-gold">¥</span> RateGen
            </div>
            <p className="text-xs text-ink-subtle leading-relaxed">
              フリーランス457万人の<br />適正単価 × 契約書 SaaS
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold text-ink-subtle uppercase tracking-wide mb-3">サービス</div>
            <ul className="space-y-2 text-sm text-ink-muted">
              <li><Link href="/pricing" className="hover:text-ink transition-colors">料金</Link></li>
              <li><Link href="/#features" className="hover:text-ink transition-colors">機能</Link></li>
              <li><Link href="/help" className="hover:text-ink transition-colors">ヘルプ</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold text-ink-subtle uppercase tracking-wide mb-3">法的情報</div>
            <ul className="space-y-2 text-sm text-ink-muted">
              <li><Link href="/tokushoho" className="hover:text-ink transition-colors">特定商取引法</Link></li>
              <li><Link href="/privacy" className="hover:text-ink transition-colors">プライバシーポリシー</Link></li>
              <li><Link href="/terms" className="hover:text-ink transition-colors">利用規約</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold text-ink-subtle uppercase tracking-wide mb-3">会社</div>
            <ul className="space-y-2 text-sm text-ink-muted">
              <li><Link href="/about" className="hover:text-ink transition-colors">About</Link></li>
              <li>
                <a href="https://x.com/greymoth_jp" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
                  X (Twitter)
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t hairline pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-ink-subtle">
            &copy; 2026 RateGen. All rights reserved. 制作・運営: greymoth-jp
          </p>
          <p className="text-xs text-ink-tertiary">
            本サービスはフリーランス保護新法に準拠したテンプレートを提供しますが、法的効力を保証するものではありません。重要な契約は弁護士にご相談ください。
          </p>
        </div>
      </div>
    </footer>
  );
}
