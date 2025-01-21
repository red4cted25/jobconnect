module.exports = {
  content: [
    // Specify the paths to all of the template files in your project
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        // Custom background image for hero sections
        'hero': "url('https://res.cloudinary.com/drnaycy06/video/upload/v1737082706/Northeast_Campus_-_West-MEC_ksc3cx.mp4')"
      },
      borderRadius: {
        // Custom border radius values
        'nav-button': '12px'
      },
      boxShadow: {
        // Custom box shadow for dropdowns
        'dropdown': '0px 8px 16px 0px rgba(0,0,0,0.2)',
      },
      colors: {
        // Custom color palette
        'brand-primary': '#FAA802',
        'brand-dark-primary': '#FF8000',
        'brand-secondary': '#0C2240',
        'brand-light-gray': '#D9D9D9',
        'brand-dark-gray': '#5C5C5C'
      },
      fontFamily: {
        // Custom font families
        Golos: ['Golos Text', 'system-ui'],
        Quicksand: ['Quicksand', 'system-ui']
      },
      lineHeight: {
        // Custom line height for hero sections
        'hero': '0.9',
      },
      margin: {
        // Custom margin values
        'spacing-md': '1rem',
        'spacing-lg': '2rem',
        '18': '4.5rem',
      },
      spacing: {
        // Custom spacing values for mobile navbar
        'neg-full': '-100%',
      },
    },
  },
  plugins: [],
}