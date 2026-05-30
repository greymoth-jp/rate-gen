import type { Metadata } from 'next';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

function AppNav() {
  return (
    <nav className="sticky top-0 z-40 border-b hairline bg-surface-1/95 backdrop-blur">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-brand-navy">
          <span className="text-brand-gold">¥</span>RateGen
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/estimate" className="text-ink-subtle hover:text-ink transition-colors">単価診断</Link>
          <Link href="/contracts" className="text-ink-subtle hover:text-ink transition-colors">契約書</Link>
          <Link href="/settings" className="text-ink-subtle hover:text-ink transition-colors">設定</Link>
        </div>
      </div>
    </nav>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppNav />
      <main id="main-content" className="max-w-5xl mx-auto px-4 py-8">
        {children}
      </main>
    </>
  );
}
