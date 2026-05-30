'use client';

import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { SEED_TEMPLATES, type TemplateField } from '@/lib/templates/seed-data';
import Link from 'next/link';

function ContractNewForm() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get('template') ?? 'basic-outsource-001';
  const template = SEED_TEMPLATES.find((t) => t.id === templateId) ?? SEED_TEMPLATES[0];

  const [values, setValues] = useState<Record<string, string>>({});
  const [generating, setGenerating] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  function renderTemplate(body: string, fieldValues: Record<string, string>): string {
    return body.replace(/\{\{(\w+)\}\}/g, (_, key: string) => fieldValues[key] ?? `[${key}]`);
  }

  async function handleGenerate() {
    setGenerating(true);
    // Client-side template rendering for MVP (no server call needed for text preview)
    const rendered = renderTemplate(template.templateBody, values);
    setPreview(rendered);
    setGenerating(false);
  }

  if (preview) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-brand-navy">契約書プレビュー</h1>
          <div className="flex gap-3">
            <button
              onClick={() => setPreview(null)}
              className="px-3 py-1.5 text-sm border hairline rounded text-ink-muted hover:bg-surface-2"
            >
              編集に戻る
            </button>
            <button
              onClick={() => {
                const blob = new Blob([preview], { type: 'text/plain;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${template.nameJa}_${new Date().toISOString().slice(0, 10)}.txt`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="px-3 py-1.5 text-sm bg-brand-indigo text-white rounded hover:bg-brand-navy"
            >
              ダウンロード
            </button>
          </div>
        </div>

        <div className="bg-white border hairline rounded-lg p-8 shadow-sm">
          <pre className="whitespace-pre-wrap text-sm text-ink font-mono leading-relaxed">
            {preview}
          </pre>
        </div>

        <div className="mt-4 text-xs text-ink-tertiary">
          ※ 本書式は参考書式です。弁護士法第72条により、法的助言は提供しません。
          重要な契約は弁護士にご確認ください。
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/contracts" className="text-sm text-ink-subtle hover:text-ink">← 契約書一覧</Link>
      </div>
      <h1 className="text-xl font-bold text-brand-navy mb-1">{template.nameJa}</h1>
      <div className="flex gap-2 mb-6">
        {template.newLawCompliant && (
          <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full">新法準拠</span>
        )}
      </div>

      <div className="space-y-4 mb-6">
        {(template.fields as TemplateField[]).map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-ink mb-1">
              {field.label}
              {field.required && <span className="text-danger ml-1">*</span>}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                value={values[field.key] ?? ''}
                onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                placeholder={field.placeholder}
                rows={3}
                className="w-full px-3 py-2 rounded-md border hairline bg-canvas text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-indigo/40 focus:border-brand-indigo resize-none"
              />
            ) : (
              <input
                type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
                value={values[field.key] ?? ''}
                onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                placeholder={field.placeholder}
                className="w-full px-3 py-2 rounded-md border hairline bg-canvas text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-indigo/40 focus:border-brand-indigo"
              />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleGenerate}
        disabled={generating}
        className="w-full py-3 rounded-md bg-brand-indigo text-white font-semibold hover:bg-brand-navy transition-colors disabled:opacity-50"
      >
        {generating ? '生成中…' : '契約書を生成する'}
      </button>

      <p className="text-xs text-ink-tertiary text-center mt-3">
        本書式は参考書式です。法的効力を保証しません。
      </p>
    </div>
  );
}

export default function ContractNewPage() {
  return (
    <Suspense fallback={<div className="text-sm text-ink-subtle">読み込み中…</div>}>
      <ContractNewForm />
    </Suspense>
  );
}
