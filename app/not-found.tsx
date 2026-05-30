import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-6xl font-bold text-brand-navy mb-4">404</div>
        <h1 className="text-xl font-semibold text-ink mb-2">ページが見つかりません</h1>
        <p className="text-sm text-ink-muted mb-6">
          お探しのページは削除されたか、URLが変わった可能性があります。
        </p>
        <Link href="/" className="px-5 py-2 rounded-md bg-brand-indigo text-white text-sm font-medium hover:bg-brand-navy transition-colors">
          トップへ戻る
        </Link>
      </div>
    </div>
  );
}
