'use client';

import { useState } from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await authClient.signIn.magicLink({
        email,
        callbackURL: '/dashboard',
      });
      setSent(true);
    } catch {
      setError('送信に失敗しました。しばらく待ってから再試行してください。');
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="w-full max-w-sm text-center">
        <div className="bg-surface-1 rounded-xl border hairline p-8">
          <div className="text-4xl mb-4">📬</div>
          <h1 className="text-lg font-bold text-brand-navy mb-2">メールを確認してください</h1>
          <p className="text-sm text-ink-muted leading-relaxed">
            <strong>{email}</strong> にサインインリンクを送信しました。<br />
            リンクは15分間有効です。
          </p>
          <button
            onClick={() => setSent(false)}
            className="mt-6 text-xs text-ink-subtle hover:text-ink underline"
          >
            別のメールアドレスで試す
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <div className="bg-surface-1 rounded-xl border hairline p-8">
        <div className="text-center mb-6">
          <Link href="/" className="text-lg font-bold text-brand-navy">
            <span className="text-brand-gold">¥</span>RateGen
          </Link>
          <p className="text-sm text-ink-subtle mt-2">メールアドレスでサインイン</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
              メールアドレス
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-3 py-2.5 rounded-md border hairline bg-canvas text-ink text-sm focus:outline-none focus:ring-2 focus:ring-brand-indigo/40 focus:border-brand-indigo"
            />
          </div>

          {error && (
            <p className="text-xs text-danger bg-red-50 rounded-md px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !email}
            className="w-full py-2.5 rounded-md bg-brand-indigo text-white font-semibold text-sm hover:bg-brand-navy transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '送信中…' : 'サインインリンクを送る'}
          </button>
        </form>

        <p className="text-xs text-ink-subtle text-center mt-4 leading-relaxed">
          送信することで
          <Link href="/terms" className="underline hover:text-ink mx-1">利用規約</Link>
          および
          <Link href="/privacy" className="underline hover:text-ink mx-1">プライバシーポリシー</Link>
          に同意します。
        </p>
      </div>
    </div>
  );
}
