import type { MeetingData } from "./types";

export const MEETING_TEMPLATES: MeetingData[] = [
  {
    meeting_id: 'b1f2c3d4-5678-49ab-9cde-0123456789ab',
    meeting_name: '企画キックオフ',
    agenda: [
      { order: 1, title: '目的と範囲の確認', duration_minutes: 10 },
      { order: 2, title: '役割分担とスケジュール', duration_minutes: 15 },
      { order: 3, title: '次アクション整理', duration_minutes: 10 },
    ],
  },
  {
    meeting_id: 'c2d3e4f5-6789-41bc-ad12-abcdef123456',
    meeting_name: '週次定例（開発）',
    agenda: [
      { order: 1, title: '前週の進捗共有', duration_minutes: 15 },
      { order: 2, title: '課題・ブロッカー整理', duration_minutes: 15 },
      { order: 3, title: '今週の見通し', duration_minutes: 10 },
    ],
  },
  {
    meeting_id: 'd3e4f5a6-789a-42cd-bc34-1234567890ff',
    meeting_name: 'バグトリアージ',
    agenda: [
      { order: 1, title: '重大度・優先度の確認', duration_minutes: 10 },
      { order: 2, title: '担当アサイン', duration_minutes: 10 },
      { order: 3, title: 'リリース計画反映', duration_minutes: 10 },
    ],
  },
  {
    meeting_id: 'e4f5a6b7-89ab-43de-cd56-234567890abc',
    meeting_name: 'デザインレビュー',
    agenda: [
      { order: 1, title: 'UI案の共有', duration_minutes: 10 },
      { order: 2, title: 'フィードバック収集', duration_minutes: 15 },
      { order: 3, title: '修正方針の合意', duration_minutes: 10 },
    ],
  },
  {
    meeting_id: 'f5a6b7c8-9abc-44ef-de78-34567890abcd',
    meeting_name: '営業パイプライン共有',
    agenda: [
      { order: 1, title: '案件ステータス確認', duration_minutes: 15 },
      { order: 2, title: 'ネクストアクション設定', duration_minutes: 10 },
      { order: 3, title: 'リスク・対策', duration_minutes: 10 },
    ],
  },
  {
    meeting_id: 'a7b8c9d0-abcd-45f0-ef90-4567890abcde',
    meeting_name: 'リリース準備ミーティング',
    agenda: [
      { order: 1, title: '変更点と影響範囲の確認', duration_minutes: 10 },
      { order: 2, title: 'テスト・チェックリスト', duration_minutes: 15 },
      { order: 3, title: '当日のオペレーション', duration_minutes: 10 },
    ],
  },
  {
    meeting_id: 'b8c9d0e1-bcde-4601-f012-567890abcdef',
    meeting_name: 'レトロスペクティブ',
    agenda: [
      { order: 1, title: 'よかった点', duration_minutes: 10 },
      { order: 2, title: '改善できる点', duration_minutes: 10 },
      { order: 3, title: '実行アクション決定', duration_minutes: 10 },
    ],
  },
  {
    meeting_id: 'c9d0e1f2-cdef-4712-0123-67890abcdef1',
    meeting_name: '採用面談準備会',
    agenda: [
      { order: 1, title: '候補者プロフィール確認', duration_minutes: 10 },
      { order: 2, title: '評価観点の擦り合わせ', duration_minutes: 10 },
      { order: 3, title: '質問事項の最終確認', duration_minutes: 10 },
    ],
  },
  {
    meeting_id: 'd0e1f2a3-def0-4823-1234-7890abcdef12',
    meeting_name: 'コスト最適化検討会',
    agenda: [
      { order: 1, title: '費用対効果のレビュー', duration_minutes: 15 },
      { order: 2, title: '削減案の洗い出し', duration_minutes: 15 },
      { order: 3, title: '優先度付け', duration_minutes: 10 },
    ],
  },
  {
    meeting_id: 'e1f2a3b4-ef01-4934-2345-890abcdef123',
    meeting_name: 'カスタマーサポート連携会',
    agenda: [
      { order: 1, title: '問い合わせ傾向の共有', duration_minutes: 10 },
      { order: 2, title: 'FAQ/ヘルプの更新方針', duration_minutes: 10 },
      { order: 3, title: '改善要望のエスカレーション', duration_minutes: 10 },
    ],
  },
];

export const getTemplateById = (id: string) =>
  MEETING_TEMPLATES.find((t) => t.meeting_id === id);