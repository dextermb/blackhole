module.exports = {
  purge: [
    './components/**/**.jsx',
    './pages/**/**.jsx'
  ],
  darkMode: false,
  theme: {
    extend: {}
  },
  variants: {
    extend: {
      translate: ['group-hover'],
      scale: ['group-hover']
    }
  },
  plugins: []
}
