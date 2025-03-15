import typography from '@tailwindcss/typography';

import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // or 'media' or 'class'
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'blue-special': '#368caa',
        'indigo-special': '#06afea',
        'black-special': '#262727',
        'gray-special': '#bbb',
      },
    },
  },
  plugins: [typography],
};

export default config;
