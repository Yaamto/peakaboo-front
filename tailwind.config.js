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
        'dark-gray-hover': '#1F1F25',
        'yellow': '#26262E',
        'yellow-hover': '#DBB80C'
      },
      fontFamily: {
        sans: ['Dosis', 'sans-serif']
      },
    },
  },
  plugins: [],
}
