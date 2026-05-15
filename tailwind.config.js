/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Marcellus', 'serif'],
        body: ['Maitree', 'serif'],
        display: ['"Bebas Neue"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
