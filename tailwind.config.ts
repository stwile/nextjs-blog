import typography from '@tailwindcss/typography';

import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // or 'media' or 'class'
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'indigo-special': '#0078b3', // 白背景に対して4.5:1以上のコントラスト比
        'indigo-special-hover': '#008CCF',
        'dark-indigo-special': '#2D9CFF' /* 黒背景に対して4.5:1以上のコントラスト比 */,
        'dark-indigo-special-hover': '#4DA3FF' /* ホバー時（黒背景に対して4.5:1以上） */,
        'black-special': '#262727', // そのまま (十分なコントラスト比)
        'gray-special': '#767676', // 白背景に対して4.5:1のコントラスト比
      },
    },
  },
  plugins: [typography],
};

export default config;
