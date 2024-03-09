/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      minHeight: {
        'calc-screen-minus-footer': 'calc(100vh - 176px)',
      },
    },
  },
  plugins: [],
};
