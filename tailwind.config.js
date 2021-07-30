module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        yellow: {
          light: "#F3F7FD"
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
