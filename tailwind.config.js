module.exports = {
  purge: [
    './components/**/**.jsx',
    './pages/**/**.jsx'
  ],
  darkMode: false,
  theme: {
    extend: {
      inset: {
        '1/2': '50%'
      }
    }
  },
  variants: {
    extend: {
      translate: ['group-hover'],
      scale: ['group-hover']
    }
  },
  plugins: []
}
