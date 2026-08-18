import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

const globalCss = readFileSync(resolve(process.cwd(), 'styles/global.css'), 'utf8');

/** 16進カラーコードであることを表す型。値の桁・文字種は実行時検証で確認する。 */
type HexColor = `#${string}`;

const colors = {
  white: '#ffffff',
  blackSpecial: '#262727',
  gray500: '#6b7280',
  gray900: '#111827',
} as const satisfies Record<string, HexColor>;

/** 16進数の色を相対輝度へ変換し、コントラスト計算に使える数値を返す。 */
const relativeLuminance = (hex: HexColor) => {
  // 入力色の各チャンネル（0〜255）を、輝度計算用の 0〜1 の値へ変換する。
  const channels = hex
    .slice(1)
    .match(/.{2}/g)
    ?.map((channel) => Number.parseInt(channel, 16) / 255);

  if (!channels) throw new Error(`Invalid color: ${hex}`);

  const linear = channels.map(
    // 各チャンネルを sRGB から線形 RGB へ変換して返す。
    (channel) => (channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4),
  );

  const [red, green, blue] = linear;

  return 0.2126 * red! + 0.7152 * green! + 0.0722 * blue!;
};

/** 前景色と背景色の相対輝度から WCAG のコントラスト比を返す。 */
const contrastRatio = (foreground: HexColor, background: HexColor) => {
  const foregroundLuminance = relativeLuminance(foreground);
  const backgroundLuminance = relativeLuminance(background);
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);

  return (lighter + 0.05) / (darker + 0.05);
};

// 意味のある境界線について、CSS 指定とライト・ダーク双方の色比を検証する。
describe('意味のある境界線のコントラスト', () => {
  // hr とコードブロック枠線が必要なコントラスト比を満たすことを確認する。
  it('hr とコードブロックの枠線が両テーマで 3:1 以上になること', () => {
    // CSS の対象セレクターが、意味のある非テキスト境界として指定した色を使うことを保証する。
    expect(globalCss).toMatch(/\.prose hr\s*\{\s*@apply border-gray-500;/);
    expect(globalCss).toMatch(/\.prose pre\s*\{\s*@apply bg-gray-900 border border-gray-500;/);

    // hr がライト（白）・ダーク（#262727）両方の背景で WCAG の 3:1 以上を満たすことを保証する。
    for (const background of [colors.white, colors.blackSpecial]) {
      expect(contrastRatio(colors.gray500, background)).toBeGreaterThanOrEqual(3);
    }

    // コードブロックがライト・ダーク共通の gray-900 背景で 3:1 以上を満たすことを保証する。
    expect(contrastRatio(colors.gray500, colors.gray900)).toBeGreaterThanOrEqual(3);
  });
});
