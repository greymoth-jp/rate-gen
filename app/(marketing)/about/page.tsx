import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About | RateGen',
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold text-brand-navy mb-6">About RateGen</h1>

      <div className="prose prose-sm max-w-none text-ink-muted space-y-4 leading-relaxed">
        <p>
          こんにちは。greymoth-jp です。19歳のソロ開発者として、日本からプロダクトを作り続けています。
        </p>
        <p>
          RateGenを作った理由は単純です。将来フリーランスとして仕事をしようと調べ始めたとき、
          「自分の時給がいくらなのか」が全くわかりませんでした。
          Lancers を見ると同じ「Webデザイン」でも¥5,000〜¥500,000の幅があり、
          どこに自分が位置するのかの手がかりがありませんでした。
        </p>
        <p>
          さらに、2026年11月にフリーランス保護新法が施行されることを知りました。
          すべての受注型フリーランスが、書面で業務内容・報酬・支払期日を明示する義務が生まれます。
          弁護士に頼むと1件¥10万。Word テンプレートは新法未対応がほとんど。
        </p>
        <p>
          <strong>「月¥490のSaaSがあれば、ROI 200倍になる」</strong>と思って作りました。
        </p>
        <p>
          一人で作っているので完璧ではありません。でも、日本のフリーランスが困っている問題に
          正直に向き合い、解決することを約束します。
        </p>
        <p>
          法的効力は保証しません。弁護士の代替ではありません。
          ただ、「全く書類がない」状態から「新法準拠の書面がある」状態に移行する、
          一番安くて速い方法を提供します。
        </p>

        <div className="border-t hairline pt-6 mt-6">
          <p className="text-xs text-ink-subtle">
            X (Twitter): <a href="https://x.com/greymoth_jp" target="_blank" rel="noopener noreferrer" className="text-brand-indigo hover:underline">@greymoth_jp</a>
            <br />
            お問い合わせ: <a href="mailto:support@rategen.dev" className="text-brand-indigo hover:underline">support@rategen.dev</a>
          </p>
        </div>

        <div className="mt-6">
          <Link href="/" className="text-sm text-brand-indigo hover:underline">← トップに戻る</Link>
        </div>
      </div>
    </div>
  );
}
