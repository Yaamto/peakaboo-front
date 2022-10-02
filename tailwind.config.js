/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      colors: {
        'background': '#292931',
        'dark-gray': '#26262E',
        'yellow': '#FFD60A'
      },
      fontFamily: {
        sans: ['Dosis', 'sans-serif']
      },
    },
  },
  plugins: [],
}
