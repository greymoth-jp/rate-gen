import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b hairline bg-surface-1/95 backdrop-blur">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg text-brand-navy">
          <span className="text-brand-gold">¥</span>
          RateGen
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-ink-subtle">
          <Link href="/pricing" className="hover:text-ink transition-colors">料金</Link>
          <Link href="/help" className="hover:text-ink transition-colors">ヘルプ</Link>
          <Link href="/about" className="hover:text-ink transition-colors">About</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-ink-subtle hover:text-ink transition-colors"
          >
            ログイン
          </Link>
          <Link
            href="/login"
            className="text-sm px-4 py-2 rounded-md bg-brand-indigo text-white font-medium hover:bg-brand-navy transition-colors"
          >
            無料で始める
          </Link>
        </div>
      </div>
    </header>
  );
}
