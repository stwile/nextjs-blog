# Repository Guidelines

## プロジェクト構成 / モジュール
- `src/pages`: 画面・API ルート（例: `src/pages/index.tsx`, `src/pages/api/og.tsx`）
- `src/components`: UI コンポーネント（`<Name>/index.tsx` と `index.stories.tsx` を並置）
- `src/lib`: 外部連携・ユーティリティ（例: `microcms.ts`）
- `src/types`: 共有型定義（ドメイン別に整理）
- `public/`: 静的アセット、`styles/`: Tailwind/CSS
- `.storybook/`: Storybook 設定

## ビルド・テスト・開発コマンド
- 開発: `pnpm dev`（Next 開発サーバ） / `pnpm sb`（Storybook）
- ビルド: `pnpm build`（`postbuild`で`next-sitemap`実行） / `pnpm start`
- テスト: `pnpm test`（Vitest） / `pnpm test-cov`（coverage 出力）
- Storybook テスト: `pnpm test-sb` / `pnpm test-sb:cov`
- 品質: `pnpm lint` / `pnpm lint:fix` / `pnpm markuplint` / `pnpm prettier`

## コーディング規約・命名
- 言語: TypeScript（厳格設定）/ React / Next.js 16 / Tailwind CSS
- フォーマット（Prettier）: 2 スペース, 100 文字幅, セミコロン有, シングルクォート, 末尾カンマ
- Lint（ESLint）: Next/React/Tailwind/Import 整理/未使用 import 禁止
- Stylelint: プロパティはアルファベット順
- 命名: コンポーネントは PascalCase、関数・変数は camelCase、ルートは kebab-case
- インポート: 可能な限り `~/*` のエイリアスで絶対パス（`tsconfig.json` 参照）

## テスト指針
- フレームワーク: Vitest（`jsdom`） + Storybook アドオン
- 配置: 対象ファイル横に `*.test.ts(x)` を推奨
- カバレッジ: `pnpm test-cov`（`coverage/` に出力）。閾値固定なし、既存維持・向上を目標

## コミット / PR
- コミット: Conventional Commits 推奨（例: `feat: ...`, `fix: ...`, `refactor: ...`）
- PR: 目的・変更点、関連 Issue、UI 変更はスクリーンショット、影響範囲と動作確認手順を記載
- チェック: `pnpm lint && pnpm test && pnpm build` が通ること
- フック: Husky が `lint-staged`（pre-commit）と `tsc`（pre-push）を実行

## PR本文更新（gh）
- 既存テンプレの Copilot コメントは必ず保持し、位置も変えない
- PR本文はテンプレ構成（内容/動作確認項目/レビュー希望日）に合わせる
- 依存更新のみの場合は動作確認文言テンプレを使い、実施/未実施を明示
- 「今日」指定時は `mm/dd (曜日)` 形式で自動反映する
- 変更対象は PR本文のみとし、テンプレファイル自体は変更しない

## セキュリティ / 設定
- 環境変数: `.env.local.example` を基に `.env.local` 作成。秘密情報はコミット禁止
