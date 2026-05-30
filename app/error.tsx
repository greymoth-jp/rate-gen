'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-4xl font-bold text-brand-navy mb-4">エラー</div>
        <h1 className="text-lg font-semibold text-ink mb-2">予期しないエラーが発生しました</h1>
        <p className="text-sm text-ink-muted mb-6">
          問題が続く場合は support@rategen.dev までご連絡ください。
        </p>
        <button
          onClick={reset}
          className="px-5 py-2 rounded-md bg-brand-indigo text-white text-sm font-medium hover:bg-brand-navy transition-colors"
        >
          再試行する
        </button>
      </div>
    </div>
  );
}
