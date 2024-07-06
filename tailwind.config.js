/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'ssm': { 'max': '640px' }, // Custom breakpoint for screens under 640px
      },
    },
  },
  plugins: [],
}