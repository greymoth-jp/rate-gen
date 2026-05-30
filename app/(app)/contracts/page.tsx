import Link from 'next/link';
import { SEED_TEMPLATES } from '@/lib/templates/seed-data';

export default function ContractsPage() {
  const freeTemplates = SEED_TEMPLATES.filter((t) => !t.isPro);
  const proTemplates = SEED_TEMPLATES.filter((t) => t.isPro);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">契約書</h1>
          <p className="text-sm text-ink-subtle mt-1">今月の生成: 0 / 3件（無料プラン）</p>
        </div>
        <div className="text-xs text-ink-subtle border hairline rounded-md px-3 py-1.5">
          Pro で無制限
          <Link href="/pricing" className="text-brand-indigo ml-1 hover:underline">アップグレード</Link>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="font-semibold text-ink mb-3">無料テンプレート（4種）</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {freeTemplates.map((tpl) => (
            <TemplateCard key={tpl.id} template={tpl} />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <h2 className="font-semibold text-ink">Pro テンプレート（2種）</h2>
          <span className="text-xs bg-brand-indigo text-white px-2 py-0.5 rounded-full">Pro</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {proTemplates.map((tpl) => (
            <TemplateCard key={tpl.id} template={tpl} locked />
          ))}
        </div>
      </div>

      <div className="mt-8 p-4 rounded-lg bg-surface-2 border hairline text-xs text-ink-subtle leading-relaxed">
        ⚠️ 本サービスのテンプレートは参考書式です。弁護士法第72条に基づき、法的助言は提供しません。
        重要な契約は弁護士にご確認ください。現在、テンプレートの弁護士監修準備中です（監修完了後にバッジを追加します）。
      </div>
    </div>
  );
}

function TemplateCard({
  template,
  locked = false,
}: {
  template: (typeof SEED_TEMPLATES)[0];
  locked?: boolean;
}) {
  return (
    <div className={`rounded-lg border hairline bg-surface-1 p-5 flex flex-col gap-3 ${locked ? 'opacity-75' : ''}`}>
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium text-ink text-sm leading-tight">{template.nameJa}</h3>
        <div className="flex flex-col gap-1 items-end flex-shrink-0">
          {template.newLawCompliant && (
            <span className="text-[10px] bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full whitespace-nowrap">
              新法準拠
            </span>
          )}
          {template.isPro && (
            <span className="text-[10px] bg-brand-indigo text-white px-2 py-0.5 rounded-full">Pro</span>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {(template.jobTypes ?? ['全職種']).map((jt) => (
          <span key={jt} className="text-[10px] bg-surface-2 text-ink-subtle px-2 py-0.5 rounded">
            {jt === 'web_design' ? 'Webデザイン' :
             jt === 'engineer' ? 'エンジニア' :
             jt === 'writer' ? 'ライター' :
             jt === 'video' ? '動画編集' : jt}
          </span>
        ))}
      </div>
      {locked ? (
        <Link
          href="/pricing"
          className="block text-center text-xs py-1.5 rounded border hairline text-ink-subtle hover:bg-surface-2"
        >
          Pro にアップグレードして使う
        </Link>
      ) : (
        <Link
          href={`/contracts/new?template=${template.id}`}
          className="block text-center text-xs py-1.5 rounded bg-brand-indigo text-white hover:bg-brand-navy transition-colors"
        >
          この書式で作成する
        </Link>
      )}
    </div>
  );
}
