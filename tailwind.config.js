module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['active']
      /*
      textOpacity: ['dark'],
      
      borderColor: ['dark'],
      gradientColorStops: ['dark'],
      placeholderColor: ['dark'],
      textColor: ['dark']*/
    },
  },
  plugins: [],
}
