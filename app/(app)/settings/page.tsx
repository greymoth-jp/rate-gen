'use client';

import Link from 'next/link';
import { authClient } from '@/lib/auth-client';

export default function SettingsPage() {
  const { data: session } = authClient.useSession();

  async function handleSignOut() {
    await authClient.signOut();
    window.location.href = '/';
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-brand-navy mb-6">設定</h1>

      {/* Account */}
      <section className="bg-surface-1 border hairline rounded-xl p-6 mb-4">
        <h2 className="font-semibold text-ink mb-4">アカウント</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-ink-subtle">メールアドレス</span>
            <span className="text-ink">{session?.user?.email ?? '---'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-ink-subtle">プラン</span>
            <span className="font-medium text-brand-indigo">無料プラン</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t hairline">
          <button
            onClick={handleSignOut}
            className="text-sm text-danger hover:underline"
          >
            サインアウト
          </button>
        </div>
      </section>

      {/* Billing */}
      <section className="bg-surface-1 border hairline rounded-xl p-6 mb-4">
        <h2 className="font-semibold text-ink mb-4">プラン / 請求</h2>
        <div className="text-sm text-ink-muted mb-4">
          現在: 無料プラン（契約書生成 月3件）
        </div>
        <Link
          href="/pricing"
          className="inline-block px-4 py-2 rounded-md bg-brand-indigo text-white text-sm font-semibold hover:bg-brand-navy transition-colors"
        >
          Pro にアップグレード（¥490/月）
        </Link>
      </section>

      {/* Danger zone */}
      <section className="bg-surface-1 border border-red-200 rounded-xl p-6">
        <h2 className="font-semibold text-danger mb-4">アカウントの削除</h2>
        <p className="text-sm text-ink-muted mb-3">
          アカウントを削除すると、作成した契約書・診断データがすべて削除されます（30日以内に完全削除）。この操作は取り消せません。
        </p>
        <button className="text-sm text-danger border border-red-200 rounded px-3 py-1.5 hover:bg-red-50 transition-colors">
          アカウントを削除する
        </button>
      </section>
    </div>
  );
}
