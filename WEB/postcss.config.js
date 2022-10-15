module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: { config: './tailwindcss-config.js' },
    autoprefixer: {}
  }
}
