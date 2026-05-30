// Seed data for contract templates
// NOTE: テンプレート本文は弁護士監修予定。現在は基本構造のみ。
// 法的効力の保証はしない (弁護士法72条対応)

export type TemplateField = {
  key: string;
  label: string;
  type: 'text' | 'date' | 'number' | 'textarea';
  required: boolean;
  placeholder?: string;
};

export type ContractTemplateData = {
  id: string;
  name: string;
  nameJa: string;
  jobTypes: string[] | null; // null = all
  contractType: string;
  newLawCompliant: boolean;
  isPro: boolean;
  fields: TemplateField[];
  templateBody: string; // simplified template
  lawyerName: string | null;
};

export const SEED_TEMPLATES: ContractTemplateData[] = [
  // ─── Free Templates (基本4種) ────────────────────────────────────────────────

  {
    id: 'basic-outsource-001',
    name: 'Basic Service Agreement',
    nameJa: '業務委託基本契約書（継続型）',
    jobTypes: null,
    contractType: 'basic',
    newLawCompliant: true,
    isPro: false,
    fields: [
      { key: 'freelancerName', label: '受注者氏名', type: 'text', required: true },
      { key: 'freelancerAddress', label: '受注者住所', type: 'text', required: true },
      { key: 'clientName', label: '発注者名称', type: 'text', required: true },
      { key: 'clientAddress', label: '発注者住所', type: 'text', required: true },
      { key: 'projectName', label: '業務名称', type: 'text', required: true },
      { key: 'projectDescription', label: '業務内容', type: 'textarea', required: true },
      { key: 'startDate', label: '契約開始日', type: 'date', required: true },
      { key: 'endDate', label: '契約終了日', type: 'date', required: false },
      { key: 'monthlyFee', label: '月額報酬（税抜）', type: 'number', required: true },
      { key: 'paymentDate', label: '支払期日（毎月末等）', type: 'text', required: true, placeholder: '毎月末日' },
    ],
    templateBody: `業務委託基本契約書

{{freelancerName}}（以下「受注者」という）と{{clientName}}（以下「発注者」という）は、以下のとおり業務委託基本契約（以下「本契約」という）を締結する。

第1条（業務の委託）
発注者は受注者に対し、{{projectName}}（以下「委託業務」という）を委託し、受注者はこれを受託する。

第2条（業務内容）
{{projectDescription}}

第3条（契約期間）
本契約の有効期間は、{{startDate}}から{{endDate}}までとする。ただし、契約期間満了の1ヶ月前までに当事者のいずれかから書面による解約の申し出がない場合、本契約は同一条件で1ヶ月自動更新されるものとし、以後も同様とする。

第4条（報酬）
発注者は受注者に対し、委託業務の対価として月額{{monthlyFee}}円（税抜）を支払う。支払期日は{{paymentDate}}とし、指定口座への銀行振込により支払う。振込手数料は発注者の負担とする。

第5条（フリーランス保護新法準拠）
本契約は、特定受託事業者に係る取引の適正化等に関する法律（2024年11月施行）に基づき、以下の事項を書面にて明示する。
（1）業務の内容
（2）報酬の額
（3）支払期日
（4）業務の開始・終了時期
（5）解除条件

第6条（秘密保持）
受注者は、本契約の履行中に知り得た発注者の技術上・営業上の情報を、発注者の事前の書面による承諾なく第三者に開示・漏洩しないものとする。本条の義務は、本契約終了後3年間存続する。

第7条（著作権）
委託業務により生じた成果物の著作権は、報酬の全額支払いをもって受注者から発注者に譲渡される。ただし、受注者が本契約以前から保有していた著作物については、この限りでない。

第8条（解除）
各当事者は、相手方が本契約に違反し、相当の期間を定めて催告した後も改善されない場合、本契約を解除することができる。

第9条（準拠法・管轄）
本契約は日本法に準拠し、東京地方裁判所を専属的合意管轄裁判所とする。

本契約の成立を証するため、本書2通を作成し、各自1通ずつ保有する。

　　{{startDate}}

受注者：{{freelancerName}}　住所：{{freelancerAddress}}　署名：_______________

発注者：{{clientName}}　住所：{{clientAddress}}　署名：_______________

---
※ 本テンプレートはRateGenが提供する参考書式です。法的効力は保証しません。重要な契約は弁護士にご相談ください。`,
    lawyerName: null,
  },

  {
    id: 'single-order-001',
    name: 'Single Project Order Form',
    nameJa: '業務委託個別発注書（単発型）',
    jobTypes: null,
    contractType: 'single',
    newLawCompliant: true,
    isPro: false,
    fields: [
      { key: 'freelancerName', label: '受注者氏名', type: 'text', required: true },
      { key: 'clientName', label: '発注者名称', type: 'text', required: true },
      { key: 'projectName', label: 'プロジェクト名', type: 'text', required: true },
      { key: 'deliverables', label: '成果物', type: 'textarea', required: true },
      { key: 'deadline', label: '納期', type: 'date', required: true },
      { key: 'amount', label: '報酬額（税抜）', type: 'number', required: true },
      { key: 'paymentDeadline', label: '支払期限', type: 'text', required: true, placeholder: '納品後30日以内' },
      { key: 'revisions', label: '修正回数', type: 'text', required: false, placeholder: '2回まで無料' },
    ],
    templateBody: `業務委託個別発注書

発注者：{{clientName}}は、受注者：{{freelancerName}}に対し、以下の業務を委託する。

【プロジェクト名】{{projectName}}
【成果物】{{deliverables}}
【納期】{{deadline}}
【報酬】{{amount}}円（税抜）
【支払期限】{{paymentDeadline}}
【修正対応】{{revisions}}

フリーランス保護新法（2024年11月施行）第3条に基づく書面明示事項：
上記の業務内容・報酬額・支払期日・提供時期を明示しました。

受注者：{{freelancerName}}　署名：_______________　日付：_______________
発注者：{{clientName}}　　　署名：_______________　日付：_______________

※ 本書式はRateGenが提供する参考書式です。法的効力は保証しません。`,
    lawyerName: null,
  },

  {
    id: 'nda-001',
    name: 'Non-Disclosure Agreement',
    nameJa: '秘密保持契約書（NDA）',
    jobTypes: null,
    contractType: 'nda',
    newLawCompliant: false,
    isPro: false,
    fields: [
      { key: 'partyA', label: '甲（開示者）', type: 'text', required: true },
      { key: 'partyB', label: '乙（受領者）', type: 'text', required: true },
      { key: 'purpose', label: '秘密情報の利用目的', type: 'textarea', required: true },
      { key: 'startDate', label: '契約開始日', type: 'date', required: true },
      { key: 'duration', label: '秘密保持期間', type: 'text', required: true, placeholder: '3年間' },
    ],
    templateBody: `秘密保持契約書（NDA）

{{partyA}}（以下「甲」という）と{{partyB}}（以下「乙」という）は、以下のとおり秘密保持契約を締結する。

第1条（秘密情報）
本契約において「秘密情報」とは、甲が乙に開示する技術上、営業上の情報であって、開示の際に秘密である旨を明示したものをいう。

第2条（利用目的）
乙は、秘密情報を以下の目的のみに使用する：{{purpose}}

第3条（秘密保持義務）
乙は、秘密情報を第三者に開示、漏洩してはならず、目的外に利用してはならない。

第4条（期間）
本契約の有効期間は{{startDate}}から{{duration}}とする。

本契約の成立を証するため、本書2通を作成し、各自1通ずつ保有する。

甲：{{partyA}}　署名：_______________　日付：_______________
乙：{{partyB}}　署名：_______________　日付：_______________

※ 本書式はRateGenが提供する参考書式です。`,
    lawyerName: null,
  },

  {
    id: 'copyright-001',
    name: 'Copyright Transfer Agreement',
    nameJa: '著作権譲渡条項付き業務委託契約書',
    jobTypes: ['web_design', 'writer', 'video'],
    contractType: 'copyright',
    newLawCompliant: true,
    isPro: false,
    fields: [
      { key: 'freelancerName', label: '受注者氏名', type: 'text', required: true },
      { key: 'clientName', label: '発注者名称', type: 'text', required: true },
      { key: 'projectName', label: 'プロジェクト名', type: 'text', required: true },
      { key: 'deliverables', label: '成果物', type: 'textarea', required: true },
      { key: 'deadline', label: '納期', type: 'date', required: true },
      { key: 'amount', label: '報酬額（著作権譲渡料含む、税抜）', type: 'number', required: true },
    ],
    templateBody: `著作権譲渡条項付き業務委託契約書

{{freelancerName}}（以下「受注者」）と{{clientName}}（以下「発注者」）は、{{projectName}}の制作について以下の通り合意する。

第1条（業務）受注者は{{deliverables}}を{{deadline}}までに制作・納品する。

第2条（報酬）発注者は受注者に{{amount}}円（税抜）を支払う。

第3条（著作権譲渡）
報酬全額の支払いをもって、本成果物に係る著作権（著作権法27条・28条の権利を含む）のすべてを発注者に譲渡する。受注者は著作者人格権を行使しないものとする。

第4条（フリーランス保護新法準拠）
本契約は特定受託事業者に係る取引の適正化等に関する法律に基づき書面交付する。

受注者：{{freelancerName}}　日付：_______________
発注者：{{clientName}}　　　日付：_______________

※ 本書式はRateGenが提供する参考書式です。`,
    lawyerName: null,
  },

  // ─── Pro Templates ────────────────────────────────────────────────────────

  {
    id: 'new-law-basic-2026',
    name: 'Freelance Protection Act 2026 Compliant Basic Contract',
    nameJa: '業務委託基本契約書（フリーランス保護新法2026年11月対応版）',
    jobTypes: null,
    contractType: 'new_law_2026',
    newLawCompliant: true,
    isPro: true,
    fields: [
      { key: 'freelancerName', label: '受注者氏名', type: 'text', required: true },
      { key: 'freelancerAddress', label: '受注者住所', type: 'text', required: true },
      { key: 'freelancerTaxId', label: '受注者適格請求書登録番号（任意）', type: 'text', required: false, placeholder: 'T-XXXXXXXXXXXXXXX' },
      { key: 'clientName', label: '発注者名称', type: 'text', required: true },
      { key: 'clientAddress', label: '発注者住所', type: 'text', required: true },
      { key: 'clientRepresentative', label: '発注者代表者名', type: 'text', required: true },
      { key: 'projectName', label: '業務名称', type: 'text', required: true },
      { key: 'projectDescription', label: '業務内容（詳細）', type: 'textarea', required: true },
      { key: 'startDate', label: '業務開始日', type: 'date', required: true },
      { key: 'endDate', label: '業務終了日', type: 'date', required: false },
      { key: 'monthlyFee', label: '月額報酬（税抜）', type: 'number', required: true },
      { key: 'paymentDate', label: '支払期日', type: 'text', required: true, placeholder: '毎月末日締め翌月末日払い' },
      { key: 'workingStyle', label: '就労条件（場所・時間等）', type: 'textarea', required: false },
      { key: 'disputeResolution', label: '紛争解決方法', type: 'text', required: false, placeholder: '東京地方裁判所' },
    ],
    templateBody: `業務委託基本契約書
（特定受託事業者に係る取引の適正化等に関する法律対応版 2026年11月）

受注者：{{freelancerName}}（住所：{{freelancerAddress}}）（以下「受注者」）
発注者：{{clientName}} 代表者{{clientRepresentative}}（住所：{{clientAddress}}）（以下「発注者」）

は、以下のとおり業務委託基本契約を締結する。

─── フリーランス保護新法（特定受託事業者に係る取引の適正化等に関する法律）第3条所定の書面明示事項 ───

1. 業務の内容：{{projectName}}
   詳細：{{projectDescription}}
2. 報酬の額：月額{{monthlyFee}}円（税抜）。消費税は別途申し受ける。
3. 支払期日：{{paymentDate}}
4. 業務の開始日：{{startDate}} / 終了日：{{endDate}}（定めなき場合は別途合意）
5. 就労に係る費用負担：[発注者 / 受注者 / 相互（詳細は別途合意）]
6. 業務を実施する場所：{{workingStyle}}

─────────────────────────────────────────────────────────

第1条（業務委託）発注者は受注者に上記業務を委託し、受注者はこれを受託する。

第2条（報酬・支払）
発注者は受注者に対し、月額{{monthlyFee}}円（税抜）を{{paymentDate}}に支払う。振込手数料は発注者負担。
報酬の支払いは、月次の業務確認後、受注者からの請求書受領日から60日以内とする。

第3条（契約期間）
{{startDate}}から{{endDate}}まで。期間満了1ヶ月前までに解約申し出なき場合、自動更新。

第4条（秘密保持）
業務上知り得た秘密情報を第三者に開示しない。本条義務は契約終了後3年間存続。

第5条（ハラスメント等禁止）
発注者は受注者に対し、業務上の優越的地位を利用したハラスメント行為を行わない。
（特定受託事業者に係る取引の適正化等に関する法律第14条準拠）

第6条（解除）
各当事者は、書面による1ヶ月前の予告をもって解除できる。重大な違反がある場合は即時解除可。
中途解除の場合、既履行部分の報酬は精算して支払う。

第7条（損害賠償の制限）
受注者の損害賠償責任は、当該月の報酬額を上限とする（故意・重過失を除く）。

第8条（準拠法・管轄）
日本法準拠。{{disputeResolution}}を専属的合意管轄裁判所とする。

受注者適格請求書登録番号：{{freelancerTaxId}}

本契約の成立を証するため、本書2通を作成し、各自1通ずつ保有する。

{{startDate}}

受注者：{{freelancerName}}　署名：_______________ 日付：_______________
発注者：{{clientName}} {{clientRepresentative}}　署名：_______________ 日付：_______________

---
※ 本テンプレートはRateGenが提供する参考書式（弁護士監修予定）です。
  法的効力を保証するものではありません。重要な契約は弁護士にご相談ください。
  弁護士法72条に基づき、法的助言は提供しておりません。`,
    lawyerName: null, // 弁護士監修後に更新予定
  },

  {
    id: 'warranty-disclaimer-001',
    name: 'Warranty Disclaimer Agreement',
    nameJa: '瑕疵担保免責付き業務委託契約書',
    jobTypes: ['web_design', 'engineer'],
    contractType: 'warranty',
    newLawCompliant: true,
    isPro: true,
    fields: [
      { key: 'freelancerName', label: '受注者氏名', type: 'text', required: true },
      { key: 'clientName', label: '発注者名称', type: 'text', required: true },
      { key: 'projectName', label: 'プロジェクト名', type: 'text', required: true },
      { key: 'deliverables', label: '成果物仕様', type: 'textarea', required: true },
      { key: 'deadline', label: '納期', type: 'date', required: true },
      { key: 'amount', label: '報酬額（税抜）', type: 'number', required: true },
      { key: 'warrantyPeriod', label: '瑕疵担保期間', type: 'text', required: true, placeholder: '納品後30日' },
    ],
    templateBody: `瑕疵担保免責付き業務委託契約書

{{freelancerName}}（受注者）と{{clientName}}（発注者）は、以下のとおり合意する。

【業務】{{projectName}}
【成果物仕様】{{deliverables}}
【納期】{{deadline}}
【報酬】{{amount}}円（税抜）

第1条（瑕疵担保責任の限定）
受注者は、納品後{{warrantyPeriod}}以内に発覚した明らかな瑕疵について、無償修正の責任を負う。
当該期間経過後の修正は別途見積もりとする。

第2条（免責事項）
以下の場合、受注者は責任を負わない：
(1) 発注者提供の素材・情報に起因する問題
(2) 第三者サービス（API等）の障害
(3) 発注者による無断改変後の問題

第3条（フリーランス保護新法準拠）
本契約は特定受託事業者に係る取引の適正化等に関する法律に基づき書面交付する。
業務内容・報酬・支払期日・提供時期を上記の通り明示した。

受注者：{{freelancerName}}　日付：_______________
発注者：{{clientName}}　　　日付：_______________

※ 本書式はRateGenが提供する参考書式です。`,
    lawyerName: null,
  },
];
