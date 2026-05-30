'use client';

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="ja">
      <body style={{ background: '#f9f7f4', color: '#1a1814', fontFamily: 'sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>重大なエラー</h1>
          <p style={{ color: '#7a7269', marginBottom: '24px' }}>support@rategen.dev までご連絡ください。</p>
          <button
            onClick={reset}
            style={{ background: '#2d5fa6', color: '#fff', border: 'none', borderRadius: '6px', padding: '10px 24px', cursor: 'pointer' }}
          >
            再読み込み
          </button>
        </div>
      </body>
    </html>
  );
}
