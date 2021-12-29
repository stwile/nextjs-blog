/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
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
  plugins: [require('@tailwindcss/typography')],
};
