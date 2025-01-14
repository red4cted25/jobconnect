/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Golos: ['Golos Text', 'system-ui'],
        Quicksand: ['Quicksand', 'system-ui']
      },
      colors: {
        'brand-primary': '#FAA802',
        'brand-dark-primary': '#FF8000',
        'brand-secondary': '#0C2240',
        'brand-light-gray': '#D9D9D9',
        'brand-dark-gray': '#5C5C5C'
      },
      boxShadow: {
        'dropdown': '0px 8px 16px 0px rgba(0,0,0,0.2)',
      },
      lineHeight: {
        'hero': '0.9',
      }
    },
  },
  plugins: [],
}

