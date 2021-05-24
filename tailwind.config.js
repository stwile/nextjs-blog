module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {},
  variants: {
    typography: ['dark'],
  },
  plugins: [require('@tailwindcss/typography')],
};
